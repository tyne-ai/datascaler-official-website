import { ArrowDown, ArrowRight, Braces, PlugZap, Search, ShieldCheck } from 'lucide-react';

import {
  CleanCtaBand,
  CleanPageHero,
  CleanSectionLabel,
  CleanSitePage,
  type SiteLang,
} from '@/components/CleanSiteChrome';

export const MCP_COPY = {
  zh: {
    hero: {
      eyebrow: 'MCP 接入',
      title: '把可核验的品牌数据，接进你的 AI 工作流。',
      description: '通过模型上下文协议（MCP），让 Claude、Cursor 和内部 Agent 直接检索 DataScaler 的品牌讨论与原始证据。',
    },
    flowEyebrow: 'How it connects',
    flowTitle: '你的 AI 提问，DataScaler 提供证据。',
    flowBody: '不用复制报告、不用传截图。Agent 按需检索品牌、趋势与具体来源。',
    flow: [
      ['01', '提问', '在 Claude 或 Cursor 里问品牌、竞品或市场变化。'],
      ['02', '调 DataScaler', 'MCP 服务拉相关洞察、原帖和互动数据。'],
      ['03', '返回可核验答案', '结论带 Ref，团队可以点开来源核查。'],
    ],
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: '给研究、策略和自动化用的市场上下文。',
    capabilities: [
      ['品牌搜索', '检索品牌、产品与竞品在公开平台上的实时讨论。'],
      ['证据引用', '每条结论都链到原帖、评论和互动数据。'],
      ['安全边界', '只返回授权范围内的数据，不碰账户私密信息。'],
    ],
    setupEyebrow: '5 分钟接入',
    setupTitle: '粘配置，开始用。',
    setupBody: '在支持 MCP 的客户端里贴上 DataScaler 服务地址和访问令牌。',
    steps: ['在 DataScaler 账户里创建 MCP Token', '把配置粘到 Claude Desktop 或 Cursor', '重载客户端，开始提问'],
    cta: { eyebrow: '接进你的工作流', title: '让你的 Agent 用真实市场证据。', label: '免费开始' },
  },
  en: {
    hero: {
      eyebrow: 'MCP access',
      title: 'Bring traceable market intelligence into your AI workflow.',
      description: 'Use Model Context Protocol to let Claude, Cursor, and internal agents retrieve DataScaler brand signals and source evidence directly.',
    },
    flowEyebrow: 'How it connects',
    flowTitle: 'Your AI asks. DataScaler brings the evidence.',
    flowBody: 'No copying reports or uploading screenshots. Agents retrieve the brand, trend and source context they need, when they need it.',
    flow: [
      ['01', 'Ask a question', 'Ask Claude or Cursor about a brand, competitor or market shift.'],
      ['02', 'Call DataScaler', 'The MCP service retrieves relevant insights, posts and engagement metrics.'],
      ['03', 'Return a verifiable answer', 'Every conclusion carries a Ref your team can open and verify.'],
    ],
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'Market context built for research, strategy, and automation.',
    capabilities: [
      ['Brand search', 'Retrieve live public conversation around brands, products and competitors.'],
      ['Evidence citations', 'Connect every conclusion to original posts, comments and engagement data.'],
      ['Secure boundaries', 'Return only authorized context without exposing private account information.'],
    ],
    setupEyebrow: '5-minute setup',
    setupTitle: 'Paste the config. Start asking.',
    setupBody: 'Add the DataScaler service URL and access token to any MCP-compatible client.',
    steps: ['Create an MCP token in your DataScaler account', 'Paste the configuration into Claude Desktop or Cursor', 'Reload the client and start asking questions'],
    cta: { eyebrow: 'Connect your workflow', title: 'Give your agents real market evidence.', label: 'Start free' },
  },
};

const ICONS = [Search, Braces, ShieldCheck];

export function CleanMcpPage({ lang }: { lang: SiteLang }) {
  const t = MCP_COPY[lang];
  const code = `{
  "mcpServers": {
    "datascaler": {
      "url": "https://mcp.datascaler.ai",
      "headers": {
        "Authorization": "Bearer ds_••••••••"
      }
    }
  }
}`;

  return (
    <CleanSitePage lang={lang}>
      <main>
        <CleanPageHero {...t.hero} tone="blue" />

        <section className="border-b border-[#3d2673] bg-white px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <CleanSectionLabel>{t.flowEyebrow}</CleanSectionLabel>
                <h2 className="mt-6 max-w-[760px] text-[clamp(34px,4.6vw,58px)] font-black leading-[1.02] tracking-[-0.05em] text-[#24133f]">
                  {t.flowTitle}
                </h2>
              </div>
              <p className="text-base leading-7 text-[#24133f]/55">{t.flowBody}</p>
            </div>

            <div className="mt-14 grid border-l border-t border-[#3d2673] md:grid-cols-3">
              {t.flow.map(([number, title, body], index) => (
                <article
                  key={number}
                  className={`min-h-[280px] border-b border-r border-[#3d2673] p-8 ${
                    index === 0 ? 'bg-[#f5ff63]' : index === 1 ? 'bg-[#d8c8ff]' : 'bg-[#fbf9ff]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-[0.14em] text-[#24133f]/40">{number}</span>
                    {index < 2 ? <ArrowRight className="h-5 w-5 text-[#24133f]/35" /> : <PlugZap className="h-5 w-5" />}
                  </div>
                  <h3 className="mt-16 text-2xl font-black tracking-[-0.04em] text-[#24133f]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#24133f]/60">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-[#f4f0fa] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{t.capabilitiesEyebrow}</CleanSectionLabel>
            <h2 className="mt-6 max-w-[880px] text-[clamp(34px,4.6vw,58px)] font-black leading-[1.02] tracking-[-0.05em] text-[#24133f]">
              {t.capabilitiesTitle}
            </h2>
            <div className="mt-12 grid gap-px border border-[#3d2673] bg-[#7047eb] lg:grid-cols-3">
              {t.capabilities.map(([title, body], index) => {
                const Icon = ICONS[index];
                return (
                  <article key={title} className="bg-white p-8">
                    <span className={`grid h-12 w-12 place-items-center border border-[#3d2673] ${index === 1 ? 'bg-[#d8c8ff]' : 'bg-[#f5ff63]'}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-10 text-xl font-black tracking-[-0.035em] text-[#24133f]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#24133f]/55">{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3d2673] bg-white px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid min-w-0 max-w-[1180px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="min-w-0">
              <CleanSectionLabel>{t.setupEyebrow}</CleanSectionLabel>
              <h2 className="mt-6 text-[clamp(34px,4.6vw,56px)] font-black leading-[1.02] tracking-[-0.05em] text-[#24133f]">
                {t.setupTitle}
              </h2>
              <p className="mt-5 text-base leading-7 text-[#24133f]/55">{t.setupBody}</p>
              <ol className="mt-8 space-y-4">
                {t.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3 text-sm font-bold text-[#24133f]/70">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f5ff63] text-[10px] font-black">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="min-w-0 border border-[#3d2673] bg-[#d8c8ff] p-4 sm:p-7">
              <div className="border border-[#3d2673] bg-[#24133f] shadow-[8px_8px_0_#f5ff63]">
                <div className="flex items-center justify-between border-b border-white/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                  <span>mcp.json</span>
                  <span>DataScaler</span>
                </div>
                <pre className="overflow-x-auto p-5 text-[12px] leading-6 text-[#d8c8ff] sm:p-7 sm:text-sm">
                  <code>{code}</code>
                </pre>
              </div>
              <div className="mt-7 flex items-center gap-3 text-xs font-black text-[#24133f]/55">
                <ArrowDown className="h-4 w-4" />
                Claude Desktop · Cursor · Internal agents
              </div>
            </div>
          </div>
        </section>

        <CleanCtaBand lang={lang} {...t.cta} />
      </main>
    </CleanSitePage>
  );
}
