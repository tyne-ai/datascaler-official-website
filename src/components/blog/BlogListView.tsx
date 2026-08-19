import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

import { CleanSectionLabel, CleanSitePage } from '@/components/CleanSiteChrome';
import { formatPostDate } from '@/lib/format';
import { STATIC_BLOG_EXAMPLE_CARD, STATIC_BLOG_EXAMPLE_SLUG } from '@/lib/static-blog';
import type { Post } from '@/payload-types';

interface BlogListViewProps {
  posts: Post[];
  lang: 'zh' | 'en';
}

const COPY = {
  zh: {
    kicker: 'DataScaler Journal',
    title: '关于品牌、市场与真实消费者信号。',
    sub: '研究、方法与可直接带进决策会议的市场观察。',
    read: '阅读全文',
    empty: '暂无文章。',
    latest: '最新研究',
  },
  en: {
    kicker: 'DataScaler Journal',
    title: 'Brands, markets and real consumer signals.',
    sub: 'Research, methods and market observations ready for the decision room.',
    read: 'Read article',
    empty: 'No articles yet.',
    latest: 'Latest research',
  },
};

export function BlogListView({ posts, lang }: BlogListViewProps) {
  const t = COPY[lang];
  const sample = STATIC_BLOG_EXAMPLE_CARD[lang];
  const cards = [
    sample,
    ...posts
      .filter((post) => post.slug !== STATIC_BLOG_EXAMPLE_SLUG)
      .map((post) => ({
        id: String(post.id),
        href: `/blog/${post.slug}`,
        title: post.title,
        category: post.category,
        tag: post.tag,
        excerpt: post.excerpt,
        publishedDate: post.publishedDate,
        readTime: post.readTime,
      })),
  ];

  return (
    <CleanSitePage lang={lang}>
      <main>
        <header className="border-b border-[#3d2673] bg-[radial-gradient(circle_at_50%_10%,#d8c8ff_0%,#eee7ff_42%,#fbf9ff_82%)] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <CleanSectionLabel>{t.kicker}</CleanSectionLabel>
            <h1 className="mt-7 max-w-[980px] text-balance text-[clamp(40px,6.5vw,76px)] font-black leading-[0.98] tracking-[-0.055em] text-[#24133f]">
              {t.title}
            </h1>
            <p className="mt-7 max-w-[640px] text-base leading-7 text-[#24133f]/60 sm:text-lg">{t.sub}</p>
          </div>
        </header>

        <section className="border-b border-[#3d2673] bg-white px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-8 flex items-center justify-between border-b border-[#3d2673] pb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.14em] text-[#24133f]/45">{t.latest}</h2>
              <span className="text-xs font-black text-[#24133f]/35">{String(cards.length).padStart(2, '0')} articles</span>
            </div>

            {cards.length === 0 ? (
              <p className="py-16 text-[#24133f]/50">{t.empty}</p>
            ) : (
              <div className="border-l border-t border-[#3d2673] md:grid md:grid-cols-2">
                {cards.map((post, index) => (
                  <Link
                    key={post.id}
                    href={post.href}
                    className={`group flex min-h-[330px] flex-col border-b border-r border-[#3d2673] p-7 transition-colors sm:p-9 ${
                      index === 0 ? 'bg-[#f5ff63]' : index === 1 ? 'bg-[#d8c8ff]' : 'bg-white hover:bg-[#f4f0fa]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="border border-[#3d2673] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#24133f]">
                          {post.category}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#24133f]/45">{post.tag}</span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <h3 className="mt-10 max-w-[620px] text-[clamp(22px,2.7vw,34px)] font-black leading-[1.08] tracking-[-0.04em] text-[#24133f]">
                      {post.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 max-w-[62ch] text-sm leading-6 text-[#24133f]/60">{post.excerpt}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-5 pt-8 text-[10px] font-bold uppercase tracking-[0.08em] text-[#24133f]/45">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {formatPostDate(post.publishedDate, lang)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {post.readTime}
                      </span>
                      <span className="ml-auto text-[#24133f]">{t.read}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </CleanSitePage>
  );
}
