import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PrivacyContent } from '@/components/pages/PrivacyContent';

export const metadata: Metadata = buildMetadata({
  title: '隐私政策 — DataScaler',
  description:
    'DataScaler 隐私政策：数据极简采集、零知识训练、身份脱敏、即用即焚与 GDPR/CCPA 合规说明。',
  canonical: '/privacy',
});

export default function Page() {
  return <PrivacyContent />;
}
