'use client';
import { motion } from "framer-motion";
import { Printer, Lock } from "lucide-react";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const sections = [
  {
    title: "第一条：数据采集与极简原则",
    body: "我们仅采集为您提供情报服务所必需的账户身份信息及平台内交互指令。DataScaler 绝不记录、不追踪您的任何站外私密浏览行为或非公开社交数据。",
  },
  {
    title: "第二条：零知识训练承诺",
    body: "DataScaler 严格执行\u201C数据不参与训练\u201D政策。您的搜索词条、关注竞品名单及上传的对标数据，均不会被用于训练我们的公开 AI 模型，确保您的战略意图保持私密。",
  },
  {
    title: "第三条：身份脱敏与 AI 处理",
    body: "我们利用 Google Gemini 等算力处理信号。在调用第三方模型前，我们会对请求进行身份脱敏（De-identification），剥离所有个人身份标识（PII）。",
  },
  {
    title: "第四条：数据留存与\u201C即用即焚\u201D",
    body: "针对 1:1 对标上传的品牌数据，我们遵循\u201C即用即焚\u201D原则。数据仅在内存中实时分析，任务结束后立即销毁，不进行任何持久化存储。",
  },
  {
    title: "第五条：全球隐私合规",
    body: "全面遵循 GDPR (欧盟) 与 CCPA (加州) 标准。您拥有绝对的数据控制权，包括查阅权、修正权及\u201C被遗忘权\u201D。",
  },
  {
    title: "第六条：安全防护措施",
    body: "所有传输采用 TLS 1.3 加密，存储数据采用 AES-256 银行级加密，并实施严格的权限隔离访问控制（RBAC）。",
  },
];

export function PrivacyContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PricingHeader />

      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="flex items-start justify-between mb-12"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                隐私政策
              </h1>
              <p className="text-sm text-muted-foreground">
                最后更新：2026 年 3 月 31 日
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
            >
              <Printer className="h-4 w-4" /> 打印
            </button>
          </motion.div>

          <div className="space-y-0">
            {sections.map((s, i) => (
              <motion.section
                key={i}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate="visible"
                className={`py-10 ${i < sections.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground/50" />
                  {s.title}
                </h2>
                <p className="text-muted-foreground" style={{ lineHeight: 1.7 }}>
                  {s.body}
                </p>
              </motion.section>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            custom={sections.length + 1}
            initial="hidden"
            animate="visible"
            className="text-center text-sm text-muted-foreground/60 mt-16"
          >
            隐私权相关咨询请联系：support@datascaler.ai
          </motion.p>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
