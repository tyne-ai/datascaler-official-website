import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

// Read SITE_URL at request time so the Sitemap directive stays an absolute URL
// matching whatever origin the site is served from.
export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    // Must be a fully-qualified URL — a relative `Sitemap: /sitemap.xml` is
    // invalid per the robots.txt spec and ignored by crawlers.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
