import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FaqContent } from '@/components/pages/FaqContent';

export const metadata: Metadata = buildMetadata({
  title: '常见问题 | DataScaler',
  description:
    '了解 DataScaler 的数据来源、平台覆盖、AI 结论核验方式、使用流程和套餐规则。',
  canonical: '/faq',
});

export default function Page() {
  return <FaqContent />;
}
