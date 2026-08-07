import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FaqEnContent } from '@/components/pages/FaqEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions | DataScaler',
  description:
    'Straight answers about DataScaler data sources, platform coverage, source verification, setup, and plans.',
  canonical: '/en/faq',
});

export default function Page() {
  return <FaqEnContent />;
}
