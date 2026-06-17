'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Check, Play, MapPin } from "lucide-react";

// ─── Screen-aware AI: Mini chart with radar scan ─────────
export function RadarChartMockup() {
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Simple line chart data points
  const points = [20, 35, 28, 45, 38, 55, 48, 62, 58, 72, 65, 80, 75, 88];
  const width = 100;
  const height = 50;
  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / 100) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-48 w-full rounded-xl bg-secondary/30 border border-border/30 overflow-hidden flex items-center justify-center">
      {/* Radar sweep overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-40 w-40">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from ${scanAngle}deg, hsl(142 76% 63% / 0.2) 0deg, transparent 60deg, transparent 360deg)`,
            }}
          />
          {/* Radar rings */}
          <div className="absolute inset-4 rounded-full border border-primary/10" />
          <div className="absolute inset-10 rounded-full border border-primary/10" />
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          {/* Detected points */}
          <div className="absolute top-6 right-8 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(142_76%_63%)]" />
          <div className="absolute bottom-10 left-6 h-1.5 w-1.5 rounded-full bg-destructive shadow-[0_0_6px_hsl(0_84%_60%)]" />
          <div className="absolute top-14 left-10 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_hsl(217_91%_59%)]" />
        </div>
      </div>

      {/* Line chart underneath */}
      <svg className="absolute bottom-2 left-4 right-4 h-12 opacity-30" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <path d={pathD} fill="none" stroke="hsl(142 76% 63%)" strokeWidth="1.5" />
        <path d={`${pathD} L ${width} ${height} L 0 ${height} Z`} fill="url(#chartGrad)" />
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(142 76% 63%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(142 76% 63%)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Labels */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <Activity className="h-3 w-3 text-primary" />
        <span className="text-[9px] font-medium text-primary">SCANNING</span>
      </div>
      <div className="absolute bottom-3 right-3 text-[9px] text-muted-foreground">
        3 anomalies detected
      </div>
    </div>
  );
}

// ─── Competitor SOP: Split view ──────────────────────────
const checklistItems = [
  { label: "Hook 策略", detail: "前 3 秒悬念式开场", done: true },
  { label: "逻辑链条", detail: "问题→对比→结论", done: true },
  { label: "视觉呈现", detail: "画中画 + 数据贴片", done: true },
  { label: "行动引导", detail: "评论区引导 + 链接", done: false },
];

export function CompetitorSOPMockup() {
  return (
    <div className="h-48 w-full rounded-xl bg-secondary/30 border border-border/30 overflow-hidden flex">
      {/* Left: Video placeholder */}
      <div className="flex-1 flex items-center justify-center border-r border-border/20 bg-card/30 relative">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <Play className="h-4 w-4 text-destructive ml-0.5" />
          </div>
          <span className="text-[9px] text-muted-foreground">竞品爆款视频</span>
          <span className="text-[8px] text-muted-foreground">@VacuumWars • 89K views</span>
        </div>
        {/* Video duration bar */}
        <div className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-secondary/50">
          <div className="h-full w-2/3 rounded-full bg-destructive/60" />
        </div>
      </div>

      {/* Right: Checklist */}
      <div className="flex-1 p-3 space-y-2">
        <p className="text-[9px] font-semibold text-foreground mb-2">AI 拆解 SOP</p>
        {checklistItems.map((item) => (
          <div key={item.label} className="flex items-start gap-1.5">
            <div className={`mt-0.5 h-3.5 w-3.5 rounded flex items-center justify-center shrink-0 ${item.done ? "bg-primary/20" : "bg-secondary/50"}`}>
              {item.done && <Check className="h-2.5 w-2.5 text-primary" />}
            </div>
            <div>
              <p className={`text-[10px] font-medium ${item.done ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</p>
              <p className="text-[8px] text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Global Coverage: World map with floating tags ───────
const locationTags = [
  { emoji: "🇺🇸", label: "Black Friday", x: "18%", y: "35%", delay: 0 },
  { emoji: "🇩🇪", label: "IFA Berlin", x: "48%", y: "25%", delay: 0.3 },
  { emoji: "🇦🇪", label: "Ramadan", x: "58%", y: "42%", delay: 0.6 },
  { emoji: "🇯🇵", label: "楽天セール", x: "78%", y: "32%", delay: 0.9 },
  { emoji: "🇧🇷", label: "Mercado Livre", x: "28%", y: "62%", delay: 1.2 },
  { emoji: "🇮🇩", label: "Shopee 12.12", x: "72%", y: "55%", delay: 0.4 },
];

export function WorldMapMockup() {
  return (
    <div className="relative h-48 w-full rounded-xl bg-secondary/30 border border-border/30 overflow-hidden">
      {/* Simplified world map grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Continent shapes (simplified dots) */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 200 100">
        {/* North America */}
        <ellipse cx="35" cy="35" rx="18" ry="14" fill="hsl(258 50% 50%)" />
        {/* South America */}
        <ellipse cx="45" cy="65" rx="10" ry="16" fill="hsl(258 50% 50%)" />
        {/* Europe */}
        <ellipse cx="100" cy="28" rx="12" ry="10" fill="hsl(258 50% 50%)" />
        {/* Africa */}
        <ellipse cx="105" cy="52" rx="10" ry="16" fill="hsl(258 50% 50%)" />
        {/* Asia */}
        <ellipse cx="140" cy="35" rx="22" ry="15" fill="hsl(258 50% 50%)" />
        {/* Oceania */}
        <ellipse cx="155" cy="65" rx="10" ry="7" fill="hsl(258 50% 50%)" />
      </svg>

      {/* Connection lines (subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <line x1="18%" y1="35%" x2="48%" y2="25%" stroke="hsl(142 76% 63%)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="48%" y1="25%" x2="58%" y2="42%" stroke="hsl(142 76% 63%)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="58%" y1="42%" x2="78%" y2="32%" stroke="hsl(142 76% 63%)" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>

      {/* Location tags */}
      {locationTags.map((tag) => (
        <motion.div
          key={tag.label}
          className="absolute flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 px-2 py-1 shadow-lg"
          style={{ left: tag.x, top: tag.y }}
          initial={{ opacity: 0, scale: 0.8, y: 5 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: tag.delay, duration: 0.4 }}
          whileHover={{ scale: 1.1, zIndex: 10 }}
        >
          <span className="text-xs">{tag.emoji}</span>
          <span className="text-[8px] font-medium text-foreground whitespace-nowrap">{tag.label}</span>
          <MapPin className="h-2 w-2 text-primary" />
        </motion.div>
      ))}

      {/* Bottom label */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
        <span className="text-[9px] text-muted-foreground">6 regions • 12 platforms</span>
        <span className="text-[9px] text-primary font-medium">Real-time Coverage</span>
      </div>
    </div>
  );
}
