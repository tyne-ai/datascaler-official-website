/**
 * Canonical public origin for the marketing site — single source of truth.
 *
 * Resolved from NEXT_PUBLIC_SITE_URL when set (e.g. http://localhost:3200 in
 * dev, or an explicit staging/production origin), falling back to the
 * production domain. Page canonicals (lib/seo.ts), <metadataBase> (frontend
 * layout), the sitemap and robots.txt all read from here so they emit the
 * exact same absolute URLs — search engines flag a sitemap URL that doesn't
 * match the page's canonical tag.
 */
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://datascaler.ai';

/** Origin without a trailing slash, e.g. `https://datascaler.ai`. */
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

/** Resolve a relative path to an absolute URL; absolute URLs pass through. */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}
