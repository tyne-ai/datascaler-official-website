import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { IndexContent } from '@/components/pages/IndexContent';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler AI | 从全球用户声音中发现增长信号',
  description:
    '分析海外社媒、社区与评论中的公开讨论，识别真实需求、信任缺口与潜在风险。',
  canonical: '/',
});

export default function Page() {
  return <IndexContent />;
}
