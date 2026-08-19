'use client';

import { Printer } from 'lucide-react';

import { CleanSectionLabel, CleanSitePage, type SiteLang } from '@/components/CleanSiteChrome';

type LegalKind = 'privacy' | 'terms';

const CONTENT = {
  zh: {
    privacy: {
      eyebrow: 'Legal / Privacy',
      title: '隐私政策',
      intro: '我们只处理提供品牌情报所必需的数据，并把用户控制权放在第一位。',
      updated: '最后更新：2026 年 3 月 31 日',
      print: '打印',
      sections: [
        ['数据采集与极简原则', '我们仅采集为提供情报服务所必需的账户身份信息及平台内交互指令。DataScaler 不记录、不追踪站外私密浏览行为或非公开社交数据。'],
        ['零知识训练承诺', '您的搜索词条、竞品名单及上传的对标数据不会被用于训练公开 AI 模型，确保战略意图保持私密。'],
        ['身份脱敏与 AI 处理', '调用第三方模型前，我们会对请求进行身份脱敏，剥离个人身份标识信息。'],
        ['数据留存与即用即焚', '针对上传的品牌数据，我们仅在任务处理期间使用，任务结束后按约定清理，不用于其他目的。'],
        ['全球隐私合规', '我们遵循适用的 GDPR 与 CCPA 要求，并提供查阅、修正和删除相关数据的渠道。'],
        ['安全防护措施', '传输采用加密协议，存储数据实施加密与权限隔离，并通过访问控制降低未授权使用风险。'],
      ],
      contact: '隐私相关咨询：support@datascaler.ai',
    },
    terms: {
      eyebrow: 'Legal / Terms',
      title: '服务协议',
      intro: '以下条款说明 DataScaler 的服务范围、双方权利以及使用边界。',
      updated: '最后更新：2026 年 3 月 31 日',
      print: '打印',
      sections: [
        ['服务定义与技术逻辑', 'DataScaler 基于公开讨论提供 AI 辅助分析。每条洞察都能回到原始来源核验，供团队辅助决策。'],
        ['知识产权与所有权', '用户享有定制洞察简报的使用权；DataScaler 保留证据引擎、数据处理逻辑、算法模型及非敏感聚合数据的相关权利。'],
        ['用户行为准则', '用户不得追踪非公开私人信息、违反适用平台条款，或利用情报结果从事违法活动。'],
        ['责任限制声明', '鉴于第三方数据动态性与 AI 模型局限，洞察具有概率性。责任范围以协议及适用法律允许的范围为限。'],
        ['数据合规', '我们仅通过公开渠道处理信号，用户上传的数据不用于训练公开 AI 模型。'],
        ['管辖法律', '争议应优先通过友好协商解决；协商不成时，按协议约定的适用法律与争议解决机制处理。'],
      ],
      contact: '服务相关咨询：support@datascaler.ai',
    },
  },
  en: {
    privacy: {
      eyebrow: 'Legal / Privacy',
      title: 'Privacy Policy',
      intro: 'We process only the data needed to provide brand intelligence and keep user control at the center.',
      updated: 'Last updated: March 31, 2026',
      print: 'Print',
      sections: [
        ['Data minimization', 'We collect only account identity information and in-product instructions required to provide the service. DataScaler does not track private browsing or non-public social data.'],
        ['Zero-data training commitment', 'Your searches, competitor lists and uploaded comparison data are not used to train public AI models.'],
        ['De-identification and AI processing', 'Before requests are sent to third-party models, personal identifiers are removed where applicable.'],
        ['Retention and deletion', 'Uploaded brand data is used only for the agreed task and is removed according to the applicable retention policy.'],
        ['Global privacy compliance', 'We follow applicable GDPR and CCPA requirements and provide channels for access, correction and deletion requests.'],
        ['Security controls', 'Data is protected in transit and at rest, with access controls designed to reduce unauthorized use.'],
      ],
      contact: 'Privacy questions: support@datascaler.ai',
    },
    terms: {
      eyebrow: 'Legal / Terms',
      title: 'Terms of Service',
      intro: 'These terms explain the DataScaler service, each party’s rights and the boundaries of acceptable use.',
      updated: 'Last updated: March 31, 2026',
      print: 'Print',
      sections: [
        ['Service definition', 'DataScaler provides AI-assisted attribution based on public signals. Insights are anchored to source evidence and are intended to support decision-making.'],
        ['Intellectual property', 'Users may use their custom insight briefings. DataScaler retains rights to the evidence engine, processing logic, models and non-sensitive aggregated data.'],
        ['Acceptable use', 'Users may not track non-public private information, violate applicable platform terms or use the service for unlawful activity.'],
        ['Limitation of liability', 'Third-party data changes and AI insights are probabilistic. Liability is limited to the extent permitted by the agreement and applicable law.'],
        ['Data compliance', 'We process signals from public channels. User-uploaded data is not used to train public AI models.'],
        ['Governing law', 'Disputes should first be resolved through good-faith discussion, followed by the governing law and dispute mechanism stated in the agreement.'],
      ],
      contact: 'Service questions: support@datascaler.ai',
    },
  },
} as const;

export function CleanLegalPage({ lang, kind }: { lang: SiteLang; kind: LegalKind }) {
  const t = CONTENT[lang][kind];

  return (
    <CleanSitePage lang={lang}>
      <main className="bg-[#fbf9ff]">
        <header className="border-b border-[#3d2673] bg-[#f4f0fa] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[980px]">
            <CleanSectionLabel>{t.eyebrow}</CleanSectionLabel>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <h1 className="text-[clamp(40px,6.5vw,72px)] font-black leading-[1.02] tracking-[-0.055em] text-[#24133f]">{t.title}</h1>
                <p className="mt-6 max-w-[650px] text-base leading-7 text-[#24133f]/60">{t.intro}</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#24133f]/40">{t.updated}</p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#3d2673] px-4 py-2.5 text-xs font-black text-[#24133f]"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">{t.print}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[980px] border-t border-[#3d2673]">
            {t.sections.map(([title, body], index) => (
              <section key={title} className="grid gap-4 border-b border-[#3d2673] py-8 md:grid-cols-[70px_0.65fr_1.35fr] md:gap-8 md:py-10">
                <span className="text-xs font-black text-[#24133f]/35">0{index + 1}</span>
                <h2 className="text-lg font-black leading-6 tracking-[-0.025em] text-[#24133f]">{title}</h2>
                <p className="text-sm leading-7 text-[#24133f]/60">{body}</p>
              </section>
            ))}
            <p className="pt-10 text-sm font-bold text-[#24133f]/50">{t.contact}</p>
          </div>
        </section>
      </main>
    </CleanSitePage>
  );
}
