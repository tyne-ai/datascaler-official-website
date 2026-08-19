import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FaqEnContent } from '@/components/pages/FaqEnContent';
import { FAQ_COPY } from '@/components/pages/CleanFaqPage';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ — Social Listening Accuracy, Sources & Compliance | DataScaler',
  description:
    'DataScaler FAQ: which platforms we cover, how often data refreshes, how we prevent AI hallucination, compliance, and which teams use it. Read before you start.',
  canonical: '/en/faq',
});

export default function Page() {
  const mainEntity = FAQ_COPY.en.groups.flatMap((group) =>
    group.items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  );

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }} />
      <FaqEnContent />
    </>
  );
}
