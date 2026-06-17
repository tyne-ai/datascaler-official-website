import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactContent } from '@/components/pages/ContactContent';

export const metadata: Metadata = buildMetadata({
  title: '联系我们 — DataScaler 专家演示与咨询',
  description:
    '预约 DataScaler 专家演示，或就出海品牌情报、定制方案与合作事宜与团队联系。我们将于一个工作日内回复。',
  canonical: '/contact',
});

export default function Page() {
  return <ContactContent />;
}
