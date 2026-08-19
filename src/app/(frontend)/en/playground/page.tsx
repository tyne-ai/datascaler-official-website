import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ProductExperiencePage } from '@/components/pages/ProductExperiencePage';

export const metadata: Metadata = buildMetadata({
  title: 'Playground — Free Brand Social Listening Preview | DataScaler',
  description:
    'Type a brand name for a free social listening preview: cross-channel volume, sentiment, competitor comparison, and post-by-post source tracing. No card required. Full report generated after sign-up.',
  canonical: '/en/playground',
});

export default function Page() {
  return <ProductExperiencePage lang="en" />;
}
