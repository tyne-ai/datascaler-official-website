'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingHeader } from '@/components/PricingHeader';
import { PricingFooter } from '@/components/PricingFooter';

// ─── 轻量埋点 helper（GTM dataLayer）────────────────────
function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...params });
}

const SIGNUP_URL = 'https://app.datascaler.ai/auth/sign-up';
const DOCS_URL = 'https://docs.datascaler.ai';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ─── Hero 内嵌工作流面板 ─────────────────────────────── */
type StepState = 'done' | 'active' | 'pending';
const steps: { title: string; sub: string; state: StepState }[] = [
  { title: '连接 DataScaler 账号', sub: '已通过 OAuth 授权', state: 'done' },
  { title: '加载 Anker 品牌数据', sub: '12 个渠道数据已就绪', state: 'done' },
  { title: '采集并分析 YouTube 评论', sub: '正在抓取 3,200 条反馈…', state: 'active' },
  { title: '聚类高频关键词', sub: '', state: 'pending' },
  { title: '生成反馈分析报告', sub: '', state: 'pending' },
];
const stateLabel: Record<StepState, string> = { done: '已完成', active: '进行中', pending: '待执行' };

function WorkflowPanel() {
  return (
    <div className="glass-card overflow-hidden rounded-xl shadow-[0_20px_48px_rgba(0,0,0,0.35)]">
      {/* window header */}
      <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[13px] text-muted-foreground">DataScaler · AI 工作流</span>
      </div>
      {/* prompt bar */}
      <div className="flex items-center gap-2.5 border-b border-border/40 px-4 py-3.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Play className="h-3 w-3 fill-current" />
        </span>
        <span className="text-sm text-slate-200">
          分析 Anker 在 YouTube 上的用户反馈，输出可执行建议
        </span>
      </div>
      {/* workflow steps */}
      <div className="flex flex-col gap-1 p-3">
        {steps.map((s) => {
          const isActive = s.state === 'active';
          return (
            <div
              key={s.title}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                isActive ? 'bg-[hsl(217_91%_59%/0.12)]' : ''
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  s.state === 'done'
                    ? 'bg-primary'
                    : s.state === 'active'
                      ? 'bg-[#3B82F6]'
                      : 'border border-border/60'
                }`}
              >
                {s.state === 'done' && (
                  <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                )}
                {s.state === 'active' && <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-slate-200">
                {s.title}
                {s.sub && <span className="text-muted-foreground"> — {s.sub}</span>}
              </span>
              <span
                className={`shrink-0 text-xs ${
                  s.state === 'done'
                    ? 'text-primary'
                    : s.state === 'active'
                      ? 'text-[hsl(217_91%_70%)]'
                      : 'text-muted-foreground'
                }`}
              >
                {stateLabel[s.state]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-24">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none absolute right-0 top-0">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
      </div>
      <div className="pointer-events-none absolute left-0 top-1/3">
        <div className="h-[520px] w-[520px] rounded-full bg-ring/15 blur-[150px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div>
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl"
          >
            告别多平台切换，<span className="text-gradient">让 AI 直接调用你的品牌数据</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
            style={{ lineHeight: 1.7 }}
          >
            DataScaler 通过 MCP 协议，将全渠道品牌数据接入你的 AI 工具。Claude、ChatGPT，一个连接全部打通。
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-wrap gap-4">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="mcp_free_trial"
              onClick={() => track('sign_up_click', { button_location: 'mcp_hero_primary', locale: 'zh' })}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-semibold hover:bg-primary/85 glow-primary"
              >
                立即免费接入
              </Button>
            </a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" data-cta="mcp_docs">
              <Button
                size="lg"
                variant="outline"
                className="border-white/12 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06] hover:text-white"
              >
                查看接入指南
              </Button>
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={3}>
          <WorkflowPanel />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Section head ─────────────────────────────────────── */
function SecHead({ title, desc }: { title: ReactNode; desc: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="mx-auto mb-11 max-w-3xl text-center"
    >
      <motion.h2
        variants={fadeUp}
        custom={0}
        className="font-display text-3xl font-bold text-foreground md:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} custom={1} className="mt-4 text-base text-muted-foreground md:text-lg">
        {desc}
      </motion.p>
    </motion.div>
  );
}

/* ─── 自然语言提问 ───────────────────────────────────── */
const questions = [
  { q: '品牌声量下滑，是哪几个渠道拖了后腿？应该优先补哪里？', a: '跨渠道归因 + 行动建议' },
  { q: '竞品近期上新节奏加快，我们的差异化切入点在哪？', a: '竞品追踪 + 差异定位' },
  { q: '用户反馈的高频关键词是什么？能自动提炼成 FAQ 吗？', a: '评价聚类 + FAQ 生成' },
  { q: '各产品线口碑排行如何？哪些差评信号需要立刻跟进？', a: '口碑评分 + 告警分级' },
];

function NaturalLanguage() {
  return (
    <section className="px-6 py-20">
      <SecHead
        title={<>自然语言提问，多维度答案一次到位</>}
        desc="把分析师该做的跨渠道排查，交给 AI。自动拉数、归因、给建议。"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
      >
        {questions.map((item, i) => (
          <motion.div
            key={item.q}
            variants={fadeUp}
            custom={i}
            className="glass-card flex flex-col gap-3 rounded-xl p-7"
          >
            <p className="text-lg font-medium leading-relaxed text-slate-100">{item.q}</p>
            <p className="text-[13px] text-primary">AI 自动完成：{item.a}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── 5) 统一数据源 ─────────────────────────────────────── */
const caps = [
  { title: '竞品上新追踪', desc: '监控竞品新品、价格与促销节奏，第一时间预警。' },
  { title: '口碑与风险预警', desc: '实时捕捉差评激增与舆情风险，提前布防。' },
  { title: '用户原声洞察', desc: '从海量评价中聚类关键词，定位真实痛点。' },
  { title: '渠道声量归因', desc: '拆解各平台贡献，知道预算该投在哪。' },
  { title: '品类趋势扫描', desc: '跟踪类目热词与需求迁移，捕捉新机会。' },
  { title: 'FAQ 自动生成', desc: '把高频问题沉淀为客服知识库，省下人工。' },
];

function UnifiedSource() {
  return (
    <section className="px-6 py-20">
      <SecHead
        title={<>统一数据源，灵活分析维度</>}
        desc="一套品牌数据，覆盖从竞品到用户的全链路分析场景。"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
      >
        {caps.map((c, i) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            custom={i % 3}
            className="glass-card flex flex-col gap-2.5 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-slate-100">{c.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── 6) 接入方式对比 ───────────────────────────────────── */
const cols = [
  {
    tag: '零代码接入',
    title: 'OAuth 一键授权',
    desc: '无需写代码，授权即连。适合运营、市场等非技术团队。',
    bullets: ['5 分钟完成授权', '自动同步全渠道品牌数据', '支持 Claude / Cursor / ChatGPT'],
  },
  {
    tag: '开发者友好',
    title: 'API Key 深度集成',
    desc: '面向研发团队，把品牌情报嵌入自有系统与工作流。',
    bullets: ['标准 RESTful 接口', '支持定时拉取与 Webhook 推送', '私有化部署可选'],
  },
];

function AccessMethods() {
  return (
    <section className="px-6 py-20">
      <SecHead
        title={<>从『临时查数据』到『实时情报流』</>}
        desc="两种接入方式，按团队技术能力任选。一次配置，品牌情报持续更新。"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
      >
        {cols.map((col, i) => (
          <motion.div
            key={col.title}
            variants={fadeUp}
            custom={i}
            className="glass-card flex flex-col gap-4 rounded-2xl p-8"
          >
            <span
              className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${
                i === 0
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-[hsl(217_91%_59%/0.35)] bg-[hsl(217_91%_59%/0.12)] text-[hsl(217_91%_72%)]'
              }`}
            >
              {col.tag}
            </span>
            <h3 className="text-xl font-bold text-white">{col.title}</h3>
            <p className="text-[15px] text-muted-foreground">{col.desc}</p>
            <ul className="mt-1 flex flex-col gap-2.5">
              {col.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px] text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── 7) Final CTA ─────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ring/[0.06] to-transparent" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="mx-auto max-w-3xl font-display text-3xl font-bold text-foreground md:text-4xl"
        >
          让品牌数据，成为 AI 随时能调用的情报。
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          免费试用，5 分钟接入你的第一个 AI 客户端。
        </motion.p>
        <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="mcp_free_trial_footer"
            onClick={() => track('sign_up_click', { button_location: 'mcp_final_primary', locale: 'zh' })}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-semibold hover:bg-primary/85 glow-primary"
            >
              免费试用
            </Button>
          </a>
          <Link
            href="/contact"
            data-cta="mcp_book_demo"
            onClick={() => track('demo_click', { button_location: 'mcp_final_secondary', locale: 'zh' })}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white/12 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06] hover:text-white"
            >
              预约演示
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function McpContent() {
  return (
    <div className="min-h-screen bg-background">
      <PricingHeader />
      <Hero />
      <NaturalLanguage />
      <UnifiedSource />
      <AccessMethods />
      <FinalCTA />
      <PricingFooter />
    </div>
  );
}
