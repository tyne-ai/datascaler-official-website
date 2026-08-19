import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ProductExperiencePage } from '@/components/pages/ProductExperiencePage';

export const metadata: Metadata = buildMetadata({
  title: 'Playground — 输入品牌名看海外舆情 | DataScaler 免费试用',
  description:
    '输入品牌名，免费看一份海外舆情预览：全渠道声量、情感、竞品对比、逐条溯源。无需绑卡，完整报告注册后生成。',
  canonical: '/playground',
});

export default function Page() {
  return <ProductExperiencePage lang="zh" />;
}
