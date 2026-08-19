import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PricingEnContent } from '@/components/pages/PricingEnContent';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing — Social Listening Plans for Ecommerce Brands | DataScaler',
  description:
    'DataScaler pricing: Free forever, Pro, Team, and Enterprise. Credit-based billing, traceable AI insights. No card required to start. Cancel anytime. See full plans.',
  canonical: '/en/pricing',
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
            url: `${SITE_URL}/en/pricing`,
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
      <PricingEnContent />
    </>
  );
}
