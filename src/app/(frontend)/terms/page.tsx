import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { TermsContent } from '@/components/pages/TermsContent';

export const metadata: Metadata = buildMetadata({
  title: '服务协议 — DataScaler',
  description:
    'DataScaler 服务条款：服务定义、知识产权、用户行为准则、责任限制与数据合规说明。',
  canonical: '/terms',
});

export default function Page() {
  return <TermsContent />;
}
