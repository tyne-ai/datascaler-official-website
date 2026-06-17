import type { MetadataRoute } from 'next';

import { getPayloadClient } from '@/lib/payload';
import { absoluteUrl } from '@/lib/site';
import type { Post } from '@/payload-types';

// The sitemap must reflect the live database, not the empty placeholder DB used
// during `next build`. Render at request time so newly published posts appear.
export const dynamic = 'force-dynamic';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

interface StaticRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

// Static marketing pages — zh at root, en under /en. These mirror the per-page
// `canonical` values declared in each route's metadata.
const STATIC_ROUTES: StaticRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/en', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/en/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/en/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/en/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/en/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/en/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/en/privacy', changeFrequency: 'yearly', priority: 0.3 },
];

// One sitemap file may hold up to 50,000 URLs (sitemaps.org limit). Far beyond
// the marketing blog's needs, but bounds the query rather than fetching blindly.
const MAX_POSTS = 50_000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [{ status: { equals: 'published' } }, { _status: { equals: 'published' } }],
    },
    sort: '-publishedDate',
    depth: 0,
    limit: MAX_POSTS,
  });

  const postEntries: MetadataRoute.Sitemap = (docs as Post[])
    // Skip posts flagged noindex — they must not appear in search.
    .filter((post) => Boolean(post.slug) && !post.seo?.noIndex)
    .map((post) => ({
      // Posts of both languages live at /blog/<slug>; honour a custom canonical
      // when an author set one so the sitemap matches the page's canonical tag.
      url: absoluteUrl(post.seo?.canonical || `/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt || post.publishedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...postEntries];
}
