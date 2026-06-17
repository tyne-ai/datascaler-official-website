import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PricingContent } from '@/components/pages/PricingContent';

export const metadata: Metadata = buildMetadata({
  title: '定价方案 — DataScaler AI 市场情报订阅',
  description:
    'DataScaler 订阅方案：Free、Pro、Team、Enterprise 四档，按 Credit 计费。永久免费版无需绑卡，可溯源 AI 洞察。查看完整定价与配额。',
  canonical: '/pricing',
});

export default function Page() {
  return <PricingContent />;
}
