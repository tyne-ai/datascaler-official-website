import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactContent } from '@/components/pages/ContactContent';

export const metadata: Metadata = buildMetadata({
  title: '联系我们 — 预约 DataScaler 专家演示 | 出海品牌情报咨询',
  description:
    '预约 DataScaler 专家演示，或咨询出海品牌情报、定制方案与战略合作。一个工作日内回复。带着真实业务问题来聊，不做泛产品演示。',
  canonical: '/contact',
});

export default function Page() {
  return <ContactContent />;
}
