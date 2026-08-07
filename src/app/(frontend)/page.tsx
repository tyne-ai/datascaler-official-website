import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { IndexContent } from '@/components/pages/IndexContent';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler | 看懂海外用户，找到增长机会',
  description:
    '汇总海外社媒、社区和评论里的公开讨论，帮出海团队看清用户需求、购买顾虑和潜在风险。每条结论都能回到原帖核验。',
  canonical: '/',
});

export default function Page() {
  return <IndexContent />;
}
