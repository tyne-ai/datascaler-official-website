import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { PricingHeader } from '@/components/PricingHeader';
import { PricingFooter } from '@/components/PricingFooter';
import { formatPostDate } from '@/lib/format';
import type { Post } from '@/payload-types';

interface BlogListViewProps {
  posts: Post[];
  lang: 'zh' | 'en';
}

const COPY = {
  zh: {
    kicker: 'DataScaler 博客',
    title: '品牌情报、社交聆听与竞争信号的洞察',
    sub: '来自 DataScaler 团队的研究、基准与可直接用于决策的视角。',
    read: '阅读全文',
    empty: '暂无文章。',
  },
  en: {
    kicker: 'DataScaler Blog',
    title: 'Insights on brand intelligence, social listening, and competitive signal',
    sub: 'Research, benchmarks, and decision-ready perspectives from the DataScaler team.',
    read: 'Read article',
    empty: 'No articles yet.',
  },
};

export function BlogListView({ posts, lang }: BlogListViewProps) {
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PricingHeader />

      <header className="border-b border-white/5 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            {t.kicker}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{t.title}</h1>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl">{t.sub}</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        {posts.length === 0 ? (
          <p className="text-slate-500">{t.empty}</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group block rounded-2xl border border-white/10 bg-slate-900/40 p-8 hover:bg-slate-900/80 hover:border-emerald-500/30 transition-all"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                    {p.category}
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-white/10">
                    {p.tag}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                  {p.title}
                </h2>
                <p className="mt-3 text-slate-400 leading-relaxed">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {formatPostDate(p.publishedDate, lang)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {p.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.read} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <PricingFooter />
    </div>
  );
}
