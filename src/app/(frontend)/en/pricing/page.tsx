import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PricingEnContent } from '@/components/pages/PricingEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing — DataScaler AI Market Intelligence Plans',
  description:
    'DataScaler plans: Free, Pro, Team, and Enterprise. A free plan with no credit card required, Credit-based billing, and fully traceable AI insights. See full pricing.',
  canonical: '/en/pricing',
});

export default function Page() {
  return <PricingEnContent />;
}
