import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactEnContent } from '@/components/pages/ContactEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | DataScaler',
  description:
    'Talk with the DataScaler team about a product walkthrough, enterprise plans, API access, or partnerships.',
  canonical: '/en/contact',
});

export default function Page() {
  return <ContactEnContent />;
}
