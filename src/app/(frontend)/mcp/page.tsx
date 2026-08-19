import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { McpContent } from '@/components/pages/McpContent';
import { MCP_COPY } from '@/components/pages/CleanMcpPage';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'MCP 接入 — 用模型上下文协议把品牌数据接进 Claude/Cursor | DataScaler',
  description:
    'DataScaler 通过模型上下文协议（MCP）把品牌舆情数据接进 Claude、Cursor、ChatGPT 等 AI 工具。自然语言提问，自动拉数、归因、给建议。5 分钟配置完成。',
  canonical: '/mcp',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: '5 分钟接入 DataScaler MCP',
          description: metadata.description,
          totalTime: 'PT5M',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
          url: `${SITE_URL}/mcp`,
          step: MCP_COPY.zh.steps.map((text, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: text,
            text,
          })),
        }}
      />
      <McpContent />
    </>
  );
}
