import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ExternalLink,
  MessageSquareText,
  Radar,
  Search,
  ShieldAlert,
  Sparkles,
  Target,
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

type PillarCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  proof: string;
  primaryCta: string;
  secondaryCta: string;
  platformLabel: string;
  definitionLabel: string;
  definitionTitle: string;
  definitionBody: string;
  layers: Array<{ label: string; question: string; body: string }>;
  capabilityLabel: string;
  capabilityTitle: string;
  capabilityBody: string;
  capabilities: Array<{ title: string; body: string }>;
  exampleLabel: string;
  exampleTitle: string;
  exampleBody: string;
  exampleFinding: string;
  exampleFindingBody: string;
  exampleMetrics: Array<{ value: string; label: string }>;
  exampleCta: string;
  workflowLabel: string;
  workflowTitle: string;
  workflowBody: string;
  workflow: Array<{ title: string; body: string }>;
  useCasesLabel: string;
  useCasesTitle: string;
  useCases: Array<{ title: string; body: string }>;
  comparisonLabel: string;
  comparisonTitle: string;
  comparisonBody: string;
  comparisonHeaders: [string, string, string];
  comparisonRows: Array<[string, string, string]>;
  faqLabel: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const PLATFORMS = [
  "YouTube",
  "TikTok",
  "Reddit",
  "Trustpilot",
  "Amazon Reviews",
  "Instagram",
  "Facebook",
  "X",
  "Threads",
  "Pinterest",
];

const COPY: Record<SiteLang, PillarCopy> = {
  en: {
    eyebrow: "Brand monitoring",
    title: "Brand monitoring for global ecommerce brands",
    intro:
      "See where your brand is being discussed, which topics are picking up, and whether the same complaint keeps returning. DataScaler groups public posts, comments, and reviews into a short report, with links back to the source.",
    proof: "10 public platforms · Every finding links to the source · Start free",
    primaryCta: "Analyze my brand",
    secondaryCta: "Explore the Bambu Lab sample",
    platformLabel: "Monitor the public channels that shape purchase decisions",
    definitionLabel: "The category",
    definitionTitle: "What is brand monitoring?",
    definitionBody:
      "Brand monitoring follows public mentions of a company, product, competitor, or category over time. Mention counts show the size of a change; the posts and comments show what caused it. DataScaler keeps both in the same report.",
    layers: [
      {
        label: "Monitor",
        question: "What happened?",
        body: "Track mentions, conversation volume, engagement, and unusual changes.",
      },
      {
        label: "Listen",
        question: "Why is it happening?",
        body: "Understand themes, sentiment, objections, and platform differences.",
      },
      {
        label: "Decide",
        question: "Does it need attention?",
        body: "Open the source, check whether the issue repeats, and assign it to the right owner.",
      },
    ],
    capabilityLabel: "Online brand monitoring",
    capabilityTitle: "See the signals behind your brand conversation",
    capabilityBody:
      "DataScaler collects public posts, comments, communities, and reviews. Instead of starting with a feed of raw mentions, you start with the changes, risks, and customer questions worth checking.",
    capabilities: [
      {
        title: "Brand mentions and conversation volume",
        body: "See when discussion grows, where it appears, and which products or topics drive it.",
      },
      {
        title: "Sentiment and reputation risk",
        body: "Separate positive momentum from recurring objections around reliability, support, price, safety, or product fit.",
      },
      {
        title: "Customer needs and objections",
        body: "Preserve the language customers use when they compare, hesitate, recommend, or complain.",
      },
      {
        title: "Competitor movement",
        body: "Track when competing brands gain attention and which topics shape the comparison.",
      },
      {
        title: "Source-level evidence",
        body: "Open the posts, comments, and engagement data behind a finding instead of relying on an unsupported summary.",
      },
    ],
    exampleLabel: "Live brand monitoring example",
    exampleTitle: "See brand monitoring in a real report",
    exampleBody:
      "Open the Bambu Lab sample to review the current findings, inspect the supporting posts, and ask follow-up questions against the same dashboard.",
    exampleFinding:
      "Entry-level products are earning strong reviews, while one reliability complaint needs attention",
    exampleFindingBody:
      "P1S, A1 mini, and AMS multicolor lead positive conversation, while one reliability review is starting to spread.",
    exampleMetrics: [
      { value: "21.7K", label: "Related conversations" },
      { value: "147.8M", label: "Potential reach" },
      { value: "74%", label: "Positive conversation" },
    ],
    exampleCta: "Open the Bambu Lab sample",
    workflowLabel: "How it works",
    workflowTitle: "From a brand name to a source-linked finding",
    workflowBody:
      "Set the brand and competitors once. The report highlights repeated changes; the original posts stay one click away.",
    workflow: [
      {
        title: "Enter the brand and market",
        body: "Set the brand, competitors, products, and topics that define the monitoring scope.",
      },
      {
        title: "Review the prioritized findings",
        body: "See growth signals, reputation risks, customer needs, and competitor changes before scanning raw posts.",
      },
      {
        title: "Verify the source and act",
        body: "Open the original conversation, check the context, and send the issue to the person who owns it.",
      },
    ],
    useCasesLabel: "When to use it",
    useCasesTitle: "Use brand monitoring when a repeated issue needs checking now",
    useCases: [
      {
        title: "Protect brand reputation",
        body: "Catch repeated reliability, support, safety, or trust issues before they become the meeting agenda.",
      },
      {
        title: "Plan launches and content",
        body: "See which features, use cases, and customer language are earning attention across platforms.",
      },
      {
        title: "Track competitors",
        body: "Understand where competitors are gaining share of voice and what is driving the comparison.",
      },
      {
        title: "Bring customer evidence into decisions",
        body: "Share the same customer quotes and source posts with product, marketing, and research.",
      },
    ],
    comparisonLabel: "Monitoring, listening, intelligence",
    comparisonTitle: "Three layers of the same workflow",
    comparisonBody:
      "Monitoring shows the change. Listening adds the customer language and context. Consumer intelligence connects that evidence to a business question.",
    comparisonHeaders: ["Layer", "Primary question", "DataScaler output"],
    comparisonRows: [
      ["Brand monitoring", "What changed?", "Volume, sentiment, risks, and competitor movement"],
      ["Social listening", "Why did it change?", "Themes, objections, customer language, and platform context"],
      ["Consumer intelligence", "What should we do?", "Source-linked findings, follow-ups, and prioritized actions"],
    ],
    faqLabel: "FAQ",
    faqTitle: "Brand monitoring questions, answered",
    faqs: [
      {
        question: "What is brand monitoring?",
        answer:
          "Brand monitoring tracks public conversations about a company, product, competitor, or category so teams can see changes in attention, sentiment, reputation risk, and demand.",
      },
      {
        question: "How is brand monitoring different from social listening?",
        answer:
          "Monitoring focuses on what changed. Social listening adds the themes, customer language, sentiment, and context that explain why it changed. DataScaler connects both layers to source evidence and next actions.",
      },
      {
        question: "Which sources does DataScaler monitor?",
        answer:
          "DataScaler covers public conversations across YouTube, TikTok, X, Facebook, Instagram, Threads, Pinterest, Trustpilot, Reddit, and Amazon Reviews.",
      },
      {
        question: "How often is brand monitoring data updated?",
        answer:
          "Routine monitoring refreshes weekly. Enterprise workflows can use higher-frequency updates and anomaly alerts.",
      },
      {
        question: "Can I verify the findings?",
        answer:
          "Yes. DataScaler links findings to the underlying public posts, comments, and engagement data so your team can inspect the evidence directly.",
      },
    ],
    finalTitle: "Check the conversation around your brand",
    finalBody:
      "Run a quick scan for your brand, or open the Bambu Lab sample before you sign up.",
    finalPrimary: "Analyze my brand",
    finalSecondary: "Explore the sample",
  },
  zh: {
    eyebrow: "海外社媒舆情监测",
    title: "面向出海品牌的海外社媒舆情监测",
    intro:
      "查看品牌在哪些海外平台被讨论、哪些话题正在升温、同一类投诉有没有反复出现。DataScaler 把公开帖子、评论和商品评价整理成一份简报，每条结论都能点回原帖。",
    proof: "覆盖 10 个海外公开平台 · 每条结论可回到原帖 · 免费体验",
    primaryCta: "分析我的品牌",
    secondaryCta: "查看 Bambu Lab 示例",
    platformLabel: "覆盖影响海外消费者决策的公开渠道",
    definitionLabel: "品类说明",
    definitionTitle: "什么是海外社媒舆情监测？",
    definitionBody:
      "海外社媒舆情监测，就是持续记录品牌、产品、竞品和品类在公开平台上的讨论变化。提及量说明变化有多大，原帖和评论说明变化从哪里来。DataScaler 把这两部分放在同一份报告里。",
    layers: [
      {
        label: "监测",
        question: "发生了什么？",
        body: "追踪品牌提及、讨论量、互动和异常变化。",
      },
      {
        label: "聆听",
        question: "为什么会发生？",
        body: "理解话题、用户态度、购买顾虑和平台差异。",
      },
      {
        label: "核验",
        question: "这件事需要处理吗？",
        body: "打开原帖，看问题是否重复出现，再交给对应负责人。",
      },
    ],
    capabilityLabel: "品牌舆情监测",
    capabilityTitle: "一份品牌监测报告，先回答这五个问题",
    capabilityBody:
      "DataScaler 收集海外公开帖子、评论、社区与商品评价。你不必先翻完原帖，而是先看哪些变化、风险和用户问题值得核实。",
    capabilities: [
      {
        title: "品牌提及与讨论量",
        body: "查看讨论什么时候增长、出现在哪个平台，以及哪些产品或话题在推动变化。",
      },
      {
        title: "用户态度与口碑风险",
        body: "区分正面增长和反复出现的可靠性、售后、价格、安全或产品适配问题。",
      },
      {
        title: "消费者需求与购买顾虑",
        body: "保留用户在比较、犹豫、推荐和投诉时使用的真实语言。",
      },
      {
        title: "竞品监测",
        body: "发现竞品何时获得更多关注，以及哪些话题正在改变用户比较标准。",
      },
      {
        title: "原帖级证据",
        body: "点击查看结论背后的帖子、评论和互动数据，不依赖无法核验的 AI 总结。",
      },
    ],
    exampleLabel: "真实品牌报告",
    exampleTitle: "先看一份真实报告，再决定是否注册",
    exampleBody:
      "打开 Bambu Lab 示例看板，先读关键结论和指标；需要时查看原帖，或基于同一份看板继续向 AI 追问。",
    exampleFinding: "入门产品口碑稳定，一条可靠性差评值得关注",
    exampleFindingBody:
      "P1S、A1 mini 和 AMS 多色打印是高频正面话题；一条可靠性负面测评正被反复转发。",
    exampleMetrics: [
      { value: "21.7K", label: "相关讨论" },
      { value: "147.8M", label: "潜在触达" },
      { value: "74%", label: "正面讨论" },
    ],
    exampleCta: "打开 Bambu Lab 示例",
    workflowLabel: "如何使用",
    workflowTitle: "输入品牌后，你会看到什么",
    workflowBody:
      "设置品牌和竞品后，报告会优先列出重复出现的变化；需要核实时，原帖就在结论旁边。",
    workflow: [
      {
        title: "输入品牌与市场",
        body: "设置品牌、竞品、产品和重点话题，明确海外舆情监测范围。",
      },
      {
        title: "查看优先级结论",
        body: "先看增长信号、口碑风险、消费者需求和竞品变化，不必从海量原帖开始翻。",
      },
      {
        title: "核验来源并行动",
        body: "打开原始讨论，确认语境，再交给产品、内容或客服负责人。",
      },
    ],
    useCasesLabel: "适用场景",
    useCasesTitle: "当一个问题反复出现，不必等到下一轮调研",
    useCases: [
      {
        title: "品牌口碑监测",
        body: "尽早发现反复出现的可靠性、售后、安全与信任问题。",
      },
      {
        title: "新品与内容规划",
        body: "了解哪些功能、使用场景和用户表达正在海外平台获得关注。",
      },
      {
        title: "竞品监测",
        body: "判断竞品在哪些平台提升声量，以及什么话题正在推动用户比较。",
      },
      {
        title: "消费者洞察",
        body: "产品、市场和研究看到同一组用户原话，不再围绕截图反复确认。",
      },
    ],
    comparisonLabel: "监测、聆听、洞察",
    comparisonTitle: "同一条工作流的三个层级",
    comparisonBody:
      "舆情监测先标出变化，社交媒体聆听补上用户原话和语境，消费者洞察再把证据放回具体业务问题。",
    comparisonHeaders: ["层级", "核心问题", "DataScaler 输出"],
    comparisonRows: [
      ["舆情监测", "发生了什么？", "讨论量、用户态度、口碑风险和竞品变化"],
      ["社交媒体聆听", "为什么发生？", "话题、购买顾虑、用户语言和平台语境"],
      ["消费者洞察", "下一步做什么？", "可溯源结论、AI 追问和行动优先级"],
    ],
    faqLabel: "常见问题",
    faqTitle: "关于海外社媒舆情监测",
    faqs: [
      {
        question: "什么是海外社媒舆情监测？",
        answer:
          "海外社媒舆情监测会持续记录品牌、产品、竞品和品类在公开平台上的讨论，重点看提及量、用户态度和重复问题有没有变化。",
      },
      {
        question: "社交媒体聆听和舆情监测有什么区别？",
        answer:
          "舆情监测先标出变化；社交媒体聆听继续查看用户原话、话题和平台语境。两者都保留对应的原帖来源。",
      },
      {
        question: "DataScaler 可以监测哪些海外平台？",
        answer:
          "目前覆盖 YouTube、TikTok、X、Facebook、Instagram、Threads、Pinterest、Trustpilot、Reddit 和 Amazon Reviews 等 10 个公开平台。",
      },
      {
        question: "数据多久更新一次？",
        answer:
          "常规监测按周更新；Enterprise 工作流可使用更高频更新和异常提醒。",
      },
      {
        question: "AI 结论可以核验吗？",
        answer:
          "可以。每条结论旁边都有对应的公开帖子、评论和互动数据，可以直接点开查看。",
      },
    ],
    finalTitle: "先看看海外用户正在怎么讨论你的品牌",
    finalBody: "输入你的品牌查看初步结果，或先打开 Bambu Lab 示例看板。",
    finalPrimary: "分析我的品牌",
    finalSecondary: "查看示例报告",
  },
};

const CAPABILITY_ICONS = [Radar, ShieldAlert, UsersRound, BarChart3, Search];
const USE_CASE_ICONS = [ShieldAlert, Sparkles, Target, MessageSquareText];

const RELATED_RESOURCES: Record<
  SiteLang,
  Array<{ label: string; title: string; body: string; href: string }>
> = {
  en: [
    {
      label: "Category guide",
      title: "Brand intelligence vs social listening vs social monitoring",
      body: "Understand which layer detects change, explains the conversation, and turns evidence into action.",
      href: "/blog/brand-intelligence-vs-social-listening-en",
    },
    {
      label: "Brand report",
      title: "Bambu Lab reviews: where purchase confidence still breaks",
      body: "See how strong product attention can coexist with reliability, support, openness, and safety concerns.",
      href: "/blog/bambu-lab-reviews-purchase-confidence-en",
    },
    {
      label: "Research method",
      title: "A five-step Voice of Customer analysis method",
      body: "Turn posts, comments, and reviews into source-linked priorities for product, marketing, and support.",
      href: "/blog/voice-of-customer-analysis-method-en",
    },
  ],
  zh: [
    {
      label: "品类指南",
      title: "品牌情报、社交聆听与社媒监测有什么区别",
      body: "用具体案例说明社媒监测、社交聆听和品牌情报各自解决什么问题。",
      href: "/blog/brand-intelligence-vs-social-listening-cn",
    },
    {
      label: "品牌报告",
      title: "拓竹高热度背后，购买信心仍卡在哪里",
      body: "查看产品热度如何与可靠性、售后、开放性和安全顾虑同时存在。",
      href: "/blog/bambu-lab-purchase-confidence-cn",
    },
    {
      label: "研究方法",
      title: "从用户反馈到业务行动的五步 VOC 分析方法",
      body: "把帖子、评论和评价整理成一份有来源、有优先级的用户问题清单。",
      href: "/blog/voice-of-customer-analysis-method-cn",
    },
  ],
};

export function BrandMonitoringPillarPage({ lang }: { lang: SiteLang }) {
  const copy = COPY[lang];
  const playgroundUrl = getPlaygroundUrl(lang);
  const sampleUrl = getPlaygroundSampleUrl(lang);
  const languageHref = lang === "en" ? "/brand-monitoring" : "/en/brand-monitoring";
  const socialListeningHref = lang === "en" ? "/en/social-listening" : "/social-listening";
  const relatedResources = RELATED_RESOURCES[lang];

  return (
    <CleanSitePage lang={lang} languageHref={languageHref}>
      <main>
        <section className="relative overflow-hidden border-b border-[#3d2673] bg-[radial-gradient(circle_at_74%_24%,#d7c8ff_0%,#eee7ff_32%,#fbf9ff_68%)] px-5 py-16 lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#7047eb]/15" />
          <div className="pointer-events-none absolute right-24 top-32 h-44 w-44 rounded-full border border-[#7047eb]/10" />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <CleanSectionLabel>{copy.eyebrow}</CleanSectionLabel>
              <h1 className="mt-6 text-balance text-[clamp(46px,6.6vw,82px)] font-black leading-[0.96] tracking-[-0.06em] text-[#24133f]">
                {copy.title}
              </h1>
              <p className="mt-7 max-w-[700px] text-base leading-7 text-[#24133f]/65 sm:text-lg">
                {copy.intro}
              </p>
              <p className="mt-5 text-sm font-bold text-[#24133f]/55">{copy.proof}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${playgroundUrl}#brand-scan-form`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7047eb] px-6 py-4 text-sm font-black text-white shadow-[0_14px_36px_rgba(112,71,235,0.28)] transition hover:-translate-y-0.5"
                >
                  {copy.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={sampleUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3d2673]/20 bg-white/75 px-6 py-4 text-sm font-black text-[#24133f] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.secondaryCta}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#3d2673]/15 bg-white/85 p-4 shadow-[0_28px_80px_rgba(61,38,115,0.16)] backdrop-blur sm:p-6">
              <div className="flex items-center justify-between border-b border-[#3d2673]/10 pb-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.15em] text-[#7047eb]">
                    {lang === "en" ? "Market brief" : "市场简报"}
                  </div>
                  <div className="mt-1 text-lg font-black text-[#24133f]">Bambu Lab</div>
                </div>
                <span className="rounded-full bg-[#f5ff63] px-3 py-1.5 text-[11px] font-black text-[#24133f]">
                  {lang === "en" ? "Last 7 days" : "过去 7 天"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-5">
                {copy.exampleMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-[#f4f0fa] p-3">
                    <div className="text-xl font-black tracking-[-0.04em] text-[#24133f]">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-[10px] font-bold leading-4 text-[#24133f]/50">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-[#7047eb]/15 bg-[#eee7ff] p-5">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7047eb]">
                  {lang === "en" ? "Key finding · Ref 026" : "本周重点 · Ref 026"}
                </div>
                <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.03em] text-[#24133f]">
                  {copy.exampleFinding}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#24133f]/60">
                  {copy.exampleFindingBody}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#7047eb]">
                  <span>{lang === "en" ? "Open source evidence" : "查看原帖证据"}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-white px-5 py-8 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center text-xs font-black uppercase tracking-[0.14em] text-[#24133f]/40">
              {copy.platformLabel}
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {PLATFORMS.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-[#3d2673]/12 bg-[#fbf9ff] px-4 py-2 text-xs font-bold text-[#24133f]/65"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#fbf9ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <CleanSectionLabel>{copy.definitionLabel}</CleanSectionLabel>
                <h2 className="mt-5 text-balance text-[clamp(36px,4.6vw,58px)] font-black leading-[1] tracking-[-0.05em] text-[#24133f]">
                  {copy.definitionTitle}
                </h2>
                <p className="mt-6 text-base leading-7 text-[#24133f]/62">
                  {copy.definitionBody}
                </p>
              </div>
              <div className="grid gap-3">
                {copy.layers.map((layer, index) => (
                  <article
                    key={layer.label}
                    className="grid gap-4 rounded-[22px] border border-[#3d2673]/15 bg-white p-5 sm:grid-cols-[90px_1fr] sm:p-6"
                  >
                    <div className="flex items-center gap-3 sm:block">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#7047eb] text-xs font-black text-white">
                        0{index + 1}
                      </span>
                      <div className="mt-0 text-xs font-black uppercase tracking-[0.13em] text-[#7047eb] sm:mt-3">
                        {layer.label}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-[-0.03em] text-[#24133f]">
                        {layer.question}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#24133f]/60">{layer.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#eee7ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{copy.capabilityLabel}</CleanSectionLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <h2 className="text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                {copy.capabilityTitle}
              </h2>
              <p className="text-base leading-7 text-[#24133f]/62">{copy.capabilityBody}</p>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {copy.capabilities.map((capability, index) => {
                const Icon = CAPABILITY_ICONS[index];
                return (
                  <article
                    key={capability.title}
                    className={`rounded-[24px] border border-[#3d2673]/15 p-6 ${
                      index === 4 ? "bg-[#24133f] text-white md:col-span-2 lg:col-span-1" : "bg-white"
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-2xl ${
                        index === 4 ? "bg-[#f5ff63] text-[#24133f]" : "bg-[#eee7ff] text-[#7047eb]"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-black leading-tight tracking-[-0.03em]">
                      {capability.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-6 ${index === 4 ? "text-white/65" : "text-[#24133f]/60"}`}
                    >
                      {capability.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-white px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>
              {lang === "en" ? "Research and examples" : "研究与案例"}
            </CleanSectionLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <h2 className="text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                {lang === "en"
                  ? "Go deeper into the signals behind brand monitoring"
                  : "继续查看品牌监测背后的方法与真实证据"}
              </h2>
              <p className="text-base leading-7 text-[#24133f]/62">
                {lang === "en"
                  ? "These three articles cover the category definitions, a real Bambu Lab report, and a practical VOC analysis method."
                  : "下面三篇内容分别展开概念区别、Bambu Lab 真实报告和 VOC 分析方法。"}
              </p>
            </div>
            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {relatedResources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group flex min-h-[260px] flex-col rounded-[24px] border border-[#3d2673]/15 bg-[#fbf9ff] p-6 transition hover:-translate-y-1 hover:border-[#7047eb]/40 hover:shadow-[0_18px_50px_rgba(61,38,115,0.12)]"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7047eb]">
                    {resource.label}
                  </span>
                  <h3 className="mt-8 text-2xl font-black leading-tight tracking-[-0.04em] text-[#24133f]">
                    {resource.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#24133f]/58">
                    {resource.body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-[#7047eb]">
                    {lang === "en" ? "Read article" : "阅读全文"}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-white px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <CleanSectionLabel>{copy.exampleLabel}</CleanSectionLabel>
              <h2 className="mt-5 text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                {copy.exampleTitle}
              </h2>
              <p className="mt-6 text-base leading-7 text-[#24133f]/62">{copy.exampleBody}</p>
              <Link
                href={sampleUrl}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#7047eb] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                {copy.exampleCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-[28px] border border-[#3d2673] bg-[#24133f] p-5 text-white shadow-[12px_12px_0_#f5ff63] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#a991ff]">
                    {lang === "en" ? "Brand monitoring report" : "品牌舆情监测报告"}
                  </div>
                  <div className="mt-1 text-lg font-black">Bambu Lab</div>
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-black text-white/60">
                  {lang === "en" ? "Sources included" : "原帖可查"}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {copy.exampleMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl bg-white/[0.07] p-3">
                    <div className="text-xl font-black text-[#f5ff63]">{metric.value}</div>
                    <div className="mt-1 text-[10px] leading-4 text-white/50">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#a991ff]">
                  {lang === "en" ? "Key finding · Ref 026" : "重点结论 · Ref 026"}
                </div>
                <h3 className="mt-3 text-xl font-black leading-tight tracking-[-0.03em]">
                  {copy.exampleFinding}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{copy.exampleFindingBody}</p>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  lang === "en" ? "Open the source" : "查看原帖",
                  lang === "en" ? "Ask a follow-up" : "继续追问",
                  lang === "en" ? "Plan the action" : "安排下一步",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-bold text-white/65">
                    <Check className="h-3.5 w-3.5 text-[#f5ff63]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#fbf9ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-[780px]">
              <CleanSectionLabel>{copy.workflowLabel}</CleanSectionLabel>
              <h2 className="mt-5 text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                {copy.workflowTitle}
              </h2>
              <p className="mt-6 text-base leading-7 text-[#24133f]/62">{copy.workflowBody}</p>
            </div>
            <div className="mt-10 grid gap-3 lg:grid-cols-3">
                {copy.workflow.map((step, index) => (
                <article
                  key={step.title}
                  className="relative overflow-hidden rounded-[24px] border border-[#3d2673]/15 bg-white p-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-4 top-2 text-[72px] font-black leading-none text-[#7047eb]/[0.07]"
                  >
                    0{index + 1}
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f5ff63] text-xs font-black text-[#24133f]">
                    0{index + 1}
                  </span>
                  <h3 className="relative mt-8 text-xl font-black tracking-[-0.03em] text-[#24133f]">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-6 text-[#24133f]/60">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#eee7ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{copy.useCasesLabel}</CleanSectionLabel>
            <h2 className="mt-5 max-w-[900px] text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
              {copy.useCasesTitle}
            </h2>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {copy.useCases.map((useCase, index) => {
                const Icon = USE_CASE_ICONS[index];
                return (
                  <article
                    key={useCase.title}
                    className="flex gap-5 rounded-[24px] border border-[#3d2673]/15 bg-white p-6"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#7047eb] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black tracking-[-0.03em] text-[#24133f]">
                        {useCase.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#24133f]/60">{useCase.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-white px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <CleanSectionLabel>{copy.comparisonLabel}</CleanSectionLabel>
                <h2 className="mt-5 text-balance text-[clamp(36px,4.8vw,58px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                  {copy.comparisonTitle}
                </h2>
                <p className="mt-6 text-base leading-7 text-[#24133f]/62">{copy.comparisonBody}</p>
                <Link
                  href={socialListeningHref}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#7047eb]"
                >
                  {lang === "en"
                    ? "Explore the Social Listening solution"
                    : "继续查看社交媒体聆听方案"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-[#3d2673]/15">
                <div className="hidden grid-cols-[0.8fr_0.9fr_1.3fr] bg-[#24133f] px-5 py-4 text-[10px] font-black uppercase tracking-[0.13em] text-white/55 sm:grid">
                  {copy.comparisonHeaders.map((header) => (
                    <div key={header}>{header}</div>
                  ))}
                </div>
                {copy.comparisonRows.map((row, index) => (
                  <div
                    key={row[0]}
                    className={`grid gap-2 px-5 py-5 sm:grid-cols-[0.8fr_0.9fr_1.3fr] ${
                      index < copy.comparisonRows.length - 1 ? "border-b border-[#3d2673]/10" : ""
                    }`}
                  >
                    <div className="text-sm font-black text-[#7047eb]">{row[0]}</div>
                    <div className="text-sm font-bold text-[#24133f]">{row[1]}</div>
                    <div className="text-sm leading-6 text-[#24133f]/60">{row[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#fbf9ff] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <CleanSectionLabel>{copy.faqLabel}</CleanSectionLabel>
              <h2 className="mt-5 text-balance text-[clamp(36px,4.6vw,56px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                {copy.faqTitle}
              </h2>
            </div>
            <div className="divide-y divide-[#3d2673]/12 border-y border-[#3d2673]/15">
              {copy.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-black text-[#24133f] marker:content-none">
                    {faq.question}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#3d2673]/15 text-lg font-medium text-[#7047eb] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-[760px] pt-4 text-sm leading-6 text-[#24133f]/62">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#f5ff63] px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <CleanSectionLabel>{lang === "en" ? "Start with the evidence" : "先看证据"}</CleanSectionLabel>
              <h2 className="mt-5 max-w-[800px] text-balance text-[clamp(36px,4.8vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[#24133f]">
                {copy.finalTitle}
              </h2>
              <p className="mt-5 text-base leading-7 text-[#24133f]/62">{copy.finalBody}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href={`${playgroundUrl}#brand-scan-form`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7047eb] px-6 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(36,19,63,0.2)] transition hover:-translate-y-0.5"
              >
                {copy.finalPrimary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={sampleUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3d2673]/25 bg-white/75 px-6 py-4 text-sm font-black text-[#24133f] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.finalSecondary}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </CleanSitePage>
  );
}

export function getBrandMonitoringFaqs(lang: SiteLang) {
  return COPY[lang].faqs;
}
