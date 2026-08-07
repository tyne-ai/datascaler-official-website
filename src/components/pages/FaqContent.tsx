'use client';
import { motion } from "framer-motion";
import { HelpCircle, Cpu, Globe2, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const sections = [
  {
    icon: Cpu,
    title: "产品与数据来源",
    items: [
      {
        q: "DataScaler 和直接问 ChatGPT 有什么不同？",
        a: `通用 AI 更适合回答一般性问题；DataScaler 分析的是指定时间范围内的公开帖子、评论和互动数据。\n\n除了给出结论，DataScaler 还会标注 [Ref]，让你可以直接查看原帖并核验上下文。结果也会整理成报告和待办清单，方便团队持续跟进。`,
      },
      {
        q: "DataScaler 的数据从哪里来？",
        a: "我们根据不同平台的数据条件，结合公开搜索结果、允许使用的 API 以及公开可访问的帖子和评论。不同平台的可用字段和更新频率可能不同，报告中会保留原始链接，便于核验。",
      },
      {
        q: "如何降低 AI 误判的风险？",
        a: "每条核心结论都会尽量关联到对应的原始帖子或评论。用户可以通过 [Ref] 查看上下文，判断结论是否适用于当前决策。DataScaler 是辅助分析工具，重要决策仍建议结合团队的业务背景和内部数据。",
      },
      {
        q: "如何处理重复内容、PR 稿和异常账号？",
        a: "系统会结合账号特征、文本重复度和传播路径标记可疑内容，减少重复发布和明显推广内容对结果的影响。这类标记用于辅助判断，不等同于对账号或内容性质作出最终认定。",
      },
    ],
  },
  {
    icon: Globe2,
    title: "覆盖范围与更新",
    items: [
      {
        q: "目前支持哪些平台？",
        a: "基础报告覆盖 YouTube、TikTok、X、Facebook、Instagram、Pinterest 和 Trustpilot。Reddit 与 Amazon Reviews 可作为高级数据源按需加入。不同平台的数据类型和可用性会有差异。",
      },
      {
        q: "数据多久更新一次？",
        a: "每次生成报告时，系统会按你选择的时间范围收集数据。如果需要固定周期的持续监测或更高频的更新，可与团队确认适合的套餐和配置。",
      },
      {
        q: "数据采集的合规性如何保证？",
        a: "DataScaler 处理的是公开可访问的帖子、评论和互动信号，不主动获取私人账号内容或非公开数据。具体处理方式以适用的平台规则、法律要求和 DataScaler 隐私政策为准。",
      },
    ],
  },
  {
    icon: Users,
    title: "适用团队与使用方式",
    items: [
      {
        q: "DataScaler 适合什么样的团队？",
        a: "适合品牌、市场、增长、洞察和研究团队。常见用法包括新品反馈、竞品对比、差评归因、内容机会发现和持续的品牌监测。",
      },
      {
        q: "开始使用前需要做系统集成吗？",
        a: "不需要先接入内部数据库，也不需要安装插件。输入品牌信息、确认关键词和竞品后即可生成报告。",
      },
    ],
  },
];

export function FaqContent() {
  return (
    <div className="min-h-screen bg-background">
      <PricingHeader />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[420px] w-[600px] rounded-full bg-ring/20 blur-[160px]" />
        </div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <HelpCircle className="h-3 w-3" /> FAQ
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="mt-8 text-3xl font-bold text-foreground md:text-5xl leading-tight">
            常见问题
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-base text-muted-foreground" style={{ lineHeight: 1.6 }}>
            从数据来源到套餐使用，先回答你最关心的问题。
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Sections */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-16">
          {sections.map((section, si) => (
            <motion.div
              key={si}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp} custom={si * 0.5}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {section.items.map((item, qi) => (
                  <AccordionItem
                    key={qi}
                    value={`s${si}-q${qi}`}
                    className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-md px-5 data-[state=open]:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4 text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 底部转化 CTA */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-gradient-to-br from-card/70 to-primary/5 p-10 text-center backdrop-blur-md">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">还有具体问题？</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            可以先免费生成一份品牌报告，也可以联系我们讨论具体需求。
          </p>
          <div className="mt-7">
            <a href="https://app.datascaler.ai/plans" target="_blank" rel="noopener noreferrer" data-cta="faq_free_trial">
              <span className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_hsl(142_76%_63%/0.5)] transition-colors hover:bg-primary/85">
                免费生成报告
              </span>
            </a>
          </div>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
