import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PrivacyContent } from '@/components/pages/PrivacyContent';

export const metadata: Metadata = buildMetadata({
  title: '隐私政策 — DataScaler',
  description:
    '了解 DataScaler 收集哪些数据、如何使用第三方 AI 服务、数据留存方式、用户权利和安全措施。',
  canonical: '/privacy',
});

export default function Page() {
  return <PrivacyContent />;
}
