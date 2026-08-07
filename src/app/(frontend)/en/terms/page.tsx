import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { TermsEnContent } from '@/components/pages/TermsEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service — DataScaler',
  description:
    'Review the DataScaler service terms, including acceptable use, intellectual property, data use, disclaimers, and liability limits.',
  canonical: '/en/terms',
});

export default function Page() {
  return <TermsEnContent />;
}
