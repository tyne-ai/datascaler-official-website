'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingHeader } from '@/components/PricingHeader';
import { PricingFooter } from '@/components/PricingFooter';

// ─── lightweight tracking helper (GTM dataLayer) ───────
function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...params });
}

const SIGNUP_URL = 'https://app.datascaler.ai/auth/sign-up';
const DOCS_URL = 'https://docs.datascaler.ai/en';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ─── Hero evidence workspace panel ────────────────────── */
type StepState = 'done' | 'active' | 'pending';
const steps: { title: string; sub: string; state: StepState }[] = [
  { title: 'Load verified brand + competitor set', sub: '', state: 'done' },
  { title: 'Pull reviews, social, and support signals', sub: '', state: 'done' },
  { title: 'Cluster complaints and find what changed', sub: 'scanning 3,200 mentions…', state: 'active' },
  { title: 'Rank drivers by severity and reach', sub: '', state: 'pending' },
  { title: 'Draft actions for product, CX, and growth', sub: '', state: 'pending' },
];
const stateLabel: Record<StepState, string> = { done: 'Done', active: 'Running', pending: 'Queued' };

function WorkspacePanel() {
  return (
    <div className="glass-card overflow-hidden rounded-xl shadow-[0_20px_48px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[13px] text-muted-foreground">DataScaler · Evidence Workspace</span>
      </div>
      <div className="flex items-center gap-2.5 border-b border-border/40 px-4 py-3.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Play className="h-3 w-3 fill-current" />
        </span>
        <span className="text-sm text-slate-200">What&apos;s driving the drop in our reviews this month?</span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        {steps.map((s) => {
          const isActive = s.state === 'active';
          return (
            <div
              key={s.title}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                isActive ? 'bg-[hsl(217_91%_59%/0.12)]' : ''
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  s.state === 'done'
                    ? 'bg-primary'
                    : s.state === 'active'
                      ? 'bg-[#3B82F6]'
                      : 'border border-border/60'
                }`}
              >
                {s.state === 'done' && (
                  <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                )}
                {s.state === 'active' && <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-slate-200">
                {s.title}
                {s.sub && <span className="text-muted-foreground"> — {s.sub}</span>}
              </span>
              <span
                className={`shrink-0 text-xs ${
                  s.state === 'done'
                    ? 'text-primary'
                    : s.state === 'active'
                      ? 'text-[hsl(217_91%_70%)]'
                      : 'text-muted-foreground'
                }`}
              >
                {stateLabel[s.state]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-24">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none absolute right-0 top-0">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
      </div>
      <div className="pointer-events-none absolute left-0 top-1/3">
        <div className="h-[520px] w-[520px] rounded-full bg-ring/15 blur-[150px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div>
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl"
          >
            Ground every AI answer in <span className="text-gradient">real customer evidence</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
            style={{ lineHeight: 1.7 }}
          >
            DataScaler feeds reviews, social chatter, competitor moves, and category shifts to your AI
            over MCP — so Claude, ChatGPT, and your agents answer from real evidence, not guesswork.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-wrap gap-4">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="mcp_free_trial"
              onClick={() => track('sign_up_click', { button_location: 'mcp_hero_primary', locale: 'en' })}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-semibold hover:bg-primary/85 glow-primary"
              >
                Get started free
              </Button>
            </a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" data-cta="mcp_docs">
              <Button
                size="lg"
                variant="outline"
                className="border-white/12 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06] hover:text-white"
              >
                Read the docs
              </Button>
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={3}>
          <WorkspacePanel />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Section head ─────────────────────────────────────── */
function SecHead({ title, desc }: { title: ReactNode; desc: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="mx-auto mb-11 max-w-3xl text-center"
    >
      <motion.h2
        variants={fadeUp}
        custom={0}
        className="font-display text-3xl font-bold text-foreground md:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} custom={1} className="mt-4 text-base text-muted-foreground md:text-lg">
        {desc}
      </motion.p>
    </motion.div>
  );
}

/* ─── Natural language questions ───────────────────────── */
const questions = [
  { q: 'What actually changed after our launch?', a: 'launch reviews, social reactions, and support tickets' },
  { q: 'Where is a competitor losing customers?', a: 'their complaints, unmet needs, and switch triggers' },
  { q: 'What makes buyers hesitate before checkout?', a: 'pre-sale questions, objections, and FAQ gaps' },
  { q: 'Which complaints are becoming real risks?', a: 'severity, channel spread, and who owns them' },
];

function NaturalLanguage() {
  return (
    <section className="px-6 py-20">
      <SecHead
        title={<>Ask hard questions. Get answers backed by real evidence.</>}
        desc="Your AI pulls the reviews, posts, and signals behind every answer — so brand, product, growth, and CX teams can act, not second-guess."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
      >
        {questions.map((item, i) => (
          <motion.div
            key={item.q}
            variants={fadeUp}
            custom={i}
            className="glass-card flex flex-col gap-3 rounded-xl p-7"
          >
            <p className="text-lg font-medium leading-relaxed text-slate-100">{item.q}</p>
            <p className="text-[13px] text-primary">Grounded in {item.a}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── Consumer voice layer ─────────────────────────────── */
const caps = [
  { title: 'Evidence retrieval', desc: 'Every answer comes with the exact reviews and posts behind it.' },
  { title: 'Signal prioritization', desc: 'Tell one-off noise apart from the patterns worth acting on.' },
  { title: 'Competitor context', desc: 'See where rivals fall short — in their customers\u2019 own words.' },
  { title: 'Workflow-ready output', desc: 'Findings come out as briefs, FAQs, and next steps.' },
  { title: 'Category memory', desc: 'What your team learns compounds instead of resetting each quarter.' },
  { title: 'Decision handoff', desc: 'Route each insight to the team that owns it, evidence attached.' },
];

function ConsumerVoice() {
  return (
    <section className="px-6 py-20">
      <SecHead
        title={<>The customer-evidence layer for AI-native teams</>}
        desc="Turn scattered customer signals into something your AI can retrieve, compare, and act on."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
      >
        {caps.map((c, i) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            custom={i % 3}
            className="glass-card flex flex-col gap-2.5 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-slate-100">{c.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── Access compare ───────────────────────────────────── */
const cols = [
  {
    tag: 'For AI-assisted work',
    title: 'MCP workspace',
    desc: 'Every prompt can pull live customer evidence.',
    bullets: [
      'Ask brand, product, and CX questions in context',
      'Pull real evidence instead of pasting snippets',
      'Runs in Claude, ChatGPT, and other MCP clients',
    ],
  },
  {
    tag: 'For embedded intelligence',
    title: 'API access',
    desc: 'Wire customer evidence into agents, dashboards, and jobs.',
    bullets: [
      'Query consumer voice and market signals',
      'Trigger syncs, alerts, and workflows',
      'Enterprise deployment when you need it',
    ],
  },
];

function AccessMethods() {
  return (
    <section className="px-6 py-20">
      <SecHead
        title={<>Plug in where your AI already works</>}
        desc="Use MCP for AI-assisted research in chat. Use the API to wire evidence into your own agents and dashboards."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
      >
        {cols.map((col, i) => (
          <motion.div
            key={col.title}
            variants={fadeUp}
            custom={i}
            className="glass-card flex flex-col gap-4 rounded-2xl p-8"
          >
            <span
              className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${
                i === 0
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-[hsl(217_91%_59%/0.35)] bg-[hsl(217_91%_59%/0.12)] text-[hsl(217_91%_72%)]'
              }`}
            >
              {col.tag}
            </span>
            <h3 className="text-xl font-bold text-white">{col.title}</h3>
            <p className="text-[15px] text-muted-foreground">{col.desc}</p>
            <ul className="mt-1 flex flex-col gap-2.5">
              {col.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px] text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── Final CTA ────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ring/[0.06] to-transparent" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="mx-auto max-w-3xl font-display text-3xl font-bold text-foreground md:text-4xl"
        >
          Make every AI answer trace back to evidence.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Connect in minutes and give your AI real customer evidence to reason from.
        </motion.p>
        <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="mcp_free_trial_footer"
            onClick={() => track('sign_up_click', { button_location: 'mcp_final_primary', locale: 'en' })}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-semibold hover:bg-primary/85 glow-primary"
            >
              Get started
            </Button>
          </a>
          <Link
            href="/en/contact"
            data-cta="mcp_book_demo"
            onClick={() => track('demo_click', { button_location: 'mcp_final_secondary', locale: 'en' })}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white/12 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06] hover:text-white"
            >
              Book a demo
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function EnMcpContent() {
  return (
    <div className="min-h-screen bg-background">
      <PricingHeader forceLang="en" />
      <Hero />
      <NaturalLanguage />
      <ConsumerVoice />
      <AccessMethods />
      <FinalCTA />
      <PricingFooter forceLang="en" />
    </div>
  );
}
