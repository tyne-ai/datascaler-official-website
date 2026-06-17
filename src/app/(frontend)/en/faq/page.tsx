import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FaqEnContent } from '@/components/pages/FaqEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ — DataScaler AI Market Intelligence',
  description:
    'DataScaler FAQ: data sources, AI accuracy and evidence chain, platform coverage, compliance, and how to get started.',
  canonical: '/en/faq',
});

export default function Page() {
  return <FaqEnContent />;
}
