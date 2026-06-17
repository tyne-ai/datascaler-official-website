import type { Metadata } from 'next';

import { hasEnVersion, pathLocale, toEnPath, toZhPath } from './i18n';
import { SITE_URL, absoluteUrl } from './site';

interface BuildMetadataInput {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
  lang?: 'zh-CN' | 'en';
  image?: string;
  /** SEO/social overrides (used by blog posts) */
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogType = 'website',
  image,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  noIndex,
}: BuildMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(canonical);
  const finalOgImage = ogImage || image || `${SITE_URL}/logo_text.png`;
  const finalOgImageAbs = absoluteUrl(finalOgImage);
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;

  // hreflang 互链：仅当该路径存在中英双语版本时，向搜索引擎声明对应语言 URL，
  // 让 zh / en 两套页面被识别为同一内容的不同语言版本(避免被判重复内容)。
  // 只有中文版的路径(如博客详情页)不输出 languages，仅保留 canonical。
  const isEnCanonical = pathLocale(canonical) === 'en';
  const zhPath = isEnCanonical ? toZhPath(canonical) : canonical;
  const enPath = isEnCanonical ? canonical : toEnPath(canonical);
  const alternates: NonNullable<Metadata['alternates']> = { canonical: canonicalUrl };
  if (hasEnVersion(zhPath)) {
    alternates.languages = {
      'zh-CN': absoluteUrl(zhPath),
      en: absoluteUrl(enPath),
      // 语言都不匹配时兜底英文(面向海外，与 proxy 的重定向默认保持一致)
      'x-default': absoluteUrl(enPath),
    };
  }

  const meta: Metadata = {
    title,
    description,
    alternates,
    openGraph: {
      title: finalOgTitle,
      description: finalOgDescription,
      url: canonicalUrl,
      type: ogType,
      siteName: 'DataScaler',
      images: [{ url: finalOgImageAbs }],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalOgTitle,
      description: finalOgDescription,
      images: [finalOgImageAbs],
    },
  };

  if (keywords) meta.keywords = keywords;
  if (noIndex) meta.robots = { index: false, follow: false };

  return meta;
}
