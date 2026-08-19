import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { Where } from 'payload';
import { buildMetadata } from '@/lib/seo';
import { getPayloadClient } from '@/lib/payload';
import { annotateHeadingsAndExtractToc, extractSidebarCtas, type LexicalDoc } from '@/lib/lexical';
import { formatPostDate } from '@/lib/format';
import { CleanSitePage } from '@/components/CleanSiteChrome';
import { JsonLd } from '@/components/JsonLd';
import { ArticleToc } from '@/components/blog/ArticleToc';
import { RichTextRenderer } from '@/components/blog/RichTextRenderer';
import { CtaBlock } from '@/components/blog/CtaBlock';
import { getSignUpUrl, resolveMarketingCtaUrl } from '@/lib/app-links';
import type { Media, Post } from '@/payload-types';
import { absoluteUrl, SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

async function getPost(slug: string, preview = false): Promise<Post | null> {
  const payload = await getPayloadClient();
  const where: Where = preview
    ? { slug: { equals: slug } }
    : {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
          { _status: { equals: 'published' } },
        ],
      };
  const { docs } = await payload.find({
    collection: 'posts',
    where,
    draft: preview,
    limit: 1,
    depth: 2,
  });
  return (docs[0] as Post) ?? null;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const post = await getPost(slug, preview === 'true');
  if (!post) return buildMetadata({ title: 'Article not found', description: '', canonical: `/blog/${slug}` });
  const seo = post.seo ?? {};
  const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null;
  const ogImageMedia = typeof seo.ogImage === 'object' ? (seo.ogImage as Media) : null;
  return buildMetadata({
    title: seo.metaTitle || post.title,
    description: seo.metaDescription || post.excerpt,
    canonical: seo.canonical || `/blog/${post.slug}`,
    ogType: 'article',
    image: hero?.url ?? undefined,
    keywords: seo.metaKeywords ?? undefined,
    ogTitle: seo.ogTitle ?? undefined,
    ogDescription: seo.ogDescription ?? undefined,
    ogImage: ogImageMedia?.url ?? undefined,
    noIndex: seo.noIndex ?? false,
  });
}

export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === 'true';
  const post = await getPost(slug, isPreview);
  if (!post) notFound();

  const lang = post.lang === 'en' ? 'en' : 'zh';
  // Both languages are served from this single /blog/<slug> route (chrome follows post.lang),
  // so the toggle just points at the linked translation's slug. Unset → falls back to the list.
  const translation =
    post.translation && typeof post.translation === 'object'
      ? (post.translation as Post)
      : null;
  const languageHref = translation?.slug ? `/blog/${translation.slug}` : undefined;
  const { doc: contentWithoutSidebar, ctas: sidebarCtas } = extractSidebarCtas(
    post.content as unknown as LexicalDoc,
  );
  const { doc, toc } = annotateHeadingsAndExtractToc(contentWithoutSidebar);
  const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null;
  const heroImageHref = resolveMarketingCtaUrl(
    post.heroImageHref || getSignUpUrl(lang),
    lang,
  );

  const labels =
    lang === 'en'
      ? { back: 'All articles', toc: 'On this page', by: 'By' }
      : { back: '返回文章列表', toc: '本页目录', by: '' };
  const backHref = lang === 'en' ? '/en/blog' : '/blog';
  const canonical = post.seo?.canonical || `/blog/${post.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(canonical),
    mainEntityOfPage: absoluteUrl(canonical),
    image: absoluteUrl(hero?.url || '/logo_text.png'),
    datePublished: post.publishedDate,
    dateModified: post.updatedAt || post.publishedDate,
    inLanguage: lang === 'en' ? 'en' : 'zh-CN',
    author: {
      '@type': 'Person',
      name: post.author || 'DataScaler Research',
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'en' ? 'Home' : '首页',
        item: absoluteUrl(lang === 'en' ? '/en' : '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'en' ? 'Blog' : '博客',
        item: absoluteUrl(backHref),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: absoluteUrl(canonical),
      },
    ],
  };

  return (
    <>
    <JsonLd data={[articleSchema, breadcrumbSchema]} />
    <CleanSitePage lang={lang} languageHref={languageHref}>
      <main>
        <header className="border-b border-[#3d2673] bg-[radial-gradient(circle_at_50%_10%,#d8c8ff_0%,#eee7ff_42%,#fbf9ff_82%)] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
          <Link
            href={backHref}
              className="mb-9 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.1em] text-[#24133f]/50 hover:text-[#24133f]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {labels.back}
          </Link>

            <div className="mb-6 flex items-center gap-2">
              <span className="border border-[#3d2673] bg-[#f5ff63] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#24133f]">
              {post.category}
            </span>
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#24133f]/45">
              {post.tag}
            </span>
          </div>

            <h1 className="max-w-[1050px] text-balance text-[clamp(42px,6vw,76px)] font-black leading-[0.99] tracking-[-0.06em] text-[#24133f]">
            {post.title}
          </h1>

            <p className="mt-7 max-w-3xl text-base leading-7 text-[#24133f]/60 md:text-lg">
            {post.excerpt}
          </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#3d2673]/20 pt-5 text-[10px] font-black uppercase tracking-[0.08em] text-[#24133f]/45">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {formatPostDate(post.publishedDate, lang)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
            {post.author && (
              <span>
                {labels.by ? `${labels.by} ` : ''}
                {post.author}
              </span>
            )}
          </div>
          </div>

        {hero?.url && (
          <a
            href={heroImageHref}
            target="_blank"
            rel="noopener noreferrer"
              className="mx-auto mt-12 block max-w-[1040px] overflow-hidden border border-[#3d2673] bg-white p-2 shadow-[10px_10px_0_#f5ff63]"
          >
              <Image
              src={hero.url}
              alt={hero.alt || post.title}
                width={hero.width || 1600}
                height={hero.height || 900}
                sizes="(max-width: 1100px) 100vw, 1040px"
                unoptimized
                className="block h-auto w-full"
            />
          </a>
        )}
      </header>

        <div className="bg-white px-5 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1180px] lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          {toc.length > 0 && (
              <details className="mb-10 border border-[#3d2673] bg-[#f4f0fa] p-4 lg:hidden">
                <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.12em] text-[#24133f]/55">
                {labels.toc}
              </summary>
              <ul className="mt-3 space-y-2">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                    <a
                      href={`#${item.id}`}
                        className="block text-xs font-semibold leading-relaxed text-[#24133f]/55 hover:text-[#24133f]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

            <article className="prose-article max-w-3xl">
            <RichTextRenderer data={doc} lang={lang} />

            {/* Sidebar CTAs fall to the end of the article on mobile */}
            {sidebarCtas.length > 0 && (
              <div className="mt-12 space-y-6 lg:hidden">
                {sidebarCtas.map((cta, i) => (
                  <CtaBlock key={`m-${i}`} variant="sidebar" lang={lang} {...cta} />
                ))}
              </div>
            )}
          </article>

          {(toc.length > 0 || sidebarCtas.length > 0) && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {toc.length > 0 && <ArticleToc items={toc} label={labels.toc} />}
                {sidebarCtas.map((cta, i) => (
                  <CtaBlock key={`s-${i}`} variant="sidebar" lang={lang} {...cta} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
      </main>
    </CleanSitePage>
    </>
  );
}
