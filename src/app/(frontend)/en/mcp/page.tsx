import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { EnMcpContent } from '@/components/pages/EnMcpContent';
import { MCP_COPY } from '@/components/pages/CleanMcpPage';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'MCP Server for Market Intelligence — Claude, Cursor, ChatGPT | DataScaler',
  description:
    'DataScaler MCP server: query brand, competitor, and consumer signals from inside Claude, Cursor, or ChatGPT. Every answer carries a Ref to the source post. 5-minute setup.',
  canonical: '/en/mcp',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Connect DataScaler MCP in 5 minutes',
          description: metadata.description,
          totalTime: 'PT5M',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
          url: `${SITE_URL}/en/mcp`,
          step: MCP_COPY.en.steps.map((text, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: text,
            text,
          })),
        }}
      />
      <EnMcpContent />
    </>
  );
}
