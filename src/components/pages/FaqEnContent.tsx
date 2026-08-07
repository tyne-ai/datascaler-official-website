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
    title: "Product and data sources",
    items: [
      {
        q: "How is DataScaler different from asking ChatGPT?",
        a: "General-purpose AI is useful for broad questions. DataScaler works from public posts, comments, and engagement data within the time range you choose.\n\nEach key finding includes a [Ref] so you can open the source and review the context yourself. Results are organized into reports and action lists your team can revisit and share.",
      },
      {
        q: "Where does DataScaler get its data?",
        a: "Depending on the platform, we use public search results, permitted API access, and publicly accessible posts and comments. Available fields and update frequency vary by source. Reports retain source links so your team can review the underlying content.",
      },
      {
        q: "How do you reduce the risk of inaccurate AI conclusions?",
        a: "Key findings are linked to the posts or comments that support them whenever possible. Open any [Ref] to review the context and decide whether the finding applies to your business. DataScaler is a research aid, and important decisions should still include your team’s judgment and internal data.",
      },
      {
        q: "How do you handle duplicate posts, PR content, and suspicious accounts?",
        a: "The system looks at account patterns, repeated language, and distribution behavior to flag content that may distort the picture. These flags help analysts review the data; they are not a final judgment about an account or post.",
      },
    ],
  },
  {
    icon: Globe2,
    title: "Coverage and updates",
    items: [
      {
        q: "Which platforms do you cover?",
        a: "Base reports include YouTube, TikTok, X, Facebook, Instagram, Pinterest, and Trustpilot. Reddit and Amazon Reviews are available as premium sources. Data availability and fields vary by platform.",
      },
      {
        q: "How often is the data updated?",
        a: "Each report collects data for the time range you select. If you need recurring monitoring or more frequent updates, our team can help match the cadence and configuration to your use case.",
      },
      {
        q: "How do you approach data compliance?",
        a: "DataScaler works with publicly accessible posts, comments, and engagement signals. We do not seek access to private accounts or non-public content. Processing is subject to applicable platform rules, laws, and the DataScaler Privacy Policy.",
      },
    ],
  },
  {
    icon: Users,
    title: "Teams and setup",
    items: [
      {
        q: "Which teams use DataScaler?",
        a: "Brand, marketing, growth, insights, and research teams use DataScaler for launch feedback, competitor comparisons, review analysis, content planning, and ongoing brand monitoring.",
      },
      {
        q: "Do we need an integration before we can start?",
        a: "No. You can start without connecting an internal database or installing a plug-in. Enter your brand, review the suggested keywords and competitors, and then generate a report.",
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
            Questions teams ask before getting started
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-base text-muted-foreground" style={{ lineHeight: 1.6 }}>
            Straight answers about the data, coverage, setup, and plans.
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
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Have a specific use case?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Start with a free brand report, or talk with our team about the coverage you need.
          </p>
          <div className="mt-7">
            <a href="https://app.datascaler.ai/plans" target="_blank" rel="noopener noreferrer" data-cta="faq_free_trial">
              <span className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_hsl(142_76%_63%/0.5)] transition-colors hover:bg-primary/85">
                Create a free report
              </span>
            </a>
          </div>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
