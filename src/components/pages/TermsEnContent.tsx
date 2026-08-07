'use client';
import { motion } from "framer-motion";
import { Printer } from "lucide-react";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const sections = [
  {
    id: 1,
    title: "1. The service",
    body: "DataScaler provides AI-assisted analysis based on public signals and, where available, links key findings to viewable sources through [Ref]. AI-generated output is probabilistic and may be incomplete or inaccurate. It is intended to support research and decision-making, not to serve as the sole basis for a material business decision.",
  },
  {
    id: 2,
    title: "2. Intellectual property",
    body: "Subject to applicable law, third-party rights, and any separate agreement, customers may use reports generated for their account for internal business purposes. DataScaler retains all rights in the platform, software, processing methods, models, and related technology. You may not reverse engineer, scrape, or resell the service without permission.",
  },
  {
    id: 3,
    title: "3. Acceptable use",
    body: "You may not use the service to obtain non-public personal information, violate a third party platform’s rules, infringe another party’s rights, or engage in unlawful or unfair competitive activity. DataScaler may restrict or terminate access when it identifies misuse.",
  },
  {
    id: 4,
    title: "4. Disclaimers and limitation of liability",
    body: "Third-party content changes over time, and AI analysis may miss or misinterpret information. DataScaler does not warrant that all data or findings will be complete, accurate, or fit for a particular purpose. To the fullest extent permitted by law, DataScaler’s aggregate liability will not exceed the fees you paid for the service during the 12 months before the event giving rise to the claim.",
  },
  {
    id: 5,
    title: "5. Data use",
    body: "DataScaler processes publicly accessible signals and handles customer-submitted data as described in the Privacy Policy. Unless you give us explicit permission, uploaded brand data is not used to train public-facing AI models.",
  },
  {
    id: 6,
    title: "6. Governing law and disputes",
    body: "The governing law and dispute process will be the terms stated in your order form, enterprise agreement, or the rules applicable to the DataScaler contracting entity. The parties will first try to resolve a dispute through good-faith discussion before using the formal process set out in the applicable agreement.",
  },
];

export function TermsEnContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PricingHeader />

      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="mb-6">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Terms of Service</h1>
              <button
                onClick={() => window.print()}
                aria-label="Print this page"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
              >
                <Printer className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Last updated: March 31, 2026</p>
          </motion.div>

          {/* Sections */}
          <div>
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate="visible"
                className="py-12 border-b border-white/5 last:border-b-0"
              >
                <h2 className="text-lg font-bold text-white mb-5">{s.title}</h2>
                <p className="text-slate-300 leading-relaxed">{s.body}</p>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
