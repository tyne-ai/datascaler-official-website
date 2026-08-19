'use client';

import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";

/** mac 风格标题栏,与 BriefTerminal 保持一致 */
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

/** [Ref] 溯源标签 */
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
  { role: "user", text: "为什么这个产品负面评论突然增多了？" },
  {
    role: "ai",
    text: '近 3 天 r/RobotVacuums 集中投诉"电池续航不足"，源头一篇 342 赞的热帖，67% 评论提及 "battery drains fast"。',
    ref: "Reddit",
  },
  { role: "user", text: "这个趋势会扩散吗？给个应对方案。" },
  {
    role: "ai",
    text: "该话题有 78% 概率在 72 小时内扩散到 YouTube 评测圈。建议：① 发布电池优化固件声明 ② 联系 3 位头部 KOL 实测 ③ 在商品页补充电池 FAQ。",
    ref: "传播模型",
  },
];

export function CopilotChat() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl text-left">
      <CardHead title="AI 助手 · 基于当前证据" live="在线" />

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
              <p className="mb-[5px] text-[10px] font-bold text-ring">✦ AI 助手</p>
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
    priority: "P0 紧急",
    cardClass: "border-destructive/30 bg-destructive/[0.08]",
    tagClass: "bg-destructive/[0.14] text-destructive",
    title: '"电池续航"差评激增 — 需 48 小时内响应',
    consequence: "若不处理：预计 72 小时内扩散至 YouTube 评测圈",
  },
  {
    priority: "P1 重要",
    cardClass: "border-primary/25 bg-primary/[0.06]",
    tagClass: "bg-primary/[0.14] text-primary",
    title: "竞品 Roborock 新品发布 — 启动对标内容",
    consequence: "窗口期：7 天内完成对比评测",
  },
  {
    priority: "P2 关注",
    cardClass: "border-accent/20 bg-accent/[0.06]",
    tagClass: "bg-accent/[0.14] text-accent",
    title: "东南亚「清关体验」讨论量上升 34%",
    consequence: "监控趋势 · 准备本地化 FAQ",
  },
];

export function ActionBoard() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl text-left">
      <CardHead title="行动看板 · 按优先级排序" />

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
