'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, CreditCard } from 'lucide-react';

import {
  CleanCtaBand,
  CleanPageHero,
  CleanSectionLabel,
  CleanSitePage,
  type SiteLang,
} from '@/components/CleanSiteChrome';
import { track } from '@/lib/analytics';
import { getSignUpUrl } from '@/lib/app-links';

type Plan = {
  name: string;
  note: string;
  monthly: number;
  badge?: string;
  features: string[];
  action: string;
  contact?: boolean;
};

const COPY = {
  zh: {
    hero: {
      eyebrow: '定价',
      title: '从一个品牌起步，按团队需要扩展。',
      description: '不用算席位。挑监控规模和报告用量，不够再用 Credit 补。',
    },
    monthly: '月付',
    yearly: '年付 · 节省 10%',
    month: '/ 月',
    billed: '年付按月折算',
    plans: [
      {
        name: 'Free',
        note: '永久免费 · 无需绑定信用卡',
        monthly: 0,
        features: [
          '1 个监控品牌',
          '1 份完整报告',
          '6 次 AI 深度追问',
          '不支持数据导出',
          '1 个账号',
        ],
        action: '免费开始',
      },
      {
        name: 'Pro',
        note: '出海成长期品牌首选',
        monthly: 199,
        badge: '推荐',
        features: [
          '1 个监控品牌',
          '3 份完整报告 / 月',
          '60 次 AI 深度追问 / 月',
          '1,000 条数据导出 / 月',
          '1 个账号',
        ],
        action: '选择 Pro',
      },
      {
        name: 'Team',
        note: '多品牌 + 多账号协作',
        monthly: 499,
        features: [
          '3 个监控品牌',
          '9 份完整报告 / 月',
          '300 次 AI 深度追问 / 月',
          '3,000 条数据导出 / 月',
          '5 个账号',
        ],
        action: '预约演示',
        contact: true,
      },
      {
        name: 'Enterprise',
        note: '全球化品牌深度定制',
        monthly: 1299,
        features: [
          '8 个监控品牌',
          '25 份完整报告 / 月',
          '1,000 次 AI 深度追问 / 月',
          '10,000 条数据导出 / 月',
          '10 个账号',
        ],
        action: '联系销售',
        contact: true,
      },
    ] satisfies Plan[],
    creditsEyebrow: 'Credits & add-ons',
    creditsTitle: '套餐不够用时，按用量补 Credit。',
    creditsDescription: '$1 = 1 Credit，12 个月有效。没有隐藏超额账单。',
    creditItems: [
      ['完整报告', '70 Credits / 份'],
      ['AI 深度追问', '10 Credits / 10 次'],
      ['数据导出', '10 Credits / 200 条'],
      ['Reddit 数据源', '+10 Credits / 份'],
      ['Amazon Reviews', '+12 Credits / 份'],
    ],
    billingTitle: '简单、可控的计费规则',
    billing: [
      ['永久免费起步', '免费版不绑卡，不自动扣费。'],
      ['随时取消', '当前周期结束后生效。'],
      ['年付省 10%', '实际金额以结账页为准。'],
    ],
    cta: { eyebrow: '先看真实结果', title: '免费生成第一份品牌报告。', label: '免费开始' },
  },
  en: {
    hero: {
      eyebrow: 'Pricing',
      title: 'Start with one brand. Scale with the team.',
      description: 'No seat math. Pick the monitoring and report volume you need—add credits when demand grows.',
    },
    monthly: 'Monthly',
    yearly: 'Yearly · save 10%',
    month: '/ month',
    billed: 'effective monthly price',
    plans: [
      {
        name: 'Free',
        note: 'Free forever · No credit card required',
        monthly: 0,
        features: [
          '1 monitored brand',
          '1 full report',
          '6 AI follow-up questions',
          'Data export not included',
          '1 account',
        ],
        action: 'Start free',
      },
      {
        name: 'Pro',
        note: 'Best for growing DTC and ecommerce brands',
        monthly: 199,
        badge: 'Popular',
        features: [
          '1 monitored brand',
          '3 full reports / month',
          '60 AI follow-up questions / month',
          '1,000 data exports / month',
          '1 account',
        ],
        action: 'Choose Pro',
      },
      {
        name: 'Team',
        note: 'Multi-brand, multi-account collaboration',
        monthly: 499,
        features: [
          '3 monitored brands',
          '9 full reports / month',
          '300 AI follow-up questions / month',
          '3,000 data exports / month',
          '5 accounts',
        ],
        action: 'Book a demo',
        contact: true,
      },
      {
        name: 'Enterprise',
        note: 'Deep customization for global brands',
        monthly: 1299,
        features: [
          '8 monitored brands',
          '25 full reports / month',
          '1,000 AI follow-up questions / month',
          '10,000 data exports / month',
          '10 accounts',
        ],
        action: 'Contact sales',
        contact: true,
      },
    ] satisfies Plan[],
    creditsEyebrow: 'Credits & add-ons',
    creditsTitle: 'Add capacity only when you need it.',
    creditsDescription: '$1 = 1 Credit. Valid 12 months. No surprise overage bills.',
    creditItems: [
      ['Full report', '70 Credits / report'],
      ['AI follow-ups', '10 Credits / 10 questions'],
      ['Data export', '10 Credits / 200 rows'],
      ['Reddit source', '+10 Credits / report'],
      ['Amazon Reviews', '+12 Credits / report'],
    ],
    billingTitle: 'Simple, controlled billing',
    billing: [
      ['Start free forever', 'The free plan requires no card and never auto-charges.'],
      ['Cancel any time', 'Cancellation takes effect at the end of the billing period.'],
      ['Save 10% yearly', 'Final billing totals are shown before checkout.'],
    ],
    cta: { eyebrow: 'See the result first', title: 'Generate your first brand report for free.', label: 'Start free' },
  },
};

export function CleanPricingPage({ lang }: { lang: SiteLang }) {
  const t = COPY[lang];
  const plans: readonly Plan[] = t.plans;
  const [yearly, setYearly] = useState(false);
  const signupUrl = getSignUpUrl(lang);
  const contactUrl = lang === 'en' ? '/en/contact' : '/contact';

  return (
    <CleanSitePage lang={lang}>
      <main>
        <CleanPageHero {...t.hero} tone="blue" />

        <section className="border-b border-[#3d2673] bg-white px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 flex justify-center">
              <div className="inline-flex rounded-full border border-[#3d2673] bg-[#f4f0fa] p-1">
                <button
                  type="button"
                  onClick={() => setYearly(false)}
                  className={`rounded-full px-5 py-2.5 text-sm font-black ${!yearly ? 'bg-[#7047eb] text-white' : 'text-[#24133f]/55'}`}
                >
                  {t.monthly}
                </button>
                <button
                  type="button"
                  onClick={() => setYearly(true)}
                  className={`rounded-full px-5 py-2.5 text-sm font-black ${yearly ? 'bg-[#f5ff63] text-[#24133f]' : 'text-[#24133f]/55'}`}
                >
                  {t.yearly}
                </button>
              </div>
            </div>

            <div className="grid border-l border-t border-[#3d2673] md:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan, index) => {
                const price = yearly ? Math.round(plan.monthly * 0.9) : plan.monthly;
                const href = plan.contact ? contactUrl : signupUrl;
                return (
                  <article
                    key={plan.name}
                    className={`relative flex min-h-[520px] flex-col border-b border-r border-[#3d2673] p-7 ${
                      index === 1 ? 'bg-[#d8c8ff]' : index === 3 ? 'bg-[#f4f0fa]' : 'bg-white'
                    }`}
                  >
                    {plan.badge ? (
                      <span className="absolute right-5 top-5 border border-[#3d2673] bg-[#f5ff63] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em]">
                        {plan.badge}
                      </span>
                    ) : null}
                    <div className="text-xs font-black tracking-[0.15em] text-[#24133f]/35">0{index + 1}</div>
                    <h2 className="mt-8 text-3xl font-black tracking-[-0.05em] text-[#24133f]">{plan.name}</h2>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#24133f]/55">{plan.note}</p>
                    <div className="mt-8 border-y border-[#3d2673]/15 py-5">
                      <span className="text-5xl font-black tracking-[-0.06em] text-[#24133f]">
                        {plan.monthly === 0 ? '$0' : `$${price}`}
                      </span>
                      <span className="ml-2 text-xs font-bold text-[#24133f]/45">{t.month}</span>
                      {yearly && plan.monthly > 0 ? <div className="mt-1 text-[10px] font-bold text-[#24133f]/40">{t.billed}</div> : null}
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-sm font-semibold leading-5 text-[#24133f]/70">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {plan.contact ? (
                      <Link
                        href={href}
                        data-plan={plan.name.toLowerCase()}
                        onClick={() => track('plan_click', { plan_name: plan.name.toLowerCase(), cta_type: 'contact' })}
                        className="mt-8 inline-flex items-center justify-between rounded-full border border-[#3d2673] px-5 py-3.5 text-sm font-black text-[#24133f]"
                      >
                        {plan.action}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-plan={plan.name.toLowerCase()}
                        onClick={() => track('plan_click', { plan_name: plan.name.toLowerCase(), cta_type: 'signup' })}
                        className="mt-8 inline-flex items-center justify-between rounded-full bg-[#7047eb] px-5 py-3.5 text-sm font-black text-white"
                      >
                        {plan.action}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#fbf9ff] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <CleanSectionLabel>{t.creditsEyebrow}</CleanSectionLabel>
                <h2 className="mt-6 max-w-[760px] text-[clamp(34px,4.6vw,58px)] font-black leading-[1.02] tracking-[-0.05em] text-[#24133f]">
                  {t.creditsTitle}
                </h2>
              </div>
              <p className="text-base leading-7 text-[#24133f]/55 lg:justify-self-end">{t.creditsDescription}</p>
            </div>
            <div className="mt-12 grid border-l border-t border-[#3d2673] sm:grid-cols-2 lg:grid-cols-5">
              {t.creditItems.map(([name, amount], index) => (
                <div key={name} className={`border-b border-r border-[#3d2673] p-6 ${index === 1 ? 'bg-[#f5ff63]' : 'bg-white'}`}>
                  <CreditCard className="h-5 w-5 text-[#24133f]/45" />
                  <div className="mt-8 text-sm font-black text-[#24133f]">{name}</div>
                  <div className="mt-2 text-xs font-bold leading-5 text-[#24133f]/50">{amount}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
              <h3 className="text-3xl font-black tracking-[-0.04em] text-[#24133f]">{t.billingTitle}</h3>
              <div className="divide-y divide-[#3d2673]/15 border-y border-[#3d2673]/15">
                {t.billing.map(([title, description], index) => (
                  <div key={title} className="grid gap-3 py-6 sm:grid-cols-[44px_0.6fr_1fr]">
                    <span className="text-xs font-black text-[#24133f]/35">0{index + 1}</span>
                    <span className="text-sm font-black text-[#24133f]">{title}</span>
                    <span className="text-sm leading-6 text-[#24133f]/55">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CleanCtaBand lang={lang} {...t.cta} />
      </main>
    </CleanSitePage>
  );
}
