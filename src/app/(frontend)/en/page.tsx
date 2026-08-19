import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { EnIndexContent } from '@/components/pages/EnIndexContent';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler | Social Listening & Consumer Intelligence for Global Brands',
  description:
    'DataScaler turns public posts, reviews, and Reddit threads into traceable consumer intelligence for global ecommerce brands. 10 platforms. Every finding links to the source. Try free.',
  canonical: '/en',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'DataScaler',
          url: `${SITE_URL}/en`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: metadata.description,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          publisher: { '@id': `${SITE_URL}/#organization` },
        }}
      />
      <EnIndexContent />
    </>
  );
}
