import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { IndexContent } from '@/components/pages/IndexContent';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler AI | 出海品牌 AI 市场舆情与增长引擎',
  description:
    'DataScaler 提供 100% 可溯源的 AI 市场洞察。AI Assistant 深度分析 TikTok、YouTube、Reddit 等社媒舆情，结论先行、数据验证。免费版无需绑卡，注册即用。',
  canonical: '/',
});

export default function Page() {
  return <IndexContent />;
}
