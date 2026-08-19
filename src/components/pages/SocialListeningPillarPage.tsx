import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  FileSearch,
  Layers3,
  MessageCircleMore,
  MessagesSquare,
  PackageCheck,
  Radar,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

import {
  CleanSectionLabel,
  CleanSitePage,
  type SiteLang,
} from "@/components/CleanSiteChrome";
import {
  getPlaygroundSampleUrl,
  getPlaygroundUrl,
} from "@/lib/app-links";

type Card = { title: string; body: string };
type Resource = { label: string; title: string; body: string; href: string };

type SocialListeningCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  proof: string;
  primaryCta: string;
  secondaryCta: string;
  signalLabels: [string, string, string];
  signalFinding: string;
  signalBody: string;
  definitionLabel: string;
  definitionTitle: string;
  definitionBody: string;
  distinctions: Card[];
  toolsLabel: string;
  toolsTitle: string;
  toolsBody: string;
  tools: Card[];
  confidenceLabel: string;
  confidenceTitle: string;
  confidenceBody: string;
  confidenceCards: Card[];
  platformsLabel: string;
  platformsTitle: string;
  platformsBody: string;
  platformRoles: Array<{ platform: string; role: string; body: string }>;
  caseLabel: string;
  caseTitle: string;
  caseBody: string;
  caseFinding: string;
  caseMetrics: Array<{ value: string; label: string }>;
  caseThemes: string[];
  caseCta: string;
  workflowLabel: string;
  workflowTitle: string;
  workflowBody: string;
  workflow: Card[];
  resourcesLabel: string;
  resourcesTitle: string;
  resourcesBody: string;
  resources: Resource[];
  faqLabel: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const COPY: Record<SiteLang, SocialListeningCopy> = {
  en: {
    eyebrow: "Social listening tools for consumer brands",
    title: "Social listening tools that turn consumer conversations into decisions",
    intro:
      "DataScaler searches public posts, comments, communities, and reviews for the questions customers repeat. See what creates interest, what holds a buyer back, and open the conversations behind each summary.",
    proof: "10 public platforms · Source-linked findings · Start with a free brand scan",
    primaryCta: "Analyze my brand",
    secondaryCta: "Explore the Bambu Lab sample",
    signalLabels: ["Attention", "Purchase confidence", "Next action"],
    signalFinding: "Strong visibility can still hide a conversion problem",
    signalBody:
      "The same product can attract strong attention while buyers keep raising questions about reliability, support, or price.",
    definitionLabel: "The category",
    definitionTitle: "What is social listening?",
    definitionBody:
      "Social listening reads public customer conversations for recurring needs, objections, and comparisons. Mention monitoring tells you that a topic is growing. Social listening shows the words customers use, where the discussion is happening, and the posts behind it.",
    distinctions: [
      {
        title: "Social monitoring",
        body: "Detects changes in mentions, conversation volume, sentiment, and competitor attention.",
      },
      {
        title: "Social listening",
        body: "Explains the needs, objections, themes, and platform differences behind those changes.",
      },
      {
        title: "Consumer intelligence",
        body: "Brings verified customer evidence into a specific product, content, support, or growth question.",
      },
    ],
    toolsLabel: "Social listening software",
    toolsTitle: "What should a social listening tool help your team do?",
    toolsBody:
      "A useful tool should shorten the distance between a top-line metric and the customer conversations that produced it.",
    tools: [
      {
        title: "Listen across platforms",
        body: "Bring social posts, comments, communities, and product reviews into one research scope.",
      },
      {
        title: "Find recurring themes",
        body: "Group customer language around needs, product fit, reliability, support, price, and trust.",
      },
      {
        title: "Read platform context",
        body: "Separate discovery-led conversation from evaluation, ownership, and long-term-use discussion.",
      },
      {
        title: "Compare brands and categories",
        body: "See which topics shape share of voice and how the comparison changes by platform.",
      },
      {
        title: "Verify every conclusion",
        body: "Open the posts, comments, and engagement data behind the summary before acting on it.",
      },
    ],
    confidenceLabel: "From buzz to buying decisions",
    confidenceTitle: "Turn attention into purchase confidence",
    confidenceBody:
      "Positive sentiment does not mean a customer is ready to buy. In consumer categories, hesitation usually falls into four familiar groups.",
    confidenceCards: [
      {
        title: "Product confidence",
        body: "Performance, reliability, safety, quality, and proof that the product works.",
      },
      {
        title: "Ownership confidence",
        body: "Setup, compatibility, maintenance, support, warranty, and return experience.",
      },
      {
        title: "Value confidence",
        body: "Price, subscriptions, durability, alternatives, and whether the trade-off feels worth it.",
      },
      {
        title: "Information confidence",
        body: "Review credibility, product claims, privacy, evidence quality, and consistency across sources.",
      },
    ],
    platformsLabel: "Cross-platform context",
    platformsTitle: "Listen across the platforms that shape purchase decisions",
    platformsBody:
      "Each platform captures a different part of the buying process. Keeping those roles separate is more useful than averaging every post into one sentiment score.",
    platformRoles: [
      {
        platform: "TikTok · Instagram",
        role: "Discovery",
        body: "Usage moments, creator proof, excitement, aesthetics, and new-product attention.",
      },
      {
        platform: "YouTube",
        role: "Evaluation",
        body: "Reviews, comparisons, product demonstrations, and evidence behind performance claims.",
      },
      {
        platform: "Reddit · Reviews",
        role: "Ownership",
        body: "Compatibility, durability, support, long-term use, and repeated risk signals.",
      },
    ],
    caseLabel: "Social listening example",
    caseTitle: "What Anker's public conversations revealed",
    caseBody:
      "A 30-day DataScaler snapshot showed strong visibility alongside specific purchase-confidence pressure. TikTok and Instagram carried stronger positive momentum, while YouTube and Reddit held more evaluation and long-term-use questions.",
    caseFinding:
      "High visibility did not remove recurring concerns around compatibility, overheating, durability, charging speed, and price.",
    caseMetrics: [
      { value: "41.4K", label: "Brand mentions" },
      { value: "56.6M", label: "Potential reach" },
      { value: "45%", label: "Share of voice" },
      { value: "38.23%", label: "Engagement rate" },
    ],
    caseThemes: ["Compatibility", "Overheating", "Durability", "Charging speed", "Price"],
    caseCta: "Read the Anker social listening case",
    workflowLabel: "Social listening strategy",
    workflowTitle: "A five-step social listening workflow",
    workflowBody:
      "Start narrow, check the evidence, and only then decide whether a repeated theme deserves work.",
    workflow: [
      { title: "Set the scope", body: "Define the brand, competitors, market, platforms, time range, and languages." },
      { title: "Measure attention", body: "Review mentions, reach, engagement, and share of voice without treating reach as sales." },
      { title: "Separate demand and friction", body: "Identify what creates interest and what weakens purchase confidence." },
      { title: "Verify the evidence", body: "Check source count, repetition, platform context, and the original conversations." },
      { title: "Assign the action", body: "Route the finding to product, support, content, research, or growth—and set a review date." },
    ],
    resourcesLabel: "Research built from real reports",
    resourcesTitle: "Social listening examples, methods, and benchmarks",
    resourcesBody:
      "These guides show the method in detail and apply it to real categories and brands.",
    resources: [
      {
        label: "Strategy guide",
        title: "A social listening strategy for consumer brands",
        body: "A practical method for reading attention, trust, purchase confidence, and source evidence together.",
        href: "/blog/social-listening-consumer-brands-en",
      },
      {
        label: "Real brand case",
        title: "Anker: growth, trust, and VOC risk",
        body: "A 30-day example of how platform roles and recurring themes change the top-line story.",
        href: "/blog/consumer-electronics-social-listening-anker-growth-trust-voc-risk",
      },
      {
        label: "Benchmark framework",
        title: "Consumer Tech Purchase Confidence Index",
        body: "Four public signals that shape buying decisions across consumer-tech categories.",
        href: "/blog/consumer-tech-purchase-confidence-index-pilot-en",
      },
    ],
    faqLabel: "FAQ",
    faqTitle: "Social listening questions, answered",
    faqs: [
      {
        question: "What is social listening?",
        answer:
          "Social listening collects and interprets public customer conversations to explain what people care about, why attitudes change, and which product, content, support, or growth action deserves attention.",
      },
      {
        question: "How is social listening different from social monitoring?",
        answer:
          "Social monitoring detects what changed in mentions, volume, sentiment, or competitor attention. Social listening explains the themes, customer language, objections, and platform context behind that change.",
      },
      {
        question: "How is social listening different from sentiment analysis?",
        answer:
          "Sentiment analysis labels attitude. Social listening also preserves topics, customer language, platform role, engagement, repetition, and source evidence, so teams can understand the reason behind the attitude.",
      },
      {
        question: "Which data sources does DataScaler cover?",
        answer:
          "DataScaler covers public conversations across YouTube, TikTok, X, Facebook, Instagram, Threads, Pinterest, Trustpilot, Reddit, and Amazon Reviews.",
      },
      {
        question: "Is there a free social listening tool?",
        answer:
          "DataScaler lets you run a free initial brand scan in the Playground and explore a complete Bambu Lab sample before you sign up for a full report.",
      },
      {
        question: "Can social listening replace surveys, CRM, or support data?",
        answer:
          "No. Public conversation is an early evidence layer. It complements direct customer research, CRM, support, and sales data; it does not represent every customer or prove sales impact on its own.",
      },
    ],
    finalTitle: "Find the customer signal behind the metric",
    finalBody:
      "Run a free brand scan, or explore the Bambu Lab sample to see source-linked social listening in practice.",
    finalPrimary: "Analyze my brand",
    finalSecondary: "Explore the sample",
  },
  zh: {
    eyebrow: "面向出海消费品牌的社交媒体聆听",
    title: "从海外消费者讨论中发现需求、顾虑与增长机会",
    intro:
      "DataScaler 从海外社交媒体、社区和评论中找出用户反复提到的问题：什么让他们感兴趣，什么让他们迟迟不下单。每条总结都能点回原帖查看。",
    proof: "覆盖 10 个海外公开平台 · 结论可回到原帖 · 免费扫描品牌",
    primaryCta: "分析我的品牌",
    secondaryCta: "查看 Bambu Lab 示例",
    signalLabels: ["市场关注", "购买顾虑", "原帖证据"],
    signalFinding: "高声量背后，仍可能藏着转化阻力",
    signalBody: "同一款产品可以一边获得大量关注，一边被用户反复追问可靠性、售后和价格。",
    definitionLabel: "品类说明",
    definitionTitle: "什么是社交媒体聆听？",
    definitionBody:
      "社交媒体聆听关注海外用户反复提出的需求、顾虑和比较。舆情监测告诉你某个话题正在增长；社交媒体聆听则保留用户怎么说、讨论发生在哪里，以及对应的原帖。",
    distinctions: [
      { title: "海外社媒舆情监测", body: "发现品牌提及、讨论量、用户态度和竞品关注度发生了什么变化。" },
      { title: "社交媒体聆听", body: "看用户为什么关注、为什么犹豫，以及不同平台上的说法有什么差别。" },
      { title: "消费者洞察", body: "把核验过的用户原话放回具体的产品、内容、售后或增长问题。" },
    ],
    toolsLabel: "社交媒体聆听工具",
    toolsTitle: "社交媒体聆听工具，具体应该看什么？",
    toolsBody: "指标只是入口。更重要的是快速找到指标背后的重复话题、用户原话和出处。",
    tools: [
      { title: "跨平台收集", body: "把社交帖子、评论、社区和商品评价放进同一研究范围。" },
      { title: "识别重复话题", body: "围绕需求、适配、可靠性、售后、价格和信任聚类用户语言。" },
      { title: "保留平台语境", body: "区分发现型讨论、购买评估和长期使用反馈，避免只看平均情绪。" },
      { title: "比较品牌与品类", body: "观察哪些话题推动声量份额，以及不同平台的比较标准。" },
      { title: "核验每条结论", body: "直接打开总结背后的帖子、评论和互动数据，不靠二手转述。" },
    ],
    confidenceLabel: "热度不等于下单",
    confidenceTitle: "把市场关注读成购买信心",
    confidenceBody:
      "正面情绪不等于准备下单。消费品牌常见的犹豫，通常落在下面四类问题里。",
    confidenceCards: [
      { title: "产品信心", body: "性能、可靠性、安全、质量，以及产品是否真的有效。" },
      { title: "使用信心", body: "安装、兼容、维护、售后、保修和退换体验。" },
      { title: "价值信心", body: "价格、订阅、寿命、替代方案和用户是否认为值得。" },
      { title: "信息信心", body: "评论可信度、产品声明、隐私、证据质量和信息是否一致。" },
    ],
    platformsLabel: "跨平台语境",
    platformsTitle: "不同平台，记录的是不同购买阶段",
    platformsBody:
      "每个平台记录的是购买过程的不同阶段。把它们分开看，比把所有帖子压成一个平均情绪分数更有用。",
    platformRoles: [
      { platform: "TikTok · Instagram", role: "发现", body: "使用场景、创作者证明、兴趣、美感和新品关注。" },
      { platform: "YouTube", role: "评估", body: "评测、对比、产品演示和性能主张背后的证据。" },
      { platform: "Reddit · Reviews", role: "长期使用", body: "兼容、耐用、售后、长期体验和重复出现的风险信号。" },
    ],
    caseLabel: "真实 Social Listening 案例",
    caseTitle: "Anker 的海外公开讨论说明了什么",
    caseBody:
      "30 天数据里，Anker 的声量很高，但购买顾虑并没有消失。TikTok 和 Instagram 的正面内容更多；YouTube 和 Reddit 更常出现评测、兼容和长期使用问题。",
    caseFinding: "高可见度并没有消除兼容、过热、耐用、充电速度和价格等重复顾虑。",
    caseMetrics: [
      { value: "41.4K", label: "品牌提及" },
      { value: "56.6M", label: "潜在触达" },
      { value: "45%", label: "声量份额" },
      { value: "38.23%", label: "互动率" },
    ],
    caseThemes: ["兼容性", "过热", "耐用性", "充电速度", "价格"],
    caseCta: "阅读 Anker Social Listening 案例",
    workflowLabel: "社交媒体聆听方法",
    workflowTitle: "一套五步 Social Listening 工作流",
    workflowBody: "先把问题范围收窄，再核对原帖，最后判断一个重复话题是否值得投入。",
    workflow: [
      { title: "确定范围", body: "明确品牌、竞品、市场、平台、时间范围和语言边界。" },
      { title: "衡量关注", body: "查看提及、触达、互动和声量份额，但不把触达等同于销售。" },
      { title: "拆开需求与阻力", body: "区分什么带来兴趣，什么正在削弱购买信心。" },
      { title: "核验原始证据", body: "检查来源数量、重复性、平台语境和原始讨论。" },
      { title: "明确负责人", body: "交给产品、售后、内容、研究或增长负责人，并约定复查时间。" },
    ],
    resourcesLabel: "由真实报告建立的方法",
    resourcesTitle: "Social Listening 案例、方法与行业框架",
    resourcesBody: "这些指南会展开具体方法，并用真实品牌和品类数据说明怎么读。",
    resources: [
      {
        label: "方法指南",
        title: "消费品牌 Social Listening：从声量到购买信心",
        body: "把市场关注、信任、购买信心和原帖证据放在一起阅读的方法。",
        href: "/blog/social-listening-consumer-brands",
      },
      {
        label: "真实品牌案例",
        title: "Anker：高声量下的产品信任信号",
        body: "用 30 天数据说明平台角色和重复话题如何改变顶层指标的含义。",
        href: "/blog/consumer-electronics-social-listening-anker-datascaler-cn",
      },
      {
        label: "行业框架",
        title: "消费科技购买信心指数",
        body: "拆解影响消费科技购买决策的四类公开信号。",
        href: "/blog/consumer-tech-purchase-confidence-index-pilot",
      },
    ],
    faqLabel: "常见问题",
    faqTitle: "关于社交媒体聆听",
    faqs: [
      { question: "什么是社交媒体聆听？", answer: "社交媒体聆听会持续查看海外公开平台上的用户讨论，找出反复出现的需求、购买顾虑和比较，再回到原帖确认语境。" },
      { question: "社交媒体聆听和舆情监测有什么区别？", answer: "舆情监测先标出提及量、用户态度或竞品关注度的变化；社交媒体聆听继续看用户具体说了什么，以及这些说法在哪个平台出现。" },
      { question: "社交媒体聆听和情绪分析有什么区别？", answer: "情绪分析主要判断态度；社交媒体聆听还保留话题、用户语言、平台角色、互动、重复性和原帖证据，用来理解态度背后的原因。" },
      { question: "DataScaler 覆盖哪些海外平台？", answer: "目前覆盖 YouTube、TikTok、X、Facebook、Instagram、Threads、Pinterest、Trustpilot、Reddit 和 Amazon Reviews 等 10 个公开平台。" },
      { question: "可以免费体验社交媒体聆听吗？", answer: "在 Playground 输入品牌即可查看初步结果；也可以先打开完整的 Bambu Lab 示例。" },
      { question: "Social Listening 可以替代问卷、CRM 或客服数据吗？", answer: "不能。公开讨论是一层更早的市场证据，可以补充问卷、CRM、客服和销售数据，但不能代表全部用户，也不能单独证明销售影响。" },
    ],
    finalTitle: "看看用户为什么关注，也看看他们为什么没下单",
    finalBody: "输入品牌查看初步结果，或先打开 Bambu Lab 示例，看看报告怎样从结论回到原帖。",
    finalPrimary: "分析我的品牌",
    finalSecondary: "查看示例",
  },
};

const TOOL_ICONS = [Radar, Layers3, MessagesSquare, BarChart3, SearchCheck];
const CONFIDENCE_ICONS = [PackageCheck, UsersRound, CircleDollarSign, ShieldCheck];

export function SocialListeningPillarPage({ lang }: { lang: SiteLang }) {
  const copy = COPY[lang];
  const playgroundUrl = getPlaygroundUrl(lang);
  const sampleUrl = getPlaygroundSampleUrl(lang);
  const languageHref = lang === "en" ? "/social-listening" : "/en/social-listening";
  const brandMonitoringHref = lang === "en" ? "/en/brand-monitoring" : "/brand-monitoring";
  const strategyHref = lang === "en"
    ? "/blog/social-listening-consumer-brands-en"
    : "/blog/social-listening-consumer-brands";

  return (
    <CleanSitePage lang={lang} languageHref={languageHref}>
      <main>
        <section className="relative overflow-hidden border-b border-[#3d2673] bg-[#24133f] px-5 py-16 text-white lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(169,145,255,0.38),transparent_34%),radial-gradient(circle_at_12%_88%,rgba(245,255,99,0.16),transparent_26%)]" />
          <div className="relative mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#c8b8ff]">
                {copy.eyebrow}
              </span>
              <h1 className="mt-6 text-balance text-[clamp(43px,6.3vw,78px)] font-black leading-[0.96] tracking-[-0.06em]">
                {copy.title}
              </h1>
              <p className="mt-7 max-w-[700px] text-base leading-7 text-white/65 sm:text-lg">
                {copy.intro}
              </p>
              <p className="mt-5 text-sm font-bold text-white/50">{copy.proof}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${playgroundUrl}#brand-scan-form`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5ff63] px-6 py-4 text-sm font-black text-[#24133f] transition hover:-translate-y-0.5"
                >
                  {copy.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={sampleUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
                >
                  {copy.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/15 bg-white/[0.07] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur sm:p-7">
              <div className="flex items-center justify-between border-b border-white/12 pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7047eb]">
                    <MessageCircleMore className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c8b8ff]">
                      {lang === "en" ? "Conversation signal" : "用户讨论信号"}
                    </div>
                    <div className="mt-1 text-sm font-black">
                      {lang === "en" ? "Bambu Lab · Last 7 days" : "Bambu Lab · 过去 7 天"}
                    </div>
                  </div>
                </div>
                <Sparkles className="h-5 w-5 text-[#f5ff63]" aria-hidden="true" />
              </div>
              <div className="my-6 grid gap-2 sm:grid-cols-3">
                {copy.signalLabels.map((label, index) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/40">0{index + 1}</span>
                    <div className="mt-2 text-sm font-black">{label}</div>
                    <div className={`mt-4 h-1.5 rounded-full ${index === 2 ? "bg-[#f5ff63]" : "bg-[#8c6df2]"}`} />
                  </div>
                ))}
              </div>
              <div className="rounded-[22px] bg-[#eee7ff] p-5 text-[#24133f]">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7047eb]">
                  {lang === "en" ? "Finding · Ref 026" : "核心结论 · Ref 026"}
                </div>
                <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.03em]">{copy.signalFinding}</h2>
                <p className="mt-3 text-sm leading-6 text-[#24133f]/62">{copy.signalBody}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#fbf9ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <div>
                <CleanSectionLabel>{copy.definitionLabel}</CleanSectionLabel>
                <h2 className="mt-5 text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                  {copy.definitionTitle}
                </h2>
                <p className="mt-6 text-base leading-7 text-[#24133f]/62">{copy.definitionBody}</p>
                <Link href={brandMonitoringHref} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#7047eb]">
                  {lang === "en" ? "Compare with Brand Monitoring" : "查看海外社媒舆情监测"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-3">
                {copy.distinctions.map((item, index) => (
                  <article key={item.title} className={`rounded-[24px] border border-[#3d2673]/15 p-6 ${index === 1 ? "bg-[#7047eb] text-white" : "bg-white text-[#24133f]"}`}>
                    <div className={`text-[10px] font-black uppercase tracking-[0.15em] ${index === 1 ? "text-[#f5ff63]" : "text-[#7047eb]"}`}>
                      0{index + 1}
                    </div>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">{item.title}</h3>
                    <p className={`mt-3 text-sm leading-6 ${index === 1 ? "text-white/70" : "text-[#24133f]/60"}`}>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#eee7ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{copy.toolsLabel}</CleanSectionLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <h2 className="text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">{copy.toolsTitle}</h2>
              <p className="text-base leading-7 text-[#24133f]/62">{copy.toolsBody}</p>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {copy.tools.map((item, index) => {
                const Icon = TOOL_ICONS[index];
                return (
                  <article key={item.title} className={`rounded-[24px] border border-[#3d2673]/15 p-5 ${index === 4 ? "bg-[#24133f] text-white" : "bg-white text-[#24133f]"}`}>
                    <span className={`grid h-11 w-11 place-items-center rounded-2xl ${index === 4 ? "bg-[#f5ff63] text-[#24133f]" : "bg-[#eee7ff] text-[#7047eb]"}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-black leading-tight tracking-[-0.03em]">{item.title}</h3>
                    <p className={`mt-3 text-sm leading-6 ${index === 4 ? "text-white/62" : "text-[#24133f]/58"}`}>{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-white px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
              <div>
                <CleanSectionLabel>{copy.confidenceLabel}</CleanSectionLabel>
                <h2 className="mt-5 text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">{copy.confidenceTitle}</h2>
                <p className="mt-6 text-base leading-7 text-[#24133f]/62">{copy.confidenceBody}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {copy.confidenceCards.map((item, index) => {
                  const Icon = CONFIDENCE_ICONS[index];
                  return (
                    <article key={item.title} className="rounded-[24px] border border-[#3d2673]/15 bg-[#fbf9ff] p-6">
                      <div className="flex items-center justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7047eb] text-white"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        <span className="text-xs font-black text-[#7047eb]/35">0{index + 1}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#24133f]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#24133f]/60">{item.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#f5ff63] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{copy.platformsLabel}</CleanSectionLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <h2 className="text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">{copy.platformsTitle}</h2>
              <p className="text-base leading-7 text-[#24133f]/65">{copy.platformsBody}</p>
            </div>
            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {copy.platformRoles.map((item, index) => (
                <article key={item.platform} className="rounded-[24px] border border-[#3d2673] bg-white p-6 shadow-[6px_6px_0_#24133f]">
                  <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7047eb]">{item.platform}</div>
                  <h3 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#24133f]">{item.role}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#24133f]/60">{item.body}</p>
                  <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#eee7ff]"><div className="h-full rounded-full bg-[#7047eb]" style={{ width: `${64 + index * 12}%` }} /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#24133f] px-5 py-16 text-white lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-[#a991ff]">{copy.caseLabel}</span>
              <h2 className="mt-5 text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em]">{copy.caseTitle}</h2>
              <p className="mt-6 text-base leading-7 text-white/62">{copy.caseBody}</p>
              <Link href={copy.resources[1].href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f5ff63] px-6 py-4 text-sm font-black text-[#24133f] transition hover:-translate-y-0.5">
                {copy.caseCta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-[28px] border border-white/15 bg-white/[0.07] p-5 sm:p-7">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {copy.caseMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-white/[0.07] p-4">
                    <div className="text-2xl font-black text-[#f5ff63]">{metric.value}</div>
                    <div className="mt-1 text-[10px] font-bold leading-4 text-white/45">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[22px] bg-[#eee7ff] p-5 text-[#24133f]">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7047eb]">{lang === "en" ? "The finding" : "核心结论"}</div>
                <h3 className="mt-3 text-xl font-black leading-tight tracking-[-0.03em]">{copy.caseFinding}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {copy.caseThemes.map((theme) => <span key={theme} className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#7047eb]">{theme}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#fbf9ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{copy.workflowLabel}</CleanSectionLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <h2 className="text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">{copy.workflowTitle}</h2>
              <div>
                <p className="text-base leading-7 text-[#24133f]/62">{copy.workflowBody}</p>
                <Link href={strategyHref} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#7047eb]">{lang === "en" ? "Read the full strategy guide" : "阅读完整方法指南"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </div>
            <ol className="mt-10 grid gap-3 lg:grid-cols-5">
              {copy.workflow.map((step, index) => (
                <li key={step.title} className="relative rounded-[24px] border border-[#3d2673]/15 bg-white p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#7047eb] text-xs font-black text-white">0{index + 1}</span>
                  <h3 className="mt-5 text-lg font-black tracking-[-0.03em] text-[#24133f]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#24133f]/58">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-white px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{copy.resourcesLabel}</CleanSectionLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <h2 className="text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">{copy.resourcesTitle}</h2>
              <p className="text-base leading-7 text-[#24133f]/62">{copy.resourcesBody}</p>
            </div>
            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {copy.resources.map((resource, index) => (
                <Link key={resource.title} href={resource.href} className="group flex min-h-[270px] flex-col rounded-[24px] border border-[#3d2673]/15 bg-[#fbf9ff] p-6 transition hover:-translate-y-1 hover:border-[#7047eb]/40 hover:shadow-[0_18px_50px_rgba(61,38,115,0.12)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7047eb]">{resource.label}</span>
                    {index === 1 ? <FileSearch className="h-5 w-5 text-[#7047eb]" aria-hidden="true" /> : <Sparkles className="h-5 w-5 text-[#7047eb]" aria-hidden="true" />}
                  </div>
                  <h3 className="mt-8 text-2xl font-black leading-tight tracking-[-0.04em] text-[#24133f]">{resource.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#24133f]/58">{resource.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-[#7047eb]">{lang === "en" ? "Read research" : "阅读内容"}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#eee7ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[980px]">
            <CleanSectionLabel>{copy.faqLabel}</CleanSectionLabel>
            <h2 className="mt-5 text-balance text-[clamp(36px,4.8vw,58px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">{copy.faqTitle}</h2>
            <div className="mt-10 grid gap-3">
              {copy.faqs.map((faq, index) => (
                <details key={faq.question} className="group rounded-[22px] border border-[#3d2673]/15 bg-white p-5 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-black tracking-[-0.02em] text-[#24133f] [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eee7ff] text-xs text-[#7047eb] group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-[860px] text-sm leading-6 text-[#24133f]/62">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#f5ff63] px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <CleanSectionLabel>{lang === "en" ? "Start with your brand" : "从你的品牌开始"}</CleanSectionLabel>
              <h2 className="mt-5 max-w-[820px] text-balance text-[clamp(36px,4.8vw,58px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">{copy.finalTitle}</h2>
              <p className="mt-5 max-w-[760px] text-base leading-7 text-[#24133f]/65">{copy.finalBody}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href={`${playgroundUrl}#brand-scan-form`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7047eb] px-6 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(36,19,63,0.2)] transition hover:-translate-y-0.5">{copy.finalPrimary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href={sampleUrl} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3d2673]/25 bg-white/75 px-6 py-4 text-sm font-black text-[#24133f] transition hover:-translate-y-0.5 hover:bg-white">{copy.finalSecondary}</Link>
            </div>
          </div>
        </section>
      </main>
    </CleanSitePage>
  );
}

export function getSocialListeningFaqs(lang: SiteLang) {
  return COPY[lang].faqs;
}
