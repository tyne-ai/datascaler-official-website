'use client';
import { useState, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";
import BriefTerminal from "@/components/BriefTerminal";
import HeroBriefPanel from "@/components/HeroBriefPanel";
import { CopilotChat, ActionBoard } from "@/components/CopilotMockup";
import { RadarChartMockup, CompetitorSOPMockup } from "@/components/DiffMockups";
import { GlobalInsightCards } from "@/components/GlobalInsightCards";
import CompetitorDashboard from "@/components/CompetitorDashboard";
import { DemoDialog } from "@/components/DemoDialog";
import {
  Search,
  FileText,
  Rocket,
  Box,
  Timer,
  Unlink,
  Eye,
  Target,
  Languages,
  Zap,
  BarChart3,
  Check,
  Crown,
  Building2,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── 轻量埋点 helper（GTM dataLayer）────────────────────
function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...params });
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Hero Search with Typewriter ─────────────────────────
const DOMAINS = ["输入品牌名：Roborock", "输入品牌名：Govee", "输入品牌名：Dreame"];

function HeroSearchInput() {
  const [text, setText] = useState("");
  const [domainIdx, setDomainIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused) return;
    const current = DOMAINS[domainIdx];
    const speed = deleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setText(current.slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIdx > 0) {
          setText(current.slice(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        } else {
          setDeleting(false);
          setDomainIdx((domainIdx + 1) % DOMAINS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, domainIdx, focused]);

  return (
    <motion.div variants={fadeUp} custom={3} className="w-full max-w-lg">
      <div className="group relative">
        <div className="absolute -inset-1 rounded-xl bg-ring/15 blur-md transition-opacity duration-300 group-focus-within:bg-ring/25" />
        <div className="relative flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 backdrop-blur-md p-2">
          <Search className="ml-3 h-5 w-5 text-muted-foreground" />
          <div className="flex-1 relative">
            <Input
              aria-label="品牌域名搜索"
              className="w-full border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={focused ? undefined : text}
              placeholder={focused ? "输入你的品牌名……" : ""}
              onFocus={() => { setFocused(true); setText(""); }}
              onBlur={() => { setFocused(false); setCharIdx(0); setDomainIdx(0); setDeleting(false); }}
              onChange={focused ? undefined : () => { }}
            />
            {!focused && (
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-primary animate-pulse" />
            )}
          </div>
          <a
            href="https://app.datascaler.ai/plans"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="hero_free_report"
            onClick={() => track("sign_up_click", { button_location: "hero", cta_type: "free_report" })}
          >
            <Button size="sm" className="shrink-0 bg-primary text-primary-foreground font-semibold hover:bg-primary/80 glow-primary">
              免费生成报告 →
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-ring/15 blur-[140px]" />
      </div>

      <motion.div
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeUp} custom={0} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            AI-Powered Brand Intelligence
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
        >
          看见海外消费者，
          <br className="mb-3" />
          在<span className="text-gradient mt-3 inline-block">怎么讨论你的品牌。</span>
        </motion.h1>

        <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground md:text-lg md:leading-relaxed">
          覆盖 YouTube、TikTok、X、Facebook、Instagram 等 9 个海外公开平台。自定义采集周期，每条结论都能点回原帖。
        </motion.p>

        {/* Search bar — clear focal point with generous spacing */}
        <div className="mt-10">
          <HeroSearchInput />
        </div>

        {/* Platform Strip — surfaces all 9 sources right in the hero */}
        <motion.div variants={fadeUp} custom={4} className="mt-8 w-full max-w-3xl">
          <div className="mb-3 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            数据源 · 9 个海外公开平台
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PLATFORMS.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 backdrop-blur-sm px-3 py-1.5 text-xs text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Brief Preview — dominant floating panel */}
        <motion.div variants={fadeUp} custom={5} className="mt-12 w-full max-w-3xl">
          <HeroBriefPanel />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Pain Points ─────────────────────────────────────────
const painPoints = [
  {
    quote: "这数据从哪儿来的？",
    desc: "CMO 看 AI 报告的第一句话。通用工具答不上来。DataScaler 每条结论都带 [Ref]，一键跳转原帖——你拿得出来。",
  },
  {
    quote: "要么扫得太浅，要么节奏不对。",
    desc: "通用工具一刀切。DataScaler 让你自己定——采集 1 页到 10 页、按你想要的节奏跑，按品牌阶段和预算选。",
  },
  {
    quote: "评分掉了 0.3 星，不知道为什么。",
    desc: "我们知道。DataScaler 直接指向是哪条评论、哪个 KOL、哪个海外社群话题在带——附原帖链接。",
  },
];

function PainPoints() {
  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-foreground md:text-4xl">
            不再为模糊的 AI 文本买单
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            决策级的证据支撑,从哪里来？
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {painPoints.map((p, i) => (
            <motion.div
              key={p.quote}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-border/50 bg-card/30 p-8"
            >
              <div className="mb-3 font-serif text-4xl leading-none text-ring opacity-60">"</div>
              <h3 className="font-display text-lg font-semibold text-foreground leading-snug">{p.quote}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 3: Core Brief & Evidence (Interactive) ──────
function CoreBrief() {
  return (
    <section className="relative py-24 px-6">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-foreground md:text-4xl">
            重构交互逻辑，实现结论先行，数据在后
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            AI 洞察简报 + 白盒化证据链：hover [Ref] 标签即可溯源到原始帖子
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12"
        >
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-8 items-start">
            {/* Text side */}
            <div className="md:w-2/5 space-y-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ring/15">
                <FileText className="h-5 w-5 text-ring" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                AI 洞察简报 + 白盒化证据链
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                结论先行：30 秒读完本周声量、情感、竞品差距的核心综述。所有结论带 <span className="text-ring font-semibold">[Ref]</span> 标记，一键追溯到原始帖子和评论，有据可依。
              </p>
              <div className="space-y-3">
                {[
                  "Hover [Ref] 即弹出 Evidence Card",
                  "显示原始社媒帖子、情感标签、互动数据",
                  "白盒逻辑：每条结论可追溯、可验证",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Brief Terminal */}
            <div className="md:w-3/5">
              <BriefTerminal />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 4: AI Scanning Terminal ────────────────────
function CompetitorIntel() {
  return (
    <section className="relative py-24 px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] rounded-full bg-ring/8 blur-[160px]" />
      </div>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ring/30 bg-ring/10 px-4 py-1.5 text-xs font-medium text-ring">
              <BarChart3 className="h-3 w-3" />
              Competitive Intelligence
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl font-bold md:text-4xl" style={{ color: "#F8FAFC" }}>
            全网侦测竞品动态，一键诊断跨平台差距
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            AI Assistant 基于全量社媒数据，秒级锁定行业对手的舆情弱点与增长机会。
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-14"
        >
          <motion.div variants={fadeUp}>
            <CompetitorDashboard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 5: Copilot & Action Board ───────────────────
function CopilotSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] rounded-full bg-ring/5 blur-[120px]" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-foreground md:text-4xl">
            从竞品情报到增长行动,仅需秒级跨越
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            具备读屏能力的 AI Assistant 实时归因,自动生成按优先级排列的行动方案
          </motion.p>
        </motion.div>

        {/* Example questions — 5 typical scenarios global teams ask */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 mx-auto max-w-5xl"
        >
          <motion.p variants={fadeUp} className="text-center text-xs text-muted-foreground mb-6">
            示例追问 · 都是出海团队真实在问的问题
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { tag: "KOL 发现", q: "“帮我在 INS 上找本月最适合合作的 5 个 KOL。”" },
              { tag: "舆情归因", q: "“上周亚马逊差评突然变多,是哪条话题在带？”" },
              { tag: "竞品对比", q: "“用户在 Reddit 上,拿我们跟哪个竞品比得最多？”" },
              { tag: "新品反馈", q: "“新品上线一周,海外用户最爱、最骂哪个点？”" },
              { tag: "回应决策", q: "“这条 Reddit 帖子要不要回应？影响有多大？”" },
            ].map((ex, i) => (
              <motion.div
                key={ex.tag}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-xl p-5 text-sm flex-1 basis-[280px] max-w-[340px]"
              >
                <div className="text-[10px] uppercase tracking-wider text-ring font-semibold mb-2">
                  {ex.tag}
                </div>
                <div className="leading-relaxed text-secondary-foreground">{ex.q}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          <motion.div variants={fadeUp} custom={0} className="h-[480px]">
            <CopilotChat />
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="h-[480px]">
            <ActionBoard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Demo Request Dialog ─────────────────────────────────

// ─── Pricing Plans Data ──────────────────────────────────
const plans = [
  {
    key: "free",
    title: "Free 免费版",
    monthlyUSD: 0,
    isFree: true,
    metrics: [
      { label: "品牌数", value: "1" },
      { label: "完整报告", value: "1 次" },
      { label: "深度追问", value: "6 次" },
      { label: "导出", value: "不支持" },
      { label: "账号", value: "1" },
    ],
    cta: "开始体验",
    href: "https://app.datascaler.ai/plans",
    icon: Zap,
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
  {
    key: "pro",
    title: "Pro 专业版",
    monthlyUSD: 199,
    popular: true,
    metrics: [
      { label: "品牌数", value: "1" },
      { label: "报告", value: "3 / 月" },
      { label: "深度追问", value: "60 / 月" },
      { label: "导出", value: "1,000 / 月" },
      { label: "账号", value: "1" },
    ],
    cta: "选择 Pro",
    href: "https://app.datascaler.ai/plans",
    icon: Crown,
    iconBg: "bg-ring/15",
    iconColor: "text-ring",
  },
  {
    key: "team",
    title: "Team 团队版",
    monthlyUSD: 499,
    metrics: [
      { label: "品牌数", value: "3" },
      { label: "报告", value: "9 / 月" },
      { label: "深度追问", value: "300 / 月" },
      { label: "导出", value: "3000" },
      { label: "账号", value: "5" },
    ],
    cta: "预约演示",
    isDialog: true,
    icon: Users,
    iconBg: "bg-accent/15",
    iconColor: "text-accent",
  },
  {
    key: "enterprise",
    title: "Enterprise 企业版",
    monthlyUSD: 1299,
    metrics: [
      { label: "品牌数", value: "8" },
      { label: "报告", value: "25 / 月" },
      { label: "深度追问", value: "1000 / 月" },
      { label: "导出", value: "10000" },
      { label: "账号", value: "10" },
    ],
    cta: "联系销售",
    isDialog: true,
    icon: Building2,
    iconBg: "bg-ring/15",
    iconColor: "text-ring",
  },
];

function PricingSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-7xl"
      >
        {/* Section header */}
        <div className="text-center mb-8">
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Crown className="h-3 w-3" />
              Pricing
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">
            简单透明的商业化定价
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-muted-foreground">
            无隐藏费用。选择适合您品牌阶段的方案，即刻开始。
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div variants={fadeUp} custom={2.5} className="flex justify-center mb-12">
          <div className="inline-flex rounded-full border border-border/50 bg-card/40 backdrop-blur-sm p-1">
            <button
              onClick={() => setCycle("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${cycle === "monthly" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              月付
            </button>
            <button
              onClick={() => setCycle("yearly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${cycle === "yearly" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              年付 · 节省 10%
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const isPopular = plan.popular;
            const yearlyTotal = Math.round(plan.monthlyUSD * 12 * 0.9);
            const effectiveMonthly = Math.round(yearlyTotal / 12);

            return (
              <motion.div
                key={plan.key}
                variants={fadeUp}
                custom={i + 3}
                className={`relative rounded-2xl border backdrop-blur-sm p-6 flex flex-col ${isPopular
                  ? "border-ring/40 bg-gradient-to-br from-card/60 to-ring/5"
                  : "border-border/50 bg-card/40"
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 right-4">
                    <span className="rounded-full bg-ring px-3 py-1 text-[10px] font-bold text-background flex items-center gap-1">
                      <Star className="h-3 w-3" /> MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                    <plan.icon className={`h-5 w-5 ${plan.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{plan.title}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.isFree ? (
                    <>
                      <span className="text-3xl font-bold text-foreground">免费</span>
                      <span className="text-muted-foreground ml-1 text-sm">· 永久 · 无需绑卡</span>
                    </>
                  ) : cycle === "monthly" ? (
                    <>
                      <span className="text-3xl font-bold text-foreground">${plan.monthlyUSD}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ 月</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-foreground">${effectiveMonthly}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ 月</span>
                    </>
                  )}
                </div>

                {/* Metrics */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.metrics.map((m) => (
                    <li key={m.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-medium text-foreground">{m.value}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.isDialog ? (
                  <Button
                    variant="outline"
                    data-plan={plan.key}
                    className="w-full border-ring/40 text-ring hover:bg-ring/10 font-semibold"
                    onClick={() => {
                      track("plan_click", { plan_name: plan.key, cta_type: "demo" });
                      setDialogOpen(true);
                    }}
                  >
                    {plan.cta}
                  </Button>
                ) : isPopular ? (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-plan={plan.key}
                    onClick={() => track("plan_click", { plan_name: plan.key, cta_type: "signup" })}
                  >
                    <Button className="w-full font-semibold bg-ring text-background hover:bg-ring/80">
                      {plan.cta}
                    </Button>
                  </a>
                ) : (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-plan={plan.key}
                    onClick={() => track("plan_click", { plan_name: plan.key, cta_type: "signup" })}
                  >
                    <Button variant="secondary" className="w-full font-semibold bg-secondary/50 text-foreground hover:bg-secondary/70">
                      {plan.cta}
                    </Button>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Link to full pricing */}
        <motion.div variants={fadeUp} custom={8} className="mt-10 text-center">
          <a href="/pricing" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            查看完整定价细则 →
          </a>
        </motion.div>
      </motion.div>

      <DemoDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}



// ─── 社会证明 ────────────────────────────────────────────
const proofStats = [
  { value: "200+", label: "服务出海品牌" },
  { value: "9", label: "海外公开平台" },
  { value: "100%", label: "可溯源洞察" },
];

const proofQuotes = [
  {
    quote: "以前我们对着截图争论，现在每条结论都能点回原帖——整个会议室都信这份数据了。",
    name: "Sarah C.",
    role: "品牌经理 · 消费电子",
  },
  {
    quote: "新品上架后，社媒声音比产品评论更早告诉我们用户怎么看，能提前好几天捕捉到信号。",
    name: "Ashley Y.",
    role: "品牌负责人 · 时尚母婴 DTC",
  },
  {
    quote: "Action Board 把噪音变成一份「接下来该做什么」的清单，是我团队每天早上真正会打开的东西。",
    name: "Marcus R.",
    role: "市场情报 · 全球 DTC",
  },
];

function SocialProof() {
  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-4xl">
          全球品牌都在用 DataScaler 看见客户真正看见的
        </motion.h2>

        <motion.div variants={fadeUp} custom={1} className="mt-10 grid grid-cols-3 gap-4">
          {proofStats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-2 text-xs text-muted-foreground md:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} custom={2} className="mt-8 grid gap-6 md:grid-cols-3">
          {proofQuotes.map((q) => (
            <div key={q.name} className="glass-card flex flex-col rounded-2xl p-6">
              <div className="mb-3 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-secondary-foreground">“{q.quote}”</p>
              <div className="mt-5 border-t border-border/40 pt-4">
                <div className="text-sm font-semibold text-foreground">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[600px] rounded-full bg-ring/15 blur-[140px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-foreground md:text-5xl">
          <span className="text-gradient">让每一次决策都有据可依</span>
        </motion.h2>
        <motion.div variants={fadeUp} custom={1} className="mt-10">
          <a href="https://app.datascaler.ai/plans" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="glow-primary bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/80"
            >
              <Rocket className="mr-2 h-5 w-5" />
              免费生成我的品牌报告 →
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
// ─── Platform Strip ──────────────────────────────────────
const PLATFORMS = [
  "YouTube",
  "TikTok",
  "X",
  "Facebook",
  "Instagram",
  "Pinterest",
  "Trustpilot",
  "Reddit",
  "Amazon Reviews",
];

// ─── Page ───────────────────────────────────────────────
export function IndexContent() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background">
        <PricingHeader />
        <Hero />
        <PainPoints />
        <CoreBrief />
        <CompetitorIntel />
        <CopilotSection />
        <SocialProof />
        <div id="pricing"><PricingSection /></div>
        <FooterCTA />
        <PricingFooter />
      </div>
    </MotionConfig>
  );
}
