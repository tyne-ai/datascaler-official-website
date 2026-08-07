import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PricingEnContent } from '@/components/pages/PricingEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Plans and Pricing | DataScaler',
  description:
    'Start free, then choose a DataScaler plan based on the number of brands, reports, seats, and data your team needs. Compare plans and credit usage.',
  canonical: '/en/pricing',
});

export default function Page() {
  return <PricingEnContent />;
}
