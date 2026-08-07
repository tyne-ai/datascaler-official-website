import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { EnIndexContent } from '@/components/pages/EnIndexContent';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler AI | Turn Global Consumer Voices into Growth Signals',
  description:
    'Analyze public conversations across social platforms, communities, and reviews to uncover demand, trust gaps, and emerging risks.',
  canonical: '/en',
});

export default function Page() {
  return <EnIndexContent />;
}
