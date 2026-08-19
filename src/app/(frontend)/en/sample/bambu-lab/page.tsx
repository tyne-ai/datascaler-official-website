import type { Metadata } from 'next';

import { ProductExperiencePage } from '@/components/pages/ProductExperiencePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Bambu Lab Brand Intelligence Sample Report | DataScaler',
  description:
    'See how DataScaler turns public conversations into source-backed findings, AI follow-ups, and recommended actions.',
  canonical: '/en/sample/bambu-lab',
});

export default function Page() {
  return <ProductExperiencePage lang="en" sampleOnly />;
}
