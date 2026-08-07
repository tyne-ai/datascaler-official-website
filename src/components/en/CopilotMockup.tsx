'use client';

import { motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, AlertTriangle, CheckCircle2, Clock, ArrowRight } from "lucide-react";

const chatMessages = [
  { role: "user" as const, text: "What caused the recent spike in negative reviews?" },
  {
    role: "ai" as const,
    text: 'Battery-life complaints rose sharply in r/RobotVacuums over the past three days. Most of the activity came from one thread with 342 upvotes, and 67% of the related comments mention faster battery drain after three months.',
    refs: ["Reddit r/RobotVacuums", "Thread with 342 upvotes"],
  },
  { role: "user" as const, text: "Is the conversation spreading? What should we do next?" },
  {
    role: "ai" as const,
    text: "The same complaint is starting to appear in comments on YouTube review videos. First, confirm the affected models against support and firmware data. Then:\n① Explain which models are affected and what owners should do\n② Ask reviewers to retest battery life\n③ Update the battery guidance on the Amazon product page",
    refs: ["Related YouTube comments", "30-day support conversation"],
  },
];

const actionItems = [
  {
    priority: "Act now",
    label: "Act now",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderClass: "p0-breathing",
    title: "Battery-life complaints are rising and need verification",
    consequence: "The same issue is now appearing in YouTube review comments",
    actions: ["Check support data", "Prepare a customer response"],
  },
  {
    priority: "This week",
    label: "This week",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderClass: "border-primary/30",
    title: "Roborock launched a new model, and comparisons are picking up",
    consequence: "The next seven days are the best window to add comparison content",
    actions: ["Map the questions buyers are asking", "Prepare reviewer materials"],
  },
  {
    priority: "Watch",
    label: "Watch",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderClass: "border-accent/20",
    title: 'Southeast Asia "customs experience" discussions up 34%',
    consequence: null,
    actions: ["Monitor trend", "Prepare localized FAQ"],
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      <Sparkles className="h-3 w-3 text-ring" />
      <span className="h-1.5 w-1.5 rounded-full bg-ring typing-dot-1" />
      <span className="h-1.5 w-1.5 rounded-full bg-ring typing-dot-2" />
      <span className="h-1.5 w-1.5 rounded-full bg-ring typing-dot-3" />
      <span className="text-[10px] text-muted-foreground ml-1">Reviewing the current dashboard…</span>
    </div>
  );
}

export function CopilotChat() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
        <div className="h-7 w-7 rounded-lg bg-ring/15 flex items-center justify-center">
          <MessageCircle className="h-3.5 w-3.5 text-ring" />
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">AI Assistant</p>
          <p className="text-[10px] text-muted-foreground">Uses the current dashboard · Sources included</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] text-primary">Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-secondary/50 text-secondary-foreground"
                  : "bg-ring/10 border border-ring/20 text-secondary-foreground"
              }`}
            >
              {msg.role === "ai" && (
                <p className="text-ring font-medium text-[10px] mb-1 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI Assistant
                </p>
              )}
              <p className="whitespace-pre-line">{msg.text}</p>
              {msg.role === "ai" && msg.refs && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {msg.refs.map((r) => (
                    <span key={r} className="rounded bg-ring/20 px-1.5 py-0.5 text-[9px] font-medium text-ring">
                      📎 {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        <TypingIndicator />
      </div>

      <div className="border-t border-border/30 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-3 py-2">
          <input
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
            placeholder="Ask a follow-up based on current data..."
            readOnly
          />
          <Send className="h-3.5 w-3.5 text-primary cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export function ActionBoard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
        <div className="h-7 w-7 rounded-lg bg-ring/15 flex items-center justify-center">
          <CheckCircle2 className="h-3.5 w-3.5 text-ring" />
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">Next steps</p>
          <p className="text-[10px] text-muted-foreground">3 recommendations · Ranked by priority</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {actionItems.map((item, i) => (
          <motion.div
            key={item.priority}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border ${item.borderClass} ${item.bgColor} p-3 hover-lift transition-all cursor-pointer`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${item.color} ${item.bgColor}`}>
                {item.label}
              </span>
              {item.priority === "Act now" && <AlertTriangle className="h-3 w-3 text-destructive animate-pulse" />}
            </div>
            <p className="text-xs font-medium text-foreground">{item.title}</p>
            {item.consequence && (
              <p className="mt-1 text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3 shrink-0" />
                {item.consequence}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-1">
              {item.actions.map((a) => (
                <span key={a} className="inline-flex items-center gap-0.5 rounded-full bg-card/50 px-2 py-0.5 text-[9px] text-muted-foreground">
                  <ArrowRight className="h-2.5 w-2.5" /> {a}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
