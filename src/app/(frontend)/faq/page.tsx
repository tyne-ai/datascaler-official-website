import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FaqContent } from '@/components/pages/FaqContent';

export const metadata: Metadata = buildMetadata({
  title: '常见问题 FAQ — DataScaler AI 市场情报',
  description:
    'DataScaler 常见问题：数据来源、AI 准确性与证据链、平台覆盖、合规性与购买流程。出海品牌使用前必读。',
  canonical: '/faq',
});

export default function Page() {
  return <FaqContent />;
}
