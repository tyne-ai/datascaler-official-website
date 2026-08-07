import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { EnIndexContent } from '@/components/pages/EnIndexContent';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler | See What Customers Want and What Is Getting in the Way',
  description:
    'Bring public posts, reviews, and community conversations into one view to spot customer demand, objections, and emerging risks. Every insight links back to the source.',
  canonical: '/en',
});

export default function Page() {
  return <EnIndexContent />;
}
