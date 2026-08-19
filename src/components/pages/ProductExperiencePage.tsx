"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  CircleAlert,
  Eye,
  ExternalLink,
  FileText,
  FileSearch,
  Languages,
  LayoutDashboard,
  ListChecks,
  Loader2,
  LockKeyhole,
  MessageCircle,
  MessageSquareText,
  Search,
  Send,
  Sparkles,
  ThumbsUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  CleanSiteFooter,
  CleanSiteHeader,
  type SiteLang,
} from "@/components/CleanSiteChrome";
import { dashboardOrigin } from "@/components/playground/origin";
import {
  askPlaygroundStream,
  fetchPlaygroundPreview,
} from "@/components/playground/preview";
import type { PlaygroundPreview } from "@/components/playground/types";
import {
  FullProductDashboard,
  type ProductDemoSource,
} from "@/components/playground/FullProductDashboard";
import { track } from "@/lib/analytics";

type ReportView = "brief" | "evidence" | "questions" | "actions";

type DemoSource = ProductDemoSource;

type SourcePost = {
  id: string;
  ref: string;
  platform: "YouTube" | "Reddit" | "X" | "Instagram";
  sentiment: "positive" | "neutral" | "negative";
  date: string;
  title: string;
  views: string;
  likes: string;
  comments: string;
  url: string;
};

type DemoInsight = {
  label: string;
  title: string;
  body: string;
  refs: string[];
  risk?: boolean;
};

const SOURCES: Record<SiteLang, DemoSource[]> = {
  zh: [
    {
      id: "ref-03",
      ref: "Ref 03",
      platform: "Reddit",
      age: "2 天前",
      title: "A1 mini 作为第一台 3D 打印机是否合适？",
      excerpt:
        "高赞回复普遍认可它的开箱体验和打印稳定性，但也反复提到耗材成本、AMS Lite 必要性与长期维护。",
      engagement: "342 upvotes · 67 comments",
      sentiment: "正面为主",
      topic: "入门体验",
      relation: "该讨论集中验证了“新手友好”是当前最稳定的购买驱动。",
      url: "https://www.reddit.com/r/BambuLab/",
    },
    {
      id: "ref-08",
      ref: "Ref 08",
      platform: "YouTube",
      age: "3 天前",
      title: "使用六个月后的可靠性体验",
      excerpt:
        "视频围绕连续打印失败和排障成本展开，评论区里 frustration 与 print failure 的出现频率明显增加。",
      engagement: "380 likes · 210 comments",
      sentiment: "负面",
      topic: "产品可靠性",
      relation: "帖子与评论围绕同一个可靠性问题，带动近三天负面讨论上升。",
      url: "https://www.youtube.com/results?search_query=Bambu+Lab+reliability+six+months",
    },
    {
      id: "ref-12",
      ref: "Ref 12",
      platform: "Reddit",
      age: "5 天前",
      title: "Bambu Lab 与 Prusa 的长期使用成本对比",
      excerpt:
        "用户认可 Bambu Lab 的速度与易用性，同时持续比较 Prusa 的开放性、可维修性与长期持有成本。",
      engagement: "286 upvotes · 84 comments",
      sentiment: "中性",
      topic: "竞品比较",
      relation: "它解释了竞品讨论为何从打印速度转向开放生态与维护成本。",
      url: "https://www.reddit.com/r/BambuLab/",
    },
  ],
  en: [
    {
      id: "ref-03",
      ref: "Ref 03",
      platform: "Reddit",
      age: "2 days ago",
      title: "Is the A1 mini a good first 3D printer?",
      excerpt:
        "Top replies praise the out-of-box experience and reliable prints, while repeatedly asking about material cost, AMS Lite, and long-term maintenance.",
      engagement: "342 upvotes · 67 comments",
      sentiment: "Mostly positive",
      topic: "Beginner experience",
      relation: "The discussion validates beginner friendliness as the most consistent purchase driver.",
      url: "https://www.reddit.com/r/BambuLab/",
    },
    {
      id: "ref-08",
      ref: "Ref 08",
      platform: "YouTube",
      age: "3 days ago",
      title: "Reliability after six months of use",
      excerpt:
        "The video focuses on repeated print failures and troubleshooting cost. “Frustration” and “print failure” are rising in the comments.",
      engagement: "380 likes · 210 comments",
      sentiment: "Negative",
      topic: "Product reliability",
      relation: "The post and its comments focus on the same failure pattern, driving the three-day increase in negative conversation.",
      url: "https://www.youtube.com/results?search_query=Bambu+Lab+reliability+six+months",
    },
    {
      id: "ref-12",
      ref: "Ref 12",
      platform: "Reddit",
      age: "5 days ago",
      title: "Bambu Lab vs. Prusa for long-term ownership",
      excerpt:
        "Users credit Bambu Lab for speed and usability while comparing Prusa on openness, repairability, and long-term ownership cost.",
      engagement: "286 upvotes · 84 comments",
      sentiment: "Neutral",
      topic: "Competitive comparison",
      relation: "It explains why competitor discussion is shifting from print speed to openness and maintenance cost.",
      url: "https://www.reddit.com/r/BambuLab/",
    },
  ],
};

const SOURCE_POSTS: SourcePost[] = [
  {
    id: "source-post-1",
    ref: "Ref 08",
    platform: "YouTube",
    sentiment: "neutral",
    date: "Nov 21",
    title: "3D printer toolhead changers are going next-gen. This Short compares the Bambu Lab H2C, Snapmaker U1, and Prusa Core One INDX from an engineer's perspective, including reliability and real-world print performance.",
    views: "220.7K",
    likes: "2.6K",
    comments: "351",
    url: "https://www.youtube.com/results?search_query=Bambu+Lab+H2C+reliability",
  },
  {
    id: "source-post-2",
    ref: "Ref 08",
    platform: "YouTube",
    sentiment: "negative",
    date: "Dec 14",
    title: "Print Your Own Vibe with Bambu Lab A1! The Bambu Lab A1 is your Colorful Gateway to 3D Printing, expanding accessibility, stability, and innovation.",
    views: "37.4M",
    likes: "2.6K",
    comments: "193",
    url: "https://www.youtube.com/results?search_query=Print+Your+Own+Vibe+Bambu+Lab+A1",
  },
  {
    id: "source-post-3",
    ref: "Ref 12",
    platform: "YouTube",
    sentiment: "neutral",
    date: "Jul 21",
    title: "Discover the Anycubic A-One, a reliable 3D printer for beginners. We compare it with other models and discuss whether the price difference is worth it.",
    views: "63.5K",
    likes: "1K",
    comments: "59",
    url: "https://www.youtube.com/results?search_query=Anycubic+A-One+Bambu+Lab+comparison",
  },
  {
    id: "source-post-4",
    ref: "Ref 03",
    platform: "YouTube",
    sentiment: "positive",
    date: "Nov 12",
    title: "SteinTrack demonstration: organizing the power of 3D printing on the Bambu Lab P1S with multicolor workflows and repeatable results.",
    views: "2.5M",
    likes: "81K",
    comments: "619",
    url: "https://www.youtube.com/results?search_query=SteinTrack+Bambu+Lab+P1S",
  },
  {
    id: "source-post-5",
    ref: "Ref 03",
    platform: "YouTube",
    sentiment: "positive",
    date: "Jun 27",
    title: "3D print with me on the Bambu Lab A1 Mini — a quick beginner-friendly setup with clean first-layer results.",
    views: "1.9M",
    likes: "39.2K",
    comments: "326",
    url: "https://www.youtube.com/results?search_query=3D+print+with+me+Bambu+Lab+A1+Mini",
  },
  {
    id: "source-post-6",
    ref: "Ref 12",
    platform: "YouTube",
    sentiment: "neutral",
    date: "Jan 20",
    title: "Full review and quick-start guide: Bambu Lab versus Prusa for a first printer, with maintenance, repairability, and long-term ownership tradeoffs.",
    views: "1.5M",
    likes: "37.2K",
    comments: "653",
    url: "https://www.youtube.com/results?search_query=Bambu+Lab+Prusa+long+term+review",
  },
  {
    id: "source-post-7",
    ref: "Ref 03",
    platform: "YouTube",
    sentiment: "positive",
    date: "Jan 31",
    title: "The Bambu Lab P1S and P1P are incredibly fast printers. A maker explains why the setup and everyday workflow keep new users engaged.",
    views: "1.7M",
    likes: "36.5K",
    comments: "713",
    url: "https://www.youtube.com/results?search_query=Bambu+Lab+P1S+P1P+review",
  },
];

const COPY = {
  zh: {
    heroTitle: "输入一个品牌，看懂海外用户为什么买、为什么不买",
    heroBody:
      "DataScaler 从公开社媒、社区和评论中提取关键变化、用户顾虑和增长机会，每条结论都可以回到原始讨论核验。",
    inputLabel: "品牌名称或官网",
    inputPlaceholder: "例如 Anker、Roborock、Aiper",
    submit: "生成品牌预览",
    scanning: "正在识别品牌…",
    hint: "自动识别竞品、生成关键词",
    heroReport: "DataScaler 报告预览",
    topFinding: "本周最值得关注",
    heroInsight: "入门产品口碑稳定，但一条可靠性差评正在扩散。",
    previewTitle: (brand: string) => `已识别 ${brand}`,
    previewBody: "品牌、官网和公开讨论已匹配。注册后继续生成完整报告，当前信息会自动带入产品。",
    previewMetrics: ["关键词", "竞品", "来源"],
    unlock: "确认品牌并生成完整报告",
    previewErrorTitle: "暂未识别到足够信息",
    previewError: "可以换一个品牌试试，或注册后发起完整采集。",
    sectionTitle: "一份报告，看清品牌正在发生什么",
    sectionBody: "以 Bambu Lab 为例，查看市场变化、竞品压力与用户声音。每条结论都能回到原帖核验，也可以继续向 AI 追问。",
    sampleBadge: "示例数据 · 截止 2026-08-02",
    sampleMode: "示例模式",
    reportPeriod: "过去 7 天",
    steps: ["洞察简报", "原始证据", "继续追问", "行动建议"],
    sideNav: ["报告概览", "消费者信号", "原始来源", "行动看板"],
    metrics: [
      ["74%", "正面讨论"],
      ["521", "相关内容"],
      ["1", "需要关注的风险"],
    ],
    insightHeading: "本周值得关注的 3 件事",
    insights: [
      {
        label: "增长信号",
        title: "“第一台 3D 打印机”已成为明确购买场景",
        body: "新手用户反复提到开箱即用、稳定打印与教程生态，入门套装有进一步放大的空间。",
        refs: ["Ref 03"],
      },
      {
        label: "风险提醒",
        title: "可靠性负面讨论在过去三天明显增加",
        body: "增长主要由两篇高互动内容带动，集中在打印失败和零件耐用性，并非整体口碑突然转差。",
        refs: ["Ref 08", "Ref 03"],
        risk: true,
      },
      {
        label: "竞品变化",
        title: "与 Prusa 的比较正转向开放性与长期成本",
        body: "Bambu Lab 在速度和易用性上领先，但开放生态、维修与长期持有成本成为新的比较重点。",
        refs: ["Ref 12"],
      },
    ] satisfies DemoInsight[],
    refHint: "点击任意 [Ref]，查看这条结论来自哪里。",
    evidenceTitle: "原始证据",
    evidenceBody: "每条来源都保留内容摘要、互动数据、主题和它与结论之间的关系。",
    questionsTitle: "基于这份报告继续追问",
    questionsBody: "右侧 AI 助手读取当前示例报告与来源，不需要复制报告或重新交代背景。",
    actionsTitle: "建议行动",
    actions: [
      ["P0", "核实可靠性问题影响范围", "负面讨论集中，互动增长较快"],
      ["P1", "更新产品 FAQ 与排障内容", "多条评论出现相同疑问"],
      ["P2", "持续观察 YouTube 扩散", "当前尚未形成跨平台传播"],
    ],
    aiTitle: "AI 助手",
    aiBadge: "基于当前报告",
    aiIntro: "你可以直接追问原因、影响范围和下一步行动。回答会继续引用原始来源。",
    presets: ["为什么这个问题突然增加？", "它是否可能继续扩散？", "和竞品相比，这个问题严重吗？"],
    placeholder: "继续追问这份报告…",
    ask: "发送",
    askError: "暂时无法连接实时问答。示例结论：当前增长由少数高互动内容带动，尚未形成跨平台扩散。[Ref 03] [Ref 08]",
    sourceTitle: "原始来源",
    why: "为什么支持这条结论？",
    openSource: "打开平台来源",
    askFromSource: "基于此来源继续追问",
    close: "关闭",
    demoNote: "示例报告 · AI 回答基于当前展示数据",
    ctaBody: "10 个海外公开平台的社媒、社区与评论——每条都能点回原帖。",
    finalTitle: "输入品牌名，免费看海外讨论。",
    finalCta: "生成品牌预览",
  },
  en: {
    heroTitle: "Enter a brand. See why customers buy—and why they do not.",
    heroBody:
      "DataScaler turns public posts, communities, and reviews into key changes, customer objections, and growth opportunities. Every finding links back to the source.",
    inputLabel: "Brand name or website",
    inputPlaceholder: "e.g. Anker, Roborock, Aiper",
    submit: "Preview my brand",
    scanning: "Identifying brand…",
    hint: "We’ll identify competitors and generate keywords automatically.",
    heroReport: "DataScaler report preview",
    topFinding: "What matters most this week",
    heroInsight: "Entry products remain well reviewed, but one reliability complaint is spreading.",
    previewTitle: (brand: string) => `${brand} identified`,
    previewBody: "Brand, website, and public conversation matched. Sign up to generate the full report; this context carries into the product.",
    previewMetrics: ["Keywords", "Competitors", "Sources"],
    unlock: "Confirm brand and generate full report",
    previewErrorTitle: "Not enough information yet",
    previewError: "Try another brand, or sign up to start a full collection.",
    sectionTitle: "See what’s happening with a brand—in one report",
    sectionBody: "Explore market shifts, competitive pressure, and customer conversations using Bambu Lab as an example. Every finding links back to the source, with AI ready for follow-up questions.",
    sampleBadge: "Sample data · Through Aug 2, 2026",
    sampleMode: "Sample mode",
    reportPeriod: "Last 7 days",
    steps: ["Insight brief", "Source evidence", "Ask follow-ups", "Action plan"],
    sideNav: ["Report overview", "Consumer signals", "Source evidence", "Action board"],
    metrics: [["74%", "Positive conversation"], ["521", "Relevant items"], ["1", "Risk to watch"]],
    insightHeading: "Three things that matter this week",
    insights: [
      { label: "Growth signal", title: "“My first 3D printer” is now a clear purchase occasion", body: "New users repeatedly mention easy setup, reliable prints, and tutorials, creating room for stronger starter bundles.", refs: ["Ref 03"] },
      { label: "Risk alert", title: "Reliability complaints rose over the past three days", body: "Two high-engagement posts are driving the increase around print failure and durability; overall sentiment has not suddenly collapsed.", refs: ["Ref 08", "Ref 03"], risk: true },
      { label: "Competitive shift", title: "Prusa comparisons are moving toward openness and ownership cost", body: "Bambu Lab leads on speed and ease, while openness, repairability, and long-term cost are becoming stronger comparison points.", refs: ["Ref 12"] },
    ] satisfies DemoInsight[],
    refHint: "Open any [Ref] to inspect where the finding came from.",
    evidenceTitle: "Source evidence",
    evidenceBody: "Every source retains its excerpt, engagement, topic, and relationship to the finding.",
    questionsTitle: "Ask follow-ups against this report",
    questionsBody: "The AI assistant reads the current sample report and sources, so you do not need to copy context into a new chat.",
    actionsTitle: "Recommended actions",
    actions: [["P0", "Verify the scope of the reliability issue", "Negative conversation is concentrated and engagement is growing"], ["P1", "Update product FAQ and troubleshooting content", "The same questions recur across comments"], ["P2", "Watch YouTube distribution", "The issue has not spread across platforms yet"]],
    aiTitle: "AI Assistant",
    aiBadge: "Uses this report",
    aiIntro: "Ask about causes, impact, and next steps. Answers continue to cite the original sources.",
    presets: ["Why did this issue increase?", "Is it likely to keep spreading?", "How serious is it versus competitors?"],
    placeholder: "Ask a follow-up about this report…",
    ask: "Send",
    askError: "Live Q&A is temporarily unavailable. Sample finding: a small number of high-engagement posts are driving the increase; cross-platform spread remains limited. [Ref 03] [Ref 08]",
    sourceTitle: "Original source",
    why: "Why does this support the finding?",
    openSource: "Open platform source",
    askFromSource: "Ask about this source",
    close: "Close",
    demoNote: "Sample report · AI answers use the data shown here",
    ctaBody: "Ten public platforms—every post links back to the source.",
    finalTitle: "Type any brand. See it free.",
    finalCta: "Preview my brand",
  },
} as const;

function previewMetrics(preview: PlaygroundPreview): string[] {
  const socialCount =
    preview.social.officialAccounts.length +
    preview.social.storefronts.length +
    preview.social.amazonProducts.length;
  const sourceCount =
    preview.brand.sources.length ||
    (preview.website.officialWebsite ? 1 : 0) + socialCount;
  return [
    String(preview.keywords.categoryKeywords.length),
    String(preview.competitors.length),
    String(sourceCount),
  ];
}

function fallbackAnswer(question: string, lang: SiteLang): string {
  const normalized = question.toLowerCase();
  const isIncrease = /increase|sudden|突然|增加|上升/.test(normalized);
  const isSpread = /spread|continue|扩散|继续/.test(normalized);
  const isCompetitor = /competitor|prusa|竞品|竞争/.test(normalized);
  const isAction = /recommend|action|建议|行动|ref 08/.test(normalized);

  if (lang === "zh") {
    if (isIncrease) {
      return "这次上升主要由两条高互动内容带动，而不是整体用户评价突然恶化。讨论集中在打印失败和零件耐用性，Reddit 与 YouTube 的互动明显高于其他来源。[Ref 03] [Ref 08]";
    }
    if (isSpread) {
      return "短期内仍有继续发酵的可能，但目前还没有形成明显的跨平台扩散。建议重点观察 YouTube 评论增速，以及相同问题是否开始出现在 Reddit 之外的平台。[Ref 08] [Ref 03]";
    }
    if (isCompetitor) {
      return "问题值得关注，但尚未动摇 Bambu Lab 在速度和易用性上的优势。与 Prusa 相比，风险更多集中在可靠性、可维修性和长期持有成本，而不是核心打印体验全面落后。[Ref 08] [Ref 12]";
    }
    if (isAction) {
      return "Ref 08 把“持续观察”提升为需要优先核实的问题：先确认故障是否集中在特定批次或使用场景，再补充 FAQ 与排障内容，同时观察 YouTube 是否继续扩散。[Ref 08] [Ref 03]";
    }
    return "当前最重要的判断是：正面口碑仍由易用性和稳定输出支撑，但少数高互动内容正在放大可靠性风险。建议先核实影响范围，再决定是否需要公开回应。[Ref 03] [Ref 08] [Ref 12]";
  }

  if (isIncrease) {
    return "Two high-engagement posts are driving the increase; this is not a broad collapse in customer sentiment. The conversation is concentrated around print failures and component durability, with stronger engagement on Reddit and YouTube than elsewhere. [Ref 03] [Ref 08]";
  }
  if (isSpread) {
    return "The issue may continue to build in the short term, but it has not yet become a clear cross-platform story. Watch comment velocity on YouTube and whether the same failure pattern appears outside Reddit. [Ref 08] [Ref 03]";
  }
  if (isCompetitor) {
    return "The issue is worth addressing, but it has not displaced Bambu Lab’s advantage in speed and ease of use. Versus Prusa, the risk is concentrated around reliability, repairability, and long-term ownership cost—not the whole printing experience. [Ref 08] [Ref 12]";
  }
  if (isAction) {
    return "Ref 08 raises this from a watch item to a verification priority. First confirm whether failures cluster by batch or use case, then update troubleshooting content and monitor further YouTube distribution. [Ref 08] [Ref 03]";
  }
  return "The clearest read is that ease of use and reliable output still support positive demand, while a small number of high-engagement posts are amplifying reliability risk. Verify the scope before deciding whether a public response is needed. [Ref 03] [Ref 08] [Ref 12]";
}

function SourceDialog({ source, lang, onClose, onAsk }: { source: DemoSource; lang: SiteLang; onClose: () => void; onAsk: () => void }) {
  const isEn = lang === "en";
  const [platform, setPlatform] = useState<"all" | SourcePost["platform"]>("all");
  const [sentiment, setSentiment] = useState<"all" | SourcePost["sentiment"]>("all");
  const [sort, setSort] = useState<"hot" | "collected" | "published">("collected");
  const keyword = source.ref === "Ref 08" ? "reliability" : source.ref === "Ref 12" ? "comparison" : "beginner friendly";
  const filteredPosts = SOURCE_POSTS.filter((post) => (platform === "all" || post.platform === platform) && (sentiment === "all" || post.sentiment === sentiment));
  const displayedPosts = sort === "published" ? [...filteredPosts].reverse() : filteredPosts;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/70 p-3 backdrop-blur-[1px] sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="source-title" className="flex h-[min(88vh,860px)] w-full max-w-[900px] flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600"><FileText className="h-4 w-4" /></span>
            <div className="min-w-0"><h2 id="source-title" className="truncate text-sm font-black text-slate-900">“{keyword}” {isEn ? "related posts" : "相关帖子"}</h2><p className="mt-0.5 text-[10px] text-slate-400">20 {isEn ? "posts" : "篇帖子"} · {source.topic}</p></div>
          </div>
          <button type="button" onClick={onClose} aria-label={isEn ? "Close" : "关闭"} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50"><X className="h-4 w-4" /></button>
        </header>

        <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50 px-4 py-2 text-[10px] font-semibold text-amber-700 sm:px-5"><CircleAlert className="h-3.5 w-3.5 shrink-0" />{isEn ? "The following posts were matched by semantic analysis. The excerpts preserve the original meaning." : "以下帖子通过语义分析匹配，内容节选保留原始表达。"}</div>

        <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px]">
            <div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-slate-400">{isEn ? "Platform" : "平台"}</span>{(["all", "YouTube", "Reddit", "X", "Instagram"] as const).map((item) => <button key={item} type="button" onClick={() => setPlatform(item)} className={`rounded px-2 py-1 font-bold ${platform === item ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}>{item === "all" ? (isEn ? "All" : "全部") : item}</button>)}</div>
            <div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-slate-400">{isEn ? "Sentiment" : "情感"}</span>{(["all", "positive", "neutral", "negative"] as const).map((item) => <button key={item} type="button" onClick={() => setSentiment(item)} className={`rounded px-2 py-1 font-bold ${sentiment === item ? "bg-slate-900 text-white" : item === "positive" ? "text-emerald-600" : item === "negative" ? "text-rose-500" : "text-slate-500"}`}>{item === "all" ? (isEn ? "All" : "全部") : item === "positive" ? (isEn ? "Positive" : "正面") : item === "negative" ? (isEn ? "Negative" : "负面") : (isEn ? "Neutral" : "中性")}</button>)}</div>
            <div className="ml-auto flex items-center gap-1.5"><span className="mr-1 text-slate-400">{isEn ? "Sort" : "排序"}</span>{(["hot", "collected", "published"] as const).map((item) => <button key={item} type="button" onClick={() => setSort(item)} className={`rounded px-2 py-1 font-bold ${sort === item ? "bg-slate-900 text-white" : "text-slate-500"}`}>{item === "hot" ? (isEn ? "Hot" : "热度") : item === "collected" ? (isEn ? "Collected" : "采集时间") : (isEn ? "Published" : "发布时间")}</button>)}</div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5"><div className="flex items-center gap-2 text-xs font-bold text-slate-700"><FileText className="h-3.5 w-3.5" />{isEn ? "Recent posts" : "最近帖子"}</div><span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] text-slate-500">{displayedPosts.length} / 20 {isEn ? "posts" : "篇帖子"}</span></div>
          <div className="divide-y divide-slate-100">{displayedPosts.map((post) => <article key={post.id} className="px-4 py-4 sm:px-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><span>{post.platform}</span><span className={`rounded px-1.5 py-0.5 ${post.sentiment === "positive" ? "bg-emerald-50 text-emerald-600" : post.sentiment === "negative" ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"}`}>{post.sentiment === "positive" ? (isEn ? "Positive" : "正面") : post.sentiment === "negative" ? (isEn ? "Negative" : "负面") : (isEn ? "Neutral" : "中性")}</span></div><span className="text-[9px] text-slate-400">{post.date}</span></div><p className="mt-2 text-[11px] leading-5 text-slate-700 sm:text-xs">{post.title}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-4 text-[9px] text-slate-400"><span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span><span className="inline-flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span><span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post.comments}</span></div><div className="flex items-center gap-3 text-[9px]"><button type="button" className="inline-flex items-center gap-1 text-slate-500"><Languages className="h-3 w-3" />{isEn ? "Translate" : "翻译"}</button><a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-blue-600">{isEn ? "View source" : "查看原文"}<ExternalLink className="h-3 w-3" /></a><button type="button" className="inline-flex items-center gap-1 text-slate-500">{isEn ? "Comments" : "评论"}<ChevronDown className="h-3 w-3" /></button></div></div></article>)}</div>
          {displayedPosts.length === 0 ? <div className="grid min-h-48 place-items-center text-xs text-slate-400">{isEn ? "No posts match this filter." : "当前筛选条件下暂无帖子。"}</div> : null}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-5"><p className="max-w-[560px] text-[10px] leading-5 text-slate-500">{source.relation}</p><button type="button" onClick={onAsk} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold text-slate-700"><MessageSquareText className="h-3.5 w-3.5" />{isEn ? "Ask about these posts" : "基于这些原帖追问"}</button></footer>
      </div>
    </div>
  );
}

export function ProductExperiencePage({ lang, sampleOnly = false }: { lang: SiteLang; sampleOnly?: boolean }) {
  const t = COPY[lang];
  const sources = SOURCES[lang];
  const [brand, setBrand] = useState("");
  const [previewBrand, setPreviewBrand] = useState<string | null>(null);
  const [preview, setPreview] = useState<PlaygroundPreview | null>(null);
  const [scanStatus, setScanStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [activeView, setActiveView] = useState<ReportView>("brief");
  const [selectedSource, setSelectedSource] = useState<DemoSource | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuestionCount, setAiQuestionCount] = useState(0);
  const scanBusyRef = useRef(false);
  const askBusyRef = useRef(false);
  const scanAbortRef = useRef<AbortController | null>(null);
  const askAbortRef = useRef<AbortController | null>(null);
  const brandInputTrackedRef = useRef(false);

  useEffect(() => {
    const brandFromUrl = new URLSearchParams(window.location.search).get("brand");
    if (brandFromUrl) {
      setBrand(brandFromUrl);
    }
    return () => {
      scanAbortRef.current?.abort();
      askAbortRef.current?.abort();
    };
  }, []);

  const unlockDestination =
    `/onboarding/brand?brand=${encodeURIComponent(previewBrand ?? "")}` +
    (preview?.cacheKey ? `&preview=${encodeURIComponent(preview.cacheKey)}` : "");
  const unlockUrl = `${dashboardOrigin()}/auth/sign-up?callbackUrl=${encodeURIComponent(unlockDestination)}`;
  const sampleUnlockDestination = "/onboarding/brand?brand=Bambu%20Lab&source=playground-ai";
  const sampleUnlockUrl = `${dashboardOrigin()}/auth/sign-up?callbackUrl=${encodeURIComponent(sampleUnlockDestination)}`;
  const values = preview ? previewMetrics(preview) : ["—", "—", "—"];
  const grounding =
    "You are the analyst for this interactive sample report. Treat every detail below as available source evidence, answer the user's question directly, and do not claim that the report lacks information. Bambu Lab sample report, Jul 27–Aug 2, 2026. Positive conversation 74%, 521 relevant items, one active reliability risk. Beginner-friendly setup, reliable output, and AMS multicolor drive positive demand. Ref 03 is a high-engagement Reddit discussion validating beginner friendliness and raising material-cost and maintenance questions. Ref 08 is a high-engagement YouTube discussion about repeated print failures and durability, driving a three-day increase in complaints; the issue has not spread equally across platforms. Ref 12 compares Bambu Lab with Prusa on openness, repairability, and long-term ownership cost. Give a concise analytical answer and cite Ref 03, Ref 08, or Ref 12 in every answer.";

  const runScan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanBrand = brand.trim();
    if (!cleanBrand || scanBusyRef.current) return;
    scanBusyRef.current = true;
    setPreviewBrand(cleanBrand);
    setPreview(null);
    setScanStatus("loading");
    track("brand_submitted", { locale: lang, brand_length: cleanBrand.length });
    scanAbortRef.current?.abort();
    const controller = new AbortController();
    scanAbortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15_000);
    const result = await fetchPlaygroundPreview(cleanBrand, lang, controller.signal);
    window.clearTimeout(timeout);
    if (scanAbortRef.current === controller) {
      setPreview(result);
      setScanStatus(result ? "ready" : "error");
      if (result) track("preview_generated", { locale: lang });
    }
    scanBusyRef.current = false;
    scanAbortRef.current = null;
  };

  const runAsk = async (raw: string, preset: boolean) => {
    const cleanQuestion = raw.trim();
    if (!cleanQuestion || askBusyRef.current) return;
    if (aiQuestionCount >= 2) {
      setAiOpen(true);
      return;
    }
    askBusyRef.current = true;
    setAiQuestionCount((count) => Math.min(count + 1, 2));
    setQuestion(cleanQuestion);
    setAnswer("");
    setAsking(true);
    setAiOpen(true);
    setActiveView("questions");
    track("demo_question_clicked", { locale: lang, preset });
    askAbortRef.current?.abort();
    const controller = new AbortController();
    askAbortRef.current = controller;
    const answered = await askPlaygroundStream(
      { question: cleanQuestion, brand: "Bambu Lab", context: grounding, lang },
      (chunk) => setAnswer((current) => (current ?? "") + chunk),
      controller.signal,
    );
    if (!controller.signal.aborted) {
      setAnswer((current) =>
        answered && current && current.length > 0
          ? current
          : fallbackAnswer(cleanQuestion, lang),
      );
    }
    setAsking(false);
    askBusyRef.current = false;
    askAbortRef.current = null;
  };

  const openRef = (ref: string) => {
    const source = sources.find((item) => item.ref === ref);
    if (!source) return;
    setSelectedSource(source);
    track("demo_ref_opened", { locale: lang, ref });
  };

  const reportViews: ReportView[] = ["brief", "evidence", "questions", "actions"];
  const sideIcons = [LayoutDashboard, BarChart3, FileSearch, ListChecks];

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#171719]">
      <CleanSiteHeader lang={lang} />
      <main className="flex flex-col">
        {!sampleOnly ? (
          <section
            id="scan-brand"
            className="relative isolate order-2 scroll-mt-20 overflow-hidden border-y border-[#ddd5f0] bg-[radial-gradient(circle_at_50%_26%,#ded2ff_0%,#eee8ff_48%,#f7f7f8_88%)] px-5 py-10 sm:py-12 lg:px-8 lg:py-14"
          >
            <span aria-hidden="true" className="absolute left-[6%] top-12 h-16 w-16 rounded-full bg-[#f1ff4f] sm:h-20 sm:w-20" />
            <div className="relative mx-auto max-w-[960px]">
              <div className="mx-auto max-w-[900px] text-center">
                <h2 className="whitespace-pre-line text-balance text-[clamp(34px,4.2vw,52px)] font-black leading-[1.02] tracking-[-0.055em] text-[#111114]">
                  {t.finalTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-[780px] text-sm font-semibold leading-6 text-[#514765]/60">
                  {t.ctaBody}
                </p>
              </div>

              <div id="brand-scan-form" className="mx-auto mt-7 max-w-[900px] border border-[#38205f] bg-white p-5 shadow-[9px_9px_0_#211238] sm:p-6">
                <form onSubmit={runScan}>
                  <label htmlFor="playground-brand-input" className="text-sm font-black text-[#4a405f]/65">{t.inputLabel}</label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                    <label htmlFor="playground-brand-input" className="flex h-14 min-w-0 flex-1 items-center gap-3 border border-[#4d2b85] px-5 focus-within:ring-2 focus-within:ring-[#7047eb]/25">
                      <Search className="h-5 w-5 shrink-0 text-[#6d6380]/65" />
                      <input
                        id="playground-brand-input"
                        name="brand"
                        value={brand}
                        onFocus={() => {
                          if (!brandInputTrackedRef.current) {
                            brandInputTrackedRef.current = true;
                            track("brand_input_started", { locale: lang });
                          }
                        }}
                        onChange={(event) => setBrand(event.target.value)}
                        placeholder={t.inputPlaceholder}
                        className="h-full min-w-0 flex-1 bg-transparent text-base font-semibold text-[#171719] outline-none placeholder:text-[#6d6380]/35"
                      />
                    </label>
                    <button type="submit" disabled={!brand.trim() || scanStatus === "loading"} className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#7047eb] px-8 text-sm font-black text-white shadow-[0_10px_28px_rgba(112,71,235,0.2)] transition hover:-translate-y-0.5 hover:bg-[#633adf] disabled:translate-y-0 disabled:bg-[#cdbdf6] sm:min-w-48">
                      {scanStatus === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" />{t.scanning}</> : <>{t.submit}<ArrowRight className="h-4 w-4" /></>}
                    </button>
                  </div>
                  <div className="mt-5 text-xs font-semibold text-[#514765]/50">
                    <span>{t.hint}</span>
                  </div>
                </form>

                {previewBrand ? (
                  <div className="mt-7 border-t border-[#e2dcec] bg-[#f8f6fc] p-5" aria-live="polite">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"><div><div className="text-xs font-black uppercase tracking-[0.12em] text-[#7047eb]">{scanStatus === "error" ? t.previewErrorTitle : t.previewTitle(previewBrand)}</div><p className="mt-2 max-w-[620px] text-sm leading-6 text-[#202124]/55">{scanStatus === "error" ? t.previewError : t.previewBody}</p></div>{scanStatus === "ready" ? <Check className="h-7 w-7 text-[#3f8b5f]" /> : null}</div>
                    {scanStatus !== "error" ? <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">{t.previewMetrics.map((label, index) => <div key={label} className="border border-[#ebe5f3] bg-white p-4"><div className="text-2xl font-black">{scanStatus === "loading" ? "…" : values[index]}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#202124]/40">{label}</div></div>)}</div> : null}
                    {scanStatus === "ready" ? <a href={unlockUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#171719] px-5 py-3.5 text-sm font-black text-white">{t.unlock}<ArrowRight className="h-4 w-4" /></a> : null}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        <section id="experience" className="order-1 scroll-mt-20 bg-[#f7f7f8] px-4 py-10 lg:px-6 lg:py-14">
          <div className="mx-auto max-w-[1420px]">
            <div className="mx-auto max-w-[900px] text-center"><h1 className="text-balance text-[clamp(32px,4vw,46px)] font-black leading-[1.04] tracking-[-0.045em] text-[#171719]">{t.sectionTitle}</h1><p className="mx-auto mt-4 max-w-[720px] text-sm leading-6 text-[#202124]/55">{t.sectionBody}</p></div>
            <div className="hidden">{t.steps.map((label, index) => { const view = reportViews[index]; return <button key={label} type="button" onClick={() => setActiveView(view)}>{label}</button>; })}</div>

            <div className="mt-8 overflow-hidden rounded-[22px] border border-[#d3d3d9] bg-white shadow-[0_26px_80px_rgba(22,22,25,0.12)]">
              <div className="flex min-h-14 items-center border-b border-[#e5e5e9] bg-white px-4 py-3 sm:px-6"><div className="flex min-w-0 items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171719] text-white"><BarChart3 className="h-4 w-4" /></span><div className="min-w-0"><div className="truncate text-sm font-black">Bambu Lab</div><div className="truncate text-[10px] font-semibold text-[#202124]/40">{t.sampleBadge}</div></div></div></div>
              <div className="hidden min-h-[720px] lg:grid-cols-[170px_minmax(0,1fr)_360px]">
                <aside className="hidden border-r border-[#e5e5e9] bg-[#f7f7f8] p-3 lg:block"><div className="space-y-1">{t.sideNav.map((label, index) => { const Icon = sideIcons[index]; const view = reportViews[index]; return <button key={label} type="button" onClick={() => setActiveView(view)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-xs font-bold ${activeView === view ? "bg-white text-[#171719] shadow-sm" : "text-[#202124]/45"}`}><Icon className="h-4 w-4" />{label}</button>; })}</div><div className="mt-8 rounded-xl border border-[#e0e0e5] bg-white p-3"><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#202124]/35"><LockKeyhole className="h-3.5 w-3.5" />{t.sampleMode}</div><p className="mt-2 text-[11px] leading-5 text-[#202124]/45">{t.demoNote}</p></div></aside>

                <div className="min-w-0 bg-white p-5 sm:p-7 lg:p-8">
                  {activeView === "brief" ? <><div className="grid grid-cols-3 gap-2 sm:gap-3">{t.metrics.map(([value, label], index) => <div key={label} className={`rounded-xl border border-[#e5e5e9] p-4 ${index === 2 ? "bg-[#fff8e8]" : "bg-[#fafafa]"}`}><div className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">{value}</div><div className="mt-2 text-[10px] font-bold leading-4 text-[#202124]/40 sm:text-xs">{label}</div></div>)}</div><div className="mt-8 flex items-end justify-between gap-4"><div><h3 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">{t.insightHeading}</h3><p className="mt-2 text-xs text-[#202124]/40">{t.refHint}</p></div><Sparkles className="h-5 w-5 text-[#7047eb]" /></div><div className="mt-5 space-y-3">{t.insights.map((insight, index) => <article key={insight.title} className={`rounded-xl border p-5 ${insight.risk ? "border-[#f0c86c] bg-[#fffaf0]" : "border-[#e4e4e8] bg-white"}`}><div className="flex items-center justify-between gap-3"><span className={`text-[10px] font-black uppercase tracking-[0.11em] ${insight.risk ? "text-[#a26800]" : "text-[#7047eb]"}`}>{insight.label}</span><span className="text-[10px] font-bold text-[#202124]/30">0{index + 1}</span></div><h4 className="mt-3 text-base font-black leading-6">{insight.title}</h4><p className="mt-2 text-sm leading-6 text-[#202124]/55">{insight.body}</p><div className="mt-4 flex flex-wrap gap-2">{insight.refs.map((ref) => <button key={ref} type="button" onClick={() => openRef(ref)} className="rounded-md bg-[#f1edff] px-2.5 py-1.5 text-[11px] font-black text-[#7047eb]">[{ref}]</button>)}</div></article>)}</div></> : null}
                  {activeView === "evidence" ? <><h3 className="text-2xl font-black">{t.evidenceTitle}</h3><p className="mt-3 text-sm leading-6 text-[#202124]/55">{t.evidenceBody}</p><div className="mt-6 space-y-3">{sources.map((source) => <button key={source.id} type="button" onClick={() => openRef(source.ref)} className="w-full rounded-xl border border-[#e4e4e8] p-5 text-left transition-colors hover:border-[#7047eb]/45 hover:bg-[#faf8ff]"><div className="flex items-center justify-between gap-3"><span className="text-xs font-black text-[#7047eb]">[{source.ref}] · {source.platform}</span><span className="text-[10px] font-semibold text-[#202124]/35">{source.age}</span></div><h4 className="mt-3 text-sm font-black leading-6">{source.title}</h4><p className="mt-2 line-clamp-2 text-xs leading-5 text-[#202124]/50">{source.excerpt}</p><div className="mt-3 text-[10px] font-bold text-[#202124]/35">{source.engagement}</div></button>)}</div></> : null}
                  {activeView === "questions" ? <div className="flex min-h-[560px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8d8de] bg-[#fafafa] p-8 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f1edff] text-[#7047eb]"><Bot className="h-6 w-6" /></span><h3 className="mt-5 text-2xl font-black">{t.questionsTitle}</h3><p className="mt-3 max-w-[520px] text-sm leading-6 text-[#202124]/55">{t.questionsBody}</p><div className="mt-6 flex flex-wrap justify-center gap-2">{t.presets.map((preset) => <button key={preset} type="button" onClick={() => void runAsk(preset, true)} className="rounded-lg border border-[#dedee3] bg-white px-3 py-2 text-xs font-bold hover:border-[#7047eb]">{preset}</button>)}</div></div> : null}
                  {activeView === "actions" ? <><h3 className="text-2xl font-black">{t.actionsTitle}</h3><div className="mt-6 overflow-hidden rounded-xl border border-[#e3e3e7]">{t.actions.map(([priority, action, reason]) => <div key={priority} className="grid gap-3 border-b border-[#e7e7ea] p-5 last:border-0 sm:grid-cols-[54px_1fr_1fr]"><span className={`inline-flex h-7 w-10 items-center justify-center rounded-md text-xs font-black ${priority === "P0" ? "bg-[#fff0e6] text-[#b34c00]" : priority === "P1" ? "bg-[#fff8d8] text-[#846600]" : "bg-[#f1edff] text-[#7047eb]"}`}>{priority}</span><span className="text-sm font-black leading-6">{action}</span><span className="text-xs leading-5 text-[#202124]/50">{reason}</span></div>)}</div></> : null}
                </div>

                <aside className="flex min-h-[640px] flex-col border-t border-[#e5e5e9] bg-[#fafafa] lg:border-l lg:border-t-0"><div className="border-b border-[#e5e5e9] bg-white p-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#171719] text-white"><Bot className="h-4 w-4" /></span><div><div className="text-sm font-black">{t.aiTitle}</div><div className="text-[10px] font-semibold text-[#202124]/35">Bambu Lab · {t.reportPeriod}</div></div></div><span className="rounded-full bg-[#e8f7ee] px-2.5 py-1 text-[10px] font-black text-[#357151]">{t.aiBadge}</span></div></div><div className="flex-1 space-y-4 overflow-y-auto p-5"><div className="max-w-[92%] rounded-2xl rounded-tl-md bg-white p-4 text-sm leading-6 text-[#202124]/65 shadow-sm">{t.aiIntro}<div className="mt-3 flex gap-2 text-[10px] font-black text-[#7047eb]"><span>[Ref 03]</span><span>[Ref 08]</span><span>[Ref 12]</span></div></div>{question && answer !== null ? <><div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[#171719] p-4 text-sm leading-6 text-white">{question}</div><div className="max-w-[95%] rounded-2xl rounded-tl-md bg-white p-4 text-sm font-medium leading-6 text-[#202124] shadow-sm" aria-live="polite">{answer}{asking ? <span className="ml-1 inline-block animate-pulse text-[#7047eb]">▍</span> : null}</div></> : null}<div className="space-y-2 pt-2">{t.presets.map((preset) => <button key={preset} type="button" disabled={asking} onClick={() => void runAsk(preset, true)} className="w-full rounded-xl border border-[#dedee3] bg-white p-3 text-left text-xs font-bold leading-5 text-[#202124]/65 hover:border-[#7047eb]/50 disabled:opacity-40">{preset}</button>)}</div></div><form onSubmit={(event) => { event.preventDefault(); void runAsk(question, false); }} className="border-t border-[#e5e5e9] bg-white p-4"><label className="flex items-end gap-2 rounded-xl border border-[#d8d8de] bg-white p-2 pl-3 focus-within:border-[#7047eb]"><MessageSquareText className="mb-2 h-4 w-4 shrink-0 text-[#202124]/35" /><textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.placeholder} rows={2} className="min-h-10 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-[#202124]/30" /><button type="submit" disabled={!question.trim() || asking} aria-label={t.ask} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#7047eb] text-white disabled:opacity-35"><Send className="h-4 w-4" /></button></label><div className="mt-2 text-center text-[10px] font-semibold text-[#202124]/30">{t.demoNote}</div></form></aside>
              </div>
              <FullProductDashboard
                lang={lang}
                sources={sources}
                question={question}
                answer={answer}
                asking={asking}
                aiOpen={aiOpen}
                aiQuestionCount={aiQuestionCount}
                aiQuestionLimit={2}
                registrationUrl={sampleUnlockUrl}
                onAiOpenChange={setAiOpen}
                onQuestionChange={setQuestion}
                onAsk={(nextQuestion, preset) => void runAsk(nextQuestion, preset)}
                onOpenRef={openRef}
              />
            </div>
          </div>
        </section>

        <section className={`${sampleOnly ? "order-2" : "hidden"} border-y border-[#dedee3] bg-white px-5 py-16`}><div className="mx-auto flex max-w-[1180px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-xs font-black uppercase tracking-[0.12em] text-[#7047eb]">DataScaler</div><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#171719]">{t.finalTitle}</h2></div><a href={lang === "en" ? "/en/playground#scan-brand" : "/playground#scan-brand"} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#171719] px-6 py-4 text-sm font-black text-white">{t.finalCta}<ArrowRight className="h-4 w-4" /></a></div></section>
      </main>
      <CleanSiteFooter lang={lang} />
      {selectedSource ? <SourceDialog source={selectedSource} lang={lang} onClose={() => setSelectedSource(null)} onAsk={() => { const prompt = lang === "en" ? `What does ${selectedSource.ref} change about the recommendation?` : `${selectedSource.ref} 对建议有什么影响？`; setSelectedSource(null); void runAsk(prompt, true); }} /> : null}
    </div>
  );
}
