'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Heart,
  AlertTriangle,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  Sparkles,
  Languages,
  Eye,
} from "lucide-react";

const refs = [
  {
    id: "reddit",
    platform: "Reddit",
    platformIcon: "🟠",
    user: "u/TechReviewer2026",
    avatar: "TR",
    snippet: "Dreame L20 Ultra outperforms Roborock S8 Pro in cleaning test — 342 upvotes",
    fullContent:
      '"The Dreame L20 Ultra cleaning test made me completely ditch Roborock. The self-cleaning dock is just incredibly convenient!"',
    sentiment: "Positive",
    sentimentColor: "bg-primary/20 text-primary",
    views: "12.4K",
    upvotes: 342,
    comments: 87,
  },
  {
    id: "tiktok",
    platform: "TikTok",
    platformIcon: "🎵",
    user: "@cleaningpro",
    avatar: "CP",
    snippet: '"Suction power showdown: Dreame vs Roborock vs Dyson" — 1.2M views',
    fullContent:
      '"Suction power showdown: Dreame vs Roborock vs Dyson" — 1.2M views, 91% positive comment rate',
    sentiment: "Viral",
    sentimentColor: "bg-primary/20 text-primary",
    views: "1.2M",
    upvotes: 45200,
    comments: 1893,
  },
];

function RefRow({ data: r }: { data: (typeof refs)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-start gap-3 rounded-lg bg-secondary/30 px-4 py-3">
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="mt-0.5 shrink-0 cursor-pointer rounded bg-ring/30 px-2 py-1 text-[10px] font-bold text-ring ref-pulse transition-all hover:bg-ring/50">
          Ref
        </span>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-full top-0 ml-4 z-50 w-72 rounded-xl border border-ring/30 bg-[hsl(258_50%_16%/0.97)] backdrop-blur-xl p-4 shadow-2xl shadow-ring/20"
            >
              <div className="absolute top-4 -left-2 h-px w-2 bg-ring/40" />

              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-base">{r.platformIcon}</span>
                <span className="text-xs font-semibold text-foreground">{r.platform}</span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ${r.sentimentColor}`}
                >
                  {r.sentiment}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-6 w-6 rounded-full bg-ring/20 flex items-center justify-center text-[9px] font-bold text-ring">
                  {r.avatar}
                </div>
                <span className="text-[11px] text-muted-foreground">{r.user}</span>
              </div>

              <p className="text-[11px] leading-relaxed text-secondary-foreground italic">
                {r.fullContent}
              </p>

              <div className="mt-3 flex items-center gap-4 border-t border-border/30 pt-2.5">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  {r.views}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <ThumbsUp className="h-3 w-3" />
                  {r.upvotes.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {r.comments.toLocaleString()}
                </div>
                <button className="ml-auto flex items-center gap-1 text-[10px] text-accent hover:text-accent/80 transition-colors">
                  <Languages className="h-3 w-3" />
                  Translate
                </button>
              </div>

              <div className="mt-2 flex items-center gap-1 text-[10px] text-ring cursor-pointer hover:text-ring/80 transition-colors">
                <ExternalLink className="h-3 w-3" />
                View original post
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        <span className="text-foreground font-medium">{r.platform}:</span> {r.snippet}
      </p>
    </div>
  );
}

export default function HeroBriefPanel() {
  const [actionHovered, setActionHovered] = useState(false);

  const aiConclusion =
    "North America volume grew 23% week-over-week, primarily driven by TikTok reviews. However, Roborock's new product launch has elevated competitor pressure to P0 — monitor post-purchase review trends closely.";

  return (
    <div className="glow-border relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-border/30 px-5 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-primary/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">
          AI Insight Brief — dreame.com — Mar 10-17, 2026
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-primary font-medium">LIVE</span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex items-start gap-3 rounded-xl bg-ring/8 border border-ring/20 px-5 py-4">
          <Sparkles className="h-4 w-4 text-ring shrink-0 mt-0.5" />
          <div>
            <span className="text-ring font-semibold text-[10px] uppercase tracking-wider">AI Summary</span>
            <p className="mt-1.5 text-sm leading-relaxed text-secondary-foreground">
              {aiConclusion}
              <span className="inline-block w-[2px] h-4 bg-ring/80 animate-pulse ml-1 align-middle" />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-secondary/50 px-4 py-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-2xl font-bold text-foreground">+23%</p>
            </div>
            <p className="text-[11px] text-muted-foreground">Volume Growth</p>
          </div>
          <div className="rounded-xl bg-secondary/50 px-4 py-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Heart className="h-4 w-4 text-accent" />
              <p className="text-2xl font-bold text-foreground">78%</p>
            </div>
            <p className="text-[11px] text-muted-foreground">Sentiment</p>
          </div>
          <div className="rounded-xl bg-secondary/50 px-4 py-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
            <p className="text-[11px] text-muted-foreground">Threat</p>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {["Roborock", "Dyson", "iRobot"].map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-destructive/15 px-2 py-0.5 text-[8px] font-medium text-destructive/80"
                >
                  vs {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {refs.map((r) => (
            <RefRow key={r.id} data={r} />
          ))}
        </div>

        <div
          className="relative rounded-xl border border-dashed border-primary/30 px-5 py-3.5 cursor-default transition-all hover:border-primary/60 hover:bg-primary/5"
          onMouseEnter={() => setActionHovered(true)}
          onMouseLeave={() => setActionHovered(false)}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary/60" />
            <span className="text-[11px] text-muted-foreground/70 font-medium">
              Suggested Actions
            </span>
          </div>
          <AnimatePresence>
            {actionHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 rounded bg-destructive/20 px-1.5 py-0.5 text-[9px] font-bold text-destructive">P0</span>
                    <p className="text-xs text-primary leading-relaxed">
                      Respond immediately to "battery life" complaints on Reddit r/VacuumCleaners to prevent narrative spread.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">P1</span>
                    <p className="text-xs text-primary/80 leading-relaxed">
                      Repurpose high-engagement TikTok content to Instagram Reels — estimated 15% conversion lift.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
