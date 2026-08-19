"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ExternalLink,
  Globe2,
  Menu,
  MessageSquareText,
  Play,
  Search,
  X,
} from "lucide-react";

import { track } from "@/lib/analytics";
import {
  getPlaygroundSampleUrl,
  getPlaygroundUrl,
  getSignUpUrl,
} from "@/lib/app-links";
import { setLocaleCookie } from "@/lib/i18n";
import {
  CleanSiteFooter,
  CleanSiteHeader,
  CleanWordmark,
} from "@/components/CleanSiteChrome";
import { WatchDemoDialog } from "@/components/WatchDemoDialog";
import { dashboardOrigin } from "@/components/playground/origin";
import {
  YouTubeIcon,
  TikTokIcon,
  XIcon,
  FacebookIcon,
  InstagramIcon,
  ThreadsIcon,
  PinterestIcon,
  TrustpilotIcon,
  RedditIcon,
  AmazonIcon,
} from "@/components/BrandIcons";

type Lang = "zh" | "en";

type LandingCopy = {
  nav: Array<{ label: string; href: string; external?: boolean }>;
  login: string;
  signup: string;
  switchLanguage: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroBody: string;
  heroPrimary: string;
  heroSecondary: string;
  trusted: string;
  playgroundTitle: string;
  playgroundBody: string;
  ownBrandTitle: string;
  ownBrandBody: string;
  ownBrandSteps: string[];
  ownBrandAction: string;
  sampleTitle: string;
  sampleBody: string;
  sampleMetrics: Array<{ value: string; label: string }>;
  samplePoints: string[];
  sampleAction: string;
  dashboard: {
    label: string;
    range: string;
    health: string;
    healthValue: string;
    conversations: string;
    conversationsValue: string;
    risk: string;
    riskValue: string;
    insightTitle: string;
    insightBody: string;
    source: string;
  };
  workflowTitle: string;
  workflowBody: string;
  workflow: Array<{ number: string; title: string; body: string }>;
  evidenceTitle: string;
  evidenceBody: string;
  evidencePoints: string[];
  evidencePanelTitle: string;
  evidencePanelRows: Array<{
    label: string;
    value: string;
    tone: "blue" | "yellow" | "neutral";
  }>;
  copilotTitle: string;
  copilotBody: string;
  question: string;
  answer: string;
  actionTitle: string;
  actions: Array<{ priority: string; task: string; owner: string }>;
  proofQuote: string;
  proofRole: string;
  proofStats: Array<{ value: string; label: string }>;
  ctaTitle: string;
  ctaButton: string;
  footerTagline: string;
  footerLegal: string;
};

const COPY: Record<Lang, LandingCopy> = {
  zh: {
    nav: [
      { label: "产品体验", href: getPlaygroundUrl("zh") },
      { label: "MCP", href: "/mcp" },
      { label: "定价", href: "/pricing" },
      { label: "博客", href: "/blog" },
      { label: "常见问题", href: "/faq" },
      { label: "文档", href: "https://docs.datascaler.ai/cn", external: true },
    ],
    login: "登录",
    signup: "注册",
    switchLanguage: "English",
    heroTitle: "从全球用户声音中",
    heroTitleAccent: "发现增长信号",
    heroBody:
      "分析海外社媒、社区与评论中的公开讨论，识别真实需求、信任缺口与潜在风险。",
    heroPrimary: "免费生成品牌报告",
    heroSecondary: "看 Bambu Lab 示例看板",
    trusted: "300+ 出海品牌在用 DataScaler",
    playgroundTitle: "先看结果，再决定要不要注册",
    playgroundBody:
      "输入你的品牌看初步结果，或直接打开 Bambu Lab 完整示例看板。",
    ownBrandTitle: "输入品牌，先看一份初步结果",
    ownBrandBody:
      "先看讨论量、用户态度和热门话题。注册后等邮件通知，完整报告生成完成就能看。",
    ownBrandSteps: ["输入品牌名称", "查看初步结果", "注册后等待完整报告邮件"],
    ownBrandAction: "分析我的品牌",
    sampleTitle: "查看 Bambu Lab 示例看板",
    sampleBody:
      "先看关键结论和数据，需要时点开原帖核验，或基于当前看板继续向 AI 追问。",
    sampleMetrics: [
      { value: "21.7K", label: "相关讨论" },
      { value: "147.8M", label: "潜在触达" },
      { value: "74%", label: "正面讨论" },
    ],
    samplePoints: [
      "关键结论和指标",
      "点击查看原始来源",
      "结合当前证据继续追问",
    ],
    sampleAction: "打开 Bambu Lab 示例",
    dashboard: {
      label: "市场简报 / Bambu Lab",
      range: "过去 7 天",
      health: "正面讨论",
      healthValue: "74%",
      conversations: "相关内容",
      conversationsValue: "521",
      risk: "需要关注",
      riskValue: "1 个话题",
      insightTitle: "入门产品口碑稳定，一条可靠性差评值得关注",
      insightBody:
        "P1S、A1 mini 和 AMS 多色打印是高频正面话题；一条可靠性负面测评正被反复转发。",
      source: "查看 521 条相关内容",
    },
    workflowTitle: "从用户讨论里，找到品牌下一步该做什么",
    workflowBody:
      "DataScaler 帮品牌、市场、产品团队看清发生了什么、为什么值得跟进、下一步该怎么动。每条结论都能回到原帖核验。",
    workflow: [
      {
        number: "01",
        title: "发生了什么？",
        body: "盯讨论量、用户态度、需求和竞品变化，先标出异常。",
      },
      {
        number: "02",
        title: "为什么值得关注？",
        body: "每条结论都带原帖、评论和互动数据，团队当场就能核验。",
      },
      {
        number: "03",
        title: "下一步做什么？",
        body: "基于当前数据继续追问，把要跟进的事整理成一份清单。",
      },
    ],
    evidenceTitle: "先看结论，需要时再查原帖",
    evidenceBody:
      "一页简报看完本周关键变化；点任意 [Ref] 直达对应原帖、评论和互动数据。",
    evidencePoints: [
      "一眼看完讨论量、用户态度、竞品和需求的变化",
      "每条结论都带 [Ref]，点击直达原帖和评论",
      "来源、用户态度、互动数据在同一张卡片里",
      "不用在看板、截图、原帖三处来回找",
    ],
    evidencePanelTitle: "每周消费者洞察 · dreame.com",
    evidencePanelRows: [
      { label: "本周品牌正面讨论占比", value: "78%", tone: "yellow" },
      { label: "相关讨论周环比增长", value: "+23.4%", tone: "blue" },
      { label: "竞品讨论热度在涨", value: "5 个话题", tone: "neutral" },
      { label: "养宠家庭更关心毛发清理", value: "需求增加", tone: "yellow" },
    ],
    copilotTitle: "问清原因，再排下一步",
    copilotBody:
      "对着当前看板直接问。DataScaler 基于已采集的公开内容作答，并把要跟进的事按优先级排好。",
    question: "这款产品的差评为什么突然变多了？",
    answer:
      "近 3 天，r/RobotVacuums 里关于电池续航的负面讨论明显增加。主要来自一篇获得 342 次赞同的热帖，67% 的相关评论提到“掉电变快”。",
    actionTitle: "本周待办",
    actions: [
      {
        priority: "优先",
        task: "电池续航差评增加，需尽快核实影响范围",
        owner: "先处理",
      },
      {
        priority: "本周",
        task: "Roborock 发布新品，用户对比明显增多",
        owner: "本周安排",
      },
      {
        priority: "关注",
        task: "东南亚“清关体验”讨论量上升 34%",
        owner: "持续观察",
      },
    ],
    proofQuote:
      "“以前开会，大家总在问这个结论从哪里来。现在点开原帖就能核实，会议可以直接进入下一步。”",
    proofRole: "品牌负责人 · 消费电子",
    proofStats: [
      { value: "300+", label: "已服务品牌" },
      { value: "10", label: "海外公开平台" },
      { value: "原帖", label: "支持点击核验" },
    ],
    ctaTitle: "先看清用户怎么想，再决定下一步怎么做",
    ctaButton: "免费生成品牌报告",
    footerTagline: "帮出海团队看懂海外消费者的公开讨论",
    footerLegal: "© 2026 DataScaler。保留所有权利。",
  },
  en: {
    nav: [
      { label: "Playground", href: getPlaygroundUrl("en") },
      { label: "MCP", href: "/en/mcp" },
      { label: "Pricing", href: "/en/pricing" },
      { label: "Blog", href: "/en/blog" },
      { label: "FAQ", href: "/en/faq" },
      { label: "Docs", href: "https://docs.datascaler.ai/en", external: true },
    ],
    login: "Log in",
    signup: "Sign up",
    switchLanguage: "中文",
    heroTitle: "Turn Global Consumer Voices",
    heroTitleAccent: "into Growth Signals",
    heroBody:
      "Analyze public conversations across social platforms, communities, and reviews to uncover demand, trust gaps, and emerging risks.",
    heroPrimary: "Generate a free report",
    heroSecondary: "Explore the Bambu Lab sample",
    trusted: "Trusted by 300+ global DTC and ecommerce brands",
    playgroundTitle: "See the results before you sign up",
    playgroundBody:
      "Run a quick scan for your brand, or open the complete Bambu Lab sample dashboard.",
    ownBrandTitle: "Enter your brand for a quick preview",
    ownBrandBody:
      "Preview conversation volume, sentiment, and emerging topics. Sign up for the full report, and we’ll email you when collection is complete.",
    ownBrandSteps: [
      "Enter a brand name",
      "Review the initial results",
      "Sign up and get the full report by email",
    ],
    ownBrandAction: "Analyze my brand",
    sampleTitle: "Explore the Bambu Lab dashboard",
    sampleBody:
      "Review the key findings and metrics, open the source posts, or ask the AI assistant a follow-up question about the current dashboard.",
    sampleMetrics: [
      { value: "21.7K", label: "Related conversations" },
      { value: "147.8M", label: "Potential reach" },
      { value: "74%", label: "Positive conversation" },
    ],
    samplePoints: [
      "Key findings and metrics",
      "Source posts for every finding",
      "Follow-up questions based on the current dashboard",
    ],
    sampleAction: "Open the Bambu Lab sample",
    dashboard: {
      label: "Market brief / Bambu Lab",
      range: "Last 7 days",
      health: "Positive conversation",
      healthValue: "74%",
      conversations: "Relevant content",
      conversationsValue: "521",
      risk: "Needs attention",
      riskValue: "1 topic",
      insightTitle:
        "Entry-level products are earning strong reviews, while one reliability complaint needs attention",
      insightBody:
        "P1S, A1 mini, and AMS multicolor lead positive conversation, while one reliability review is starting to spread.",
      source: "Open 521 related items",
    },
    workflowTitle: "Turn customer conversations into a clearer next move",
    workflowBody:
      "DataScaler helps brand, marketing, and product teams see what changed, why it matters, and what to do next. Every finding links back to the original conversation.",
    workflow: [
      {
        number: "01",
        title: "What changed?",
        body: "Track shifts in volume, sentiment, demand, and competitor moves—with anomalies flagged first.",
      },
      {
        number: "02",
        title: "Why does it matter?",
        body: "Every finding ships with the posts, comments, and engagement data your team needs to verify it on the spot.",
      },
      {
        number: "03",
        title: "What should we do?",
        body: "Ask follow-ups against the current data, then turn findings into a prioritized task list.",
      },
    ],
    evidenceTitle: "Start with the finding. Open the source when you need it.",
    evidenceBody:
      "Read the key changes in a one-page brief, then open any [Ref] to see the posts, comments, and engagement data behind it.",
    evidencePoints: [
      "Track changes in conversation volume, sentiment, competitors, and demand",
      "Open the original post and comments from any [Ref]",
      "Review source, sentiment, and engagement in one card",
      "Stop jumping between dashboards, screenshots, and threads",
    ],
    evidencePanelTitle: "Weekly customer intelligence · dreame.com",
    evidencePanelRows: [
      {
        label: "Positive brand conversation this week",
        value: "78%",
        tone: "yellow",
      },
      {
        label: "Conversation growth week over week",
        value: "+23.4%",
        tone: "blue",
      },
      {
        label: "Competitor conversations gaining traction",
        value: "5 topics",
        tone: "neutral",
      },
      {
        label: "Pet owners are asking for better hair pickup",
        value: "Rising need",
        tone: "yellow",
      },
    ],
    copilotTitle: "Ask why, then plan the next move",
    copilotBody:
      "Ask questions against the dashboard in front of you. DataScaler answers from collected public sources and sorts follow-ups by priority.",
    question: "What caused the recent spike in negative reviews?",
    answer:
      "Battery-life complaints rose sharply in r/RobotVacuums over the past three days. Most of the activity came from one thread with 342 upvotes, and 67% of related comments mention faster battery drain.",
    actionTitle: "This week’s tasks",
    actions: [
      {
        priority: "First",
        task: "Battery-life complaints are rising and need verification",
        owner: "Act now",
      },
      {
        priority: "This week",
        task: "Roborock launched a new model, and comparisons are picking up",
        owner: "Plan this week",
      },
      {
        priority: "Watch",
        task: "Southeast Asia customs discussion is up 34%",
        owner: "Monitor",
      },
    ],
    proofQuote:
      "“We used to spend half the meeting asking where a finding came from. Now we open the source post, verify it, and move straight to the next decision.”",
    proofRole: "Head of Brand · Consumer electronics",
    proofStats: [
      { value: "300+", label: "Brands served" },
      { value: "10", label: "Public platforms" },
      { value: "Source", label: "Links included" },
    ],
    ctaTitle: "See what customers are saying before you decide what to do next",
    ctaButton: "Generate my free brand report",
    footerTagline: "Consumer intelligence built from public conversations",
    footerLegal: "© 2026 DataScaler. All rights reserved.",
  },
};

const BRANDS = [
  { name: "Aiper", src: "/brand-logos/aiper.png", kind: "wordmark" },
  { name: "Heybike", src: "/brand-logos/heybike.svg", kind: "wordmark" },
  { name: "GameSir", src: "/brand-logos/gamesir.png", kind: "dark" },
  { name: "Snapmaker", src: "/brand-logos/snapmaker.svg", kind: "dark" },
  { name: "Momcozy", src: "/brand-logos/momcozy.png", kind: "lockup" },
  { name: "Sihoo", src: "/brand-logos/sihoo.png", kind: "lockup" },
  { name: "PETKIT", src: "/brand-logos/petkit.png", kind: "lockup" },
  { name: "LILYSILK", src: "/brand-logos/lilysilk.png", kind: "lockup" },
] as const;

// 10 个海外公开社媒平台徽章(彩色品牌图标,配色沿用深色 token)
const PLATFORMS = [
  { name: "YouTube", Icon: YouTubeIcon },
  { name: "TikTok", Icon: TikTokIcon },
  { name: "X", Icon: XIcon },
  { name: "Facebook", Icon: FacebookIcon },
  { name: "Instagram", Icon: InstagramIcon },
  { name: "Threads", Icon: ThreadsIcon },
  { name: "Pinterest", Icon: PinterestIcon },
  { name: "Trustpilot", Icon: TrustpilotIcon },
  { name: "Reddit", Icon: RedditIcon },
  { name: "Amazon Reviews", Icon: AmazonIcon },
] as const;

function LandingHeader({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const isEn = lang === "en";
  const signupUrl = getSignUpUrl(lang);
  const loginUrl = `${dashboardOrigin()}/auth/sign-in?language=${isEn ? "en-US" : "zh-CN"}`;

  const switchLanguage = () => {
    setLocaleCookie(isEn ? "zh" : "en");
    router.push(isEn ? "/" : "/en");
  };

  const openDemo = () => {
    track("watch_demo_click", { button_location: "header", locale: lang });
    setDemoOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#3d2673]/15 bg-[#fbf9ff]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href={isEn ? "/en" : "/"} aria-label="DataScaler home">
            <CleanWordmark />
          </Link>

          <nav
            className="hidden items-center gap-5 lg:flex"
            aria-label="Main navigation"
          >
            {t.nav.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold text-[#24133f]/65 transition-colors hover:text-[#7047eb]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] font-semibold text-[#24133f]/65 transition-colors hover:text-[#7047eb]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#7047eb]/25 bg-white/80 px-4 text-sm font-bold text-[#7047eb] shadow-[0_6px_18px_rgba(112,71,235,0.1)] transition hover:-translate-y-0.5 hover:border-[#7047eb]/45 hover:bg-white"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              {isEn ? "Watch a Demo" : "观看演示"}
            </button>
            <a
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header_login"
              onClick={() =>
                track("login_click", {
                  button_location: "header",
                  locale: lang,
                })
              }
              className="inline-flex h-10 items-center px-4 text-sm font-bold text-[#24133f]"
            >
              {t.login}
            </a>
            <a
              href={signupUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header_sign_up"
              onClick={() =>
                track("sign_up_click", {
                  button_location: "header",
                  locale: lang,
                })
              }
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#7047eb] px-5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(112,71,235,0.24)] transition-transform hover:-translate-y-0.5"
            >
              {t.signup}
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={switchLanguage}
              aria-label={t.switchLanguage}
              title={t.switchLanguage}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#3d2673]/20 text-[#3d2673]/60 transition-colors hover:border-[#7047eb]/50 hover:text-[#7047eb]"
            >
              <Globe2 className="h-4 w-4" />
              <span className="sr-only">{t.switchLanguage}</span>
            </button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#3d2673]/20 text-[#24133f] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[#3d2673]/10 bg-[#fbf9ff] px-5 pb-6 lg:hidden">
            <nav className="flex flex-col py-3" aria-label="Mobile navigation">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openDemo();
                }}
                className="flex items-center gap-2 border-b border-[#3d2673]/10 py-3 text-left text-sm font-bold text-[#7047eb]"
              >
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                {isEn ? "Watch a Demo" : "观看演示"}
              </button>
              {t.nav.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-[#3d2673]/10 py-3 text-sm font-bold text-[#24133f]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-[#3d2673]/10 py-3 text-sm font-bold text-[#24133f]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <div className="mt-3 flex items-center gap-3">
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-3 text-sm font-bold text-[#24133f]"
              >
                {t.login}
              </a>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#7047eb] px-5 py-3 text-sm font-bold text-white"
              >
                {t.signup}
              </a>
              <button
                type="button"
                onClick={switchLanguage}
                aria-label={t.switchLanguage}
                title={t.switchLanguage}
                className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-[#3d2673]/20 text-[#3d2673]/60"
              >
                <Globe2 className="h-4 w-4" />
                <span className="sr-only">{t.switchLanguage}</span>
              </button>
            </div>
          </div>
        ) : null}
      </header>
      <WatchDemoDialog open={demoOpen} onOpenChange={setDemoOpen} lang={lang} />
    </>
  );
}

function BrandMark({ brand }: { brand: (typeof BRANDS)[number] }) {
  if (brand.name === "Aiper") {
    return (
      <Image
        src={brand.src}
        alt={brand.name}
        width={212}
        height={92}
        loading="eager"
        className="max-h-8 w-auto max-w-24 object-contain"
      />
    );
  }

  if (brand.kind === "dark") {
    return (
      <span className="flex max-w-full items-center justify-center rounded-lg bg-[#24133f] px-2 py-2">
        <Image
          src={brand.src}
          alt={brand.name}
          width={110}
          height={24}
          loading="eager"
          className="max-h-6 w-auto max-w-[80px] object-contain"
        />
      </span>
    );
  }

  return (
    <Image
      src={brand.src}
      alt={brand.name}
      width={122}
      height={28}
      loading="eager"
      className={
        brand.kind === "lockup"
          ? "h-9 w-9 rounded-md object-contain"
          : "max-h-7 w-auto max-w-24 object-contain"
      }
    />
  );
}

function DashboardMockup({
  copy,
  lang,
}: {
  copy: LandingCopy["dashboard"];
  lang: Lang;
}) {
  const isEn = lang === "en";
  const dashboardNav = isEn
    ? ["Overview", "Signals", "Sources", "Actions"]
    : ["概览", "信号", "来源", "行动"];

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#3d2673]/55 bg-white shadow-[0_28px_80px_rgba(61,38,115,0.2)]">
      <div className="flex h-12 items-center justify-between border-b border-[#3d2673]/10 bg-[#f7f3ff] px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd85a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#68c891]" />
          <span className="ml-2 hidden text-[11px] font-bold text-[#24133f]/55 sm:inline">
            {copy.label}
          </span>
        </div>
        <span className="rounded-full border border-[#3d2673]/15 bg-white px-3 py-1 text-[10px] font-bold text-[#24133f]/60">
          {copy.range}
        </span>
      </div>

      <div className="grid min-h-[360px] grid-cols-[62px_1fr] sm:grid-cols-[150px_1fr]">
        <aside className="border-r border-[#3d2673]/15 bg-[#24133f] p-3 text-white sm:p-5">
          <div className="mb-8 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#d8c8ff] text-[#24133f]">
              <BarChart3 className="h-4 w-4" />
            </span>
            <span className="hidden text-xs font-extrabold sm:inline">
              {isEn ? "Intelligence" : "品牌洞察"}
            </span>
          </div>
          {dashboardNav.map((item, index) => (
            <div
              key={item}
              className={`mb-2 rounded-lg px-2 py-2 text-[10px] font-bold sm:px-3 ${
                index === 0 ? "bg-white text-[#24133f]" : "text-white/50"
              }`}
            >
              <span className="sm:hidden">0{index + 1}</span>
              <span className="hidden sm:inline">{item}</span>
            </div>
          ))}
        </aside>

        <div className="p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [copy.health, copy.healthValue],
              [copy.conversations, copy.conversationsValue],
              [copy.risk, copy.riskValue],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`rounded-xl border border-[#3d2673]/10 p-3 sm:p-4 ${
                  index === 2 ? "bg-[#f5ff63]" : "bg-[#f7f3ff]"
                }`}
              >
                <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#24133f]/45 sm:text-[10px]">
                  {label}
                </div>
                <div className="mt-2 text-base font-black tracking-[-0.03em] text-[#24133f] sm:text-xl">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-[#3d2673]/10 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7047eb]">
              <span className="h-2 w-2 rounded-full bg-[#8b61f6]" />
              {isEn ? "Key finding" : "本周重点"} · Ref 026
            </div>
            <h3 className="mt-3 max-w-2xl text-left text-lg font-black leading-tight tracking-[-0.03em] text-[#24133f] sm:text-2xl">
              {copy.insightTitle}
            </h3>
            <p className="mt-2 max-w-2xl text-left text-xs leading-5 text-[#24133f]/60 sm:text-sm">
              {copy.insightBody}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#3d2673]/10 pt-3">
              <div className="flex -space-x-1.5" aria-hidden>
                {["#d8c8ff", "#f5ff63", "#b892ff"].map((color) => (
                  <span
                    key={color}
                    className="h-6 w-6 rounded-full border-2 border-white"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#24133f] sm:text-xs">
                {copy.source}
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingFooter({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const isEn = lang === "en";

  return (
    <footer className="border-t border-[#3d2673] bg-[#1b0f2e] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <CleanWordmark inverse />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
            {t.footerTagline}
          </p>
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.14em] text-white/35">
            {isEn ? "Intelligence Services" : "情报服务"}
          </div>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-white/75">
            <Link href={getPlaygroundUrl(lang)}>
              {isEn ? "Playground" : "产品体验"}
            </Link>
            <Link href={isEn ? "/en/mcp" : "/mcp"}>
              {isEn ? "MCP Access" : "MCP 接入"}
            </Link>
            <Link href={isEn ? "/en/pricing" : "/pricing"}>
              {isEn ? "Pricing Plans" : "定价方案"}
            </Link>
            <Link href={isEn ? "/en/blog" : "/blog"}>
              {isEn ? "Blog" : "博客"}
            </Link>
            <Link href={isEn ? "/en/faq" : "/faq"}>
              {isEn ? "FAQ" : "常见问题"}
            </Link>
            <a
              href={
                isEn
                  ? "https://docs.datascaler.ai/en"
                  : "https://docs.datascaler.ai/cn"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {isEn ? "Documentation" : "文档"}
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.14em] text-white/35">
            {isEn ? "Expert Support" : "专家支持"}
          </div>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-white/75">
            <Link href={isEn ? "/en/contact" : "/contact"}>
              {isEn ? "Contact Us" : "联系我们"}
            </Link>
            <Link href={isEn ? "/en/contact" : "/contact"}>
              {isEn ? "Book Expert Demo" : "预约专家演示"}
            </Link>
          </div>
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.14em] text-white/35">
            {isEn ? "Compliance & Legal" : "合规与法律"}
          </div>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-white/75">
            <Link href={isEn ? "/en/terms" : "/terms"}>
              {isEn ? "Terms of Service" : "服务协议"}
            </Link>
            <Link href={isEn ? "/en/privacy" : "/privacy"}>
              {isEn ? "Privacy Policy" : "隐私政策"}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-white/15 px-5 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>{t.footerLegal}</span>
        <span>
          {isEn
            ? "Consumer intelligence · Sources included"
            : "海外消费者洞察 · 原帖可查"}
        </span>
      </div>
    </footer>
  );
}

export function CleanLandingPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const signupUrl = getSignUpUrl(lang);
  const playgroundUrl = getPlaygroundUrl(lang);
  const playgroundSampleUrl = getPlaygroundSampleUrl(lang);

  return (
    <div className="clean-landing min-h-screen overflow-x-hidden bg-[#fbf9ff] text-[#24133f]">
      <CleanSiteHeader lang={lang} />

      <main>
        <section className="relative overflow-hidden border-b border-[#3d2673]/20 bg-[radial-gradient(circle_at_50%_30%,#d7c5ff_0%,#eee7ff_38%,#fbf9ff_76%)] px-5 pb-16 pt-20 sm:pt-24 lg:px-8 lg:pb-24">
          <div className="pointer-events-none absolute left-[7%] top-24 hidden h-24 w-24 rounded-full bg-[#f5ff63] opacity-95 blur-[1px] sm:block" />
          <div className="pointer-events-none absolute right-[8%] top-36 hidden h-12 w-12 rotate-12 border border-[#7047eb]/35 bg-white/45 sm:block" />
          <div className="relative mx-auto max-w-[1180px] text-center">
            <h1 className="mx-auto max-w-[1000px] text-balance text-[clamp(40px,6.6vw,78px)] font-black leading-[0.98] tracking-[-0.055em] text-[#24133f]">
              {t.heroTitle}
              <span className="block text-[#7047eb]">{t.heroTitleAccent}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[690px] text-balance text-[15px] leading-7 text-[#24133f]/62 sm:text-lg">
              {t.heroBody}
            </p>
            <p className="sr-only">
              {lang === "zh"
                ? "DataScaler 是面向出海品牌的海外社媒舆情监控工具，覆盖 TikTok、YouTube、Reddit、Trustpilot、Amazon Reviews 等 10 个公开平台，提供可溯源的 AI 消费者洞察与竞品监测。"
                : "DataScaler is a social listening and consumer intelligence platform for global brands, covering 10 public platforms with source-linked findings and competitor monitoring."}
            </p>
            {/* 平台覆盖统一收进一条轻量信息栏；窄屏保持单行横向滚动。 */}
            <div className="mt-7 w-full overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mx-auto flex w-max flex-nowrap items-center rounded-2xl border border-[#3d2673]/15 bg-white/72 px-3 py-2.5 shadow-[0_12px_36px_rgba(61,38,115,0.08)] backdrop-blur-xl">
                <span className="shrink-0 whitespace-nowrap px-2 pr-4 text-[10px] font-black uppercase tracking-[0.12em] text-[#3d2673]/45">
                  {lang === "zh"
                    ? "覆盖 10 个海外公开平台"
                    : "10 public platforms"}
                </span>
                {PLATFORMS.map(({ name, Icon }, index) => (
                  <span
                    key={name}
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[12px] font-bold text-[#24133f]/62 ${
                      index === 0
                        ? "border-l border-[#3d2673]/15"
                        : "border-l border-[#3d2673]/10"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="hero_free_report"
                onClick={() =>
                  track("sign_up_click", {
                    button_location: "hero",
                    locale: lang,
                  })
                }
                className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#7047eb] px-7 py-4 text-sm font-extrabold text-white shadow-[0_12px_34px_rgba(112,71,235,0.3)] transition-transform hover:-translate-y-0.5"
              >
                <Search className="h-4 w-4" />
                {t.heroPrimary}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={playgroundSampleUrl}
                onClick={() =>
                  track("playground_click", {
                    button_location: "hero_sample",
                    locale: lang,
                  })
                }
                className="inline-flex h-[52px] items-center gap-2 rounded-full border border-[#7047eb]/30 bg-white/55 px-6 py-4 text-sm font-extrabold text-[#3d2673] backdrop-blur"
              >
                {t.heroSecondary}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mx-auto mt-14 max-w-[1050px] text-left lg:mt-16">
              <DashboardMockup copy={t.dashboard} lang={lang} />
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673]/15 bg-white px-5 py-8 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#3d2673]/50">
              {t.trusted}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-2">
              {BRANDS.map((brand) => (
                <div
                  key={brand.name}
                  className="flex min-w-0 flex-col items-center justify-center gap-2"
                >
                  <span className="flex h-10 w-24 shrink-0 items-center justify-center">
                    <BrandMark brand={brand} />
                  </span>
                  <span className="text-[13px] font-black tracking-[-0.02em] text-[#24133f]">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="playground"
          className="scroll-mt-24 border-b border-[#3d2673]/30 bg-[#f8f5ff] px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <h2 className="max-w-[760px] text-[clamp(34px,4.6vw,58px)] font-black leading-[1] tracking-[-0.05em] text-[#24133f]">
                  {t.playgroundTitle}
                </h2>
              </div>
              <p className="max-w-lg text-base leading-7 text-[#24133f]/58 lg:justify-self-end">
                {t.playgroundBody}
              </p>
            </div>

            <div className="mt-14 grid border-l border-t border-[#3d2673]/60 lg:grid-cols-2">
              <article className="flex min-h-[460px] flex-col border-b border-r border-[#3d2673]/60 bg-[#f5ff63] p-7 sm:p-9">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-[#3d2673]/50">
                  <span>01 · {lang === "en" ? "Your brand" : "你的品牌"}</span>
                  <Search className="h-5 w-5 text-[#7047eb]" />
                </div>
                <h3 className="mt-14 max-w-[440px] text-[clamp(28px,3.7vw,42px)] font-black leading-[1.03] tracking-[-0.045em] text-[#24133f]">
                  {t.ownBrandTitle}
                </h3>
                <p className="mt-5 max-w-[520px] text-sm leading-6 text-[#24133f]/62">
                  {t.ownBrandBody}
                </p>
                <ol className="mt-8 flex-1 space-y-3 border-t border-[#3d2673]/20 pt-6">
                  {t.ownBrandSteps.map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[28px_1fr] gap-3 text-sm font-bold leading-5 text-[#24133f]/78"
                    >
                      <span className="text-[#7047eb]/65">0{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <a
                  href={playgroundUrl}
                  onClick={() =>
                    track("playground_click", {
                      button_location: "own_brand_card",
                      locale: lang,
                    })
                  }
                  className="mt-8 inline-flex items-center justify-between rounded-full bg-[#7047eb] px-6 py-4 text-sm font-black text-white shadow-[0_10px_28px_rgba(112,71,235,0.22)]"
                >
                  {t.ownBrandAction}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>

              <article className="flex min-h-[460px] flex-col border-b border-r border-[#3d2673]/60 bg-[#d8c8ff] p-7 sm:p-9">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-[#3d2673]/50">
                  <span>02 · Bambu Lab</span>
                  <BarChart3 className="h-5 w-5 text-[#7047eb]" />
                </div>
                <h3 className="mt-14 max-w-[440px] text-[clamp(28px,3.7vw,42px)] font-black leading-[1.03] tracking-[-0.045em] text-[#24133f]">
                  {t.sampleTitle}
                </h3>
                <p className="mt-5 max-w-[520px] text-sm leading-6 text-[#24133f]/62">
                  {t.sampleBody}
                </p>
                <div className="mt-7 grid grid-cols-3 border-l border-t border-[#3d2673]/60">
                  {t.sampleMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="border-b border-r border-[#3d2673]/60 bg-white/40 p-3 sm:p-4"
                    >
                      <div className="text-xl font-black tracking-[-0.04em] text-[#24133f] sm:text-2xl">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-[9px] font-black uppercase tracking-[0.08em] text-[#3d2673]/55 sm:text-[10px]">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                  {t.samplePoints.map((point, index) => (
                    <span
                      key={point}
                      className="inline-flex items-center gap-2 border border-[#3d2673]/45 bg-white/45 px-3 py-2 text-xs font-black text-[#3d2673]/75"
                    >
                      {index === 2 ? (
                        <MessageSquareText className="h-3.5 w-3.5" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                      {point}
                    </span>
                  ))}
                </div>
                <a
                  href={playgroundSampleUrl}
                  onClick={() =>
                    track("playground_click", {
                      button_location: "bambu_sample_card",
                      locale: lang,
                    })
                  }
                  className="mt-8 inline-flex items-center justify-between rounded-full border border-[#3d2673]/65 bg-white/20 px-6 py-4 text-sm font-black text-[#3d2673]"
                >
                  {t.sampleAction}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="scroll-mt-24 border-b border-[#3d2673]/30 bg-[#fbf9ff] px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <h2 className="max-w-[760px] text-[clamp(34px,4.6vw,58px)] font-black leading-[1.02] tracking-[-0.05em] text-[#24133f]">
                  {t.workflowTitle}
                </h2>
              </div>
              <p className="max-w-lg text-base leading-7 text-[#24133f]/58 lg:justify-self-end">
                {t.workflowBody}
              </p>
            </div>

            <div className="mt-14 grid border-l border-t border-[#3d2673]/55 md:grid-cols-3">
              {t.workflow.map((item, index) => (
                <article
                  key={item.number}
                  className={`min-h-[270px] border-b border-r border-[#3d2673]/55 p-7 sm:p-9 ${
                    index === 1
                      ? "bg-[#d8c8ff]"
                      : index === 2
                        ? "bg-white"
                        : "bg-[#f5ff63]"
                  }`}
                >
                  <div className="text-xs font-black tracking-[0.15em] text-[#7047eb]/70">
                    {item.number}
                  </div>
                  <h3 className="mt-16 text-2xl font-black tracking-[-0.04em] text-[#24133f]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-sm leading-6 text-[#24133f]/65">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="product"
          className="scroll-mt-24 border-b border-[#3d2673]/30 bg-white px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(34px,4.6vw,56px)] font-black leading-[1.02] tracking-[-0.05em] text-[#24133f]">
                {t.evidenceTitle}
              </h2>
              <p className="mt-6 max-w-[520px] text-base leading-7 text-[#24133f]/60">
                {t.evidenceBody}
              </p>
              <ul className="mt-8 space-y-3">
                {t.evidencePoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm font-bold text-[#24133f]/75"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f5ff63] text-[#24133f]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative border border-[#3d2673]/65 bg-[#d8c8ff] p-4 sm:p-7">
              <div className="absolute -right-3 -top-3 rotate-3 border border-[#3d2673]/65 bg-[#f5ff63] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#24133f]">
                {lang === "en" ? "Weekly brief" : "每周简报"}
              </div>
              <div className="border border-[#3d2673]/65 bg-white p-5 shadow-[8px_8px_0_#3d2673] sm:p-7">
                <div className="flex items-center justify-between border-b border-[#3d2673]/15 pb-4">
                  <div className="text-sm font-black text-[#24133f]">
                    {t.evidencePanelTitle}
                  </div>
                  <span className="text-[10px] font-bold text-[#3d2673]/45">
                    {lang === "en" ? "Brief" : "简报"} · 07/26
                  </span>
                </div>
                <div className="divide-y divide-[#3d2673]/15">
                  {t.evidencePanelRows.map((row, index) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-5"
                    >
                      <span className="text-xs font-black text-[#7047eb]/55">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-extrabold leading-5 text-[#24133f]">
                          {row.label}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#7047eb]">
                          Ref {26 + index}
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                      <span
                        className={`border border-[#3d2673]/50 px-3 py-2 text-sm font-black text-[#24133f] ${
                          row.tone === "yellow"
                            ? "bg-[#f5ff63]"
                            : row.tone === "blue"
                              ? "bg-[#d8c8ff]"
                              : "bg-[#f4f0fa]"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-2 flex h-20 items-end gap-2 border-t border-[#3d2673]/10 pt-4"
                  aria-hidden
                >
                  {[22, 34, 27, 47, 40, 62, 54, 75, 58, 69, 83, 72].map(
                    (height, index) => (
                      <span
                        key={`${height}-${index}`}
                        className="flex-1 bg-[#7047eb]"
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673]/30 bg-[#f3eeff] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-[820px]">
              <h2 className="text-[clamp(34px,4.6vw,58px)] font-black leading-[1.02] tracking-[-0.05em] text-[#24133f]">
                {t.copilotTitle}
              </h2>
              <p className="mt-6 max-w-[650px] text-base leading-7 text-[#24133f]/60">
                {t.copilotBody}
              </p>
            </div>

            <div className="mt-12 grid border border-[#3d2673]/55 bg-white lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-[#3d2673]/55 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#7047eb]/75">
                  <MessageSquareText className="h-4 w-4" />{" "}
                  {lang === "en" ? "AI assistant" : "AI 助手"}
                </div>
                <div className="mt-8 ml-auto max-w-[85%] rounded-[18px_18px_2px_18px] bg-[#3d2673] p-4 text-sm leading-6 text-white">
                  {t.question}
                </div>
                <div className="mt-4 max-w-[90%] rounded-[18px_18px_18px_2px] bg-[#d8c8ff] p-5 text-sm font-medium leading-6 text-[#24133f]">
                  {t.answer}
                  <div className="mt-4 flex gap-2">
                    <span className="border border-[#3d2673]/20 bg-white/60 px-2 py-1 text-[10px] font-black">
                      Ref 26
                    </span>
                    <span className="border border-[#3d2673]/20 bg-white/60 px-2 py-1 text-[10px] font-black">
                      Ref 31
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-9">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black tracking-[-0.03em] text-[#24133f]">
                    {t.actionTitle}
                  </h3>
                  <span className="rounded-full bg-[#f5ff63] px-3 py-1 text-[10px] font-black">
                    {lang === "en" ? "3 tasks" : "3 项"}
                  </span>
                </div>
                <div className="mt-7 divide-y divide-[#3d2673]/15 border-y border-[#3d2673]/15">
                  {t.actions.map((action) => (
                    <div
                      key={action.task}
                      className="grid grid-cols-[42px_1fr_auto] items-center gap-3 py-5"
                    >
                      <span className="text-xs font-black text-[#7047eb]">
                        {action.priority}
                      </span>
                      <span className="text-sm font-bold leading-5 text-[#24133f]">
                        {action.task}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#3d2673]/50">
                        {action.owner}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#3d2673]/60">
                  <span>{lang === "en" ? "Sources synced" : "来源已同步"}</span>
                  <span className="inline-flex items-center gap-1 text-[#3d2673]">
                    {lang === "en" ? "Open board" : "打开看板"}{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="customers"
          className="scroll-mt-24 border-b border-[#3d2673]/40 bg-[#d8c8ff] px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <blockquote className="max-w-[850px] text-[clamp(30px,4.4vw,52px)] font-black leading-[1.07] tracking-[-0.045em] text-[#24133f]">
                {t.proofQuote}
              </blockquote>
              <p className="mt-7 text-sm font-bold text-[#3d2673]/60">
                {t.proofRole}
              </p>
            </div>
            <div className="grid border-l border-t border-[#3d2673]/55 sm:grid-cols-3 lg:grid-cols-1">
              {t.proofStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-b border-r border-[#3d2673]/55 bg-white/35 p-6"
                >
                  <div className="text-4xl font-black tracking-[-0.05em] text-[#24133f]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#3d2673]/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#f5ff63] px-5 py-20 text-[#24133f] lg:px-8 lg:py-28">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-[850px] text-[clamp(36px,5.5vw,68px)] font-black leading-[0.99] tracking-[-0.055em] text-[#24133f]">
                {t.ctaTitle}
              </h2>
            </div>
            <a
              href={signupUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="footer_get_started"
              onClick={() =>
                track("sign_up_click", {
                  button_location: "footer",
                  locale: lang,
                })
              }
              className="inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-[#3d2673]/30 bg-[#7047eb] px-7 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(36,19,63,0.22)] transition-transform hover:-translate-y-0.5 lg:self-auto"
            >
              {t.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <CleanSiteFooter lang={lang} />
    </div>
  );
}
