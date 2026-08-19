import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactEnContent } from '@/components/pages/ContactEnContent';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Demo — Brand Intelligence Expert Consult | DataScaler',
  description:
    'Book a 30-minute DataScaler demo focused on your real market question—or reach out about custom plans, MCP integration, and partnerships. One business day response.',
  canonical: '/en/contact',
});

export default function Page() {
  return <ContactEnContent />;
}
