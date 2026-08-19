"use client";

import {
  ChevronDown,
  ChevronLeft,
  Clock3,
  Database,
  Download,
  Eye,
  ExternalLink,
  Globe2,
  LayoutDashboard,
  Languages,
  LockKeyhole,
  MessageCircle,
  MessageSquareText,
  RefreshCw,
  Search,
  Send,
  Share2,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  X,
} from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";

import type { SiteLang } from "@/components/CleanSiteChrome";

export interface ProductDemoSource {
  id: string;
  ref: string;
  platform: string;
  age: string;
  title: string;
  excerpt: string;
  engagement: string;
  sentiment: string;
  topic: string;
  relation: string;
  url: string;
}

type ModuleId = "overview" | "metrics" | "competitors" | "voice" | "platforms" | "data";

interface FullProductDashboardProps {
  lang: SiteLang;
  sources: ProductDemoSource[];
  question: string;
  answer: string | null;
  asking: boolean;
  aiOpen: boolean;
  aiQuestionCount: number;
  aiQuestionLimit: number;
  registrationUrl: string;
  onAiOpenChange: (open: boolean) => void;
  onQuestionChange: (question: string) => void;
  onAsk: (question: string, preset: boolean) => void;
  onOpenRef: (ref: string) => void;
}

const COPY = {
  zh: {
    modules: [
      ["overview", "市场洞察概览"],
      ["metrics", "关键指标"],
      ["competitors", "竞品对比"],
      ["voice", "用户声音"],
      ["platforms", "平台对比"],
      ["data", "数据中心"],
    ] as Array<[ModuleId, string]>,
    brandDescription:
      "Bambu Lab 是面向消费者与创客的桌面级 3D 打印品牌，核心讨论集中在易用性、多色打印、可靠性与长期维护成本。",
    lastUpdated: "最近更新：2026-08-02 18:30",
    keywords: "监测关键词",
    competitors: "竞品",
    sources: "数据来源",
    aiSummary: "AI 洞察摘要",
    aiSummaryHint: "基于过去 7 天的 521 条公开内容",
    summaryItems: [
      "入门产品的易用性仍是最稳定的购买驱动，新手用户反复提到开箱即用和教程生态。",
      "可靠性负面讨论连续三天上升，但主要由两条高互动内容推动，尚未形成全平台扩散。",
      "与 Prusa 的比较正在从打印速度转向开放性、可维修性与长期持有成本。",
    ],
    metrics: [
      ["521", "相关帖子", "+18.4%"],
      ["1,842", "品牌提及", "+12.7%"],
      ["2.86M", "预估触达", "+24.1%"],
      ["86.4K", "互动量", "+9.6%"],
      ["42.6%", "竞争声量占比", "+3.2pp"],
    ],
    trendTitle: "帖子与提及趋势",
    trendHint: "按采集时间 · 过去 7 天",
    sentimentTitle: "情感分布",
    sentimentLabels: ["正面 74%", "中性 17%", "负面 9%"],
    signalsTitle: "消费者信号",
    positive: "增长关键词",
    negative: "风险关键词",
    platformTitle: "平台表现",
    platformHint: "帖子 · 触达 · 互动 · 情感",
    platformColumns: ["平台", "帖子", "触达", "互动", "情感分布"],
    dataTitle: "原始帖子与评论",
    dataHint: "每条数据保留平台、发布时间、互动和原帖链接。",
    viewSource: "查看来源",
    aiTitle: "AI 助手",
    aiSubtitle: "基于当前报告实时回答",
    aiIntro:
      "我已读取 Bambu Lab 的完整示例报告。你可以询问变化原因、影响范围、竞品差异或下一步行动。",
    presets: ["为什么可靠性讨论突然增加？", "这个问题会继续扩散吗？", "和 Prusa 相比严重吗？"],
    placeholder: "追问当前报告…",
    send: "发送",
    openAi: "打开 AI 助手",
  },
  en: {
    modules: [
      ["overview", "Market insights"],
      ["metrics", "Key metrics"],
      ["competitors", "Competitor comparison"],
      ["voice", "Voice of users"],
      ["platforms", "Platform analysis"],
      ["data", "Data center"],
    ] as Array<[ModuleId, string]>,
    brandDescription:
      "Bambu Lab is a desktop 3D printing brand for consumers and makers. Conversation centers on ease of use, multicolor printing, reliability, and long-term ownership cost.",
    lastUpdated: "Last updated: Aug 2, 2026 · 18:30",
    keywords: "Tracked keywords",
    competitors: "Competitors",
    sources: "Sources",
    aiSummary: "AI-powered summary",
    aiSummaryHint: "Based on 521 public posts and comments from the last 7 days",
    summaryItems: [
      "Easy setup remains the clearest purchase driver, especially for first-time buyers who rely on tutorials.",
      "Reliability complaints rose for three days, but two high-engagement posts—not a broad drop in sentiment—are driving the change.",
      "Customers are comparing Bambu Lab with Prusa less on print speed and more on openness, repairability, and total ownership cost.",
    ],
    metrics: [
      ["521", "Relevant posts", "+18.4%"],
      ["1,842", "Brand mentions", "+12.7%"],
      ["2.86M", "Estimated reach", "+24.1%"],
      ["86.4K", "Engagements", "+9.6%"],
      ["42.6%", "Voice share (SOV)", "+3.2pp"],
    ],
    trendTitle: "Post and mention trends",
    trendHint: "Collected time · Last 7 days",
    sentimentTitle: "Sentiment distribution",
    sentimentLabels: ["Positive 74%", "Neutral 17%", "Negative 9%"],
    signalsTitle: "Consumer signals",
    positive: "Growth keywords",
    negative: "Risk keywords",
    platformTitle: "Platform analysis",
    platformHint: "Posts · reach · engagement · sentiment",
    platformColumns: ["Platform", "Posts", "Reach", "Engagement", "Sentiment"],
    dataTitle: "Posts and comments",
    dataHint: "Every item retains its platform, publish time, engagement, and source link.",
    viewSource: "View source",
    aiTitle: "AI Assistant",
    aiSubtitle: "Live answers grounded in this report",
    aiIntro:
      "I’ve reviewed the full Bambu Lab sample report. Ask what changed, why it matters, how competitors compare, or what to do next.",
    presets: ["Why did reliability concerns increase?", "Is this likely to spread?", "How does this compare with Prusa?"],
    placeholder: "Ask about this report…",
    send: "Send",
    openAi: "Open AI Assistant",
  },
} as const;

const MODULE_ICONS = {
  overview: Sparkles,
  metrics: LayoutDashboard,
  competitors: TrendingUp,
  voice: MessageSquareText,
  platforms: Globe2,
  data: Database,
} as const;

function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
        {hint ? <p className="mt-1 text-[11px] text-slate-400">{hint}</p> : null}
      </div>
      <span className="h-px flex-1 bg-slate-100" />
    </div>
  );
}

const BRAND_METRICS = [
  ["21.7K", "品牌提及数", "Brand mentions"],
  ["147.8M", "总触达量", "Total reach"],
  ["72.7K", "总评论量", "Total comments"],
  ["521", "总分享量", "Total shares"],
  ["21%", "声量份额 (SOV)", "Voice share (SOV)"],
  ["1.4%", "互动率", "Engagement rate"],
] as const;

const COMPETITOR_METRICS = [
  { name: "Prusa Research", color: "bg-amber-400", values: ["31.9K", "200.8M", "136.4K", "201.6K", "61%"] },
  { name: "Creality", color: "bg-violet-500", values: ["15.6K", "97.1M", "50.9K", "2.6K", "19%"] },
] as const;

const POSITIVE_KEYWORDS = [["excitement", 120], ["reliability", 103], ["p1s", 89], ["upgrade", 86], ["print quality", 77], ["appreciation", 76], ["a1 mini", 69], ["ams", 64], ["value", 62], ["great video", 62]] as const;
const NEGATIVE_KEYWORDS = [["reliability", 52], ["frustration", 51], ["disappointment", 50], ["comparison", 47], ["price", 44], ["print quality", 41], ["cost", 39], ["p1s", 39], ["print failure", 39], ["waste", 38]] as const;

const VOICE_WORDS = [
  ["beginner friendly", "text-lg font-bold text-emerald-600"], ["appreciation", "text-xl font-bold text-emerald-600"], ["video", "text-base font-bold text-emerald-500"], ["video quality", "text-base font-bold text-emerald-500"], ["reliable", "text-lg font-bold text-emerald-600"], ["quality", "text-xl font-bold text-slate-500"], ["price", "text-3xl font-black text-slate-400"], ["reliability", "text-3xl font-black text-slate-600"], ["print quality", "text-2xl font-black text-slate-300"], ["excitement", "text-3xl font-black text-emerald-500"], ["comparison", "text-2xl font-black text-slate-600"], ["p1s", "text-3xl font-black text-slate-500"], ["upgrade", "text-xl font-bold text-emerald-500"], ["a1 mini", "text-lg font-bold text-emerald-500"], ["ams", "text-lg font-bold text-emerald-500"], ["helpful", "text-lg font-bold text-emerald-500"], ["first printer", "text-base font-bold text-emerald-500"], ["print failure", "text-sm font-bold text-rose-500"], ["expensive", "text-sm font-bold text-rose-500"], ["waste", "text-xs font-bold text-rose-500"], ["cost", "text-sm font-bold text-rose-500"], ["frustration", "text-base font-bold text-rose-500"], ["criticism", "text-sm font-bold text-rose-500"], ["disappointment", "text-lg font-bold text-rose-500"],
] as const;

function InlineMetric({ children }: { children: ReactNode }) {
  return <span className="mx-0.5 inline-flex rounded bg-sky-50 px-1.5 py-0.5 font-bold text-sky-600 ring-1 ring-sky-200">{children}</span>;
}

function RefButton({ refId, onOpenRef }: { refId: string; onOpenRef: (ref: string) => void }) {
  return <button type="button" onClick={() => onOpenRef(refId)} className="font-bold text-blue-600 hover:underline">[{refId}]</button>;
}

function PromptCard({ title, badge, tone = "blue", onClick }: { title: string; badge: string; tone?: "blue" | "rose" | "violet"; onClick: () => void }) {
  const toneClass = tone === "rose" ? "text-rose-600 bg-rose-50" : tone === "violet" ? "text-violet-600 bg-violet-50" : "text-blue-600 bg-blue-50";
  return <button type="button" onClick={onClick} className="rounded-xl border border-blue-200 bg-white p-4 text-left shadow-sm transition-transform hover:-translate-y-0.5"><div className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${toneClass}`}>{badge}</div><div className="mt-3 text-xs font-bold leading-5 text-slate-800">{title}</div><div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400"><Clock3 className="h-3 w-3" />4–6 min</div></button>;
}

function MetricCard({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return <div className={`flex min-h-[104px] min-w-0 flex-col justify-between rounded-xl border p-3 sm:p-4 ${highlight ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}><div className="min-h-8 text-[9px] leading-4 text-slate-400 sm:text-[10px]">{label}</div><div className="mt-2 flex flex-wrap items-end justify-between gap-2"><div className="text-[clamp(20px,2.1vw,28px)] font-black leading-none tracking-tight text-slate-900">{value}</div>{highlight ? <div className="rounded-full bg-emerald-100 px-2 py-1 text-[8px] font-bold text-emerald-700">SOV Top 3</div> : null}</div></div>;
}

function OverviewModule({ lang, onOpenRef, onAsk }: { lang: SiteLang; onOpenRef: (ref: string) => void; onAsk: (question: string, preset: boolean) => void }) {
  const isEn = lang === "en";
  const reportSections = isEn ? [
    ["Executive summary", <>Over the last 365 days, Bambu Lab generated <InlineMetric>506 posts</InlineMetric>, <InlineMetric>21,720 mentions</InlineMetric>, and <InlineMetric>147,765,716 impressions</InlineMetric>, with a <InlineMetric>1.4% engagement rate</InlineMetric>. Sentiment was 40% positive, 49% neutral, and 10% negative.</>],
    ["Growth engine", <>YouTube drove the strongest lift with <InlineMetric>328 posts</InlineMetric> and <InlineMetric>21,542 mentions</InlineMetric>. “excitement,” “reliability,” “p1s,” and “upgrade” were the leading growth terms.</>],
    ["Risk watch", <>The highest-risk terms were “reliability,” “frustration,” “disappointment,” and “comparison.” Negative samples cluster around repeated print failures and durability concerns.</>],
    ["Competitive pressure", <>Competitor coverage is incomplete for some periods. Finish collecting competitor data before deciding who is gaining or losing share.</>],
    ["This week’s action", <>Reuse the YouTube formats driving “excitement” and “upgrade,” then publish a reliability FAQ backed by source-level monitoring.</>],
  ] : [
    ["全局摘要", <>近 365 天，Bambu Lab 共获得 <InlineMetric>506 篇帖子</InlineMetric>、<InlineMetric>21,720 次提及</InlineMetric>、<InlineMetric>147,765,716 次触达</InlineMetric>，互动率 <InlineMetric>1.4%</InlineMetric>；情感分布为正面 40%、中立 49%、负面 10%。</>],
    ["增长引擎", <>YouTube 是主要增长来源，共 <InlineMetric>328 篇帖子</InlineMetric>、<InlineMetric>21,542 次提及</InlineMetric>、<InlineMetric>145,843,490 次触达</InlineMetric>；“excitement”“reliability”“p1s”“upgrade”是主要增长关键词。</>],
    ["风险预警", <>高风险词集中在“reliability”“frustration”“disappointment”“comparison”；负面样本主要围绕重复打印失败与耐用性问题。</>],
    ["竞争压力", <>当前部分周期的竞品统计仍不完整。完成竞品采集后，再判断品牌领先、落后或份额拐点。</>],
    ["本周行动", <>复用 YouTube 中“excitement”“upgrade”的正面内容结构，并针对可靠性问题准备 FAQ 与来源级监测。</>],
  ];
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <SectionTitle title={isEn ? "Market insight overview" : "市场洞察概览"} hint={isEn ? "Global snapshot, core trends, and recommended actions · Last 365 days" : "全局表现、核心趋势与精炼建议 · 近 365 天"} />
        <div className="mt-5 divide-y divide-slate-100 text-[12px] leading-6 text-slate-600">{reportSections.map(([title, content], index) => <div key={title as string} className="py-4 first:pt-0"><div className={`mb-2 text-[11px] font-bold ${index === 2 ? "text-rose-600" : "text-blue-600"}`}>{title}</div><div>{content} <RefButton refId={index === 1 ? "Ref 03" : index === 2 ? "Ref 08" : "Ref 12"} onOpenRef={onOpenRef} /></div></div>)}</div>
      </section>

      <section className="grid gap-3 md:grid-cols-3"><PromptCard title={isEn ? "How should we talk about mixed reliability signals?" : "“可靠性”正反双重信号下，如何优化内容策略？"} badge={isEn ? "INSIGHT" : "综合分析"} onClick={() => onAsk(isEn ? "How should we talk about mixed reliability signals?" : "“可靠性”正反双重信号下，如何优化内容策略？", true)} /><PromptCard title={isEn ? "Which high-performing YouTube formats can we reuse?" : "YouTube 上高触达正面帖并存，如何提取可复制模式？"} badge={isEn ? "ANOMALY" : "异常分析"} tone="rose" onClick={() => onAsk(isEn ? "Which high-performing YouTube formats can we reuse?" : "YouTube 上高触达正面帖并存，如何提取可复制模式？", true)} /><PromptCard title={isEn ? "How can “excitement” and “P1S” become repeatable content themes?" : "如何围绕“excitement”和“p1s”制作可复用内容？"} badge={isEn ? "INSIGHT" : "综合分析"} onClick={() => onAsk(isEn ? "How can “excitement” and “P1S” become repeatable content themes?" : "如何围绕“excitement”和“p1s”制作可复用内容？", true)} /></section>
    </div>
  );
}

function MetricsModule({ lang }: { lang: SiteLang }) {
  const isEn = lang === "en";
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <SectionTitle title={isEn ? "Key metrics" : "关键指标"} hint={isEn ? "Core brand performance · Last 365 days" : "品牌核心表现 · 近 365 天"} />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">{BRAND_METRICS.map(([value, zh, en], index) => <MetricCard key={zh} value={value} label={isEn ? en : zh} highlight={index === 4} />)}</div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700"><span>{isEn ? "Volume mix" : "声量构成"}</span><span className="text-[10px] font-normal text-slate-400">506 {isEn ? "posts" : "篇帖子"}</span></div>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-slate-100"><span className="bg-emerald-500" style={{ width: "40%" }} /><span className="bg-slate-400" style={{ width: "49%" }} /><span className="bg-rose-500" style={{ width: "11%" }} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-emerald-50 p-2.5 sm:p-3"><div className="text-lg font-black text-emerald-700">40%</div><div className="text-[9px] text-emerald-600">{isEn ? "Positive" : "正面"}</div></div><div className="rounded-lg bg-slate-100 p-2.5 sm:p-3"><div className="text-lg font-black text-slate-700">49%</div><div className="text-[9px] text-slate-500">{isEn ? "Neutral" : "中性"}</div></div><div className="rounded-lg bg-rose-50 p-2.5 sm:p-3"><div className="text-lg font-black text-rose-700">10%</div><div className="text-[9px] text-rose-600">{isEn ? "Negative" : "负面"}</div></div></div>
          </div>
          <div className="min-w-0 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700"><span>{isEn ? "Platform contribution" : "渠道贡献"}</span><span className="text-[10px] font-normal text-slate-400">21,720 {isEn ? "mentions" : "次提及"}</span></div>
            <div className="mt-5 space-y-4">{[["YouTube", "21,542", 99], ["X", "176", 14], ["Instagram", "2", 3]].map(([name, value, width]) => <div key={name as string} className="grid grid-cols-[72px_minmax(0,1fr)_52px] items-center gap-3 text-[10px]"><span className="font-semibold text-slate-600">{name}</span><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${width}%` }} /></div><span className="text-right tabular-nums text-slate-400">{value}</span></div>)}</div>
            <div className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-[10px] leading-5 text-slate-500">{isEn ? "YouTube accounts for nearly all tracked conversation in this period." : "本周期讨论高度集中在 YouTube，跨平台扩散仍有限。"}</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="text-xs font-bold text-blue-700">{isEn ? "Metric interpretation" : "指标解读"}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-600">{isEn ? "Reach is growing, but engagement remains concentrated in a small number of high-performing posts. Track both total reach and the breadth of source distribution." : "触达持续增长，但互动仍集中在少数高表现帖子。判断趋势时，需要同时观察总触达和来源分布广度。"}</p></div><div className="flex shrink-0 gap-2"><span className="rounded-lg bg-white px-3 py-2 text-center"><strong className="block text-sm text-slate-900">328</strong><small className="text-[8px] text-slate-400">YouTube {isEn ? "posts" : "帖子"}</small></span><span className="rounded-lg bg-white px-3 py-2 text-center"><strong className="block text-sm text-slate-900">2</strong><small className="text-[8px] text-slate-400">{isEn ? "risk posts" : "风险帖子"}</small></span></div></div>
      </section>
    </div>
  );
}

function BarCompareCard({ title, values }: { title: string; values: readonly number[] }) {
  const colors = ["bg-blue-400", "bg-violet-400", "bg-rose-300", "bg-amber-300"];
  const labels = ["Bambu Lab", "Prusa", "Creality", "Anycubic"];
  return <div className="rounded-xl border border-slate-200 bg-white p-4"><div className="text-xs font-bold text-slate-700">{title}</div><div className="mt-4 flex h-44 items-end justify-around gap-3 border-b border-dashed border-slate-200 px-2">{values.map((value, index) => <div key={labels[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-[9px] text-slate-400">{value}</span><div className={`w-full max-w-10 rounded-t ${colors[index]}`} style={{ height: `${Math.max(3, value)}%` }} /><span className="w-full truncate text-center text-[9px] text-slate-400">{labels[index]}</span></div>)}</div></div>;
}

function CompetitorsModule({ lang, onAsk }: { lang: SiteLang; onAsk: (question: string, preset: boolean) => void }) {
  const isEn = lang === "en";
  const [period, setPeriod] = useState("30D");
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4"><SectionTitle title={isEn ? "Competitor comparison" : "竞品对比"} hint={isEn ? "Benchmark by key dimensions" : "各维度数据竞品对比"} /><div className="flex rounded-lg bg-slate-50 p-1">{["7D", "30D", "90D", "180D"].map((item) => <button key={item} type="button" onClick={() => setPeriod(item)} className={`rounded-md px-3 py-1.5 text-[10px] font-bold ${period === item ? "bg-blue-600 text-white shadow" : "text-slate-500"}`}>{item}</button>)}</div></div>
        <div className="mt-5 flex flex-wrap gap-4 text-[10px] text-slate-500">{[["Bambu Lab", "bg-blue-400"], ["Prusa Research", "bg-violet-400"], ["Creality", "bg-rose-300"], ["Anycubic", "bg-amber-300"]].map(([label, color]) => <span key={label} className="flex items-center gap-2"><i className={`h-2 w-2 rounded-full ${color}`} />{label}</span>)}</div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3"><BarCompareCard title={isEn ? "Total posts" : "总帖子数"} values={[2, 62, 8, 96]} /><BarCompareCard title={isEn ? "Total comments" : "总评论数"} values={[1, 48, 4, 91]} /><BarCompareCard title={isEn ? "Total views" : "总曝光数"} values={[1, 6, 2, 94]} /></div>
        <div className="mt-3 text-right text-[10px] text-slate-400">{isEn ? "Data source: Jul 8 – Aug 7, 2026" : "数据来源：2026.07.08 – 2026.08.07"}</div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <SectionTitle title={isEn ? "Competitor benchmark" : "竞品指标对比"} hint={isEn ? "Reach, engagement and share of voice" : "触达、互动与声量份额"} />
        <div className="mt-5 space-y-5">{COMPETITOR_METRICS.map((competitor) => <div key={competitor.name}><div className="mb-2 flex items-center gap-2 text-[11px] font-bold text-slate-700"><span className={`h-2 w-2 rounded-full ${competitor.color}`} />{competitor.name}</div><div className="grid grid-cols-2 gap-2 xl:grid-cols-5">{competitor.values.map((value, index) => <MetricCard key={`${competitor.name}-${value}`} value={value} label={isEn ? BRAND_METRICS[index][2] : BRAND_METRICS[index][1]} highlight={index === 4} />)}</div></div>)}<div className="rounded-lg border border-dashed border-slate-200 p-4 text-[11px] text-slate-400">Anycubic · {isEn ? "No comparable data for this period. Finish collecting data before calling a trend." : "当前周期暂无可比数据，完成采集后再判断趋势。"}</div></div>
      </section>
      <section className="grid gap-3 md:grid-cols-3"><PromptCard title={isEn ? "What drove each brand's volume peak?" : "峰值驱动力分析：各品牌声量峰值由什么推动？"} badge={isEn ? "Analysis" : "分析"} tone="rose" onClick={() => onAsk(isEn ? "What drove each brand's volume peak?" : "各品牌声量峰值由什么推动？", true)} /><PromptCard title={isEn ? "Which platform contributed the most reach?" : "渠道贡献分析：哪个平台对品牌触达贡献最大？"} badge={isEn ? "Analysis" : "分析"} onClick={() => onAsk(isEn ? "Which platform contributed the most reach?" : "哪个平台对品牌触达贡献最大？", true)} /><PromptCard title={isEn ? "Where did competitor volume grow fastest?" : "竞品声量对比：竞品中的声量增长最快在哪里？"} badge={isEn ? "Analysis" : "分析"} tone="violet" onClick={() => onAsk(isEn ? "Where did competitor volume grow fastest?" : "竞品中的声量增长最快在哪里？", true)} /></section>
    </div>
  );
}

function KeywordRanking({ title, items, positive }: { title: string; items: readonly (readonly [string, number])[]; positive: boolean }) {
  return <div className={`rounded-xl border p-4 ${positive ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}><div className={`text-xs font-bold ${positive ? "text-emerald-700" : "text-rose-700"}`}>{title}</div><div className="mt-3 space-y-2">{items.map(([word, count], index) => <div key={word} className="grid grid-cols-[22px_1fr_auto] items-center gap-2 text-[10px] text-slate-600"><span className={`grid h-5 w-5 place-items-center rounded ${index < 3 ? positive ? "bg-emerald-500 text-white" : "bg-rose-500 text-white" : "bg-white text-slate-400"}`}>{index + 1}</span><span>{word}</span><span className="tabular-nums text-slate-400">{count}</span></div>)}</div></div>;
}

function VoiceModule({ lang, onOpenRef, onAsk }: { lang: SiteLang; onOpenRef: (ref: string) => void; onAsk: (question: string, preset: boolean) => void }) {
  const isEn = lang === "en";
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><SectionTitle title={isEn ? "Voice of users" : "用户声音"} hint={isEn ? "Keyword and sentiment analysis" : "关键词分析与情感分布"} /><div className="mt-5 flex min-h-48 flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-lg border border-slate-100 bg-white px-8 py-8">{VOICE_WORDS.map(([word, className]) => <span key={word} className={className}>{word}</span>)}</div><div className="mt-4 grid gap-4 md:grid-cols-2"><KeywordRanking title={isEn ? "Top 10 positive keywords" : "正面关键词 Top 10"} items={POSITIVE_KEYWORDS} positive /><KeywordRanking title={isEn ? "Top 10 negative keywords" : "负面关键词 Top 10"} items={NEGATIVE_KEYWORDS} positive={false} /></div></section>
      <section className="rounded-xl border border-blue-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><SectionTitle title={isEn ? "Channel reputation distribution" : "渠道口碑分布"} hint={isEn ? "AI analysis" : "AI 分析"} /><RefreshCw className="h-3.5 w-3.5 text-slate-400" /></div><div className="mt-5 divide-y divide-slate-100 text-[11px] leading-6 text-slate-600"><div className="pb-4"><div className="font-bold text-blue-600">{isEn ? "Strong platform" : "强势平台"}</div><p className="mt-1">YouTube · <InlineMetric>328 posts</InlineMetric> · <InlineMetric>21,542 mentions</InlineMetric> · sentiment 29% positive / 61% neutral / 10% negative. High-reach positive samples center on printed projects and product tutorials. <RefButton refId="Ref 03" onOpenRef={onOpenRef} /></p></div><div className="py-4"><div className="font-bold text-blue-600">{isEn ? "Vulnerable platform" : "薄弱平台"}</div><p className="mt-1">YouTube also contains the densest “reliability,” “frustration,” and “disappointment” samples. Treat the platform as polarized, not uniformly negative. <RefButton refId="Ref 08" onOpenRef={onOpenRef} /></p></div><div className="py-4"><div className="font-bold text-blue-600">{isEn ? "Competitive benchmark" : "竞品对标"}</div><p className="mt-1">Prusa Research: 1,743 posts, 39.6% SOV, 51% positive; Creality: 1,016 posts, 23.1% SOV; Anycubic: 1,132 posts, 25.7% SOV. <RefButton refId="Ref 12" onOpenRef={onOpenRef} /></p></div><div className="pt-4"><div className="font-bold text-blue-600">{isEn ? "Recommended actions" : "修复动作"}</div><p className="mt-1">Build a reliability FAQ from negative YouTube terms, reuse high-performing positive formats across weaker channels, and compare all brands on the same collection-time basis.</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-3"><PromptCard title={isEn ? "How should reliability contradictions be communicated?" : "YouTube 上可靠性一词正反面共现，如何沟通？"} badge={isEn ? "Channel follow-up" : "渠道追问"} tone="violet" onClick={() => onAsk(isEn ? "How should reliability contradictions be communicated?" : "YouTube 上可靠性一词正反面共现，应该如何沟通？", true)} /><PromptCard title={isEn ? "How can high-performing YouTube formats be reused?" : "如何将高触达正面内容结构复用到 YouTube？"} badge={isEn ? "Channel follow-up" : "渠道追问"} tone="violet" onClick={() => onAsk(isEn ? "How can high-performing YouTube formats be reused?" : "如何将高触达正面内容结构复用到 YouTube？", true)} /><PromptCard title={isEn ? "How do negative terms locate the next repair opportunity?" : "如何基于负面词定位下一步修复机会？"} badge={isEn ? "Anomaly" : "异常分析"} tone="rose" onClick={() => onAsk(isEn ? "How do negative terms locate the next repair opportunity?" : "如何基于负面词定位下一步修复机会？", true)} /></div></section>
    </div>
  );
}

function PlatformDonut({ name, total, positive, neutral, negative, selected, onClick }: { name: string; total: string; positive: number; neutral: number; negative: number; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-xl border bg-white p-5 text-center transition-colors ${selected ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200"}`}><div className="text-sm font-bold text-slate-700">{name}</div><div className="relative mx-auto mt-5 h-28 w-28 rounded-full" style={{ background: `conic-gradient(#22c55e 0 ${positive}%, #9ca3af ${positive}% ${positive + neutral}%, #ef4444 ${positive + neutral}% 100%)` }}><div className="absolute inset-[15px] grid place-items-center rounded-full bg-white"><div><div className="text-xl font-black text-slate-900">{total}</div><div className="text-[9px] text-slate-400">mentions</div></div></div></div><div className="mt-4 flex justify-center gap-3 text-[9px]"><span className="text-emerald-600">● {positive}%</span><span className="text-slate-400">● {neutral}%</span><span className="text-rose-500">● {negative}%</span></div></button>;
}

function PlatformsModule({ lang, onAsk }: { lang: SiteLang; onAsk: (question: string, preset: boolean) => void }) {
  const isEn = lang === "en";
  const [selectedPlatform, setSelectedPlatform] = useState("YouTube");
  return <div className="space-y-4"><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><SectionTitle title={isEn ? "Platform analysis" : "平台对比"} hint={isEn ? "Conversation volume and sentiment by platform" : "各平台声量与情感分布"} /><div className="mt-5 grid gap-4 sm:grid-cols-3"><PlatformDonut name="YouTube" total="21.5K" positive={29} neutral={61} negative={10} selected={selectedPlatform === "YouTube"} onClick={() => setSelectedPlatform("YouTube")} /><PlatformDonut name="X" total="176" positive={58} neutral={32} negative={10} selected={selectedPlatform === "X"} onClick={() => setSelectedPlatform("X")} /><PlatformDonut name="Instagram" total="2" positive={0} neutral={100} negative={0} selected={selectedPlatform === "Instagram"} onClick={() => setSelectedPlatform("Instagram")} /></div><p className="mt-4 text-center text-[10px] text-slate-400">{isEn ? `${selectedPlatform} selected. Open Data center to review the underlying posts.` : `已选择 ${selectedPlatform}，可在“数据中心”查看对应帖子。`}</p></section><section className="grid gap-3 md:grid-cols-3"><PromptCard title={isEn ? "Which platform drives the strongest engagement?" : "最佳阵地分析：哪个平台互动效率最高？"} badge={isEn ? "INSIGHT" : "分析"} onClick={() => onAsk(isEn ? "Which platform drives the strongest engagement?" : "哪个平台互动效率最高？", true)} /><PromptCard title={isEn ? "Where is negative sentiment most concentrated?" : "失守阵地预警：哪个平台负面情感最严重？"} badge={isEn ? "RISK" : "预警"} tone="rose" onClick={() => onAsk(isEn ? "Where is negative sentiment most concentrated?" : "哪个平台负面情感最严重？", true)} /><PromptCard title={isEn ? "Why does the same topic land differently across platforms?" : "跨平台差异：为什么同一话题在不同平台反应不同？"} badge={isEn ? "INSIGHT" : "分析"} tone="violet" onClick={() => onAsk(isEn ? "Why does the same topic land differently across platforms?" : "为什么同一话题在不同平台反应不同？", true)} /></section></div>;
}

const RAW_POSTS = [
  { id: "p1", platform: "YouTube", sentiment: "negative", date: "Jun 16", title: "Print Your Own Vibe with Bambu Lab A1! The Bambu Lab A1 is your Colorful Gateway to 3D Printing, expanding accessibility, stability, and innovation.", views: "37.4M", likes: "2.6K", comments: "193", ref: "Ref 08", mix: [23, 40, 37] },
  { id: "p2", platform: "YouTube", sentiment: "neutral", date: "Jun 25", title: "Check out this 60-sec clip about fun 3D-printed stuff — they've racked up tons of likes and views.", views: "22.9M", likes: "542.3K", comments: "2.1K", ref: "Ref 03", mix: [44, 48, 8] },
  { id: "p3", platform: "YouTube", sentiment: "neutral", date: "Jun 10", title: "#layerworks #bambulab #filament #stand #practical #useful #helpful #upgrade", views: "15.5M", likes: "260.3K", comments: "361", ref: "Ref 12", mix: [37, 44, 19] },
  { id: "p4", platform: "YouTube", sentiment: "positive", date: "Jun 25", title: "Bambu Lab A1 — fast calibration, multicolor workflows, and a beginner-friendly setup.", views: "9.8M", likes: "184.2K", comments: "113", ref: "Ref 03", mix: [65, 21, 14] },
] as const;

function DataModule({ lang, onOpenRef, registrationUrl }: { lang: SiteLang; sources: ProductDemoSource[]; onOpenRef: (ref: string) => void; registrationUrl: string }) {
  const isEn = lang === "en";
  const [platform, setPlatform] = useState("all");
  const [sentiment, setSentiment] = useState("all");
  const [sort, setSort] = useState("collected");
  const [exportOpen, setExportOpen] = useState(false);
  const filtered = RAW_POSTS.filter((post) => (platform === "all" || post.platform === platform) && (sentiment === "all" || post.sentiment === sentiment));
  return <div className="space-y-4"><section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5"><SectionTitle title={isEn ? "Recent posts" : "最近帖子"} hint={isEn ? "Source-level content center" : "数据中心 · 帖子列表"} /><span className="rounded-lg bg-slate-50 px-3 py-1.5 text-[10px] text-slate-500">20 / 506 {isEn ? "posts" : "篇帖子"}</span></div><div className="flex flex-wrap gap-x-5 gap-y-3 border-b border-slate-100 px-5 py-3 text-[10px]"><div className="flex items-center gap-2"><span className="text-slate-400">{isEn ? "Platform" : "平台"}</span>{["all", "Instagram", "X", "YouTube"].map((item) => <button key={item} type="button" onClick={() => setPlatform(item)} className={`rounded px-2 py-1 ${platform === item ? "bg-slate-900 text-white" : "text-slate-500"}`}>{item === "all" ? (isEn ? "All" : "全部") : item}</button>)}</div><div className="flex items-center gap-2"><span className="text-slate-400">{isEn ? "Sentiment" : "情感"}</span>{[["all", isEn ? "All" : "全部"], ["positive", isEn ? "Positive" : "正面"], ["neutral", isEn ? "Neutral" : "中性"], ["negative", isEn ? "Negative" : "负面"]].map(([id, label]) => <button key={id} type="button" onClick={() => setSentiment(id)} className={`rounded px-2 py-1 ${sentiment === id ? "bg-slate-900 text-white" : id === "positive" ? "text-emerald-600" : id === "negative" ? "text-rose-500" : "text-slate-500"}`}>{label}</button>)}</div><div className="ml-auto flex items-center gap-2"><span className="text-slate-400">{isEn ? "Sort" : "排序"}</span>{[["hot", isEn ? "Hot" : "热度"], ["collected", isEn ? "Collected" : "采集时间"], ["published", isEn ? "Published" : "发布时间"]].map(([id, label]) => <button key={id} type="button" onClick={() => setSort(id)} className={`rounded px-2 py-1 ${sort === id ? "bg-slate-900 text-white" : "text-slate-500"}`}>{label}</button>)}</div></div><div className="divide-y divide-slate-100">{filtered.length ? filtered.map((post) => <article key={post.id} className="p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-[10px] text-slate-500"><span className="font-bold text-slate-700">{post.platform}</span><span className="flex h-1.5 w-24 overflow-hidden rounded-full bg-slate-100"><i className="bg-emerald-500" style={{ width: `${post.mix[0]}%` }} /><i className="bg-slate-400" style={{ width: `${post.mix[1]}%` }} /><i className="bg-rose-500" style={{ width: `${post.mix[2]}%` }} /></span><span className={`rounded px-2 py-0.5 ${post.sentiment === "positive" ? "bg-emerald-50 text-emerald-600" : post.sentiment === "negative" ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"}`}>{isEn ? post.sentiment : post.sentiment === "positive" ? "正面" : post.sentiment === "negative" ? "负面" : "中性"}</span></div><span className="text-[10px] text-slate-400">{post.date}</span></div><p className="mt-3 text-xs leading-5 text-slate-700">{post.title}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><div className="flex gap-4 text-[10px] text-slate-400"><span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span><span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span><span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post.comments}</span></div><div className="flex gap-3 text-[10px] text-slate-500"><button type="button" className="flex items-center gap-1"><Languages className="h-3 w-3" />{isEn ? "Translate" : "翻译"}</button><button type="button" onClick={() => onOpenRef(post.ref)} className="flex items-center gap-1 font-bold text-blue-600">{isEn ? "Source" : "查看原文"}<ExternalLink className="h-3 w-3" /></button><button type="button">{isEn ? "Comments" : "评论"}</button></div></div></article>) : <div className="p-10 text-center text-xs text-slate-400">{isEn ? "No posts match this filter." : "当前筛选条件下暂无帖子。"}</div>}</div><div className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50 p-4 sm:grid-cols-4">{[["506", isEn ? "All posts" : "全部帖子"], ["228", isEn ? "Positive" : "正面"], ["221", isEn ? "Neutral" : "中性"], ["39", isEn ? "Negative" : "负面"]].map(([value, label]) => <div key={label} className="rounded-lg bg-white p-3 text-center"><div className="text-lg font-black text-slate-800">{value}</div><div className="text-[9px] text-slate-400">{label}</div></div>)}</div></section><section className="rounded-xl border border-slate-200 bg-white"><button type="button" onClick={() => setExportOpen((open) => !open)} className="flex w-full items-center justify-between p-4 text-xs font-bold text-slate-700"><span className="flex items-center gap-2"><Download className="h-4 w-4 text-slate-400" />{isEn ? "Data export" : "数据导出"}</span><ChevronDown className={`h-4 w-4 transition-transform ${exportOpen ? "rotate-180" : ""}`} /></button>{exportOpen ? <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-4 text-[10px] text-slate-500"><span>{isEn ? "Scope: all platforms · Last 365 days" : "导出范围：全平台 · 最近 365 天"}</span><a href={registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 font-bold text-white"><LockKeyhole className="h-3 w-3" />CSV</a></div> : null}</section></div>;
}

function AiPlugin({ lang, question, answer, asking, aiQuestionCount, aiQuestionLimit, registrationUrl, open, onOpenChange, onQuestionChange, onAsk, onOpenRef }: Pick<FullProductDashboardProps, "lang" | "question" | "answer" | "asking" | "aiQuestionCount" | "aiQuestionLimit" | "registrationUrl" | "onQuestionChange" | "onAsk" | "onOpenRef"> & { open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = COPY[lang];
  const isEn = lang === "en";
  const limitReached = aiQuestionCount >= aiQuestionLimit;
  const actionPrompt = isEn ? "Recommend three actions based on this report." : "基于当前报告，给我三条优先行动建议。";
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onAsk(question, false); };
  if (!open) {
    return <button type="button" onClick={() => onOpenChange(true)} aria-label={t.openAi} className="absolute -top-[50px] right-3 z-[70] flex h-10 items-center gap-2.5 rounded-full border border-[#7047eb] bg-[#7047eb] px-3.5 text-white shadow-[0_12px_34px_rgba(112,71,235,0.34)] ring-4 ring-[#7047eb]/10 transition-all hover:-translate-y-0.5 hover:bg-[#633adf] hover:shadow-[0_16px_38px_rgba(112,71,235,0.4)] sm:right-5"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#f1ff4f] text-[#3b2268]"><Sparkles className="h-4 w-4" /></span><span className="text-xs font-black tracking-[-0.01em]">Ask me anything</span><ChevronLeft className="h-4 w-4" /></button>;
  }
  return (
    <aside className="absolute right-3 top-3 z-[70] flex h-[min(640px,calc(100%_-_1.5rem))] w-[calc(100%_-_1.5rem)] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-[#d9cefb] bg-white shadow-[0_24px_80px_rgba(58,34,104,0.28)] sm:right-5 sm:top-5 sm:w-[400px]">
      <div className="flex h-14 items-center justify-between border-b border-[#ece7f7] bg-[#fbfaff] px-4"><div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#f1ff4f] text-[#3b2268]"><Sparkles className="h-4 w-4" /></span><div><div className="text-xs font-black text-slate-900">{t.aiTitle}</div><div className="hidden text-[9px] font-medium text-slate-400 sm:block">{t.aiSubtitle}</div></div></div><div className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${limitReached ? "bg-amber-50 text-amber-700" : "bg-[#f1edff] text-[#7047eb]"}`}>{isEn ? `${aiQuestionCount}/${aiQuestionLimit} free questions` : `免费提问 ${aiQuestionCount}/${aiQuestionLimit}`}</span><button type="button" onClick={() => onOpenChange(false)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 hover:bg-white hover:text-slate-700" aria-label={isEn ? "Close AI" : "关闭 AI 助手"}><X className="h-3.5 w-3.5" /></button></div></div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex items-center gap-2 text-[10px] font-semibold text-amber-600"><Sparkles className="h-3 w-3" />{isEn ? "AI ANALYSIS" : "AI 分析"}</div>
        <div className="mt-4 text-[10px] text-slate-400">{isEn ? "Last 7 days · 521 source items" : "过去 7 天 · 521 条来源数据"}</div>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">{isEn ? "Key findings" : "关键发现"}</h3>
        <p className="mt-3 text-xs leading-5 text-slate-500">{isEn ? "The report shows stable beginner demand, a concentrated reliability risk, and a shift in how customers compare Bambu Lab with Prusa." : "报告显示：入门需求仍然稳定，可靠性风险集中出现，同时用户比较 Bambu Lab 与 Prusa 的标准正在变化。"}</p>

        <div className="mt-6 space-y-6 text-[12px] leading-5 text-slate-600">
          <section>
            <h4 className="font-bold text-slate-900">1. {isEn ? "Reliability discussion rose, but the issue is concentrated" : "可靠性讨论上升，但问题仍然集中"}</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-4"><li>{isEn ? "Two high-engagement posts drive most of the three-day increase." : "两条高互动内容推动了过去三天的大部分增量。"}</li><li>{isEn ? "YouTube carries the strongest failure and durability language." : "YouTube 中关于打印失败和耐用性的表达最集中。"}</li></ul>
            <div className="mt-2 text-[10px]"><RefButton refId="Ref 08" onOpenRef={onOpenRef} /></div>
          </section>
          <section className="border-t border-slate-100 pt-5">
            <h4 className="font-bold text-slate-900">2. {isEn ? "Beginner-friendly setup remains the main growth signal" : "新手友好仍是最强增长信号"}</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-4"><li>{isEn ? "Setup, print quality, and tutorials repeat across positive posts." : "安装、打印质量和教程生态反复出现在正面讨论中。"}</li><li>{isEn ? "A starter bundle is the clearest near-term merchandising opportunity." : "入门套装是近期最明确的商品组合机会。"}</li></ul>
            <div className="mt-2 text-[10px]"><RefButton refId="Ref 03" onOpenRef={onOpenRef} /></div>
          </section>
          <section className="border-t border-slate-100 pt-5">
            <h4 className="font-bold text-slate-900">3. {isEn ? "Competitive comparison is moving toward ownership cost" : "竞品比较正在转向长期持有成本"}</h4>
            <p className="mt-2">{isEn ? "Bambu Lab leads on speed and ease, while openness, repairability, and maintenance cost increasingly favor Prusa in the conversation." : "Bambu Lab 在速度和易用性上领先，但开放性、可维修性和维护成本正在成为 Prusa 的讨论优势。"}</p>
            <div className="mt-2 text-[10px]"><RefButton refId="Ref 12" onOpenRef={onOpenRef} /></div>
          </section>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3"><div className="flex items-center justify-between gap-3"><div className="text-[10px] font-bold text-slate-500">{isEn ? "KEEP EXPLORING" : "继续追问"}</div><button type="button" disabled={asking || limitReached} onClick={() => onAsk(actionPrompt, true)} className="text-[10px] font-bold text-blue-600 disabled:text-slate-300">{isEn ? "Ask for 3 actions" : "生成 3 条行动建议"}</button></div><div className="mt-2 flex flex-wrap gap-2">{t.presets.map((preset) => <button key={preset} type="button" disabled={asking || limitReached} onClick={() => onAsk(preset, true)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-[10px] leading-4 text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40">{preset}</button>)}</div></div>

        {question && answer !== null ? <section className="mt-7 border-t border-slate-200 pt-5" aria-live="polite"><div className="text-[10px] font-semibold text-slate-400">{isEn ? "FOLLOW-UP" : "追问"}</div><h4 className="mt-2 text-sm font-bold text-slate-900">{question}</h4><div className="mt-3 border-l-2 border-blue-500 pl-3 text-xs leading-6 text-slate-600">{answer}{asking ? <span className="ml-1 animate-pulse text-blue-600">▍</span> : null}</div></section> : null}
      </div>

      {limitReached ? <div className="border-t border-amber-200 bg-amber-50 p-4"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-amber-700 shadow-sm"><LockKeyhole className="h-4 w-4" /></span><div><div className="text-xs font-bold text-slate-900">{isEn ? "You’ve used both free questions" : "2 次免费提问已用完"}</div><p className="mt-1 text-[10px] leading-4 text-slate-500">{isEn ? "Create an account to keep asking questions and open the full report." : "注册后可继续实时提问，并查看完整品牌报告。"}</p></div></div><a href={registrationUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-xs font-bold text-white">{isEn ? "Sign up to continue" : "注册并继续提问"}</a></div> : <form onSubmit={handleSubmit} className="border-t border-slate-100 bg-white p-4"><div className="mb-2 flex items-center justify-between text-[10px]"><span className="font-bold text-slate-500">{isEn ? "Ask your own question" : "输入自定义问题"}</span><span className="text-slate-400">{isEn ? `${aiQuestionLimit - aiQuestionCount} free question${aiQuestionLimit - aiQuestionCount === 1 ? "" : "s"} left` : `剩余 ${aiQuestionLimit - aiQuestionCount} 次`}</span></div><label className="flex items-end gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 pl-3 focus-within:border-blue-400"><MessageSquareText className="mb-2 h-3.5 w-3.5 text-slate-400" /><textarea value={question} onChange={(event) => onQuestionChange(event.target.value)} placeholder={t.placeholder} rows={2} className="min-h-9 flex-1 resize-none bg-transparent py-1.5 text-xs outline-none" /><button type="submit" disabled={!question.trim() || asking} aria-label={t.send} className="grid h-8 w-8 place-items-center rounded-md bg-slate-300 text-white enabled:bg-slate-900 disabled:opacity-50"><Send className="h-3.5 w-3.5" /></button></label></form>}
    </aside>
  );
}

function BrandConfigPanel({ lang, registrationUrl }: { lang: SiteLang; registrationUrl: string }) {
  const isEn = lang === "en";
  const [timeBasis, setTimeBasis] = useState<"collected" | "published">("collected");
  const [period, setPeriod] = useState("7D");
  const [monitoring, setMonitoring] = useState(false);
  const keywords = ["Bambu Lab", "拓竹", "3D printer", "3D printing", "desktop 3D printer", "3D printer filament"];
  return (
    <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1"><div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white">B</span><div className="min-w-0"><div className="flex items-center gap-2"><h2 className="text-base font-bold text-slate-900">Bambu Lab</h2><span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600">{isEn ? "Live dashboard" : "实时仪表板"}</span></div><p className="mt-0.5 line-clamp-1 max-w-3xl text-[10px] text-slate-400">{COPY[lang].brandDescription}</p></div></div><div className="mt-2 flex items-center gap-2 pl-12 text-[10px] text-slate-400"><Clock3 className="h-3 w-3" />2026/06/25 14:20:59</div></div>
        <div className="flex shrink-0 items-center gap-2"><a href={registrationUrl} target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500" aria-label={isEn ? "Sign up to export report" : "注册后导出报告"}><Download className="h-3.5 w-3.5" /></a><a href={registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-600"><LockKeyhole className="h-3 w-3 text-slate-400" /><Share2 className="h-3.5 w-3.5" />{isEn ? "Share" : "分享"}</a></div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-y border-slate-100 py-3"><span className="mr-1 text-[10px] text-slate-400">{isEn ? "Filter by" : "筛选方式"}</span>{[["collected", isEn ? "Collected time" : "按采集时间"], ["published", isEn ? "Published time" : "按发布时间"]].map(([id, label]) => <button key={id} type="button" onClick={() => setTimeBasis(id as "collected" | "published")} className={`rounded-lg px-3 py-1.5 text-[10px] font-bold ${timeBasis === id ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-500"}`}>{label}</button>)}<span className="mx-1 hidden h-5 w-px bg-slate-200 sm:block" />{[["7D", isEn ? "7D" : "7天"], ["15D", isEn ? "15D" : "15天"], ["30D", isEn ? "30D" : "30天"], ["90D", isEn ? "90D" : "90天"], ["1Y", isEn ? "1Y" : "1年"]].map(([id, label]) => <button key={id} type="button" onClick={() => setPeriod(id)} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold ${period === id ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-500"}`}>{label}</button>)}</div>
      <div className="mt-3 grid gap-3 xl:grid-cols-[1.8fr_1fr_1.1fr]">
        <div><div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400"><Search className="h-3 w-3" />{isEn ? "Keywords" : "关键词"}</div><div className="mt-2 flex flex-wrap gap-1.5">{keywords.map((item) => <span key={item} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] text-blue-600">{item}</span>)}</div></div>
        <div><div className="text-[10px] font-semibold text-slate-400">{isEn ? "Competitors" : "竞争对手"}</div><div className="mt-2 flex flex-wrap gap-1.5">{["Prusa Research", "Creality", "Anycubic"].map((item) => <span key={item} className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] text-amber-700">{item}</span>)}</div></div>
        <div><div className="text-[10px] font-semibold text-slate-400">{isEn ? "Scheduled monitoring" : "日常监测"}</div><div className="mt-2 flex flex-wrap items-center gap-2"><button type="button" onClick={() => setMonitoring((enabled) => !enabled)} aria-pressed={monitoring} className={`relative h-5 w-9 rounded-full transition-colors ${monitoring ? "bg-blue-600" : "bg-slate-300"}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${monitoring ? "translate-x-[18px]" : "translate-x-0.5"}`} /></button><span className="text-[10px] text-slate-500">{monitoring ? (isEn ? "Enabled" : "已开启") : (isEn ? "Upgrade to Pro to enable" : "升级到 Pro 开启定时采集")}</span><button type="button" className="inline-flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-[9px] text-slate-500"><Clock3 className="h-3 w-3" />{isEn ? "Every Thu · 00:00" : "每周四 00:00"}</button></div></div>
      </div>
    </section>
  );
}

export function FullProductDashboard(props: FullProductDashboardProps) {
  const { lang, sources, onOpenRef } = props;
  const t = COPY[lang];
  const [module, setModule] = useState<ModuleId>("overview");
  const scrollPanelRef = useRef<HTMLDivElement>(null);
  const selectModule = (nextModule: ModuleId) => {
    setModule(nextModule);
    window.requestAnimationFrame(() => {
      const scrollPanel = scrollPanelRef.current;
      const moduleContent = scrollPanel?.querySelector<HTMLElement>(`[data-report-module="${nextModule}"]`);
      if (!scrollPanel || !moduleContent) return;
      scrollPanel.scrollTo({ top: Math.max(moduleContent.offsetTop - 16, 0), behavior: "smooth" });
    });
  };
  const syncActiveModule = () => {
    const scrollPanel = scrollPanelRef.current;
    if (!scrollPanel) return;
    const marker = scrollPanel.scrollTop + 96;
    let nextModule: ModuleId = "overview";
    for (const [id] of t.modules) {
      const section = scrollPanel.querySelector<HTMLElement>(`[data-report-module="${id}"]`);
      if (section && section.offsetTop <= marker) nextModule = id;
    }
    setModule(nextModule);
  };
  return (
    <div className="relative">
      <div className="grid h-[760px] min-h-0 overflow-hidden bg-[#f8fafc] lg:grid-cols-[172px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#e9e4f2] bg-[#fbfaff] p-3 lg:block"><nav className="space-y-1.5" aria-label={lang === "en" ? "Report sections" : "报告章节"}>{t.modules.map(([id, label]) => { const Icon = MODULE_ICONS[id]; const isActive = module === id; return <button key={id} type="button" onClick={() => selectModule(id)} aria-current={isActive ? "page" : undefined} className={`group flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2.5 text-left text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7047eb] ${isActive ? "border-[#d9cefb] bg-[#f1edff] text-[#5530c9] shadow-[0_5px_16px_rgba(112,71,235,0.08)]" : "border-transparent text-slate-500 hover:border-[#ebe5f7] hover:bg-white hover:text-slate-800"}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-colors ${isActive ? "bg-[#7047eb] text-white" : "bg-white text-slate-400 ring-1 ring-[#ece8f3] group-hover:text-[#7047eb]"}`}><Icon className="h-3.5 w-3.5" /></span><span className="min-w-0 leading-4">{label}</span></button>; })}</nav></aside>
        <div ref={scrollPanelRef} onScroll={syncActiveModule} className="min-h-0 scroll-smooth overflow-y-auto">
          <nav className="sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-[#e9e4f2] bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden" aria-label={lang === "en" ? "Report sections" : "报告章节"}>{t.modules.map(([id, label]) => { const Icon = MODULE_ICONS[id]; const isActive = module === id; return <button key={id} type="button" onClick={() => selectModule(id)} aria-current={isActive ? "page" : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7047eb] ${isActive ? "border-[#7047eb] bg-[#7047eb] text-white" : "border-[#e6e0f0] bg-white text-slate-500"}`}><Icon className="h-3.5 w-3.5" />{label}</button>; })}</nav>
          <div className="p-4 sm:p-6">
          <BrandConfigPanel lang={lang} registrationUrl={props.registrationUrl} />

          <div className="space-y-8 pb-8">
            <section id="report-overview" data-report-module="overview" className="scroll-mt-16"><OverviewModule lang={lang} onOpenRef={onOpenRef} onAsk={props.onAsk} /></section>
            <section id="report-metrics" data-report-module="metrics" className="scroll-mt-16"><MetricsModule lang={lang} /></section>
            <section id="report-competitors" data-report-module="competitors" className="scroll-mt-16"><CompetitorsModule lang={lang} onAsk={props.onAsk} /></section>
            <section id="report-voice" data-report-module="voice" className="scroll-mt-16"><VoiceModule lang={lang} onOpenRef={onOpenRef} onAsk={props.onAsk} /></section>
            <section id="report-platforms" data-report-module="platforms" className="scroll-mt-16"><PlatformsModule lang={lang} onAsk={props.onAsk} /></section>
            <section id="report-data" data-report-module="data" className="scroll-mt-16"><DataModule lang={lang} sources={sources} onOpenRef={onOpenRef} registrationUrl={props.registrationUrl} /></section>
          </div>
          </div>
        </div>
      </div>
      <AiPlugin lang={lang} question={props.question} answer={props.answer} asking={props.asking} aiQuestionCount={props.aiQuestionCount} aiQuestionLimit={props.aiQuestionLimit} registrationUrl={props.registrationUrl} open={props.aiOpen} onOpenChange={props.onAiOpenChange} onQuestionChange={props.onQuestionChange} onAsk={props.onAsk} onOpenRef={onOpenRef} />
    </div>
  );
}
