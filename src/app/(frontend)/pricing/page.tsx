import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PricingContent } from '@/components/pages/PricingContent';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: '定价方案 — DataScaler 出海品牌舆情订阅 | 免费起步',
  description:
    'DataScaler 出海品牌舆情订阅：Free 永久免费、Pro/Team/Enterprise 按月订阅、Credit 灵活补充。免费版无需绑卡，付费可随时取消。看完整定价。',
  canonical: '/pricing',
});

export default function Page() {
  const plans = [
    ['Free', '0'],
    ['Pro', '199'],
    ['Team', '499'],
    ['Enterprise', '1299'],
  ];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': plans.map(([name, price]) => ({
            '@type': 'Product',
            name: `DataScaler ${name}`,
            brand: { '@type': 'Brand', name: 'DataScaler' },
            url: `${SITE_URL}/pricing`,
            offers: {
              '@type': 'Offer',
              price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price,
                priceCurrency: 'USD',
                referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
              },
            },
          })),
        }}
      />
      <PricingContent />
    </>
  );
}
