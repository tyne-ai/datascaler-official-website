import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactEnContent } from '@/components/pages/ContactEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us — DataScaler Expert Demo & Inquiries',
  description:
    'Book a DataScaler expert demo or reach out about brand intelligence, custom plans, and partnerships. We respond within one business day.',
  canonical: '/en/contact',
});

export default function Page() {
  return <ContactEnContent />;
}
