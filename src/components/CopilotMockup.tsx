'use client';

import { motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, AlertTriangle, CheckCircle2, Clock, ArrowRight } from "lucide-react";

const chatMessages = [
  { role: "user" as const, text: "这款产品的差评为什么突然变多了？" },
  {
    role: "ai" as const,
    text: "近 3 天，Reddit r/RobotVacuums 里关于电池续航的负面讨论明显增加。主要来自一篇获得 342 次赞同的热帖，相关评论中有 67% 提到“使用 3 个月后掉电变快”。",
    refs: ["Reddit r/RobotVacuums", "342 次赞同的帖子"],
  },
  { role: "user" as const, text: "这个话题还在扩散吗？我们现在应该做什么？" },
  {
    role: "ai" as const,
    text: "相关讨论已经出现在 YouTube 测评视频的评论区。建议先核对固件和售后数据，再安排三件事：\n① 说明受影响的型号和处理方式\n② 邀请测评创作者复测续航\n③ 更新 Amazon 商品页的电池使用说明",
    refs: ["YouTube 相关评论", "近 30 天售后讨论"],
  },
];

const actionItems = [
  {
    priority: "优先处理",
    label: "优先处理",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderClass: "p0-breathing",
    title: "电池续航差评增加，需尽快核实",
    consequence: "讨论已经出现在 YouTube 测评视频的评论区",
    actions: ["核对售后数据", "准备对外说明"],
  },
  {
    priority: "本周安排",
    label: "本周安排",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderClass: "border-primary/30",
    title: "Roborock 发布新品，用户开始集中对比",
    consequence: "最近 7 天是补充对比内容的关键时间",
    actions: ["整理用户关心的对比点", "准备测评素材"],
  },
  {
    priority: "持续关注",
    label: "持续关注",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderClass: "border-accent/20",
    title: "东南亚市场「清关体验」讨论量上升 34%",
    consequence: null,
    actions: ["监控趋势", "准备本地化 FAQ"],
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      <Sparkles className="h-3 w-3 text-ring" />
      <span className="h-1.5 w-1.5 rounded-full bg-ring typing-dot-1" />
      <span className="h-1.5 w-1.5 rounded-full bg-ring typing-dot-2" />
      <span className="h-1.5 w-1.5 rounded-full bg-ring typing-dot-3" />
      <span className="text-[10px] text-muted-foreground ml-1">正在读取当前看板…</span>
    </div>
  );
}

export function CopilotChat() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
        <div className="h-7 w-7 rounded-lg bg-ring/15 flex items-center justify-center">
          <MessageCircle className="h-3.5 w-3.5 text-ring" />
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">AI 助手</p>
          <p className="text-[10px] text-muted-foreground">结合当前看板回答 · 附原帖来源</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] text-primary">在线</span>
        </div>
      </div>

      {/* Chat messages */}
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
                  <Sparkles className="h-3 w-3" /> AI 助手
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

      {/* Input */}
      <div className="border-t border-border/30 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-3 py-2">
          <input
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
            placeholder="基于当前数据追问..."
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
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
        <div className="h-7 w-7 rounded-lg bg-ring/15 flex items-center justify-center">
          <CheckCircle2 className="h-3.5 w-3.5 text-ring" />
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">待办看板</p>
          <p className="text-[10px] text-muted-foreground">3 项建议 · 按优先级排列</p>
        </div>
      </div>

      {/* Action items */}
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
              {item.priority === "优先处理" && <AlertTriangle className="h-3 w-3 text-destructive animate-pulse" />}
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
