'use client';
import { motion } from "framer-motion";
import { Printer, Lock } from "lucide-react";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const sections = [
  {
    title: "1. Information we collect",
    body: "We collect the account details, in-product queries, and basic usage records needed to provide, maintain, and improve the service. We do not seek access to private social content or your off-site private browsing history.",
  },
  {
    title: "2. Customer data and model training",
    body: "Unless you give us explicit permission, we do not use your search terms, brand watchlists, or uploaded comparison data to train public-facing AI models.",
  },
  {
    title: "3. Third-party AI services",
    body: "We may use third-party AI services, including Google Gemini, to process parts of a request. Before data is sent, we minimize personal information and remove direct identifiers where reasonably possible.",
  },
  {
    title: "4. Data retention",
    body: "Brand data uploaded for a one-time comparison is scheduled for deletion after processing. We may retain limited records for account administration, security, troubleshooting, or legal obligations.",
  },
  {
    title: "5. Your privacy rights",
    body: "Depending on where you live, you may have the right to access, correct, delete, or export personal information, or to object to certain processing. Contact us to submit a request.",
  },
  {
    title: "6. Security",
    body: "We use measures such as encryption in transit, access controls, and permission separation to protect data. No method of transmission or storage is completely secure, and we continue to review and improve our safeguards.",
  },
];

export function PrivacyEnContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PricingHeader />

      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="flex items-start justify-between mb-12"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: March 31, 2026
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
          </motion.div>

          <div className="space-y-0">
            {sections.map((s, i) => (
              <motion.section
                key={i}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate="visible"
                className={`py-10 ${i < sections.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground/50" />
                  {s.title}
                </h2>
                <p className="text-muted-foreground" style={{ lineHeight: 1.7 }}>
                  {s.body}
                </p>
              </motion.section>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            custom={sections.length + 1}
            initial="hidden"
            animate="visible"
            className="text-center text-sm text-muted-foreground/60 mt-16"
          >
            For privacy inquiries: support@datascaler.ai
          </motion.p>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
