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
    title: "1. 我们收集的数据",
    body: "为了提供、维护和改进服务，我们会收集必要的账户信息、你在产品内提交的查询，以及基本使用记录。我们不会主动获取非公开社交内容或你的站外私密浏览记录。",
  },
  {
    title: "2. 客户数据与模型训练",
    body: "除非另行取得你的明确授权，我们不会使用你的搜索词、品牌关注列表或上传的对标数据训练面向公众的 AI 模型。",
  },
  {
    title: "3. 第三方 AI 服务",
    body: "我们可能使用包括 Google Gemini 在内的第三方 AI 服务处理部分请求。在发送请求前，我们会尽量减少其中的个人信息，并在可行范围内移除直接身份标识。",
  },
  {
    title: "4. 数据留存",
    body: "用于单次品牌对标任务的上传数据会在完成处理后按既定流程删除。出于账户管理、安全审计、故障排查或法律要求，部分必要记录可能会在限定期限内保留。",
  },
  {
    title: "5. 你的隐私权利",
    body: "根据你所在地区适用的法律，你可能有权查阅、更正、删除或导出个人信息，也可以对部分处理方式提出限制或异议。如需行使相关权利，请联系我们。",
  },
  {
    title: "6. 信息安全",
    body: "我们采用传输加密、访问控制和权限隔离等措施保护数据。任何网络传输或存储方式都无法保证绝对安全，我们会持续评估并改进安全措施。",
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
