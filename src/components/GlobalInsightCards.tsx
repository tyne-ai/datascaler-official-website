'use client';

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Gift, Leaf, Package, Clock } from "lucide-react";

const regions = [
  {
    flag: "🇺🇸",
    region: "北美市场",
    keyword: "Sustainability",
    trend: "+30% 提及率",
    trendColor: "text-primary",
    trendBg: "bg-primary/10",
    icon: Leaf,
    iconColor: "text-primary",
    action: "建议强化「环保材质」营销叙事，在 Amazon Listing 突出 Eco-friendly 认证",
    type: "opportunity" as const,
  },
  {
    flag: "🇮🇩",
    region: "东南亚市场",
    keyword: "Customs Clearance",
    trend: "负面激增",
    trendColor: "text-destructive",
    trendBg: "bg-destructive/10",
    icon: Package,
    iconColor: "text-destructive",
    action: "检测到 Shopee 物流负面评论激增 47%，需立即介入安抚并优化清关流程",
    type: "warning" as const,
  },
  {
    flag: "🇦🇪",
    region: "中东市场",
    keyword: "Ramadan Gifting",
    trend: "互动峰值",
    trendColor: "text-accent",
    trendBg: "bg-accent/10",
    icon: Gift,
    iconColor: "text-accent",
    action: "监测到 TikTok 晚间互动峰值（21:00-01:00 UTC+4），建议调整发布节奏",
    type: "insight" as const,
  },
];

export function GlobalInsightCards() {
  return (
    <div className="w-full space-y-3">
      {regions.map((r, i) => (
        <motion.div
          key={r.region}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          className="rounded-xl border border-border/30 bg-secondary/20 p-4 transition-all hover:bg-secondary/30"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">{r.flag}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{r.region}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${r.trendColor} ${r.trendBg}`}>
                  {r.trend}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                关键词: <span className="text-foreground font-medium">"{r.keyword}"</span>
              </p>
            </div>
            <r.icon className={`h-4 w-4 ${r.iconColor} shrink-0`} />
          </div>
          <div className="flex items-start gap-1.5 rounded-lg bg-card/30 px-3 py-2">
            {r.type === "warning" ? (
              <AlertTriangle className="h-3 w-3 text-destructive shrink-0 mt-0.5" />
            ) : r.type === "insight" ? (
              <Clock className="h-3 w-3 text-accent shrink-0 mt-0.5" />
            ) : (
              <TrendingUp className="h-3 w-3 text-primary shrink-0 mt-0.5" />
            )}
            <p className="text-[10px] leading-relaxed text-muted-foreground">{r.action}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
