'use client';

import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";

/** macOS-style title bar, matching BriefTerminal */
function CardHead({ title, live }: { title: string; live?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
      <div className="flex gap-[5px]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </div>
      <span className="ml-1.5 text-[11.5px] text-secondary-foreground">{title}</span>
      {live && (
        <span className="ml-auto inline-flex items-center gap-[5px] text-[10px] font-bold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {live}
        </span>
      )}
    </div>
  );
}

/** [Ref] source tag */
function RefTag({ label }: { label: string }) {
  return (
    <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-ring/20 px-2 py-0.5 align-middle text-[10px] font-bold text-ring">
      <Paperclip className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

const chatMessages: {
  role: "user" | "ai";
  text: string;
  ref?: string;
}[] = [
  { role: "user", text: "Why did negative reviews for this product spike suddenly?" },
  {
    role: "ai",
    text: 'Over the last 3 days r/RobotVacuums saw a wave of "battery life" complaints, traced to one 342-upvote thread — 67% of its comments mention "battery drains fast."',
    ref: "Reddit",
  },
  { role: "user", text: "Will this spread? Give me an action plan." },
  {
    role: "ai",
    text: "78% probability it reaches YouTube review channels within 72 hours. Recommended: ① publish a battery firmware statement ② line up 3 top KOLs for real-world tests ③ add a battery FAQ to the product page.",
    ref: "Propagation model",
  },
];

export function CopilotChat() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl text-left">
      <CardHead title="AI Assistant · Grounded in current evidence" live="Online" />

      <div className="flex flex-col gap-2.5 p-3.5">
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`max-w-[90%] rounded-xl px-3 py-2.5 text-[12.5px] leading-[1.6] text-secondary-foreground ${
              msg.role === "user"
                ? "self-end bg-secondary/60"
                : "self-start border border-ring/20 bg-ring/10"
            }`}
          >
            {msg.role === "ai" && (
              <p className="mb-[5px] text-[10px] font-bold text-ring">✦ AI Assistant</p>
            )}
            <p>
              {msg.text}
              {msg.ref && <RefTag label={msg.ref} />}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const actionItems = [
  {
    priority: "P0 Urgent",
    cardClass: "border-destructive/30 bg-destructive/[0.08]",
    tagClass: "bg-destructive/[0.14] text-destructive",
    title: '"Battery life" complaints surging — respond within 48h',
    consequence: "If unaddressed: projected to reach YouTube review channels within 72h",
  },
  {
    priority: "P1 Important",
    cardClass: "border-primary/25 bg-primary/[0.06]",
    tagClass: "bg-primary/[0.14] text-primary",
    title: "Roborock launch — start benchmarking content",
    consequence: "Window: complete the comparative review within 7 days",
  },
  {
    priority: "P2 Monitor",
    cardClass: "border-accent/20 bg-accent/[0.06]",
    tagClass: "bg-accent/[0.14] text-accent",
    title: 'Southeast Asia "customs experience" discussion up 34%',
    consequence: "Track the trend · prepare a localized FAQ",
  },
];

export function ActionBoard() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl text-left">
      <CardHead title="Action Board · Sorted by priority" />

      <div className="flex flex-col gap-2.5 p-3.5">
        {actionItems.map((item, i) => (
          <motion.div
            key={item.priority}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border p-3 ${item.cardClass}`}
          >
            <span
              className={`inline-block rounded-[5px] px-2 py-0.5 text-[10px] font-extrabold ${item.tagClass}`}
            >
              {item.priority}
            </span>
            <p className="mb-1 mt-2 text-[12.5px] font-semibold text-foreground">{item.title}</p>
            <p className="text-[11px] text-muted-foreground">{item.consequence}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
