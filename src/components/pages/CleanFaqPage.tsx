import { ChevronDown } from 'lucide-react';

import {
  CleanCtaBand,
  CleanPageHero,
  CleanSectionLabel,
  CleanSitePage,
  type SiteLang,
} from '@/components/CleanSiteChrome';

export const FAQ_COPY = {
  zh: {
    hero: {
      eyebrow: '常见问题',
      title: '关于数据、准确性和怎么用。',
      description: 'DataScaler 怎么采集公开讨论、怎么验证 AI 洞察，以及适合哪些品牌团队——一份看完。',
    },
    groups: [
      {
        title: '产品与可信度',
        items: [
          ['通用大模型（GPT/Claude）已经够强，为什么还要用 DataScaler？', '通用大模型不知道“市场现在在说什么”，也通常给不出明确出处。DataScaler 持续采集公开讨论，每条结论都链回原帖，团队可以现场核验。'],
          ['DataScaler 怎么防止 AI 幻觉？', '每条洞察都通过 Ref 证据链锚定真实讨论。点开 Ref 就能看到原帖、互动数据和上下文，结论对不上原帖可以当场否掉。'],
          ['软文、机器人、公关稿怎么过滤？', '系统从账户行为、语义模式、传播结构三个维度识别异常内容，把疑似公关稿和自然用户讨论分开呈现，不混在一起算。'],
        ],
      },
      {
        title: '数据与覆盖',
        items: [
          ['覆盖哪些海外平台？', '覆盖 10 个海外公开平台：YouTube、TikTok、X、Facebook、Instagram、Threads、Pinterest、Trustpilot、Reddit、Amazon Reviews。'],
          ['数据多久更新一次？', '看套餐。常规监控按周刷新，企业版可以配更高频率和异常提醒。'],
          ['数据采集合规吗？会触碰隐私吗？', 'DataScaler 只处理公开可访问内容，不碰私密账户或非公开数据，符合 GDPR、CCPA 等主流隐私法规要求。'],
        ],
      },
      {
        title: '团队与使用',
        items: [
          ['什么样的团队适合用 DataScaler？', '品牌、增长、产品、市场、战略团队都在用——做竞品追踪、消费者洞察、风险预警和机会挖掘。'],
          ['上手要不要复杂集成或培训？', '不用。输品牌名或关键词就能开始。要做自动化，也能用 MCP 把 DataScaler 接进现有 AI 工作流。'],
        ],
      },
    ],
    cta: { eyebrow: '还有问题？', title: '先用一个品牌，看看答案是否有用。', label: '免费开始' },
  },
  en: {
    hero: {
      eyebrow: 'FAQ',
      title: 'Data, accuracy, and how teams use it.',
      description: 'How DataScaler collects public conversation, verifies AI insights, and fits into a modern brand workflow—in one read.',
    },
    groups: [
      {
        title: 'Product & trust',
        items: [
          ['GPT and Claude are already strong. Why do I need DataScaler?', "A general LLM doesn't know what the market is saying right now, and usually can't show where an answer came from. DataScaler continuously collects public conversation and links every finding back to the original post, so your team can verify it on the spot."],
          ['How do you prevent AI hallucination?', "Every finding is anchored by our Ref evidence chain. Open any Ref to inspect the original post, engagement, and context—if the finding doesn't match the source, you can reject it in seconds."],
          ['How do you filter bots and PR noise?', 'The system combines account behavior, semantic patterns and distribution structure to separate suspected seeded content from organic discussion.'],
        ],
      },
      {
        title: 'Data & coverage',
        items: [
          ['Which platforms does DataScaler cover?', '10 public platforms: YouTube, TikTok, X, Facebook, Instagram, Threads, Pinterest, Trustpilot, Reddit, and Amazon Reviews.'],
          ['How frequently is data refreshed?', 'Refresh cadence depends on the plan. Routine monitoring is weekly, while enterprise workflows can use higher frequency updates and anomaly alerts.'],
          ['Is data collection compliant?', 'DataScaler processes publicly accessible signals only, never private account data, and follows applicable privacy requirements.'],
        ],
      },
      {
        title: 'Teams & usage',
        items: [
          ['What teams is DataScaler built for?', 'Brand, growth, product, research and strategy teams use it for competitor tracking, customer insight, risk alerts and opportunity discovery.'],
          ['Do we need a complex integration or training?', 'No. Enter a brand or keyword to begin. When you need automation, MCP connects DataScaler to your existing AI workflow.'],
        ],
      },
    ],
    cta: { eyebrow: 'Still have questions?', title: 'Start with one brand and judge the evidence yourself.', label: 'Start free' },
  },
};

export function CleanFaqPage({ lang }: { lang: SiteLang }) {
  const t = FAQ_COPY[lang];

  return (
    <CleanSitePage lang={lang}>
      <main>
        <CleanPageHero {...t.hero} tone="blue" />
        <section className="border-b border-[#3d2673] bg-white px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[980px] space-y-20">
            {t.groups.map((group, groupIndex) => (
              <section key={group.title} className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
                <div>
                  <CleanSectionLabel>0{groupIndex + 1}</CleanSectionLabel>
                  <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#24133f]">{group.title}</h2>
                </div>
                <div className="border-t border-[#3d2673]">
                  {group.items.map(([question, answer]) => (
                    <details key={question} className="group border-b border-[#3d2673]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-black text-[#24133f] [&::-webkit-details-marker]:hidden">
                        {question}
                        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="max-w-2xl pb-7 pr-10 text-sm leading-7 text-[#24133f]/60">{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
        <CleanCtaBand lang={lang} {...t.cta} />
      </main>
    </CleanSitePage>
  );
}
