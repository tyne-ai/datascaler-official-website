'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Instagram,
  Youtube,
  Music,
  Twitter,
  Facebook,
  Image,
  ChevronDown,
  Info,
} from "lucide-react";

const PLATFORMS = [
  { name: "Instagram", icon: Instagram, angle: -90 },
  { name: "YouTube", icon: Youtube, angle: -30 },
  { name: "TikTok", icon: Music, angle: 30 },
  { name: "Reddit", icon: Twitter, angle: 90 },
  { name: "Facebook", icon: Facebook, angle: 150 },
  { name: "Pinterest", icon: Image, angle: 210 },
];

const VERDICTS: Record<
  string,
  { platform: string; value: string; label: string; type: "negative" | "positive" }[]
> = {
  "Competitor A": [
    { platform: "TikTok", value: "-23% Gap", label: "Unboxing challenge behind", type: "negative" },
    { platform: "Reddit", value: "+45% Opp", label: "Community voice opportunity", type: "positive" },
  ],
  "Competitor B": [
    { platform: "Instagram", value: "-18% Gap", label: "Visual content lagging", type: "negative" },
    { platform: "YouTube", value: "+32% Opp", label: "Long-form video growth", type: "positive" },
  ],
  "Competitor C": [
    { platform: "Facebook", value: "-11% Gap", label: "Community engagement weak", type: "negative" },
    { platform: "Pinterest", value: "+27% Opp", label: "Inspiration content potential", type: "positive" },
  ],
};

const COMPETITORS = ["Competitor A", "Competitor B", "Competitor C"];
const SCAN_DOMAINS: Record<string, string[]> = {
  "Competitor A": ["samsung.com", "govee.com", "anker.com"],
  "Competitor B": ["roborock.com", "ecovacs.com", "irobot.com"],
  "Competitor C": ["dyson.com", "philips.com", "xiaomi.com"],
};

export default function CompetitorDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [selected, setSelected] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "scanning" | "locked">("idle");
  const [scanIdx, setScanIdx] = useState(0);
  const [hoveredRef, setHoveredRef] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const competitor = COMPETITORS[selected];
  const domains = SCAN_DOMAINS[competitor];
  const verdicts = VERDICTS[competitor];

  const runScan = useCallback((compIdx: number) => {
    setPhase("scanning");
    setScanIdx(0);
    setAnimKey((k) => k + 1);

    const t1 = setTimeout(() => setScanIdx(1), 900);
    const t2 = setTimeout(() => setScanIdx(2), 1800);
    const t3 = setTimeout(() => setPhase("locked"), 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    return runScan(selected);
  }, [isInView]);

  const switchCompetitor = (idx: number) => {
    setSelected(idx);
    setDropdownOpen(false);
    runScan(idx);
  };

  const radarRadius = 90;

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl">
      <div className="relative rounded-xl border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-ring/10 blur-[100px]" />

        <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">
              AI Detection Terminal
            </span>
          </div>

          <div className="relative z-20">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-md border border-border/40 bg-secondary/30 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-foreground hover:border-ring/40 transition-colors"
            >
              <span className="text-muted-foreground">Benchmarking:</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={competitor}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="text-primary font-semibold"
                >
                  {phase === "locked" ? competitor : "..."}
                </motion.span>
              </AnimatePresence>
              <ChevronDown className={`h-2.5 w-2.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 w-36 rounded-md border border-border/40 bg-card/90 backdrop-blur-xl shadow-xl overflow-hidden"
                >
                  {COMPETITORS.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => switchCompetitor(i)}
                      className={`w-full px-2.5 py-1.5 text-left text-[10px] transition-colors ${
                        i === selected ? "bg-primary/15 text-primary font-semibold" : "text-foreground hover:bg-secondary/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative flex flex-col items-center pt-8 pb-6 px-4">
          <div className="relative" style={{ width: radarRadius * 2 + 56, height: radarRadius * 2 + 56 }}>
            <motion.div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "hsl(142 76% 63% / 0.25)" }}
              animate={
                phase === "scanning"
                  ? { scale: [1, 1.06, 1], opacity: [0.25, 0.6, 0.25] }
                  : { scale: 1, opacity: 0.4 }
              }
              transition={{ duration: 2, repeat: phase === "scanning" ? Infinity : 0, ease: "easeInOut" }}
              key={`ring-${animKey}`}
            />
            <div className="absolute inset-4 rounded-full border border-ring/15" />
            <div className="absolute inset-8 rounded-full border border-ring/10" />

            <motion.div
              className="absolute left-1/2 top-1/2"
              style={{ width: radarRadius + 12, height: 1.5, transformOrigin: "0% 50%" }}
              animate={{ rotate: phase === "scanning" ? [0, 360] : 0 }}
              transition={{ duration: 3, repeat: phase === "scanning" ? Infinity : 0, ease: "linear" }}
              key={`sweep-${animKey}`}
            >
              <div className="h-full w-full bg-gradient-to-r from-primary/60 to-transparent rounded-full" />
            </motion.div>

            {phase === "scanning" && (
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: radarRadius + 12,
                  height: radarRadius + 12,
                  transformOrigin: "0% 0%",
                  background: "conic-gradient(from 0deg, hsl(142 76% 63% / 0.06) 0deg, transparent 50deg)",
                  borderRadius: "50%",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                key={`trail-${animKey}`}
              />
            )}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-md shadow-primary/50" />

            {PLATFORMS.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radarRadius;
              const y = Math.sin(rad) * radarRadius;
              const Icon = p.icon;
              const verdict = verdicts.find((v) => v.platform === p.name);
              const isActive = phase === "locked" && !!verdict;

              return (
                <motion.div
                  key={`${p.name}-${animKey}`}
                  className="absolute left-1/2 top-1/2 flex items-center justify-center"
                  style={{ x: x - 13, y: y - 13 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: isActive ? 1 : 0.45, scale: isActive ? 1.1 : 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                >
                  <div
                    className={`relative h-[26px] w-[26px] rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? verdict?.type === "negative"
                          ? "border-destructive/50 bg-destructive/10 shadow-md shadow-destructive/20"
                          : "border-primary/50 bg-primary/10 shadow-md shadow-primary/20"
                        : "border-border/40 bg-card/60"
                    }`}
                  >
                    <Icon
                      className={`h-3 w-3 transition-colors duration-500 ${
                        isActive
                          ? verdict?.type === "negative" ? "text-destructive" : "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isActive && verdict && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x: x > 0 ? 10 : -10 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
                        className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap z-10 ${x > 0 ? "left-full" : "right-full"}`}
                      >
                        <div
                          className={`rounded-md border backdrop-blur-xl px-2 py-1.5 ${
                            verdict.type === "negative" ? "border-destructive/25 bg-card/70" : "border-primary/25 bg-card/70"
                          }`}
                          style={{
                            boxShadow: verdict.type === "negative"
                              ? "0 0 14px -3px hsl(0 84% 60% / 0.18)"
                              : "0 0 14px -3px hsl(142 76% 63% / 0.18)",
                          }}
                        >
                          <p className={`text-[10px] font-bold leading-none ${verdict.type === "negative" ? "text-destructive" : "text-primary"}`}>
                            {verdict.value}
                          </p>
                          <p className="text-[8px] text-muted-foreground mt-0.5 leading-tight">{verdict.label}</p>
                          <div className="relative inline-block mt-1">
                            <span
                              className="text-[8px] font-semibold text-ring bg-ring/15 px-1 py-px rounded cursor-default ref-pulse"
                              onMouseEnter={() => setHoveredRef(p.name)}
                              onMouseLeave={() => setHoveredRef(null)}
                            >
                              [Ref]
                            </span>
                            <AnimatePresence>
                              {hoveredRef === p.name && (
                                <motion.div
                                  initial={{ opacity: 0, y: 3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 3 }}
                                  className="absolute left-0 bottom-full mb-1.5 z-40 w-44 rounded-md border border-border/40 bg-card/95 backdrop-blur-xl p-2 shadow-xl"
                                >
                                  <p className="text-[9px] text-muted-foreground leading-relaxed">
                                    <Info className="inline h-2.5 w-2.5 text-ring mr-0.5 -mt-0.5" />
                                    Every conclusion is traceable to original social media posts and comments.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === "scanning" && (
                <motion.p
                  key={`scan-${animKey}-${scanIdx}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[11px] font-mono text-muted-foreground"
                >
                  Locking {competitor}...{" "}
                  <span className="text-foreground font-semibold">{domains[scanIdx]}</span>
                </motion.p>
              )}
              {phase === "locked" && (
                <motion.p
                  key={`locked-${animKey}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[11px] font-mono"
                >
                  <span className="text-primary font-bold">✓ LOCKED:</span>{" "}
                  <span className="text-foreground font-semibold">{competitor}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 flex flex-col items-center gap-1.5">
            <p className="text-[10px] text-muted-foreground/50 tracking-wide">
              Your AI Assistant is now analyzing these gaps below...
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                <path d="M11 4v12m0 0l-5-5m5 5l5-5" stroke="hsl(142 76% 63%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
