import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactContent } from '@/components/pages/ContactContent';

export const metadata: Metadata = buildMetadata({
  title: '联系我们 | DataScaler',
  description:
    '联系 DataScaler 了解产品演示、企业套餐、API 接入与合作方案。',
  canonical: '/contact',
});

export default function Page() {
  return <ContactContent />;
}
