import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PrivacyEnContent } from '@/components/pages/PrivacyEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — DataScaler',
  description:
    'DataScaler Privacy Policy: data minimization, zero-knowledge training, anonymized AI processing, process-and-delete retention, and GDPR/CCPA compliance.',
  canonical: '/en/privacy',
});

export default function Page() {
  return <PrivacyEnContent />;
}
