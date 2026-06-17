import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { TermsEnContent } from '@/components/pages/TermsEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service — DataScaler',
  description:
    'DataScaler Terms of Service: service definition, IP, acceptable use, limitation of liability, and data compliance.',
  canonical: '/en/terms',
});

export default function Page() {
  return <TermsEnContent />;
}
