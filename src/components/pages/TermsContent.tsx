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
    title: "1. 服务说明",
    body: "DataScaler 基于公开信号提供 AI 辅助分析，并尽可能为核心结论提供可查看的来源链接（Ref）。AI 生成的内容具有概率性和推断性，仅用于辅助研究和决策，不应作为重大商业决策的唯一依据。",
  },
  {
    id: 2,
    title: "2. 知识产权",
    body: "在适用法律、第三方权利和双方约定允许的范围内，用户可以将为其账户生成的报告用于内部业务。DataScaler 保留对平台、软件、数据处理流程、模型和相关技术的权利。未经许可，不得对服务进行逆向工程、自动化抓取或再次封装销售。",
  },
  {
    id: 3,
    title: "3. 可接受的使用方式",
    body: "用户不得利用本服务获取非公开私人信息、违反第三方平台规则、侵犯他人权利，或从事违法和不正当竞争活动。发现违规使用时，DataScaler 可以限制或终止相关账户的访问权限。",
  },
  {
    id: 4,
    title: "4. 免责声明与责任限制",
    body: "第三方内容会持续变化，AI 分析也可能存在遗漏或误判。DataScaler 不保证所有数据或结论始终完整、准确或适用于特定目的。在适用法律允许的最大范围内，DataScaler 的累计责任不超过用户在相关事件发生前 12 个月内实际支付的服务费用。",
  },
  {
    id: 5,
    title: "5. 数据使用",
    body: "DataScaler 处理公开可访问的信号，并按照隐私政策处理用户提交的数据。除非另行取得明确授权，用户上传的品牌数据不会用于训练面向公众的 AI 模型。",
  },
  {
    id: 6,
    title: "6. 适用法律与争议解决",
    body: "本协议适用的法律和争议解决方式，以用户订单、企业协议或 DataScaler 经营主体所在地的适用规定为准。双方应先尝试通过协商解决争议；无法解决时，再按照适用协议约定的程序处理。",
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
