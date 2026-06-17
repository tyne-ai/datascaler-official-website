'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { DemoDialog } from "@/components/DemoDialog";
import {
  Crown, Zap, Building2, Check, Rocket, Shield,
  HelpCircle, Users, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";
import { RedditIcon, AmazonIcon, YouTubeIcon, TikTokIcon, XIcon, FacebookIcon, InstagramIcon, PinterestIcon, TrustpilotIcon } from "@/components/BrandIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ─── 1) Pricing Hero ─────────────────────────────────── */
function PricingHero() {
  return (
    <section className="relative px-6 pt-32 pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-ring/20 blur-[160px]" />
        <div className="absolute left-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-[hsl(263_70%_30%/0.25)] blur-[140px]" />
        <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-[hsl(280_60%_25%/0.2)] blur-[120px]" />
      </div>
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Crown className="h-3 w-3" /> Pricing
          </span>
        </motion.div>
        <motion.h1 variants={fadeUp} custom={1} className="mt-8 font-display text-3xl font-bold text-foreground md:text-5xl">
          定价与计费
        </motion.h1>
        <motion.p variants={fadeUp} custom={2} className="mx-auto mt-6 max-w-[700px] text-base text-muted-foreground" style={{ lineHeight: 1.7 }}>
          先选套餐 → 用量不够 → 购买 Credits 扩容
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── 2) Plans Section (4 tiers + toggle) ─────────────── */
const plans = [
  {
    name: "Free 免费版",
    subtitle: "永久免费 · 无需绑卡",
    monthly: 0,
    icon: Star,
    badge: null,
    metrics: [
      { label: "监控品牌数", value: "1" },
      { label: "完整报告（总计）", value: "1 次" },
      { label: "AI 深度追问（总计）", value: "6" },
      { label: "数据导出（条/月）", value: "不支持" },
      { label: "账号数", value: "1" },
      { label: "AI 并发限制", value: "1 rpm" },
    ],
    cta: "开始体验",
    href: "https://app.datascaler.ai/plans",
    isDialog: false,
    footnote: "永久免费，无需绑定信用卡，不会自动扣费；额度为一次性发放，用完后可随时升级 Pro。",
  },
  {
    name: "Pro 专业版",
    subtitle: "出海成长型品牌首选",
    monthly: 199,
    icon: Zap,
    badge: "MOST POPULAR",
    metrics: [
      { label: "监控品牌数", value: "1" },
      { label: "完整报告（次/月）", value: "3" },
      { label: "AI 深度追问（次/月）", value: "60" },
      { label: "数据导出（条/月）", value: "1,000" },
      { label: "账号数", value: "1" },
      { label: "AI 并发限制", value: "1 rpm" },
    ],
    cta: "选择 Pro",
    href: "https://app.datascaler.ai/plans",
    isDialog: false,
    footnote: null,
  },
  {
    name: "Team 团队版",
    subtitle: "多品牌、多账号协作",
    monthly: 499,
    icon: Users,
    badge: null,
    metrics: [
      { label: "监控品牌数", value: "3" },
      { label: "完整报告（次/月）", value: "9" },
      { label: "AI 深度追问（次/月）", value: "300" },
      { label: "数据导出（条/月）", value: "3000" },
      { label: "账号数", value: "5" },
      { label: "AI 并发限制", value: "3 rpm" },
    ],
    cta: "预约演示",
    href: "https://app.datascaler.ai/plans",
    isDialog: true,
    footnote: null,
  },
  {
    name: "Enterprise 企业版",
    subtitle: "全球化大品牌深度定制",
    monthly: 1299,
    icon: Building2,
    badge: null,
    metrics: [
      { label: "监控品牌数", value: "8" },
      { label: "完整报告（次/月）", value: "25" },
      { label: "AI 深度追问（次/月）", value: "1,000" },
      { label: "数据导出（条/月）", value: "10000" },
      { label: "账号数", value: "10" },
      { label: "AI 并发限制", value: "3 rpm" },
    ],
    cta: "联系销售",
    href: null,
    isDialog: true,
    footnote: null,
  },
];

function PlansSection() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="relative px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="relative z-10 mx-auto max-w-6xl rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-8 md:p-10">

        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <span className="inline-block mb-3 rounded-full border border-border/40 bg-card/30 px-3 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Subscription</span>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">基础套餐</h2>
        </motion.div>

        {/* Toggle */}
        <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-10">
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

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const yearlyTotal = Math.round(plan.monthly * 12 * 0.9);
            const effectiveMonthly = Math.round(yearlyTotal / 12);
            const isPro = plan.badge === "MOST POPULAR";

            return (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={i}
                className={`relative rounded-2xl border backdrop-blur-sm p-6 flex flex-col ${isPro ? "border-ring/50 bg-gradient-to-br from-card/60 to-ring/5 shadow-[0_0_30px_-8px_hsl(217_91%_60%/0.25)]" : "border-border/50 bg-card/40"}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-ring px-3 py-1 text-[10px] font-bold text-background whitespace-nowrap">{plan.badge}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${isPro ? "bg-ring/20" : "bg-muted/50"}`}>
                    <Icon className={`h-4 w-4 ${isPro ? "text-ring" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  {plan.monthly === 0 ? (
                    <div>
                      <span className="text-3xl font-bold text-foreground">免费</span>
                      <span className="text-muted-foreground ml-1 text-sm">· 永久 · 无需绑卡</span>
                    </div>
                  ) : cycle === "monthly" ? (
                    <div>
                      <span className="text-3xl font-bold text-foreground">${plan.monthly}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ 月</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-foreground">${effectiveMonthly}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ 月</span>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                <div className="space-y-2.5 mb-6 flex-1">
                  {plan.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-medium text-foreground">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Footnote */}
                {plan.footnote && (
                  <p className="text-[10px] text-muted-foreground/70 leading-relaxed mb-4">{plan.footnote}</p>
                )}

                {/* CTA */}
                {plan.isDialog ? (
                  <Button
                    variant="outline"
                    className="w-full border-ring/40 text-ring hover:bg-ring/10 font-semibold"
                    onClick={() => setDialogOpen(true)}
                  >
                    {plan.cta}
                  </Button>
                ) : isPro ? (
                  <a href={plan.href!} target="_blank" className="w-full">
                    <Button className="w-full font-semibold bg-ring text-background hover:bg-ring/80">
                      {plan.cta}
                    </Button>
                  </a>
                ) : (
                  <a href={plan.href!} target="_blank" className="w-full">
                    <Button variant="secondary" className="w-full font-semibold bg-secondary/50 text-foreground hover:bg-secondary/70">
                      {plan.cta}
                    </Button>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

      </motion.div>
      <DemoDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}


/* ─── 3) Credits & Add-ons Section ─────────────────────── */
const consumptionList = [
  { title: "完整报告", credits: "70 积分 / 份", icon: null },
  { title: "AI 追问", credits: "10 积分 / 10 次", icon: null },
  { title: "数据导出", credits: "10 积分 / 200 条", icon: null },
  { title: "Reddit 数据源", credits: "+10 积分 / 份", icon: <RedditIcon className="h-3.5 w-3.5" /> },
  { title: "Amazon Reviews 数据源", credits: "+12 积分 / 份", icon: <AmazonIcon className="h-3.5 w-3.5" /> },
];

const defaultChannels = [
  { icon: YouTubeIcon, label: "YouTube" },
  { icon: TikTokIcon, label: "TikTok" },
  { icon: XIcon, label: "X" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: PinterestIcon, label: "Pinterest" },
  { icon: TrustpilotIcon, label: "Trustpilot" },
];

const topupPacks = [
  { price: 10, credits: 10, tag: null, note: null },
  { price: 68, credits: 70, tag: "RECOMMENDED", note: "≈ 1 份报告" },
  { price: 96, credits: 100, tag: null, note: null },
  { price: 470, credits: 500, tag: null, note: null },
];

function CreditsSection() {
  return (
    <section className="relative px-6 py-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="relative z-10 mx-auto max-w-5xl space-y-12">

        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="text-center">
          <span className="inline-block mb-3 rounded-full border border-border/40 bg-card/30 px-3 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Credits & Add-ons</span>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">积分与增值服务</h2>
          <p className="mt-2 text-sm text-muted-foreground">$1 = 1 Credit · 套餐用完时按需补量</p>
        </motion.div>

        {/* Layer 1: Top-up packs (centered, hero) */}
        <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topupPacks.map((p) => (
            <div key={p.price} className={`relative rounded-xl border p-6 flex flex-col items-center text-center transition-colors ${p.tag ? "border-primary/50 bg-primary/5" : "border-border/40 bg-card/10 hover:border-border/60"}`}>
              {p.tag && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground whitespace-nowrap">{p.tag}</span>
              )}
              <p className="text-3xl font-bold text-foreground mt-1">${p.price}</p>
              <p className="text-sm text-muted-foreground mt-1">{p.credits} 积分</p>
              {p.note ? (
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{p.note}</p>
              ) : (
                <p className="text-[10px] text-transparent mt-0.5 select-none">.</p>
              )}
              <a
                href="https://app.datascaler.ai/plans"
                target="_blank"
                rel="noopener noreferrer"
                className={`block mt-4 w-full rounded-lg text-sm font-medium py-2 transition-colors text-center ${p.tag ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border/50 text-foreground/80 hover:bg-card/40 hover:text-foreground"}`}
              >
                立即充值
              </a>
            </div>
          ))}
        </motion.div>

        {/* Layer 2: Consumption list (below, equal width) */}
        <motion.div variants={fadeUp} custom={2} className="space-y-4">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase text-center">消耗规则</p>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/40 bg-border/30 sm:grid-cols-2 lg:grid-cols-5">
            {consumptionList.map((item) => (
              <li key={item.title} className="flex min-h-[88px] flex-col items-center justify-center gap-1.5 bg-card/10 px-3 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  {item.icon}
                  {item.title}
                </span>
                <span className="text-sm font-semibold text-foreground tabular-nums">{item.credits}</span>
              </li>
            ))}
          </ul>

          {/* Default data sources (de-emphasized) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
            <span className="text-[10px] text-muted-foreground/70">默认数据源：</span>
            {defaultChannels.map((c) => {
              const Icon = c.icon;
              return (
                <span key={c.label} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/70">
                  <Icon className="h-3 w-3" />
                  {c.label}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Validity */}
        <p className="text-[11px] text-muted-foreground/60 text-center">
          积分12个月有效，兑换后的用量权益有效期为3个月。
        </p>

      </motion.div>
    </section>
  );
}


/* ─── 4) Trial Rules ──────────────────────────────────── */
function TrialRulesSection() {
  return (
    <section className="relative px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="relative z-10 mx-auto max-w-4xl">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Shield className="h-3 w-3" /> 免费版 & 计费说明
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold text-foreground md:text-3xl">
            免费版无需绑卡 · 付费订阅按月续费
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-8">
          <div className="space-y-4 text-sm">
            {[
              { title: "免费版无需绑卡", desc: "注册即可使用免费版，无需绑定信用卡，不会产生任何扣费。" },
              { title: "免费额度一次性", desc: "免费版额度为一次性发放（1 个品牌、1 份完整报告、6 次 AI 深度追问），用完即止，不按月刷新。" },
              { title: "升级付费需绑卡", desc: "升级到 Pro / Team / Enterprise 等付费套餐时需绑定信用卡，并按所选周期付费。" },
              { title: "按月自动续费", desc: "付费订阅在每个计费周期结束时自动续费；系统会在续费前发送提醒（邮件/站内通知，具体以实际配置为准）。" },
              { title: "随时取消", desc: "可随时在「账单与计划（Billing & Plans）」中取消付费订阅，取消在当前计费周期结束时生效。" },
              { title: "提前升级", desc: "确认升级/变更套餐将在当天扣款，新的计费周期从当天开始计算，同时发放对应套餐的月度配额。" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">{item.title}：</span>
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── 5) FAQ ──────────────────────────────────────────── */
const faqsCN = [
  { q: "免费版会扣费吗？需要绑卡吗？", a: "不会，也不需要。免费版无需绑定信用卡即可注册使用，不会产生任何扣费；仅在升级到 Pro 等付费套餐时才需要绑卡。" },
  { q: "免费版的额度是怎样的？", a: "免费版额度为一次性发放（1 个品牌、1 份完整报告、6 次 AI 深度追问），用完即止、不按月刷新。需要更多额度可随时升级到付费套餐。" },
  { q: "免费额度用完后会发生什么？", a: "免费版不会自动扣费或自动升级。额度用完后，你可以选择升级到 Pro 等付费套餐获取更多月度配额。" },
  { q: "如何取消付费订阅？取消何时生效？", a: "你可在「账单与计划（Billing & Plans）」中取消付费订阅。取消将在当前计费周期结束后生效（以页面提示日期为准）。" },
  { q: "年付怎么计算折扣？", a: "年付按月付价格的 12 个月总价打 9 折（10% OFF）计算：年付 = 月付 × 12 × 0.9（展示金额以结算页为准）。" },
  { q: "用量不够怎么办？", a: "你可以升级到更高套餐获取更多月度配额，或购买 Credits 按量扩容（报告/追问/导出）。" },
  { q: "积分与高阶数据源（Reddit / Amazon）如何计费？", a: "积分采用 $1 = 1 Credit，仅在套餐额度耗尽时使用。常见消耗：1）用完了加报告 —— 套餐用尽后购买 $10–$470 充值包，兑换为完整报告（70 积分/份）、AI 追问（10 积分/10 次）或数据导出（10 积分/200 条）。2）勾选 Reddit / Amazon —— 默认报告 70 积分，挂载 Reddit 数据源额外 +10 积分/份，挂载 Amazon Reviews 额外 +12 积分/份；其余 7 个默认数据源（YouTube、TikTok、X、Facebook、Instagram、Pinterest、Trustpilot）已包含在基础积分内。积分余额长期有效，兑换后的用量权益有效期 12 个月。" },
];

function FAQSection() {
  return (
    <section className="relative px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-border/40 bg-card/10 backdrop-blur-sm p-8 md:p-10">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">常见问题</h2>
          <p className="mt-2 text-xs text-muted-foreground">免费版无需绑卡、不会扣费；订阅付费套餐需绑卡并按月自动续费，可随时取消。</p>
        </motion.div>
        <motion.div variants={fadeUp} custom={1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqsCN.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm px-6 overflow-hidden">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── 6) Footer CTA ──────────────────────────────────── */
function FooterCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[600px] rounded-full bg-ring/15 blur-[140px]" />
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-foreground md:text-5xl">
          <span className="text-gradient">让每一次决策都有据可依</span>
        </motion.h2>
        <motion.div variants={fadeUp} custom={1} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://app.datascaler.ai/plans" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="glow-primary bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/80">
              开始体验
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Demo Dialog (reused) ────────────────────────────── */

/* ─── Page ────────────────────────────────────────────── */
export function PricingContent() {
  return (
    <div className="min-h-screen bg-background">
      <PricingHeader />
      <PricingHero />
      <PlansSection />

      <CreditsSection />
      <FAQSection />
      <FooterCTA />
      <PricingFooter />
    </div>
  );
}
