import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FaqContent } from '@/components/pages/FaqContent';
import { FAQ_COPY } from '@/components/pages/CleanFaqPage';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '常见问题 — DataScaler 出海品牌舆情工具 FAQ',
  description:
    'DataScaler FAQ：覆盖哪些平台、数据多久更新、如何防止 AI 幻觉、合规性如何、适合哪些团队。出海品牌使用前必读。',
  canonical: '/faq',
});

export default function Page() {
  const mainEntity = FAQ_COPY.zh.groups.flatMap((group) =>
    group.items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  );

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }} />
      <FaqContent />
    </>
  );
}
