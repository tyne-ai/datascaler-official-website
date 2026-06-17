'use client';
import { motion } from "framer-motion";
import { Printer } from "lucide-react";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const sections = [
  {
    id: 1,
    title: "第一条：服务定义与技术逻辑",
    body: "DataScaler 提供基于公开信号的 AI 辅助归因服务。我们承诺\u201C100% 溯源性\u201D，即所有洞察结论均锚定原始信号证据链（Ref）。用户承认并接受 AI 洞察具有概率性和推断性特征，本服务旨在作为决策辅助工具，不对用户基于此类结论产生的直接或间接商业决策后果承担法律担保或财务补偿责任。",
  },
  {
    id: 2,
    title: "第二条：知识产权与所有权",
    body: "用户对平台为其生成的特定定制《洞察简报》(Insight Briefings) 享有排他性使用权。DataScaler 保留对底层\u201C证据引擎\u201D、数据处理逻辑、算法模型及非敏感聚合数据的全部所有权。严禁任何形式的逆向工程、未经授权的自动化抓取或对本平台核心技术的二次封装。",
  },
  {
    id: 3,
    title: "第三条：用户行为准则",
    body: "用户承诺不利用本平台进行以下行为：(1) 追踪非公开的私人信息；(2) 违反目标社交平台的服务条款；(3) 利用情报结果从事任何非法竞争行为。DataScaler 有权在发现此类行为时立即终止服务权限。",
  },
  {
    id: 4,
    title: "第四条：责任限制声明",
    body: "鉴于第三方数据动态性及大语言模型（LLM）的局限性，DataScaler 不保证数据 100% 的语义准确性。在任何情况下，DataScaler 的赔偿责任上限不应超过用户过去 12 个月内支付的实际服务费用。",
  },
  {
    id: 5,
    title: "第五条：数据合规",
    body: "我们仅通过公开渠道采集信号。针对用户上传的对标数据，我们遵循\u201C零数据训练政策\u201D，相关数据绝不用于训练公开 AI 模型。",
  },
  {
    id: 6,
    title: "第六条：管辖法律",
    body: "本协议受公司注册地法律管辖。因本协议引起的任何争议，应首先通过友好协商解决；协商不成的，应提交至指定仲裁机构裁决。",
  },
];

export function TermsContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PricingHeader />

      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="mb-6">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">服务协议</h1>
              <button
                onClick={() => window.print()}
                aria-label="打印此页"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
              >
                <Printer className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">最后更新：2026 年 3 月 31 日</p>
          </motion.div>

          {/* Sections */}
          <div>
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate="visible"
                className="py-12 border-b border-white/5 last:border-b-0"
              >
                <h2 className="text-lg font-bold text-white mb-5">{s.title}</h2>
                <p className="text-slate-100 leading-relaxed">{s.body}</p>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
