import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { TermsContent } from '@/components/pages/TermsContent';

export const metadata: Metadata = buildMetadata({
  title: '服务协议 — DataScaler',
  description:
    '了解 DataScaler 的服务范围、可接受的使用方式、知识产权、数据使用和责任限制。',
  canonical: '/terms',
});

export default function Page() {
  return <TermsContent />;
}
