"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  ExternalLink,
  Loader2,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  CleanSectionLabel,
  CleanSitePage,
  type SiteLang,
} from "@/components/CleanSiteChrome";
import { track } from "@/lib/analytics";
import { getSignUpUrl } from "@/lib/app-links";
import { dashboardOrigin } from "@/components/playground/origin";
import {
  askPlaygroundStream,
  fetchPlaygroundPreview,
  fetchPlaygroundPreviewStream,
} from "@/components/playground/preview";
import type { PlaygroundPreview } from "@/components/playground/types";

// AI 助手作答的对象始终是本页的样例看板(Bambu Lab),与用户在上方扫描的品牌无关。
const SAMPLE_BRAND = "Bambu Lab";

type Source = {
  id: string;
  platform: string;
  title: string;
  excerpt: string;
  engagement: string;
  sentiment: string;
};

type Insight = {
  label: string;
  title: string;
  body: string;
  sourceId: string;
  tone: "blue" | "yellow" | "white" | "dark";
};

type PlaygroundCopy = {
  eyebrow: string;
  title: string;
  description: string;
  brandLabel: string;
  brandPlaceholder: string;
  scan: string;
  scanHint: string;
  sampleLink: string;
  previewLabel: string;
  previewTitle: (brand: string) => string;
  previewBody: string;
  previewMetrics: string[];
  previewTopics: string[];
  lockedTitle: string;
  lockedBody: string;
  unlock: string;
  unlockPending: string;
  emailNote: string;
  sampleEyebrow: string;
  sampleTitle: string;
  sampleDescription: string;
  dateRange: string;
  metrics: Array<{ value: string; label: string; change: string }>;
  insightTitle: string;
  insights: Insight[];
  sourcesTitle: string;
  sourcesDescription: string;
  sources: Source[];
  trace: string;
  sourcePanelLabel: string;
  sourcePanelNote: string;
  close: string;
  assistantTitle: string;
  assistantDescription: string;
  assistantPlaceholder: string;
  ask: string;
  presets: string[];
  grounding: string;
  scanning: string;
  scanEmpty: string;
  askError: string;
  reportNote: string;
  finalTitle: string;
  finalBody: string;
  finalCta: string;
};

const COPY: Record<SiteLang, PlaygroundCopy> = {
  zh: {
    eyebrow: "DataScaler Playground",
    title: "先看见信号，再解锁完整报告。",
    description:
      "输入品牌名称，先获得一份轻量预览。确认有价值后注册，完整报告生成完成会通过邮件通知。",
    brandLabel: "你的品牌",
    brandPlaceholder: "例如 Anker、Roborock、Aiper",
    scan: "生成粗数据",
    scanHint: "无需选择平台或竞品，我们会自动识别。",
    sampleLink: "先看 Bambu Lab 示例",
    previewLabel: "粗数据预览 · 演示估算",
    previewTitle: (brand) => `${brand} 的海外讨论已经成形，可以分析了`,
    previewBody:
      "已识别到可分析的公开讨论。以下为快速预览，完整报告将补充趋势、竞品、原帖与 AI 深度追问。",
    previewMetrics: ["识别关键词", "覆盖竞品", "信息来源"],
    previewTopics: ["产品体验", "价格讨论", "售后服务"],
    lockedTitle: "完整洞察已为你保留",
    lockedBody: "注册后启动完整采集；报告完成后，我们会通过邮件通知你。",
    unlock: "注册并解锁完整报告",
    unlockPending: "报告生成中…",
    emailNote: "报告完成后邮件通知",
    sampleEyebrow: "Bambu Lab · 演示看板",
    sampleTitle: "先读结论，需要时再打开证据。",
    sampleDescription:
      "这是完整报告的精简视图：关键变化、核心指标、来源证据和 AI 助手都围绕同一份数据展开。",
    dateRange: "演示数据 · 最近 7 天",
    metrics: [
      { value: "21.7K", label: "品牌声量", change: "+18.4%" },
      { value: "147.8M", label: "潜在触达", change: "+9.2%" },
      { value: "72.7K", label: "互动量", change: "+12.1%" },
      { value: "521", label: "相关内容", change: "+46" },
      { value: "74%", label: "正向情绪", change: "+3.1%" },
    ],
    insightTitle: "本周值得关注的 4 件事",
    insights: [
      {
        label: "核心发现",
        title: "入门机型与多色打印持续拉高正向口碑",
        body: "P1S、A1 mini 与 AMS 多色是最稳定的正面话题，易用性和成品质量被反复提及。",
        sourceId: "youtube-a1",
        tone: "yellow",
      },
      {
        label: "机会信号",
        title: "“第一台 3D 打印机”已成为明确购买场景",
        body: "新手用户更在意开箱即用、稳定打印和教程生态，适合加强入门内容与套装表达。",
        sourceId: "reddit-first-printer",
        tone: "blue",
      },
      {
        label: "风险提醒",
        title: "一条可靠性差评正被反复转发",
        body: "负面讨论集中在 print failure 与 frustration，建议在 48 小时内用排查方案回应。",
        sourceId: "youtube-reliability",
        tone: "dark",
      },
      {
        label: "竞品动态",
        title: "与 Prusa 的对比从速度转向开放性与价格",
        body: "Bambu Lab 在易用性和速度上领先，但开放生态与长期维护仍是用户比较重点。",
        sourceId: "reddit-compare",
        tone: "white",
      },
    ],
    sourcesTitle: "原始讨论",
    sourcesDescription: "点击任意一条，查看支撑洞察的原文摘要与互动数据。",
    sources: [
      {
        id: "youtube-a1",
        platform: "YouTube",
        title: "Print Your Own Vibe with Bambu Lab A1",
        excerpt:
          "上手体验重点展示多色打印、低学习成本与成品稳定性，评论区对新手友好度反馈积极。",
        engagement: "2.1K 赞 · 148 评论",
        sentiment: "正面",
      },
      {
        id: "reddit-first-printer",
        platform: "Reddit",
        title: "Is the A1 mini a good first 3D printer?",
        excerpt:
          "多数回复认可它适合作为第一台打印机，讨论主要集中在预算、耗材与 AMS Lite 的必要性。",
        engagement: "486 赞 · 92 评论",
        sentiment: "正面",
      },
      {
        id: "youtube-reliability",
        platform: "YouTube",
        title: "Never again — reliability after six months",
        excerpt:
          "视频围绕连续打印失败与排障成本展开，评论中 frustration 和 print failure 出现频率明显上升。",
        engagement: "380 赞 · 210 评论",
        sentiment: "负面",
      },
      {
        id: "reddit-compare",
        platform: "Reddit",
        title: "Bambu Lab vs Prusa for a long-term setup",
        excerpt:
          "用户认可 Bambu Lab 的速度与易用性，同时持续比较 Prusa 的开放性、可维修性与长期成本。",
        engagement: "634 赞 · 176 评论",
        sentiment: "中性",
      },
    ],
    trace: "查看来源",
    sourcePanelLabel: "洞察来源",
    sourcePanelNote: "演示内容用于展示溯源路径；正式报告可直接打开原始帖子。",
    close: "关闭",
    assistantTitle: "问问 DataScaler",
    assistantDescription: "回答只基于本次演示看板中的证据，并标出对应来源。",
    assistantPlaceholder: "例如：现在最需要优先处理什么？",
    ask: "提问",
    presets: [
      "用户最常提到哪些优点？",
      "哪些负面反馈值得优先关注？",
      "Bambu Lab 与主要竞品相比如何？",
    ],
    grounding:
      "样例品牌:Bambu Lab（桌面级 3D 打印机)。周期:2026年3月10–17日。本周关键指标:品牌声量 21.7K、总曝光 147.8M、互动量 72.7K、帖子数 521、情感得分 18%(位列 Top7 竞品前排),整体情感偏正面。" +
      "正面高频话题:P1S / A1 mini 机型、AMS 多色打印、reliability(可靠性)、print quality(打印质量);大量 \"first printer / beginner friendly\" 新手好评,入门市场心智稳固,易用性与打印速度口碑领先。" +
      "风险信号:YouTube 一条 \"Never again\" 可靠性差评正被转发讨论,负面词集中在 frustration / print failure(打印失败)。" +
      "竞品对比集中在 Prusa / Creality / Anycubic;Bambu Lab 在易用性、速度上领先,价格与开放性上常被对标 Prusa。" +
      "代表性帖子:YouTube \"Print Your Own Vibe with Bambu Lab A1\"(正面,👍2.1K)、X 创客晒图短片(正面)、YouTube \"…Never again\" 可靠性负面测评(👍380、💬210)。",
    scanning: "扫描中…",
    scanEmpty: "暂时没有找到足够的公开讨论。可以换一个品牌，或注册后由我们发起完整采集。",
    askError: "暂时答不上来，请稍后再试。",
    reportNote: "本页是产品演示，数据仅供展示。",
    finalTitle: "想看看你的品牌最近发生了什么？",
    finalBody: "先免费生成粗数据；注册后解锁完整报告与全部原始来源。",
    finalCta: "开始分析我的品牌",
  },
  en: {
    eyebrow: "DataScaler Playground",
    title: "See the signal first. Unlock the full report when it matters.",
    description:
      "Enter a brand name for a lightweight preview. Sign up when the signal looks useful, and we will email you when the full report is ready.",
    brandLabel: "Your brand",
    brandPlaceholder: "Try Anker, Roborock or Aiper",
    scan: "Generate preview",
    scanHint: "No platform or competitor setup required.",
    sampleLink: "Explore the Bambu Lab sample",
    previewLabel: "Lightweight preview · demo estimate",
    previewTitle: (brand) =>
      `Overseas conversation around ${brand} is taking shape`,
    previewBody:
      "We found enough public discussion for analysis. The full report adds trends, competitors, original posts and AI follow-up.",
    previewMetrics: ["Keywords", "Competitors", "Sources"],
    previewTopics: [
      "Product experience",
      "Price discussion",
      "Customer support",
    ],
    lockedTitle: "Your full insight is ready to be collected",
    lockedBody:
      "Sign up to start full collection. We will email you as soon as the report is complete.",
    unlock: "Sign up and unlock the full report",
    unlockPending: "Generating report…",
    emailNote: "Email notification when ready",
    sampleEyebrow: "Bambu Lab · sample dashboard",
    sampleTitle: "Read the conclusion first. Open the evidence when needed.",
    sampleDescription:
      "A focused view of the full report: changes, key metrics, source evidence and AI follow-up all use the same dataset.",
    dateRange: "Sample data · last 7 days",
    metrics: [
      { value: "21.7K", label: "Brand volume", change: "+18.4%" },
      { value: "147.8M", label: "Potential reach", change: "+9.2%" },
      { value: "72.7K", label: "Engagement", change: "+12.1%" },
      { value: "521", label: "Relevant items", change: "+46" },
      { value: "74%", label: "Positive sentiment", change: "+3.1%" },
    ],
    insightTitle: "Four things that matter this week",
    insights: [
      {
        label: "Core finding",
        title: "Entry models and multicolor printing keep advocacy high",
        body: "P1S, A1 mini and AMS multicolor lead positive conversation, with ease of use and print quality repeated most often.",
        sourceId: "youtube-a1",
        tone: "yellow",
      },
      {
        label: "Opportunity",
        title: "“My first 3D printer” is becoming a clear purchase occasion",
        body: "New users value out-of-box reliability and tutorials, creating room for stronger onboarding content and bundles.",
        sourceId: "reddit-first-printer",
        tone: "blue",
      },
      {
        label: "Risk",
        title: "One reliability story is continuing to spread",
        body: "Negative language clusters around print failure and frustration. A practical response within 48 hours is recommended.",
        sourceId: "youtube-reliability",
        tone: "dark",
      },
      {
        label: "Competitive shift",
        title: "Prusa comparisons are moving from speed to openness and price",
        body: "Bambu Lab leads on ease and speed, while open ecosystems and long-term maintenance remain key comparison points.",
        sourceId: "reddit-compare",
        tone: "white",
      },
    ],
    sourcesTitle: "Original discussions",
    sourcesDescription:
      "Open any item to inspect the excerpt and engagement behind the finding.",
    sources: [
      {
        id: "youtube-a1",
        platform: "YouTube",
        title: "Print Your Own Vibe with Bambu Lab A1",
        excerpt:
          "The review focuses on multicolor printing, low setup friction and consistent output. Comments are especially positive about beginner friendliness.",
        engagement: "2.1K likes · 148 comments",
        sentiment: "Positive",
      },
      {
        id: "reddit-first-printer",
        platform: "Reddit",
        title: "Is the A1 mini a good first 3D printer?",
        excerpt:
          "Most replies recommend it for first-time owners, with discussion centered on budget, materials and whether AMS Lite is necessary.",
        engagement: "486 upvotes · 92 comments",
        sentiment: "Positive",
      },
      {
        id: "youtube-reliability",
        platform: "YouTube",
        title: "Never again — reliability after six months",
        excerpt:
          "The video covers repeated print failures and troubleshooting cost. “Frustration” and “print failure” are rising in the comments.",
        engagement: "380 likes · 210 comments",
        sentiment: "Negative",
      },
      {
        id: "reddit-compare",
        platform: "Reddit",
        title: "Bambu Lab vs Prusa for a long-term setup",
        excerpt:
          "Users credit Bambu Lab for speed and usability while comparing Prusa on openness, repairability and long-term ownership cost.",
        engagement: "634 upvotes · 176 comments",
        sentiment: "Neutral",
      },
    ],
    trace: "Trace source",
    sourcePanelLabel: "Insight source",
    sourcePanelNote:
      "Sample content demonstrates the traceability flow. A full report opens the original post directly.",
    close: "Close",
    assistantTitle: "Ask DataScaler",
    assistantDescription:
      "Answers use only the evidence in this sample dashboard and cite the corresponding sources.",
    assistantPlaceholder: "Try: What should the team prioritize now?",
    ask: "Ask",
    presets: [
      "What strengths do users mention most?",
      "Which negative feedback needs attention first?",
      "How does Bambu Lab compare with competitors?",
    ],
    grounding:
      "Sample brand: Bambu Lab (desktop 3D printers). Window: Mar 10–17, 2026. Key metrics this week: brand volume 21.7K, total impressions 147.8M, engagement 72.7K, 521 posts, sentiment score 18% (front of the Top-7 peers), overall positive. " +
      "Top positive topics: P1S / A1 mini models, AMS multi-color printing, reliability, print quality; heavy \"first printer / beginner friendly\" praise keeps entry-level mindshare solid, leading on ease-of-use and speed. " +
      "Risk signal: a YouTube \"Never again\" reliability complaint is being reshared; negative terms cluster on frustration / print failure. " +
      "Competitor comparisons cluster around Prusa / Creality / Anycubic; Bambu Lab leads on ease-of-use and speed, and is benchmarked against Prusa on price and openness. " +
      "Representative posts: YouTube \"Print Your Own Vibe with Bambu Lab A1\" (positive, 👍2.1K), an X maker clip (positive), and YouTube \"…Never again\" reliability review (negative, 👍380, 💬210).",
    scanning: "Scanning…",
    scanEmpty: "We couldn't find enough public discussion yet. Try another brand, or sign up and we'll run full collection for you.",
    askError: "Couldn't answer right now — please try again.",
    reportNote:
      "This page is a product demo; content and data are illustrative.",
    finalTitle: "Want to see what is happening around your brand?",
    finalBody:
      "Generate a free preview first, then sign up to unlock the full report and every original source.",
    finalCta: "Analyze my brand",
  },
};

// 预览三磁贴取真实 Tier A 计数(关键词 / 竞品 / 信息来源),对齐 ScanTheater.metricsFromPreview。
function metricValuesFromPreview(p: PlaygroundPreview): string[] {
  const socialCount =
    p.social.officialAccounts.length +
    p.social.storefronts.length +
    p.social.amazonProducts.length;
  const sources =
    p.brand.sources.length || (p.website.officialWebsite ? 1 : 0) + socialCount;
  return [
    String(p.keywords.categoryKeywords.length),
    String(p.competitors.length),
    String(sources),
  ];
}

// 话题标签优先取真实品类关键词,退回 DNA 标签,再退回样例默认话题。
function topicsFromPreview(p: PlaygroundPreview, fallback: string[]): string[] {
  const keywords = p.keywords.categoryKeywords.filter(Boolean).slice(0, 4);
  if (keywords.length) return keywords;
  const dna = p.dnaTags.filter(Boolean).slice(0, 4);
  if (dna.length) return dna;
  return fallback;
}

function SourceModal({
  source,
  copy,
  onClose,
}: {
  source: Source;
  copy: PlaygroundCopy;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#7047eb]/45 p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="source-dialog-title"
        className="w-full max-w-[620px] border border-[#3d2673] bg-[#fbf9ff] p-6 shadow-[10px_10px_0_rgba(0,0,0,0.35)] sm:p-8"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#3d2673]/15 pb-5">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#24133f]/45">
              {copy.sourcePanelLabel}
            </div>
            <div className="mt-2 inline-flex border border-[#3d2673] bg-[#d8c8ff] px-3 py-1 text-xs font-black text-[#24133f]">
              {source.platform}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#3d2673] text-[#24133f] transition-colors hover:bg-[#7047eb] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h2
          id="source-dialog-title"
          className="mt-7 text-2xl font-black leading-tight tracking-[-0.04em] text-[#24133f] sm:text-3xl"
        >
          {source.title}
        </h2>
        <p className="mt-5 border-l-4 border-[#7047eb] pl-4 text-sm leading-7 text-[#24133f]/65">
          {source.excerpt}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-black">
          <span className="border border-[#3d2673] bg-white px-3 py-2 text-[#24133f]">
            {source.engagement}
          </span>
          <span className="border border-[#3d2673] bg-[#f5ff63] px-3 py-2 text-[#24133f]">
            {source.sentiment}
          </span>
        </div>
        <p className="mt-7 text-xs leading-5 text-[#24133f]/45">
          {copy.sourcePanelNote}
        </p>
      </div>
    </div>
  );
}

function InsightCard({
  insight,
  index,
  traceLabel,
  onTrace,
}: {
  insight: Insight;
  index: number;
  traceLabel: string;
  onTrace: () => void;
}) {
  const tones = {
    yellow: "bg-[#f5ff63] text-[#24133f]",
    blue: "bg-[#d8c8ff] text-[#24133f]",
    white: "bg-white text-[#24133f]",
    dark: "bg-[#24133f] text-white",
  };
  const muted = insight.tone === "dark" ? "text-white/60" : "text-[#24133f]/60";
  const border =
    insight.tone === "dark" ? "border-white/25" : "border-[#3d2673]/20";

  return (
    <article
      className={`flex min-h-[310px] flex-col border-b border-r border-[#3d2673] p-6 sm:p-8 ${tones[insight.tone]}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={`text-[10px] font-black uppercase tracking-[0.16em] ${muted}`}
        >
          0{index + 1} · {insight.label}
        </span>
        {insight.tone === "dark" ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <BarChart3 className="h-4 w-4" />
        )}
      </div>
      <h3 className="mt-12 max-w-[480px] text-2xl font-black leading-[1.05] tracking-[-0.04em] sm:text-[30px]">
        {insight.title}
      </h3>
      <p className={`mt-4 max-w-[520px] text-sm leading-6 ${muted}`}>
        {insight.body}
      </p>
      <button
        type="button"
        onClick={onTrace}
        className={`mt-auto inline-flex items-center gap-2 self-start border-t pt-5 text-xs font-black ${border}`}
      >
        {traceLabel}
        <ExternalLink className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}

export function CleanPlaygroundPage({ lang }: { lang: SiteLang }) {
  const copy = COPY[lang];
  const [brand, setBrand] = useState("");
  const [previewBrand, setPreviewBrand] = useState<string | null>(null);
  const [preview, setPreview] = useState<PlaygroundPreview | null>(null);
  const [scanStatus, setScanStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);

  const scanBusyRef = useRef(false);
  const scanAbortRef = useRef<AbortController | null>(null);
  const askBusyRef = useRef(false);
  const askAbortRef = useRef<AbortController | null>(null);

  const signupUrl = getSignUpUrl(lang);

  useEffect(() => {
    const brandFromUrl = new URLSearchParams(window.location.search).get("brand");
    if (brandFromUrl) setBrand(brandFromUrl);
  }, []);

  // 卸载时中止在途的扫描/提问请求,避免关闭后 setState 告警。
  useEffect(() => {
    return () => {
      scanAbortRef.current?.abort();
      askAbortRef.current?.abort();
    };
  }, []);

  const metricValues =
    scanStatus === "ready" && preview ? metricValuesFromPreview(preview) : null;
  const topics =
    scanStatus === "ready" && preview
      ? topicsFromPreview(preview, copy.previewTopics)
      : copy.previewTopics;

  // 注册解锁:带 brand(+ 真实 cacheKey)回流 dashboard,预填向导前 4 步并跳采集步。
  const unlockDest =
    `/onboarding/brand?brand=${encodeURIComponent(previewBrand ?? "")}` +
    (preview?.cacheKey ? `&preview=${encodeURIComponent(preview.cacheKey)}` : "");
  const unlockUrl = previewBrand
    ? `${dashboardOrigin()}/auth/sign-up?callbackUrl=${encodeURIComponent(unlockDest)}`
    : signupUrl;

  // 生成粗数据:调真实预览端点(流式优先,失败回退非流式),用返回的 Tier A 计数填卡片。
  const runScan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanBrand = brand.trim();
    if (!cleanBrand || scanBusyRef.current) return;
    scanBusyRef.current = true;
    setPreviewBrand(cleanBrand);
    setPreview(null);
    setScanStatus("loading");
    track("playground_scan", { locale: lang, brand_length: cleanBrand.length });

    scanAbortRef.current?.abort();
    const controller = new AbortController();
    scanAbortRef.current = controller;

    let result = await fetchPlaygroundPreviewStream(
      cleanBrand,
      lang,
      () => {},
      controller.signal,
    );
    if (!result) {
      result = await fetchPlaygroundPreview(cleanBrand, lang, controller.signal);
    }

    if (controller.signal.aborted) {
      scanBusyRef.current = false;
      return;
    }
    if (result) {
      setPreview(result);
      setScanStatus("ready");
    } else {
      setScanStatus("error");
    }
    scanBusyRef.current = false;
    scanAbortRef.current = null;
  };

  const openSource = (sourceId: string) => {
    const source = copy.sources.find((item) => item.id === sourceId);
    if (source) setSelectedSource(source);
  };

  // AI 提问:流式对接匿名 /api/playground/ask,逐字累加纯文本;busyRef 守卫防并发重发。
  const runAsk = async (raw: string, preset: boolean) => {
    const q = raw.trim();
    if (!q || askBusyRef.current) return;
    askBusyRef.current = true;
    setAsking(true);
    setAnswer("");
    track("playground_ai_question", { locale: lang, preset });

    askAbortRef.current?.abort();
    const controller = new AbortController();
    askAbortRef.current = controller;

    await askPlaygroundStream(
      { question: q, brand: SAMPLE_BRAND, context: copy.grounding, lang },
      (chunk) => setAnswer((prev) => (prev ?? "") + chunk),
      controller.signal,
    );

    const aborted = controller.signal.aborted;
    setAnswer((prev) => {
      if (prev && prev.length > 0) return prev; // 有内容(含中止时的部分回答)→ 保留
      if (aborted) return null; // 中止且无内容 → 清空
      return copy.askError; // 失败兜底
    });
    askBusyRef.current = false;
    setAsking(false);
    askAbortRef.current = null;
  };

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runAsk(question, false);
  };

  const askPreset = (preset: string) => {
    if (askBusyRef.current) return;
    setQuestion(preset);
    void runAsk(preset, true);
  };

  return (
    <CleanSitePage lang={lang}>
      <main className="overflow-x-hidden">
        <section
          id="top"
          className="relative scroll-mt-24 border-b border-[#3d2673] bg-[radial-gradient(circle_at_48%_10%,#d8c8ff_0%,#eee7ff_38%,#fbf9ff_75%)] px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24"
        >
          <div className="pointer-events-none absolute left-[6%] top-24 h-20 w-20 rounded-full bg-[#f5ff63]" />
          <div className="relative mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-[900px] text-center">
              <CleanSectionLabel>{copy.eyebrow}</CleanSectionLabel>
              <h1 className="mt-7 text-balance text-[clamp(40px,6.5vw,74px)] font-black leading-[0.98] tracking-[-0.055em] text-[#24133f]">
                {copy.title}
              </h1>
              <p className="mx-auto mt-7 max-w-[700px] text-base leading-7 text-[#24133f]/60 sm:text-lg">
                {copy.description}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-[940px] border border-[#3d2673] bg-white p-5 shadow-[8px_8px_0_#24133f] sm:p-8">
              <form
                onSubmit={runScan}
                className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end"
              >
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.13em] text-[#24133f]/50">
                    {copy.brandLabel}
                  </span>
                  <div className="flex h-14 items-center gap-3 border border-[#3d2673] bg-[#fbf9ff] px-4">
                    <Search className="h-4 w-4 shrink-0 text-[#24133f]/45" />
                    <input
                      value={brand}
                      onChange={(event) => setBrand(event.target.value)}
                      placeholder={copy.brandPlaceholder}
                      className="h-full min-w-0 flex-1 bg-transparent text-base font-bold text-[#24133f] outline-none placeholder:text-[#24133f]/30"
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  disabled={!brand.trim() || scanStatus === "loading"}
                  className={`inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#7047eb] px-7 text-sm font-black text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${
                    scanStatus === "loading" ? "opacity-90" : "disabled:opacity-35"
                  }`}
                >
                  {scanStatus === "loading" ? (
                    <>
                      {copy.scanning}
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {copy.scan}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
              <div className="mt-4 flex flex-col gap-3 text-xs font-bold text-[#24133f]/40 sm:flex-row sm:items-center sm:justify-between">
                <span>{copy.scanHint}</span>
                <a
                  href="#sample"
                  className="inline-flex items-center gap-1 text-[#24133f] underline decoration-[#3d2673]/25 underline-offset-4"
                >
                  {copy.sampleLink}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {previewBrand ? (
                <div
                  className="mt-8 border-t border-[#3d2673] pt-8"
                  aria-live="polite"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-[560px]">
                      <div className="inline-flex border border-[#3d2673] bg-[#f5ff63] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#24133f]">
                        {copy.previewLabel}
                      </div>
                      <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.045em] text-[#24133f] sm:text-4xl">
                        {copy.previewTitle(previewBrand)}
                      </h2>
                      <p className="mt-4 text-sm leading-6 text-[#24133f]/55">
                        {scanStatus === "error" ? copy.scanEmpty : copy.previewBody}
                      </p>
                    </div>
                    {scanStatus === "error" ? null : (
                      <div className="flex flex-wrap gap-2 lg:max-w-[260px] lg:justify-end">
                        {topics.map((topic) => (
                          <span
                            key={topic}
                            className="border border-[#3d2673] bg-[#d8c8ff] px-3 py-2 text-xs font-black text-[#24133f]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {scanStatus === "error" ? null : (
                    <div className="mt-8 grid border-l border-t border-[#3d2673] sm:grid-cols-3">
                      {copy.previewMetrics.map((label, index) => (
                        <div
                          key={label}
                          className="border-b border-r border-[#3d2673] bg-[#fbf9ff] p-5"
                        >
                          {scanStatus === "ready" && metricValues ? (
                            <div className="text-3xl font-black tracking-[-0.05em] text-[#24133f]">
                              {metricValues[index]}
                            </div>
                          ) : (
                            <div className="flex h-9 items-center">
                              <span
                                className="h-6 w-16 animate-pulse rounded bg-[#24133f]/15"
                                style={{ animationDelay: `${index * 160}ms` }}
                              />
                            </div>
                          )}
                          <div className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#24133f]/40">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-6 grid gap-5 border border-[#3d2673] bg-[#24133f] p-5 text-white sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5ff63] text-[#24133f]">
                        <LockKeyhole className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-lg font-black text-white">
                          {copy.lockedTitle}
                        </h3>
                        <p className="mt-1 max-w-[580px] text-xs leading-5 text-white/55">
                          {copy.lockedBody}
                        </p>
                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#d8c8ff]">
                          <Mail className="h-3.5 w-3.5" />
                          {copy.emailNote}
                        </div>
                      </div>
                    </div>
                    {scanStatus === "ready" ? (
                      <a
                        href={unlockUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("sign_up_click", {
                            button_location: "playground_preview",
                            locale: lang,
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#24133f] transition-transform hover:-translate-y-0.5"
                      >
                        {copy.unlock}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/20 px-6 py-4 text-sm font-black text-white/50"
                      >
                        {scanStatus === "loading" ? copy.unlockPending : copy.unlock}
                        {scanStatus === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section
          id="sample"
          className="scroll-mt-24 border-b border-[#3d2673] bg-[#f4f0fa] px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <CleanSectionLabel>{copy.sampleEyebrow}</CleanSectionLabel>
                <h2 className="mt-6 max-w-[800px] text-[clamp(34px,5vw,60px)] font-black leading-[1] tracking-[-0.05em] text-[#24133f]">
                  {copy.sampleTitle}
                </h2>
              </div>
              <div className="lg:justify-self-end">
                <p className="max-w-[470px] text-base leading-7 text-[#24133f]/55">
                  {copy.sampleDescription}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 border border-[#3d2673] bg-white px-3 py-2 text-xs font-black text-[#24133f]">
                  <span className="h-2 w-2 rounded-full bg-[#68a77c]" />
                  {copy.dateRange}
                </div>
              </div>
            </div>

            <div className="mt-14 grid border-l border-t border-[#3d2673] sm:grid-cols-2 lg:grid-cols-5">
              {copy.metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`border-b border-r border-[#3d2673] p-5 ${index === 4 ? "bg-[#f5ff63]" : "bg-white"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[clamp(26px,2.8vw,34px)] font-black tracking-[-0.045em] text-[#24133f]">
                      {metric.value}
                    </div>
                    <span className="text-[10px] font-black text-[#527b5f]">
                      {metric.change}
                    </span>
                  </div>
                  <div className="mt-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#24133f]/45">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[#24133f] sm:text-3xl">
                {copy.insightTitle}
              </h3>
              <span className="hidden text-xs font-black uppercase tracking-[0.14em] text-[#24133f]/35 sm:block">
                AI brief · 04 signals
              </span>
            </div>
            <div className="mt-7 grid border-l border-t border-[#3d2673] lg:grid-cols-2">
              {copy.insights.map((insight, index) => (
                <InsightCard
                  key={insight.title}
                  insight={insight}
                  index={index}
                  traceLabel={copy.trace}
                  onTrace={() => openSource(insight.sourceId)}
                />
              ))}
            </div>

            <div className="mt-16 grid border border-[#3d2673] bg-white lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-[#3d2673] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-[#7047eb]" />
                  <h3 className="text-xl font-black tracking-[-0.03em] text-[#24133f]">
                    {copy.sourcesTitle}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#24133f]/50">
                  {copy.sourcesDescription}
                </p>
                <div className="mt-7 divide-y divide-[#3d2673]/15 border-y border-[#3d2673]/15">
                  {copy.sources.slice(0, 3).map((source) => (
                    <button
                      key={source.id}
                      type="button"
                      onClick={() => setSelectedSource(source)}
                      className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 py-5 text-left"
                    >
                      <span className="border border-[#3d2673] bg-[#d8c8ff] px-2 py-1 text-[9px] font-black uppercase text-[#24133f]">
                        {source.platform}
                      </span>
                      <span className="line-clamp-2 text-sm font-black leading-5 text-[#24133f]">
                        {source.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#24133f]/45" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#d8c8ff] p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <h3 className="text-xl font-black tracking-[-0.03em] text-[#24133f]">
                    {copy.assistantTitle}
                  </h3>
                </div>
                <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#24133f]/55">
                  {copy.assistantDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {copy.presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => askPreset(preset)}
                      disabled={asking}
                      className="border border-[#3d2673] bg-white/55 px-3 py-2 text-left text-xs font-black leading-4 text-[#24133f] transition-colors hover:bg-white disabled:opacity-40"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                {asking || answer !== null ? (
                  <div
                    className="mt-6 border border-[#3d2673] bg-white p-5"
                    aria-live="polite"
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7047eb]">
                      DataScaler answer
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm font-semibold leading-6 text-[#24133f]">
                      {answer}
                      {asking ? (
                        <span className="ml-0.5 inline-block animate-pulse">▍</span>
                      ) : null}
                    </p>
                  </div>
                ) : null}
                <form
                  onSubmit={submitQuestion}
                  className="mt-6 flex flex-col gap-3 sm:flex-row"
                >
                  <label className="flex h-12 min-w-0 flex-1 items-center gap-2 border border-[#3d2673] bg-white px-4">
                    <MessageSquareText className="h-4 w-4 shrink-0 text-[#24133f]/40" />
                    <input
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                      placeholder={copy.assistantPlaceholder}
                      disabled={asking}
                      className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-[#24133f] outline-none placeholder:text-[#24133f]/35 disabled:opacity-50"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={!question.trim() || asking}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#7047eb] px-6 text-sm font-black text-white disabled:opacity-35"
                  >
                    {copy.ask}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-[#24133f]/35">
              {copy.reportNote}
            </p>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#f5ff63] px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#24133f]/45">
                <Check className="h-4 w-4" />
                Playground
              </div>
              <h2 className="mt-5 max-w-[760px] text-[clamp(34px,4.6vw,56px)] font-black leading-[1] tracking-[-0.05em] text-[#24133f]">
                {copy.finalTitle}
              </h2>
              <p className="mt-5 max-w-[620px] text-sm leading-6 text-[#24133f]/55">
                {copy.finalBody}
              </p>
            </div>
            <a
              href="#top"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#7047eb] px-7 py-4 text-sm font-black text-white lg:self-auto"
            >
              {copy.finalCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      {selectedSource ? (
        <SourceModal
          source={selectedSource}
          copy={copy}
          onClose={() => setSelectedSource(null)}
        />
      ) : null}
    </CleanSitePage>
  );
}
