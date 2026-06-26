'use client';
import { motion } from "framer-motion";
import { HelpCircle, Cpu, Globe2, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const sections = [
  {
    icon: Cpu,
    title: "Product & Trust",
    items: [
      {
        q: "Why not just use a general-purpose LLM?",
        a: "A general LLM answers from what it read during training — not from what people are actually saying right now. We pull from 9 public platforms on the cadence you set.\n\nA general LLM can't tell you where the answer came from. We link every claim back to the original post.\n\nA general LLM is a one-off chat. We give you a structured report, plus an auto-prioritized action board.",
      },
      {
        q: "How does DataScaler collect its data? Why not just use official APIs?",
        a: 'We utilize a proprietary "Global Traffic Perception" logic that simulates real user search behavior. Unlike restrictive official APIs, our method captures the actual exposure results seen by consumers, including post details and interaction signals that APIs often miss, providing a truer reflection of market reality.',
      },
      {
        q: 'How do you ensure AI insight accuracy and solve "AI hallucination"?',
        a: 'We eliminate "black-box" summaries through our "Evidence-backed Ref" mechanism. Every AI-generated insight is anchored to raw signals. Users can click any conclusion to view the original post on YouTube or X. We don\'t deliver guesses; we deliver evidence-backed intelligence.',
      },
      {
        q: "How do you handle fake articles or bot noise (PR seeding)?",
        a: 'Our system features a built-in "Bot & PR Detection Engine." The AI distinguishes between seeded PR content and organic user reviews by analyzing account behavior and semantic patterns, helping brands filter out the noise and access genuine consumer sentiment.',
      },
    ],
  },
  {
    icon: Globe2,
    title: "Data & Coverage",
    items: [
      {
        q: "Which platforms do you currently cover?",
        a: "We currently provide full coverage for YouTube, X (Twitter), Facebook, Instagram, and TikTok. We are continuously optimizing and rolling out support for high-value communities like Reddit to ensure global brand signal coverage.",
      },
      {
        q: "How frequently is data refreshed?",
        a: "The Pro plan supports weekly refreshes for routine monitoring. The Enterprise plan offers daily high-frequency refreshes and real-time anomaly alerts, ensuring brands can react instantly to crises or trending opportunities.",
      },
      {
        q: "How do you ensure data collection compliance?",
        a: "DataScaler only collects publicly available signals and does not access private non-public data. Our methodology fully complies with global data privacy regulations, providing brands with secure and auditable competitive intelligence.",
      },
    ],
  },
  {
    icon: Users,
    title: "Usage & Support",
    items: [
      {
        q: "What kind of teams is DataScaler designed for?",
        a: "We primarily serve three types of teams: Marketing for competitor benchmarking and sentiment monitoring; Growth for identifying opportunities and trend attribution; and Strategy/Research for evidence-based market inference.",
      },
      {
        q: "Is there a steep learning curve? Do we need complex integrations?",
        a: "Zero integration cost. DataScaler is a ready-to-use Web platform that requires no internal database access or plugin installations. Simply enter your brand or keywords, and our Agents start working immediately.",
      },
    ],
  },
];

export function FaqEnContent() {
  return (
    <div className="min-h-screen bg-background">
      <PricingHeader />

      <section className="relative px-6 pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[420px] w-[600px] rounded-full bg-ring/20 blur-[160px]" />
        </div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <HelpCircle className="h-3 w-3" /> FAQ
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="mt-8 text-3xl font-bold text-foreground md:text-5xl leading-tight">
            Frequently Asked Questions
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-base text-muted-foreground" style={{ lineHeight: 1.6 }}>
            Everything you need to know about DataScaler
          </motion.p>
        </motion.div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-16">
          {sections.map((section, si) => (
            <motion.div
              key={si}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp} custom={si * 0.5}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {section.items.map((item, qi) => (
                  <AccordionItem
                    key={qi}
                    value={`s${si}-q${qi}`}
                    className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-md px-5 data-[state=open]:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4 text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom conversion CTA */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-gradient-to-br from-card/70 to-primary/5 p-10 text-center backdrop-blur-md">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Still have questions?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Sign up free — no credit card required — and get your brand's first traceable report.
          </p>
          <div className="mt-7">
            <a href="https://app.datascaler.ai/plans" target="_blank" rel="noopener noreferrer" data-cta="faq_free_trial">
              <span className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_hsl(142_76%_63%/0.5)] transition-colors hover:bg-primary/85">
                Get started
              </span>
            </a>
          </div>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
