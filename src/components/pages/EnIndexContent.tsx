'use client';
import { useState, Fragment } from "react";
import { motion, MotionConfig } from "framer-motion";
import { DemoDialog } from "@/components/DemoDialog";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";
import BriefTerminal from "@/components/en/BriefTerminal";
import HeroBriefPanel from "@/components/en/HeroBriefPanel";
import { CopilotChat, ActionBoard } from "@/components/en/CopilotMockup";
import CompetitorDashboard from "@/components/en/CompetitorDashboard";
import {
  Search,
  FileText,
  Rocket,
  Box,
  Timer,
  Unlink,
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

// ─── Lightweight analytics helper (GTM dataLayer) ────────
// Pushes a conversion/intent event into dataLayer so GTM can pick it up.
// No-op until the GTM container is installed; safe to ship now.
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

// ─── Hero Search ─────────────────────────────────────────
function HeroSearchInput() {
  return (
    <motion.div variants={fadeUp} custom={3} className="w-full max-w-lg">
      <div className="group relative">
        <div className="absolute -inset-1 rounded-xl bg-ring/15 blur-md transition-opacity duration-300 group-focus-within:bg-ring/25" />
        <div className="relative flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 backdrop-blur-md p-2">
          <Search className="ml-3 h-5 w-5 text-muted-foreground" />
          <Input
            aria-label="Brand domain search"
            className="w-full border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter your brand domain..."
          />
          <a
            href="https://app.datascaler.ai/plans"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="hero_free_report"
            onClick={() => track("sign_up_click", { button_location: "hero", cta_type: "free_report" })}
          >
            <Button size="sm" className="shrink-0 bg-primary text-primary-foreground font-semibold hover:bg-primary/80 glow-primary">
              Try it on my brand →
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
          AI brand intelligence
          <br className="mb-3" />
          that <span className="text-gradient mt-3 inline-block">shows its work.</span>
        </motion.h1>

        <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground md:text-lg md:leading-relaxed">
          Across 9 public platforms — YouTube, TikTok, X, Facebook, Instagram, and more. Choose your own cadence. Every line links back to the original post.
        </motion.p>

        <div className="mt-10">
          <HeroSearchInput />
        </div>

        {/* Platform Strip — all 9 sources surfaced in the hero */}
        <motion.div variants={fadeUp} custom={4} className="mt-8 w-full max-w-3xl">
          <div className="mb-3 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Sources · 9 public platforms
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
    quote: "Where did this number come from?",
    desc: "It's the first question every CMO asks. Most AI tools don't have an answer. We link every claim back to the post it came from — so when someone asks, you've got it.",
  },
  {
    quote: "Either too shallow, or the wrong cadence.",
    desc: "Other tools come with one setting and no knob. We let you tune the depth — one page to ten — and the cadence, to match your brand and budget.",
  },
  {
    quote: "Ratings dropped. We don't know why.",
    desc: "We do. We surface the exact review, creator, or thread moving the needle — and we link straight to it.",
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
            Stop paying for AI you can't defend.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Evidence you can actually point to when someone asks where it came from.
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

// ─── Section 3: Core Brief & Evidence ────────────────────
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
            Reimagined workflow: conclusions first, evidence on demand
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            AI insight brief + a transparent evidence chain: click [Ref] to trace back to original posts.
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
            <div className="md:w-2/5 space-y-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ring/15">
                <FileText className="h-5 w-5 text-ring" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                AI brief + transparent evidence chain
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Conclusions first: scan this week's momentum, sentiment shifts, and competitor gaps in one brief. Every claim is tagged with <span className="text-ring font-semibold">[Ref]</span> so you can open the underlying posts and threads — evidence included.
              </p>
              <div className="space-y-3">
                {[
                  "Click [Ref] to open an Evidence Card",
                  "See original posts, sentiment labels, and engagement signals",
                  "Transparent by design: every claim is traceable and verifiable",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-3/5">
              <BriefTerminal />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 4: Competitor Intel ─────────────────────────
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
            Detect competitor moves across channels — diagnose cross‑platform gaps in one click
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The assistant surfaces competitor momentum, risks, and opportunities from public signals — so teams can react early and plan decisively.
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
            From "what just happened" to "what to do about it," in seconds.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A screen-aware assistant traces every change to its cause in real time, and turns it into a prioritized Action Board.
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
            Try asking · Real questions global teams bring in every week
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { tag: "Creator discovery", q: "“Find me 5 Instagram creators worth partnering with this month.”" },
              { tag: "Issue attribution", q: "“Negative Amazon reviews spiked last week — what's driving it?”" },
              { tag: "Competitive intel", q: "“Which competitor are customers comparing us to most on Reddit?”" },
              { tag: "Launch feedback", q: "“Our new launch is one week in — what are customers loving and hating most?”" },
              { tag: "Response triage", q: "“There's a Reddit thread building about us — worth responding? How big is the impact?”" },
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

// ─── Pricing Section (4 cards + toggle, lightweight) ─────
const plans = [
  {
    name: "Free",
    subtitle: "Free forever · No card required",
    monthly: 0,
    icon: Star,
    badge: null,
    metrics: [
      { label: "Brands", value: "1" },
      { label: "Full reports", value: "1" },
      { label: "Deep questions (total)", value: "6" },
      { label: "Export", value: "Not supported" },
      { label: "Seats", value: "1" },
    ],
    cta: "Get started",
    href: "https://app.datascaler.ai/plans",
    isDialog: false,
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
    ],
    cta: "Choose Pro",
    href: "https://app.datascaler.ai/plans",
    isDialog: false,
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
      { label: "Export", value: "Unlimited" },
      { label: "Seats", value: "5" },
      { label: "AI rate limit", value: "3 rpm" },
    ],
    cta: "Book a demo",
    href: null,
    isDialog: true,
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
      { label: "Export", value: "Unlimited" },
      { label: "Seats", value: "10" },
      { label: "AI rate limit", value: "3 rpm" },
    ],
    cta: "Contact sales",
    href: null,
    isDialog: true,
  },
];

function PricingSection() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [dialogOpen, setDialogOpen] = useState(false);

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
        <div className="text-center mb-10">
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Crown className="h-3 w-3" />
              Pricing
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">
            Simple, transparent pricing
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Pick a plan → Need more → Top up Credits
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div variants={fadeUp} custom={2} className="flex justify-center mb-10">
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
                custom={i + 3}
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

                {/* CTA */}
                {plan.isDialog ? (
                  <Button
                    variant="outline"
                    data-plan={plan.name.toLowerCase()}
                    className="w-full border-ring/40 text-ring hover:bg-ring/10 font-semibold"
                    onClick={() => {
                      track("plan_click", { plan_name: plan.name.toLowerCase(), cta_type: "demo" });
                      setDialogOpen(true);
                    }}
                  >
                    {plan.cta}
                  </Button>
                ) : isPro ? (
                  <a
                    href={plan.href!}
                    target="_blank"
                    className="w-full"
                    data-plan={plan.name.toLowerCase()}
                    onClick={() => track("plan_click", { plan_name: plan.name.toLowerCase(), cta_type: "signup" })}
                  >
                    <Button className="w-full font-semibold bg-ring text-background hover:bg-ring/80">
                      {plan.cta}
                    </Button>
                  </a>
                ) : (
                  <a
                    href={plan.href!}
                    target="_blank"
                    className="w-full"
                    data-plan={plan.name.toLowerCase()}
                    onClick={() => track("plan_click", { plan_name: plan.name.toLowerCase(), cta_type: "signup" })}
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

        {/* See full pricing link */}
        <motion.div variants={fadeUp} custom={8} className="mt-8 text-center">
          <a href="/en/pricing" className="text-sm font-medium text-ring hover:text-ring/80 transition-colors">
            See full pricing →
          </a>
        </motion.div>
      </motion.div>

      <DemoDialog lang="en" open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}

// ─── Social Proof ────────────────────────────────────────
const proofStats = [
  { value: "200+", label: "Brands" },
  { value: "9", label: "Public platforms" },
  { value: "100%", label: "Every claim, sourced" },
];

const proofQuotes = [
  {
    quote:
      "Before DataScaler we argued over screenshots. Now every claim links to the original post — the room just trusts the data.",
    name: "Sarah C.",
    role: "Brand Manager · Consumer Electronics",
  },
  {
    quote:
      "After a launch, social chatter tells us how it's landing before reviews even show up. We catch the signal days earlier.",
    name: "Ashley Y.",
    role: "Brand Lead · Fashion & Maternity DTC",
  },
  {
    quote:
      "The Action Board turns noise into a short list of what to do next. It's the part my team actually opens every morning.",
    name: "Marcus R.",
    role: "Market Intelligence · Global DTC",
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
          Trusted by global brands to see what their customers see
        </motion.h2>

        {/* Stats */}
        <motion.div variants={fadeUp} custom={1} className="mt-10 grid grid-cols-3 gap-4">
          {proofStats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-2 text-xs text-muted-foreground md:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Quotes */}
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

// ─── Footer CTA ──────────────────────────────────────────
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
          Make every decision <span className="text-gradient">one you can defend.</span>
        </motion.h2>
        <motion.div variants={fadeUp} custom={1} className="mt-10">
          <a href="https://app.datascaler.ai/plans" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="glow-primary bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/80"
            >
              Try it on my brand →
            </Button>
          </a>
        </motion.div>
        <motion.p variants={fadeUp} custom={3} className="mt-6 text-xs text-muted-foreground/80">
          Built on publicly available signals. No account linking required — compliant and secure.
        </motion.p>
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
export function EnIndexContent() {
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
