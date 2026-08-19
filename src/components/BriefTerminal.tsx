'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ThumbsUp, ExternalLink, Paperclip } from "lucide-react";

const briefLines = [
  {
    id: "sentiment",
    text: "本周品牌整体情感评分：",
    highlight: "78% 正面",
    highlightColor: "text-primary",
    ref: {
      platform: "Reddit",
      platformIcon: "🟠",
      user: "u/TechReviewer2026",
      avatar: "TR",
      content: '"Dreame L20 Ultra 的清洁力测试让我彻底放弃了 Roborock。自清洁底座真的太方便了！"',
      sentiment: "Positive",
      sentimentColor: "bg-primary/20 text-primary",
      upvotes: 342,
      comments: 87,
    },
  },
  {
    id: "volume",
    text: "声量周环比增长 ",
    highlight: "+23.4%",
    highlightColor: "text-primary",
    ref: {
      platform: "TikTok",
      platformIcon: "🎵",
      user: "@cleaningpro",
      avatar: "CP",
      content: '"吸力对比测试：Dreame vs Roborock vs Dyson" — 视频播放量 1.2M，评论区正面率 91%',
      sentiment: "Viral Positive",
      sentimentColor: "bg-primary/20 text-primary",
      upvotes: 45200,
      comments: 1893,
    },
  },
  {
    id: "risk",
    text: "检测到竞品威胁信号：",
    highlight: "5 个活跃攻势",
    highlightColor: "text-destructive",
    ref: {
      platform: "YouTube",
      platformIcon: "🔴",
      user: "@VacuumWars",
      avatar: "VW",
      content: '"Why I switched FROM Dreame to Roborock S8 MaxV Ultra — Honest Review After 6 Months"',
      sentiment: "Negative",
      sentimentColor: "bg-destructive/20 text-destructive",
      upvotes: 89400,
      comments: 2341,
    },
  },
  {
    id: "opportunity",
    text: "发现市场机会窗口：",
    highlight: "宠物场景需求激增",
    highlightColor: "text-accent",
    ref: {
      platform: "Amazon Reviews",
      platformIcon: "📦",
      user: "Verified Buyer",
      avatar: "VB",
      content: '"As a pet owner with 3 cats, I need something that handles hair better. The Dreame works great but the dustbin is too small for daily use."',
      sentiment: "Mixed",
      sentimentColor: "bg-accent/20 text-accent",
      upvotes: 156,
      comments: 43,
    },
  },
];

export default function BriefTerminal() {
  const [hoveredRef, setHoveredRef] = useState<string | null>(null);

  return (
    <div className="glass-card overflow-hidden rounded-2xl text-left">
      {/* 标题栏 */}
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
        <div className="flex gap-[5px]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </div>
        <span className="ml-1.5 font-mono text-[11.5px] text-secondary-foreground">
          AI Insight Brief v2.4 — dreame.com
        </span>
        <span className="ml-auto inline-flex items-center gap-[5px] text-[10px] font-bold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </span>
      </div>

      {/* 简报行 + [Ref] 证据卡 */}
      <div className="p-3.5">
        {briefLines.map((line, i) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="mb-2 flex gap-2.5 rounded-[10px] border border-border/50 bg-secondary/40 px-3 py-[11px] text-[12.5px] leading-[1.5] text-secondary-foreground last:mb-0"
          >
            <span className="shrink-0 font-mono font-extrabold text-ring">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="flex-1">
              {line.text}
              <span className={`font-semibold ${line.highlightColor}`}>{line.highlight}</span>
              <span
                className="relative ml-1 inline-block"
                onMouseEnter={() => setHoveredRef(line.id)}
                onMouseLeave={() => setHoveredRef(null)}
              >
                <span className="ref-pulse inline-flex cursor-pointer items-center gap-1 rounded-md bg-ring/20 px-2 py-0.5 align-middle text-[10px] font-bold text-ring transition-colors hover:bg-ring/40">
                  <Paperclip className="h-2.5 w-2.5" />
                  Ref
                </span>

                {/* 证据卡 */}
                <AnimatePresence>
                  {hoveredRef === line.id && (
                    <motion.span
                      initial={{ opacity: 0, y: -4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full z-50 mt-2 block w-72 -translate-x-1/2 rounded-xl border border-ring/40 bg-card/95 p-4 shadow-xl shadow-ring/10 backdrop-blur-xl"
                    >
                      <span className="mb-3 flex items-center gap-2">
                        <span className="text-lg leading-none">{line.ref.platformIcon}</span>
                        <span className="text-xs font-semibold text-foreground">
                          {line.ref.platform}
                        </span>
                        <span
                          className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ${line.ref.sentimentColor}`}
                        >
                          {line.ref.sentiment}
                        </span>
                      </span>

                      <span className="mb-2 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ring/20 text-[9px] font-bold text-ring">
                          {line.ref.avatar}
                        </span>
                        <span className="text-xs text-muted-foreground">{line.ref.user}</span>
                      </span>

                      <span className="block text-xs italic leading-relaxed text-secondary-foreground">
                        {line.ref.content}
                      </span>

                      <span className="mt-3 flex items-center gap-4 border-t border-border/30 pt-2">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          {line.ref.upvotes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MessageSquare className="h-3 w-3" />
                          {line.ref.comments.toLocaleString()}
                        </span>
                        <span className="ml-auto flex cursor-pointer items-center gap-1 text-[10px] text-ring hover:text-ring/80">
                          <ExternalLink className="h-3 w-3" />
                          原始链接
                        </span>
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
