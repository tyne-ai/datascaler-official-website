import type { Metadata } from 'next';

import { ProductExperiencePage } from '@/components/pages/ProductExperiencePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Bambu Lab 品牌洞察示例报告 | DataScaler',
  description:
    '查看 DataScaler 如何从公开讨论中提取品牌洞察、核验原始来源，并通过 AI 追问生成行动建议。',
  canonical: '/sample/bambu-lab',
});

export default function Page() {
  return <ProductExperiencePage lang="zh" sampleOnly />;
}
