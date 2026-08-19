import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

import {
  CleanCtaBand,
  CleanSitePage,
  type SiteLang,
} from "@/components/CleanSiteChrome";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { getPlaygroundUrl } from "@/lib/app-links";
import type { TocEntry } from "@/lib/lexical";

const COPY = {
  zh: {
    back: "返回文章列表",
    backHref: "/blog",
    category: "示例报告",
    tag: "品牌情报",
    title: "从公开讨论到品牌决策：一份可溯源的 AI 品牌情报示例",
    excerpt:
      "这是一份不依赖 CMS 的静态示例文章，用来展示 DataScaler 如何把零散的公开讨论整理成可决策、可溯源的洞察。",
    date: "2026 年 8 月 5 日",
    readTime: "阅读约 6 分钟",
    author: "DataScaler Research",
    demo: "示例数据 · 仅用于产品展示",
    tocLabel: "本页目录",
    toc: [
      ["overview", "先看结论"],
      ["snapshot", "关键指标"],
      ["method", "AI 如何形成判断"],
      ["sources", "结论如何溯源"],
      ["actions", "建议采取的行动"],
    ],
    overviewTitle: "先看结论",
    overviewLead:
      "真正有用的品牌情报，不是把更多帖子堆进看板，而是回答清楚三件事：市场在发生什么、为什么发生、团队现在该做什么。",
    overviewBody:
      "在这份示例里，DataScaler 把跨平台讨论归到三个决策主题：产品价值是否被用户理解、信任风险集中在哪些环节、哪些内容信号在影响购买。每条判断都保留原始来源，团队可以快速复核。",
    summary:
      "示例结论：品牌声量在增长，但主要来自内容曝光；真正影响购买的讨论，仍集中在产品可靠性、售后体验和使用门槛。",
    snapshotTitle: "关键指标",
    snapshotLead:
      "下面的数据为静态示例，用于说明报告如何建立从“信号”到“判断”的层级，而非代表任何品牌的实时表现。",
    metrics: [
      ["9", "公开社媒平台"],
      ["12,480", "条示例讨论"],
      ["3", "个核心决策主题"],
      ["100%", "结论保留溯源"],
    ],
    chartCaption: "示例看板：跨平台声量、情绪与议题结构概览。",
    methodTitle: "AI 如何形成判断",
    methodLead:
      "DataScaler 不直接用单条高赞评论代表市场，而是先聚合相似表达，再结合来源、时间、互动量和语义上下文形成判断。",
    steps: [
      ["01", "收集", "覆盖公开社媒、论坛与视频评论，保留平台、时间和原始链接。"],
      ["02", "归因", "把相似表达归并为需求、满意点、痛点与风险主题，减少重复噪声。"],
      ["03", "验证", "用跨平台一致性和原始讨论验证结论，避免被单一爆帖带偏。"],
      ["04", "行动", "把洞察转化为产品、内容、客服和市场团队可以执行的下一步。"],
    ],
    insightCaption: "示例洞察引擎：从讨论主题进一步拆解需求驱动与信任风险。",
    sourcesTitle: "结论如何溯源",
    sourcesLead:
      "报告中的数字、结论和建议都可以回到原始讨论。团队既能看总体趋势，也能抽查具体用户语境。",
    sources: [
      ["Reddit", "Source 01", "用户比较同类产品时，反复提到长期可靠性与维修成本。"],
      ["YouTube", "Source 02", "测评视频带来集中曝光，但评论区更关注实际使用限制。"],
      ["TikTok", "Source 03", "短视频提升新品认知，购买疑问主要集中在场景适配。"],
    ],
    actionsTitle: "建议采取的行动",
    actionsLead:
      "洞察最终要进入业务流程。基于本示例，团队可以把下一周的工作压缩成三个明确动作。",
    actions: [
      "内容团队：减少泛功能介绍，优先回答可靠性、使用门槛和场景适配问题。",
      "产品团队：把高频摩擦点加入 VOC 验证清单，区分真实缺陷与认知偏差。",
      "客户团队：为售后与维修相关问题建立统一话术，并持续追踪风险变化。",
    ],
    playgroundTitle: "想看交互版本？",
    playgroundBody: "进入产品体验页，输入一个品牌，体验从粗数据到完整报告的流程。",
    playgroundLabel: "打开产品体验",
    ctaEyebrow: "DataScaler",
    ctaTitle: "把公开讨论，变成下一步决策。",
    ctaLabel: "免费生成报告",
  },
  en: {
    back: "All articles",
    backHref: "/en/blog",
    category: "Example report",
    tag: "Brand intelligence",
    title: "From Public Conversations to Brand Decisions: A Traceable AI Intelligence Example",
    excerpt:
      "A CMS-free static article showing how DataScaler turns fragmented public conversations into key metrics, traceable findings and clear next actions.",
    date: "August 5, 2026",
    readTime: "6 min read",
    author: "DataScaler Research",
    demo: "Sample data · For product demonstration only",
    tocLabel: "On this page",
    toc: [
      ["overview", "Executive summary"],
      ["snapshot", "Signal snapshot"],
      ["method", "How AI forms a finding"],
      ["sources", "Tracing every conclusion"],
      ["actions", "Recommended actions"],
    ],
    overviewTitle: "Executive summary",
    overviewLead:
      "Useful brand intelligence is not a larger pile of posts. It should answer what is changing, why it is changing and what the team should do next.",
    overviewBody:
      "In this example, DataScaler organizes cross-platform conversations into three decision themes: whether customers understand the product value, where trust risk concentrates, and which content signals shape purchase decisions. Every finding retains its source for fast verification.",
    summary:
      "Example finding: brand visibility is rising, but most growth is exposure-led. The conversations that influence purchase still concentrate on reliability, support experience and ease of use.",
    snapshotTitle: "Signal snapshot",
    snapshotLead:
      "The values below are static sample data. They demonstrate how a report moves from raw signal to a decision, and do not represent live brand performance.",
    metrics: [
      ["9", "public social platforms"],
      ["12,480", "sample conversations"],
      ["3", "decision themes"],
      ["100%", "findings traceable"],
    ],
    chartCaption: "Example dashboard: cross-platform volume, sentiment and topic structure.",
    methodTitle: "How AI forms a finding",
    methodLead:
      "DataScaler does not treat one highly liked comment as the market. It clusters similar expressions, then weighs source, time, engagement and semantic context.",
    steps: [
      ["01", "Collect", "Cover public social, community and video comments while retaining source, time and original link."],
      ["02", "Attribute", "Group similar expressions into needs, strengths, friction and risks to remove repetitive noise."],
      ["03", "Validate", "Check cross-platform consistency and original context so one viral post cannot distort the conclusion."],
      ["04", "Act", "Turn the finding into a next step for product, content, support and market teams."],
    ],
    insightCaption: "Example insight engine: demand drivers and trust risks derived from topic clusters.",
    sourcesTitle: "Tracing every conclusion",
    sourcesLead:
      "Every number, finding and recommendation can be traced back to public conversations. Teams can read the pattern and inspect the exact customer context.",
    sources: [
      ["Reddit", "Source 01", "When comparing alternatives, users repeatedly discuss long-term reliability and repair cost."],
      ["YouTube", "Source 02", "Reviews create concentrated reach, while comments focus on real-world limitations."],
      ["TikTok", "Source 03", "Short video lifts awareness, with purchase questions centered on use-case fit."],
    ],
    actionsTitle: "Recommended actions",
    actionsLead:
      "Insight matters when it enters a workflow. In this example, the next week of work becomes three clear actions.",
    actions: [
      "Content: move beyond generic feature lists and answer reliability, ease-of-use and scenario-fit questions.",
      "Product: add recurring friction to the VOC validation list and separate true defects from expectation gaps.",
      "Customer teams: standardize support and repair messaging, then track whether trust risk declines.",
    ],
    playgroundTitle: "Want the interactive version?",
    playgroundBody: "Open Playground, enter a brand and experience the flow from rough signals to a complete report.",
    playgroundLabel: "Open Playground",
    ctaEyebrow: "DataScaler",
    ctaTitle: "Turn public conversations into the next decision.",
    ctaLabel: "Generate a free report",
  },
} as const;

export function StaticBlogExamplePage({ lang }: { lang: SiteLang }) {
  const t = COPY[lang];
  const toc: TocEntry[] = t.toc.map(([id, label]) => ({ id, label, level: 2 }));

  return (
    <CleanSitePage lang={lang}>
      <main>
        <header className="border-b border-[#3d2673] bg-[radial-gradient(circle_at_50%_10%,#d8c8ff_0%,#eee7ff_42%,#fbf9ff_82%)] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <Link
              href={t.backHref}
              className="mb-9 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.1em] text-[#24133f]/50 hover:text-[#24133f]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t.back}
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="border border-[#3d2673] bg-[#f5ff63] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#24133f]">
                {t.category}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#24133f]/45">
                {t.tag}
              </span>
            </div>

            <h1 className="max-w-[1060px] text-balance text-[clamp(38px,5.5vw,68px)] font-black leading-[1.01] tracking-[-0.055em] text-[#24133f]">
              {t.title}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-7 text-[#24133f]/60 md:text-lg">
              {t.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#3d2673]/20 pt-5 text-[10px] font-black uppercase tracking-[0.08em] text-[#24133f]/45">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {t.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {t.readTime}
              </span>
              <span>{t.author}</span>
              <span className="ml-auto border border-[#3d2673]/20 bg-white/50 px-2.5 py-1 text-[#24133f]/55">
                {t.demo}
              </span>
            </div>

            <div className="mx-auto mt-12 max-w-[1040px] overflow-hidden border border-[#3d2673] bg-white p-2 shadow-[10px_10px_0_#f5ff63]">
              <Image
                src="/blog-seed/anker-hero.jpg"
                alt={lang === "en" ? "DataScaler brand intelligence example report" : "DataScaler 品牌情报示例报告"}
                width={1672}
                height={941}
                priority
                sizes="(max-width: 1100px) 100vw, 1040px"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </header>

        <div className="bg-white px-5 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1180px] lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
            <details className="mb-10 border border-[#3d2673] bg-[#f4f0fa] p-4 lg:hidden">
              <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.12em] text-[#24133f]/55">
                {t.tocLabel}
              </summary>
              <ul className="mt-3 space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="block text-xs font-semibold text-[#24133f]/55 hover:text-[#24133f]">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            <article className="prose-article max-w-3xl">
              <h2 id="overview">{t.overviewTitle}</h2>
              <p className="lead">{t.overviewLead}</p>
              <p>{t.overviewBody}</p>
              <blockquote>{t.summary}</blockquote>

              <h2 id="snapshot">{t.snapshotTitle}</h2>
              <p>{t.snapshotLead}</p>
              <div className="my-8 grid border-l border-t border-[#3d2673] sm:grid-cols-2">
                {t.metrics.map(([value, label], index) => (
                  <div
                    key={label}
                    className={`min-h-36 border-b border-r border-[#3d2673] p-6 ${index === 0 ? "bg-[#f5ff63]" : index === 1 ? "bg-[#d8c8ff]" : "bg-[#fbf9ff]"}`}
                  >
                    <div className="text-4xl font-black leading-none tracking-[-0.05em] text-[#24133f]">{value}</div>
                    <div className="mt-5 text-[11px] font-black uppercase tracking-[0.09em] text-[#24133f]/50">{label}</div>
                  </div>
                ))}
              </div>

              <figure className="my-10">
                <Image
                  src="/blog-seed/anker-dashboard.jpg"
                  alt={t.chartCaption}
                  width={1672}
                  height={941}
                  sizes="(max-width: 900px) 100vw, 760px"
                  className="h-auto w-full border border-[#3d2673]"
                />
                <figcaption className="mt-3 text-xs text-[#24133f]/45">{t.chartCaption}</figcaption>
              </figure>

              <h2 id="method">{t.methodTitle}</h2>
              <p>{t.methodLead}</p>
              <div className="my-8 border-t border-[#3d2673]">
                {t.steps.map(([number, title, body]) => (
                  <div key={number} className="grid gap-3 border-b border-[#3d2673] py-6 sm:grid-cols-[58px_120px_1fr]">
                    <span className="text-xs font-black text-[#7047eb]">{number}</span>
                    <strong className="text-sm text-[#24133f]">{title}</strong>
                    <span className="text-sm leading-6 text-[#24133f]/60">{body}</span>
                  </div>
                ))}
              </div>

              <figure className="my-10">
                <Image
                  src="/blog-seed/anker-insight-engine.jpg"
                  alt={t.insightCaption}
                  width={1920}
                  height={640}
                  sizes="(max-width: 900px) 100vw, 760px"
                  className="h-auto w-full border border-[#3d2673]"
                />
                <figcaption className="mt-3 text-xs text-[#24133f]/45">{t.insightCaption}</figcaption>
              </figure>

              <h2 id="sources">{t.sourcesTitle}</h2>
              <p>{t.sourcesLead}</p>
              <div className="my-8 space-y-3">
                {t.sources.map(([platform, source, body]) => (
                  <div key={source} className="border border-[#3d2673] bg-[#fbf9ff] p-5 sm:grid sm:grid-cols-[115px_1fr] sm:gap-6">
                    <div>
                      <div className="text-xs font-black text-[#24133f]">{platform}</div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#24133f]/35">{source}</div>
                    </div>
                    <p className="mb-0 mt-4 text-sm leading-6 text-[#24133f]/60 sm:mt-0">{body}</p>
                  </div>
                ))}
              </div>

              <h2 id="actions">{t.actionsTitle}</h2>
              <p>{t.actionsLead}</p>
              <ol>
                {t.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ol>

              <div className="mt-12 border border-[#3d2673] bg-[#d8c8ff] p-7 shadow-[8px_8px_0_#24133f] sm:p-9">
                <h3 className="mt-0 text-2xl font-black tracking-[-0.035em] text-[#24133f]">{t.playgroundTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-[#24133f]/60">{t.playgroundBody}</p>
                <Link
                  href={getPlaygroundUrl(lang)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#7047eb] px-5 py-3 text-sm font-black text-white no-underline"
                >
                  {t.playgroundLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <ArticleToc items={toc} label={t.tocLabel} />
                <div className="border border-[#3d2673] bg-[#f5ff63] p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#24133f]/45">Demo</div>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#24133f]/70">{t.demo}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <CleanCtaBand lang={lang} eyebrow={t.ctaEyebrow} title={t.ctaTitle} label={t.ctaLabel} />
      </main>
    </CleanSitePage>
  );
}
