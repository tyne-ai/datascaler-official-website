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
    title: "Section 1: Service Definition & Methodology",
    body: 'DataScaler provides AI-driven attribution services based on public signals. We guarantee "100% Traceability"—all insights are anchored to our proprietary "Evidence-backed Ref" engine. Users acknowledge and accept that AI-generated insights are probabilistic and inferential. This service is designed as a decision-support tool; DataScaler disclaims all legal warranties or financial liabilities for direct or indirect business outcomes based on such insights.',
  },
  {
    id: 2,
    title: "Section 2: Intellectual Property",
    body: 'Users hold exclusive rights to the specific custom "Insight Briefings" generated for them. DataScaler retains all proprietary rights to the underlying "Evidence Engine," data processing logic, algorithmic models, and non-sensitive aggregated data. Any form of reverse engineering, unauthorized automated scraping, or re-packaging of our core technology is strictly prohibited.',
  },
  {
    id: 3,
    title: "Section 3: Acceptable Use",
    body: "Users agree not to use the platform for: (1) Tracking non-public private information; (2) Violating the Terms of Service of target social platforms; (3) Engaging in illegal competitive practices using the insights provided. DataScaler reserves the right to terminate access immediately upon discovery of such misuse.",
  },
  {
    id: 4,
    title: "Section 4: Limitation of Liability",
    body: "Given the dynamic nature of third-party data and the inherent limitations of LLMs, DataScaler does not guarantee 100% semantic accuracy. In no event shall DataScaler's liability exceed the total fees paid by the user in the preceding 12 months.",
  },
  {
    id: 5,
    title: "Section 5: Data Compliance",
    body: 'We collect signals through public channels only. We adhere to a "Zero-Data Training Policy"—user-uploaded brand data is never used to train public AI models.',
  },
  {
    id: 6,
    title: "Section 6: Governing Law",
    body: "This Agreement shall be governed by local laws. Any dispute arising hereunder shall first be resolved through friendly negotiation; failing that, it shall be submitted to the designated arbitration center.",
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
            <p className="text-sm text-muted-foreground mt-2">Last Updated: March 31, 2026</p>
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
