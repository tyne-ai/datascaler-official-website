import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PrivacyEnContent } from '@/components/pages/PrivacyEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — DataScaler',
  description:
    'Learn what information DataScaler collects, how third-party AI services are used, how long data is retained, and what privacy choices are available.',
  canonical: '/en/privacy',
});

export default function Page() {
  return <PrivacyEnContent />;
}
