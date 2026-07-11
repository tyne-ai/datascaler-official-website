import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { EnMcpContent } from '@/components/pages/EnMcpContent';

export const metadata: Metadata = buildMetadata({
  title: 'MCP Access — Give AI the Customer Evidence It Needs | DataScaler',
  description:
    'DataScaler turns reviews, social chatter, competitor moves, and category shifts into a customer-evidence layer your AI can query over MCP. Evidence-backed answers in Claude, ChatGPT, and more — via MCP workspace or API.',
  canonical: '/en/mcp',
});

export default function Page() {
  return <EnMcpContent />;
}
