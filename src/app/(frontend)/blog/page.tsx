import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getPayloadClient } from '@/lib/payload';
import { BlogListView } from '@/components/blog/BlogListView';
import type { Post } from '@/payload-types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: '博客 — DataScaler 品牌情报洞察',
  description: 'DataScaler 团队关于品牌情报、社媒舆情与竞品信号的研究、基准与决策洞察。',
  canonical: '/blog',
});

export default async function BlogZhPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { lang: { equals: 'zh' } },
        { status: { equals: 'published' } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedDate',
    limit: 100,
    depth: 1,
  });
  return <BlogListView posts={docs as Post[]} lang="zh" />;
}
