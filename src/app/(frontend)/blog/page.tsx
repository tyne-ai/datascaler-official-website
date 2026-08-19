import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getPayloadClient } from '@/lib/payload';
import { BlogListView } from '@/components/blog/BlogListView';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/site';
import type { Post } from '@/payload-types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: '博客 — 出海品牌情报、社媒舆情与竞品信号研究 | DataScaler',
  description: 'DataScaler 团队关于出海品牌情报、社媒舆情基准与竞品信号的研究与决策洞察。每周更新。',
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
  const posts = docs as Post[];
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'DataScaler 出海品牌情报博客',
          url: absoluteUrl('/blog'),
          inLanguage: 'zh-CN',
          blogPost: posts.filter((post) => post.slug).map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.publishedDate,
            author: { '@type': 'Organization', name: post.author || 'DataScaler Research' },
          })),
        }}
      />
      <BlogListView posts={posts} lang="zh" />
    </>
  );
}
