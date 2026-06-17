import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { Where } from 'payload';
import { buildMetadata } from '@/lib/seo';
import { getPayloadClient } from '@/lib/payload';
import { annotateHeadingsAndExtractToc, extractSidebarCtas, type LexicalDoc } from '@/lib/lexical';
import { formatPostDate } from '@/lib/format';
import { PricingHeader } from '@/components/PricingHeader';
import { PricingFooter } from '@/components/PricingFooter';
import { ArticleToc } from '@/components/blog/ArticleToc';
import { RichTextRenderer } from '@/components/blog/RichTextRenderer';
import { CtaBlock } from '@/components/blog/CtaBlock';
import type { Media, Post } from '@/payload-types';

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
  const { doc: contentWithoutSidebar, ctas: sidebarCtas } = extractSidebarCtas(
    post.content as unknown as LexicalDoc,
  );
  const { doc, toc } = annotateHeadingsAndExtractToc(contentWithoutSidebar);
  const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null;

  const labels =
    lang === 'en'
      ? { back: 'All articles', toc: 'On this page', by: 'By' }
      : { back: '返回文章列表', toc: '本页目录', by: '' };
  const backHref = lang === 'en' ? '/en/blog' : '/blog';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PricingHeader forceLang={lang} />

      {/* Hero */}
      <header className="border-b border-white/5 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-12 pb-10">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {labels.back}
          </Link>

          <div className="mb-5 flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              {post.category}
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-white/10">
              {post.tag}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[56px] leading-[1.12] font-bold tracking-tight text-white max-w-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
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
            href={post.heroImageHref || 'https://app.datascaler.ai/plans'}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto block w-[70%] max-w-5xl mt-2 mb-2 overflow-hidden rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.url}
              alt={hero.alt || post.title}
              className="w-full h-auto block hover:opacity-95 transition-opacity"
            />
          </a>
        )}
      </header>

      {/* Body — article left, sticky TOC right */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          {/* Mobile TOC */}
          {toc.length > 0 && (
            <details className="lg:hidden mb-8 rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <summary className="text-xs uppercase tracking-wider text-slate-400 font-semibold cursor-pointer">
                {labels.toc}
              </summary>
              <ul className="mt-3 space-y-2">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                    <a
                      href={`#${item.id}`}
                      className="block text-xs text-slate-400 hover:text-emerald-400 transition-colors leading-relaxed"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Article — left aligned */}
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

          {/* Right rail — sticky TOC + sidebar CTAs (desktop) */}
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

      <PricingFooter forceLang={lang} />
    </div>
  );
}
