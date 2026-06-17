'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, TrendingUp, Heart, AlertTriangle, MessageSquare, ThumbsUp, ExternalLink } from "lucide-react";

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
    text: "声量周环比增长",
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
    <div className="relative w-full">
      {/* Terminal window */}
      <div className="glow-border relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">DataScaler — AI Insight Brief v2.4</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-primary font-medium">LIVE</span>
          </div>
        </div>

        {/* Brief header */}
        <div className="border-b border-border/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Brand: dreame.com • Weekly Report</p>
              <p className="text-sm font-semibold text-foreground">AI Insight Brief — Mar 10-17, 2026</p>
            </div>
          </div>

          {/* Metric pills */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">+23% 声量</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
              <Heart className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">78% 正面</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
              <span className="text-xs font-semibold text-destructive">5 竞品威胁</span>
            </div>
          </div>
        </div>

        {/* Brief lines with [Ref] badges */}
        <div className="p-6 space-y-3">
          {briefLines.map((line, i) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group/line relative flex items-start gap-3 rounded-lg bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
            >
              <span className="mt-0.5 shrink-0 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <p className="flex-1 text-sm text-muted-foreground">
                {line.text} <span className={`font-semibold ${line.highlightColor}`}>{line.highlight}</span>
              </p>
              <div
                className="relative"
                onMouseEnter={() => setHoveredRef(line.id)}
                onMouseLeave={() => setHoveredRef(null)}
              >
                <span className="shrink-0 cursor-pointer rounded bg-ring/30 px-2 py-0.5 text-[10px] font-bold text-ring ref-pulse transition-all hover:bg-ring/50">
                  Ref
                </span>

                {/* Evidence Card slide-out */}
                <AnimatePresence>
                  {hoveredRef === line.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-ring/40 bg-card/95 backdrop-blur-xl p-4 shadow-xl shadow-ring/10"
                    >
                      {/* Connector line */}
                      <div className="absolute -top-2 right-4 h-2 w-px bg-ring/50" />

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{line.ref.platformIcon}</span>
                        <span className="text-xs font-semibold text-foreground">{line.ref.platform}</span>
                        <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ${line.ref.sentimentColor}`}>
                          {line.ref.sentiment}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-ring/20 flex items-center justify-center text-[9px] font-bold text-ring">
                          {line.ref.avatar}
                        </div>
                        <span className="text-xs text-muted-foreground">{line.ref.user}</span>
                      </div>

                      <p className="text-xs leading-relaxed text-secondary-foreground italic">
                        {line.ref.content}
                      </p>

                      <div className="mt-3 flex items-center gap-4 border-t border-border/30 pt-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          {line.ref.upvotes.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MessageSquare className="h-3 w-3" />
                          {line.ref.comments.toLocaleString()}
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-[10px] text-ring cursor-pointer hover:text-ring/80">
                          <ExternalLink className="h-3 w-3" />
                          原始链接
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom action bar */}
        <div className="border-t border-border/30 px-6 py-3 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">4 insights • 4 evidence sources attached</span>
          <button className="text-[10px] font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            导出完整报告 <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
