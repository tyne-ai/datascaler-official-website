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
    title: "Section 1: Data Minimization Principle",
    body: "We only collect essential account identity and in-platform query data. DataScaler NEVER tracks or records your off-site private browsing or non-public social media interactions.",
  },
  {
    title: "Section 2: Zero-Knowledge Training Commitment",
    body: 'We enforce a strict "Non-Training" policy. Your search queries, watchlists, and uploaded data are NEVER used to train our public AI models. Your strategic intent remains 100% confidential.',
  },
  {
    title: "Section 3: Anonymized AI Processing",
    body: "We utilize world-leading inference units (e.g., Google Gemini). All requests are processed via De-identification protocols, stripping out PII before calling third-party models.",
  },
  {
    title: 'Section 4: Data Retention & "Process-and-Delete"',
    body: 'Brand data uploaded for 1:1 benchmarking follows a "Process-and-Delete" policy. Data is processed in-memory and destroyed immediately upon task completion. No persistent storage is maintained.',
  },
  {
    title: "Section 5: Global Compliance (GDPR & CCPA)",
    body: 'Fully compliant with GDPR and CCPA standards. You maintain absolute control, including the Right to Access, Rectify, and the "Right to be Forgotten."',
  },
  {
    title: "Section 6: Security Safeguards",
    body: "All transmissions are secured via TLS 1.3. Stored data is protected by AES-256 bank-grade encryption with strict Role-Based Access Control (RBAC).",
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
                Last Updated: March 31, 2026
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
