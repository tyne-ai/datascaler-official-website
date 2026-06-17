import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { EnIndexContent } from '@/components/pages/EnIndexContent';

export const metadata: Metadata = buildMetadata({
  title: 'DataScaler AI — AI Market Intelligence for Global Brands',
  description:
    'AI-powered competitive intelligence with 100% traceable insights from TikTok, YouTube, Reddit and more. Built for global DTC brands. Free plan — no credit card required.',
  canonical: '/en',
});

export default function Page() {
  return <EnIndexContent />;
}
