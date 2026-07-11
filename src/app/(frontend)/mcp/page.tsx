import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { McpContent } from '@/components/pages/McpContent';

export const metadata: Metadata = buildMetadata({
  title: 'MCP 接入 — 让 AI 直接调用你的品牌数据 | DataScaler',
  description:
    'DataScaler 通过 MCP 协议，把全渠道品牌数据接入 Claude、Cursor、ChatGPT 等 AI 工具。自然语言提问，自动拉数、归因、给建议；OAuth 一键授权或 API Key 深度集成。',
  canonical: '/mcp',
});

export default function Page() {
  return <McpContent />;
}
