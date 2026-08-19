import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { IndexContent } from '@/components/pages/IndexContent';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler | 出海品牌舆情监控 · 可溯源 AI 市场情报',
  description:
    'DataScaler 是出海品牌舆情监控工具：覆盖 10 个海外公开平台，每条结论都链回原帖可核验。免费生成品牌报告，看清海外消费者在说什么。',
  canonical: '/',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'DataScaler',
          url: SITE_URL,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: metadata.description,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          publisher: { '@id': `${SITE_URL}/#organization` },
        }}
      />
      <IndexContent />
    </>
  );
}
