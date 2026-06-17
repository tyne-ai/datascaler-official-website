'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { DemoDialog } from "@/components/DemoDialog";
import {
  Crown, Zap, Building2, Check, Rocket,
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
          Pricing & Billing
        </motion.h1>
        <motion.p variants={fadeUp} custom={2} className="mx-auto mt-6 max-w-[700px] text-base text-muted-foreground" style={{ lineHeight: 1.7 }}>
          Pick a plan → Need more → Top up Credits
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── 2) Plans Section (4 tiers + toggle) ─────────────── */
const plans = [
  {
    name: "Free",
    subtitle: "Free forever · No card required",
    monthly: 0,
    icon: Star,
    badge: null,
    metrics: [
      { label: "Brands", value: "1" },
      { label: "Full reports (total)", value: "1" },
      { label: "Deep questions (total)", value: "6" },
      { label: "Export", value: "Not supported" },
      { label: "Seats", value: "1" },
      { label: "AI rate limit", value: "1 rpm" },
    ],
    cta: "Get started",
    href: "https://app.datascaler.ai/plans",
    isDialog: false,
    footnote: "Free forever — no credit card required and no auto-charge. One-time allotment; upgrade to Pro anytime for more.",
  },
  {
    name: "Pro",
    subtitle: "Best for growing brands",
    monthly: 199,
    icon: Zap,
    badge: "MOST POPULAR",
    metrics: [
      { label: "Brands", value: "1" },
      { label: "Reports / mo", value: "3" },
      { label: "Deep questions / mo", value: "60" },
      { label: "Export", value: "1,000 / mo" },
      { label: "Seats", value: "1" },
      { label: "AI rate limit", value: "1 rpm" },
    ],
    cta: "Choose Pro",
    href: "https://app.datascaler.ai/plans",
    isDialog: false,
    footnote: null,
  },
  {
    name: "Team",
    subtitle: "Multi-brand collaboration",
    monthly: 499,
    icon: Users,
    badge: null,
    metrics: [
      { label: "Brands", value: "3" },
      { label: "Reports / mo", value: "9" },
      { label: "Deep questions / mo", value: "300" },
      { label: "Export", value: "3000" },
      { label: "Seats", value: "5" },
      { label: "AI rate limit", value: "3 rpm" },
    ],
    cta: "Book a demo",
    href: "https://app.datascaler.ai/plans",
    isDialog: true,
    footnote: null,
  },
  {
    name: "Enterprise",
    subtitle: "Custom for global brands",
    monthly: 1299,
    icon: Building2,
    badge: null,
    metrics: [
      { label: "Brands", value: "8" },
      { label: "Reports / mo", value: "25" },
      { label: "Deep questions / mo", value: "1,000" },
      { label: "Export", value: "10000" },
      { label: "Seats", value: "10" },
      { label: "AI rate limit", value: "3 rpm" },
    ],
    cta: "Contact sales",
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
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Base Plans</h2>
        </motion.div>

        {/* Toggle */}
        <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-border/50 bg-card/40 backdrop-blur-sm p-1">
            <button
              onClick={() => setCycle("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${cycle === "monthly" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setCycle("yearly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${cycle === "yearly" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Annual · Save 10%
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
                      <span className="text-3xl font-bold text-foreground">Free</span>
                      <span className="text-muted-foreground ml-1 text-sm">· forever · no card</span>
                    </div>
                  ) : cycle === "monthly" ? (
                    <div>
                      <span className="text-3xl font-bold text-foreground">${plan.monthly}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ mo</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-foreground">${effectiveMonthly}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ mo</span>
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
      <DemoDialog lang="en" open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}

/* ─── 3) Credits & Add-ons Section ─────────────────────── */
const consumptionListEn = [
  { title: "Full report", credits: "70 Credits / report", icon: null },
  { title: "AI follow-up", credits: "10 Credits / 10 asks", icon: null },
  { title: "Data export", credits: "10 Credits / 200 rows", icon: null },
  { title: "Reddit data source", credits: "+10 Credits / report", icon: <RedditIcon className="h-3.5 w-3.5" /> },
  { title: "Amazon Reviews data source", credits: "+12 Credits / report", icon: <AmazonIcon className="h-3.5 w-3.5" /> },
];

const defaultChannelsEn = [
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
  { price: 68, credits: 70, tag: "RECOMMENDED", note: "≈ 1 report" },
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
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Credits & Add-ons</h2>
          <p className="mt-2 text-sm text-muted-foreground">$1 = 1 Credit · Top up on demand when your plan runs out</p>
        </motion.div>

        {/* Layer 1: Top-up packs (centered, hero) */}
        <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topupPacks.map((p) => (
            <div key={p.price} className={`relative rounded-xl border p-6 flex flex-col items-center text-center transition-colors ${p.tag ? "border-primary/50 bg-primary/5" : "border-border/40 bg-card/10 hover:border-border/60"}`}>
              {p.tag && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground whitespace-nowrap">{p.tag}</span>
              )}
              <p className="text-3xl font-bold text-foreground mt-1">${p.price}</p>
              <p className="text-sm text-muted-foreground mt-1">{p.credits} Credits</p>
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
                Top up now
              </a>
            </div>
          ))}
        </motion.div>

        {/* Layer 2: Consumption rules (below, equal width) */}
        <motion.div variants={fadeUp} custom={2} className="space-y-4">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase text-center">Consumption rules</p>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/40 bg-border/30 sm:grid-cols-2 lg:grid-cols-5">
            {consumptionListEn.map((item) => (
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
            <span className="text-[10px] text-muted-foreground/70">Default data sources:</span>
            {defaultChannelsEn.map((c) => {
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
          Credits valid for 12 months; redeemed usage valid for 3 months.
        </p>

      </motion.div>
    </section>
  );
}

/* ─── 4) FAQ ──────────────────────────────────────────── */
const faqsEN = [
  { q: "Does the Free plan charge me? Is a card required?", a: "No to both. The Free plan needs no credit card and never charges you — a card is only required when you upgrade to a paid plan like Pro." },
  { q: "What's included in the Free plan?", a: "A one-time allotment: 1 brand, 1 full report, and 6 AI deep questions. It doesn't reset monthly. Upgrade to a paid plan anytime for more." },
  { q: "What happens when my free allotment runs out?", a: "Nothing automatic — the Free plan never auto-charges or auto-upgrades. Once your one-time allotment is used up, you can upgrade to a paid plan for more monthly quota." },
  { q: "How do I cancel? When does it take effect?", a: "You can cancel in Billing & Plans. Cancellation takes effect at the end of your current billing period (as shown in the UI)." },
  { q: "How is the annual discount calculated?", a: "Annual pricing is 10% off: annual = monthly × 12 × 0.9. Final amounts are shown at checkout." },
  { q: "What if I need more usage?", a: "Upgrade your plan for higher monthly limits, or top up Credits for reports, deep questions, and export." },
  { q: "How are Credits and premium data sources (Reddit / Amazon) billed?", a: "Credits use $1 = 1 Credit and only kick in once your plan quota is exhausted. Common usage: 1) Out of quota — buy a $10–$470 top-up pack and redeem for full reports (70 Credits / report), AI follow-up (10 Credits / 10 asks), or data export (10 Credits / 200 rows). 2) Attaching Reddit / Amazon — a full report is 70 Credits; adding Reddit costs +10 Credits / report and adding Amazon Reviews costs +12 Credits / report. The other 7 default data sources (YouTube, TikTok, X, Facebook, Instagram, Pinterest, Trustpilot) are already included. Credit balance never expires; redeemed usage is valid for 12 months." },
];

function FAQSection() {
  return (
    <section className="relative px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-border/40 bg-card/10 backdrop-blur-sm p-8 md:p-10">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">FAQ</h2>
          <p className="mt-2 text-xs text-muted-foreground">Free plan needs no card and never charges. Paid plans require a card and auto-renew monthly; cancel anytime.</p>
        </motion.div>
        <motion.div variants={fadeUp} custom={1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqsEN.map((f, i) => (
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

/* ─── 5) Footer CTA ──────────────────────────────────── */
function FooterCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[600px] rounded-full bg-ring/15 blur-[140px]" />
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-foreground md:text-5xl">
          Stop Guessing.<br /><span className="text-gradient">Start Scaling with Evidence.</span>
        </motion.h2>
        <motion.div variants={fadeUp} custom={1} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://app.datascaler.ai/plans" target="_blank">
            <Button size="lg" className="glow-primary bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/80">
              Get started
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Demo Dialog ─────────────────────────────────────── */

/* ─── Page ────────────────────────────────────────────── */
export function PricingEnContent() {
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
