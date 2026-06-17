'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, AlertTriangle, CheckCircle2, Clock, ArrowRight } from "lucide-react";

const chatMessages = [
  { role: "user" as const, text: "为什么这个产品负面评论突然增多了？" },
  {
    role: "ai" as const,
    text: '根据您当前选中的 Reddit 数据，近 3 天 r/RobotVacuums 出现集中投诉"电池续航不足"。源头是一篇热帖获得了 342 upvotes，评论中 67% 提及了 "battery drains fast after 3 months"。',
    refs: ["Reddit r/RobotVacuums", "342 upvotes 热帖"],
  },
  { role: "user" as const, text: "这个趋势会扩散吗？给我一个应对方案。" },
  {
    role: "ai" as const,
    text: "基于历史传播模型预测：该话题有 78% 概率在 72h 内扩散到 YouTube 评测圈。建议立即：\n① 发布官方电池优化固件更新声明\n② 联系 Top 3 KOL 进行续航实测视频\n③ 在 Amazon Listing 中添加电池寿命 FAQ",
    refs: ["传播模型 v2.4", "竞品历史案例"],
  },
];

const actionItems = [
  {
    priority: "P0",
    label: "紧急",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderClass: "p0-breathing",
    title: '"电池续航"差评激增 — 需 48h 内响应',
    consequence: "若不处理：预计负面声量 72h 内扩散至 YouTube 评测圈",
    actions: ["发布固件更新声明", "联系 3 位头部 KOL"],
  },
  {
    priority: "P1",
    label: "重要",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderClass: "border-primary/30",
    title: "竞品 Roborock 新品发布 — 启动对标内容",
    consequence: "窗口期：7 天内需完成对比评测",
    actions: ["生成对比评测框架", "准备 KOL 合作话术"],
  },
  {
    priority: "P2",
    label: "关注",
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
      <span className="text-[10px] text-muted-foreground ml-1">AI 正在分析屏幕数据...</span>
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
          <p className="text-xs font-semibold text-foreground">AI Assistant</p>
          <p className="text-[10px] text-muted-foreground">Screen-aware • Deep Dive Mode</p>
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
          <p className="text-xs font-semibold text-foreground">Action Board</p>
          <p className="text-[10px] text-muted-foreground">3 items • Auto-prioritized</p>
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
                {item.priority} {item.label}
              </span>
              {item.priority === "P0" && <AlertTriangle className="h-3 w-3 text-destructive animate-pulse" />}
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
