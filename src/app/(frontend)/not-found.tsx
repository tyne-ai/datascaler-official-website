import Link from 'next/link';
import { headers } from 'next/headers';
import { ArrowRight } from 'lucide-react';
import { pathLocale } from '@/lib/i18n';
import { CleanSectionLabel, CleanSitePage } from '@/components/CleanSiteChrome';

export default async function NotFound() {
  // 与 layout 一致:middleware 注入的 x-pathname 决定当前语言,页头/页脚/文案随之切换。
  const pathname = (await headers()).get('x-pathname') ?? '/';
  const isEn = pathLocale(pathname) === 'en';
  const lang = isEn ? 'en' : 'zh';
  const homeHref = isEn ? '/en' : '/';
  const t = isEn
    ? {
        eyebrow: 'Error 404',
        title: 'Page not found',
        body: "Sorry, the page you are looking for doesn't exist or has been moved.",
        home: 'Back home',
      }
    : {
        eyebrow: '错误 404',
        title: '页面未找到',
        body: '抱歉，您访问的页面不存在或已被移动。',
        home: '返回首页',
      };

  return (
    <CleanSitePage lang={lang}>
      <main className="relative overflow-hidden border-b border-[#3d2673] bg-[radial-gradient(circle_at_50%_20%,#d8c8ff_0%,#eee7ff_40%,#fbf9ff_80%)] px-5 py-28 lg:px-8 lg:py-40">
        <div className="pointer-events-none absolute left-[8%] top-24 hidden h-20 w-20 rounded-full bg-[#f5ff63] opacity-95 blur-[1px] sm:block" />
        <div className="pointer-events-none absolute right-[10%] top-40 hidden h-12 w-12 rotate-12 border border-[#7047eb]/35 bg-white/45 sm:block" />
        <div className="relative mx-auto flex max-w-[820px] flex-col items-center text-center">
          <CleanSectionLabel>{t.eyebrow}</CleanSectionLabel>
          <p className="mt-7 text-[clamp(64px,12vw,140px)] font-black leading-[0.9] tracking-[-0.06em] text-[#24133f]">
            404
          </p>
          <h1 className="mt-2 text-[clamp(24px,3.4vw,40px)] font-black tracking-[-0.04em] text-[#24133f]">
            {t.title}
          </h1>
          <p className="mt-5 max-w-[520px] text-base leading-7 text-[#24133f]/60">
            {t.body}
          </p>
          <Link
            href={homeHref}
            className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#7047eb] px-7 text-sm font-extrabold text-white shadow-[0_12px_34px_rgba(112,71,235,0.3)] transition-transform hover:-translate-y-0.5"
          >
            {t.home}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </CleanSitePage>
  );
}
