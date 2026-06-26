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
    title: "产品逻辑与技术信任",
    items: [
      {
        q: "为什么不直接用通用大模型？",
        a: `通用大模型回答的是它训练时见过的内容，不是当下公开声量。我们按你设定的周期，从 9 个海外公开平台采集最新内容。\n\n通用大模型没法贴原帖，我们每条结论都带 [Ref]，一键跳转原始链接。\n\n通用大模型是一次性对话，我们是结构化报告 + 自动优先级的 Action Board。`,
      },
      {
        q: "DataScaler 的数据是如何获取的？为什么不只用官方 API？",
        a: `我们采用自研的\u201C全域流量感知逻辑\u201D，模拟真实用户在社媒平台的搜索行为。相比限制极多且不透明的官方 API，这种方式能获取更真实的搜索曝光结果，捕捉到 API 无法提供的原帖细节与用户互动信号，更贴近品牌在真实市场中的曝光感知。`,
      },
      {
        q: `如何确保 AI 洞察的准确性？如何解决\u201CAI 幻觉\u201D？`,
        a: `我们通过\u201C证据链（Ref）\u201D机制彻底消灭黑盒。AI 生成的每一条结论都强制锚定原始信号。用户点击结论即可直达 YouTube 或 X 的原始帖文。我们不提供无法验证的猜测，只交付带实证支撑的情报。`,
      },
      {
        q: `如何处理虚假文章或水军（PR 稿）对数据的干扰？`,
        a: `系统内置\u201C水军与 PR 识别引擎\u201D，AI 能够通过账号特征、语义重复度及传播路径，自动辨别并标注品牌\u201C埋稿\u201D与真实用户的\u201C原生评价\u201D。我们帮助品牌过滤杂音，直达最真实的消费者心智。`,
      },
    ],
  },
  {
    icon: Globe2,
    title: "数据覆盖与实时性",
    items: [
      {
        q: "目前支持覆盖哪些平台？",
        a: "目前已全量覆盖 YouTube, X (Twitter), Facebook, Instagram, TikTok。同时，我们正持续调优并逐步接入 Reddit 等高价值讨论社区，确保品牌信号覆盖出海主流全链路。",
      },
      {
        q: "数据刷新频率是怎样的？",
        a: "Pro 专业版支持每周固定刷新，满足日常监测需求；Enterprise 企业版支持日更级高频刷新及实时异动预警，确保品牌在危机或热点爆发时能第一时间做出反应。",
      },
      {
        q: "数据采集的合规性如何保证？",
        a: "DataScaler 仅采集公开合规的多平台信号，不涉及任何私人非公开数据，完全符合全球主流地区的数据隐私监管要求。我们为品牌提供的是安全、可审计的竞争情报。",
      },
    ],
  },
  {
    icon: Users,
    title: "使用场景与购买",
    items: [
      {
        q: "DataScaler 适合什么样的团队使用？",
        a: "我们主要服务于三类团队：品牌市场（Marketing）进行竞品对标与舆情监测；增长黑客（Growth）挖掘机会清单与趋势归因；以及战略/研究（Strategy）进行带证据链的市场推断。",
      },
      {
        q: "上手成本高吗？是否需要复杂的系统集成？",
        a: "零集成成本。DataScaler 是开箱即用的 Web 平台，无需接入您的内部数据库或安装插件。您只需输入品牌或关键词，Agent 即可自动开始工作。",
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
            关于 DataScaler 你需要了解的一切
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
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">还有疑问？</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
免费注册即可使用，无需绑卡，拿到你品牌的首份可溯源报告。
          </p>
          <div className="mt-7">
            <a href="https://app.datascaler.ai/plans" target="_blank" rel="noopener noreferrer" data-cta="faq_free_trial">
              <span className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_hsl(142_76%_63%/0.5)] transition-colors hover:bg-primary/85">
                开始体验
              </span>
            </a>
          </div>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
