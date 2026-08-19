'use client';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';

/**
 * 首页社会证明模块 —— 位于 Hero 之下、洞察简报之上。
 * 版式对齐首页设计稿:标题 + 一句话说明 + 三格数据 +
 * "这些品牌团队正在使用" logo 无限轮播 + 一排 3 条代表性反馈。
 * 三格数据为已确认真实数据;用户反馈为匿名化的代表性反馈。
 */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/**
 * logo 轮播品牌(语言无关)。
 * type: wordmark=纯字标图;lockup=品牌图标 + 品牌名文字。
 * 全部按品牌原色渲染,不加任何滤镜。原先为深色背景准备的白色素材已改成
 * 深墨色另存为 *-light 版本(gamesir-light.png 只换掉白字、保留红图标;
 * snapmaker-light.svg 把 9 处 fill="white" 换成 #15182A),
 * 换文件名同时也避免浏览器命中旧图缓存。
 */
/**
 * accent 是卡片顶条的点缀色,不影响 logo 本身。
 * 标 [提取] 的是从 logo 素材里取到的真实品牌色;其余五家的官方字标是纯单色黑
 * (Heybike/PETKIT/Momcozy/Snapmaker/Aiper 均无品牌色),素材里没有任何彩色像素,
 * 因此借用站点自己的三个强调色轮换,只作装饰、不代表品牌色。
 */
const BRANDS: {
  name: string;
  type: 'wordmark' | 'lockup';
  src: string;
  accent: string;
}[] = [
  { name: 'Aiper', type: 'lockup', src: '/brand-logos/aiper.png', accent: 'hsl(258 90% 66%)' },
  { name: 'Heybike', type: 'wordmark', src: '/brand-logos/heybike.svg', accent: 'hsl(142 76% 63%)' },
  { name: 'GameSir', type: 'wordmark', src: '/brand-logos/gamesir-light.png', accent: '#D8262F' }, // [提取]
  { name: 'Snapmaker', type: 'wordmark', src: '/brand-logos/snapmaker-light.svg', accent: 'hsl(217 91% 59%)' },
  { name: 'Momcozy', type: 'lockup', src: '/brand-logos/momcozy.png', accent: 'hsl(258 90% 66%)' },
  { name: 'Sihoo', type: 'lockup', src: '/brand-logos/sihoo.png', accent: '#E64B38' }, // [提取]
  { name: 'LILYSILK', type: 'lockup', src: '/brand-logos/lilysilk.png', accent: '#3A3F20' }, // [提取]
  { name: 'PETKIT', type: 'lockup', src: '/brand-logos/petkit.png', accent: 'hsl(217 91% 59%)' },
];

interface Stat {
  value: string;
  label: string;
}
interface Quote {
  tag: string;
  quote: string;
  name: string;
  role: string;
}
interface Copy {
  headingLine1: string;
  headingLine2Pre: string;
  headingHighlight: string;
  headingLine2Post: string;
  lead: string;
  stats: Stat[];
  wallLabel: string;
  quotes: Quote[];
}

const COPY: Record<'zh' | 'en', Copy> = {
  zh: {
    headingLine1: '从客户讨论，',
    headingLine2Pre: '到',
    headingHighlight: '经得起追问',
    headingLine2Post: '的品牌决策',
    lead: 'DataScaler 帮助品牌、增长与产品团队看清发生了什么、为什么重要，并让每条洞察都能回到真实的客户讨论。',
    stats: [
      { value: '200+', label: '已监测品牌' },
      { value: '9 个', label: '公开社媒与评价平台' },
      { value: '一键直达', label: '从洞察回到原始来源' },
    ],
    wallLabel: '被 300+ 家全球头部品牌信赖',
    quotes: [
      {
        tag: '团队共识',
        quote:
          '以前开会，一半时间都在争论这条洞察靠不靠谱。现在点开原始来源，团队可以直接讨论下一步怎么做。',
        name: '品牌负责人',
        role: '消费电子',
      },
      {
        tag: '新品反馈',
        quote: '新品上线第三天，我们已经知道用户喜欢什么，以及哪些顾虑正在影响购买决定。',
        name: '增长负责人',
        role: 'DTC 品牌',
      },
      {
        tag: '风险预警',
        quote:
          '负面讨论上升时，我们能直接看到背后的具体帖子和话题，在影响扩大前判断是否需要回应。',
        name: '海外社媒负责人',
        role: '智能硬件',
      },
    ],
  },
  en: {
    headingLine1: 'From customer conversations,',
    headingLine2Pre: 'to brand decisions that ',
    headingHighlight: 'hold up to scrutiny',
    headingLine2Post: '',
    lead: 'DataScaler helps brand, growth and product teams see what happened and why it matters — and lets every insight trace back to a real customer conversation.',
    stats: [
      { value: '200+', label: 'Brands monitored' },
      { value: '9', label: 'Public social & review platforms' },
      { value: 'One click', label: 'From insight back to the source' },
    ],
    wallLabel: 'Trusted by 300+ Top Global Brands',
    quotes: [
      {
        tag: 'Team alignment',
        quote:
          'Half of every meeting used to go into arguing whether an insight was trustworthy. Now we open the original source and move straight to what to do next.',
        name: 'Head of Brand',
        role: 'Consumer electronics',
      },
      {
        tag: 'Launch feedback',
        quote:
          'By day three of a launch we already knew what users loved, and which concerns were holding back purchases.',
        name: 'Head of Growth',
        role: 'DTC brand',
      },
      {
        tag: 'Risk alerts',
        quote:
          'When negative chatter rises we see the exact posts and topics behind it, and can decide whether to respond before it spreads.',
        name: 'Head of Overseas Social',
        role: 'Smart hardware',
      },
    ],
  },
};

/**
 * 单个 logo 单元。深色页面上做成白色名片,靠反差让品牌墙跳出来,
 * 同时让各家 logo 能以自己的原色出现(深底上黑色/彩色 logo 都会糊掉)。
 * 轮播需渲染两份,第二份对辅助技术隐藏,避免重复朗读。
 */
function LogoCell({
  brand,
  duplicate = false,
}: {
  brand: (typeof BRANDS)[number];
  duplicate?: boolean;
}) {
  return (
    <div
      title={brand.name}
      aria-hidden={duplicate || undefined}
      style={{ '--brand-accent': brand.accent } as CSSProperties}
      className="group relative mr-3.5 flex h-[76px] w-[204px] flex-none items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-[#FAFBFD] px-4 shadow-[0_14px_34px_-16px_rgba(3,6,26,0.9)] ring-1 ring-slate-900/[0.06] transition-transform duration-300 hover:-translate-y-0.5"
    >
      {/* 品牌色顶条:整排看过去有彩色节奏,同时不改动 logo 本身 */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-[var(--brand-accent)] transition-[height] duration-300 group-hover:h-[5px]"
      />
      {brand.type === 'wordmark' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.src}
          alt={duplicate ? '' : brand.name}
          className="max-h-[30px] max-w-[142px] object-contain"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.src} alt="" className="h-[30px] w-[30px] rounded-lg object-contain" />
          {/*
            浅色名片脱离深色主题,品牌名直接用深灰保证对比度。
            LILYSILK / PETKIT 这类全大写字标每个字母都顶到 cap-height,
            与 Aiper / Sihoo 这类含小写的同字号并排会明显大一号,
            因此按光学尺寸降一档并补一点字距。
          */}
          <span
            className={`font-extrabold text-slate-900 ${
              brand.name === brand.name.toUpperCase()
                ? 'text-[14px] tracking-[0.02em]'
                : 'text-base tracking-tight'
            }`}
          >
            {brand.name}
          </span>
        </>
      )}
    </div>
  );
}

export function SocialProof({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const t = COPY[lang];

  return (
    <section className="relative px-6 py-[72px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        {/* 标题 */}
        <motion.h2
          variants={fadeUp}
          className="text-balance font-display text-[clamp(24px,3.5vw,38px)] font-extrabold tracking-[-0.02em] text-foreground"
        >
          {t.headingLine1}
          <br />
          {t.headingLine2Pre}
          <span className="text-gradient">{t.headingHighlight}</span>
          {t.headingLine2Post}
        </motion.h2>

        {/* 一句话说明 */}
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto mt-3.5 max-w-[60ch] text-[15px] text-muted-foreground"
        >
          {t.lead}
        </motion.p>

        {/* 三格数据 */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-8 grid gap-4 sm:grid-cols-3"
        >
          {t.stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-[22px] text-center">
              <div className="font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-none text-primary">
                {s.value}
              </div>
              <div className="mt-2 text-[13px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* logo 轮播 */}
        <motion.div variants={fadeUp} custom={3}>
          {/* 不加 uppercase:英文文案本身带大小写,强制全大写会破坏读感 */}
          <div className="mt-9 text-[13px] font-semibold tracking-[0.12em] text-foreground/90">
            {t.wallLabel}
          </div>
          <div className="logo-marquee mt-[18px]">
            <div className="logo-marquee-track">
              {/* 两份等长内容 => translateX(-50%) 无缝衔接 */}
              {[0, 1].map((copy) =>
                BRANDS.map((b) => (
                  <LogoCell key={`${copy}-${b.name}`} brand={b} duplicate={copy === 1} />
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* 用户反馈:一排 3 条 */}
        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-8 grid gap-4 text-left md:grid-cols-3"
        >
          {t.quotes.map((q) => (
            <div key={q.tag} className="glass-card flex flex-col rounded-2xl p-5">
              <span className="mb-3 self-start rounded-full border border-primary/30 bg-primary/10 px-[11px] py-1 text-[11px] font-bold tracking-[0.04em] text-primary">
                {q.tag}
              </span>
              <p className="flex-1 text-[13.5px] leading-[1.7] text-secondary-foreground">
                {`“${q.quote}”`}
              </p>
              <div className="mt-4 border-t border-border/40 pt-3">
                <div className="text-[13px] font-bold text-foreground">{q.name}</div>
                <div className="mt-0.5 text-[11.5px] text-muted-foreground">{q.role}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
