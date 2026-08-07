import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PricingContent } from '@/components/pages/PricingContent';

export const metadata: Metadata = buildMetadata({
  title: '价格与套餐 | DataScaler',
  description:
    '从免费版开始，再按品牌数、报告数、账号数和数据用量选择 DataScaler 套餐。查看完整价格和积分规则。',
  canonical: '/pricing',
});

export default function Page() {
  return <PricingContent />;
}
