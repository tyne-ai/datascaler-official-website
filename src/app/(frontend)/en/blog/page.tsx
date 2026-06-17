import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getPayloadClient } from '@/lib/payload';
import { BlogListView } from '@/components/blog/BlogListView';
import type { Post } from '@/payload-types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — DataScaler Brand Intelligence',
  description:
    'Research, benchmarks, and decision-ready perspectives on brand intelligence, social listening, and competitive signal.',
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
  return <BlogListView posts={docs as Post[]} lang="en" />;
}
