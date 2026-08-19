import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getPayloadClient } from '@/lib/payload';
import { BlogListView } from '@/components/blog/BlogListView';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/site';
import type { Post } from '@/payload-types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — Brand Intelligence, Social Listening & Competitor Signals | DataScaler',
  description:
    'Research, benchmarks, and decision-ready perspectives on brand intelligence, social listening, and competitive signals for global ecommerce brands. Updated weekly.',
  canonical: '/en/blog',
});

export default async function BlogEnPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { lang: { equals: 'en' } },
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
          name: 'DataScaler Brand Intelligence Blog',
          url: absoluteUrl('/en/blog'),
          inLanguage: 'en',
          blogPost: posts.filter((post) => post.slug).map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.publishedDate,
            author: { '@type': 'Organization', name: post.author || 'DataScaler Research' },
          })),
        }}
      />
      <BlogListView posts={posts} lang="en" />
    </>
  );
}
