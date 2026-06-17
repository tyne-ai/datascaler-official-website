'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { setLocaleCookie } from '@/lib/i18n';

export function PricingFooter({ forceLang }: { forceLang?: 'zh' | 'en' } = {}) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const isEn =
    forceLang === 'en' ||
    (forceLang === undefined && (pathname === '/en' || pathname.startsWith('/en/')));

  const handleLangSwitch = () => {
    // 记住手动选择,让 middleware 后续以 cookie 为准,不再按 Accept-Language 跳转。
    setLocaleCookie(isEn ? 'zh' : 'en');
    const path = pathname;
    if (path.includes('/privacy')) router.push(isEn ? '/privacy' : '/en/privacy');
    else if (path.includes('/terms')) router.push(isEn ? '/terms' : '/en/terms');
    else if (path.includes('/contact')) router.push(isEn ? '/contact' : '/en/contact');
    else if (path.includes('/faq')) router.push(isEn ? '/faq' : '/en/faq');
    else if (path.includes('/pricing')) router.push(isEn ? '/pricing' : '/en/pricing');
    else if (path.includes('/blog')) router.push(isEn ? '/blog' : '/en/blog');
    else router.push(isEn ? '/' : '/en');
  };

  const data = isEn
    ? {
        tagline: 'AI-Powered Brand Competitive Intelligence Engine',
        col2: {
          title: 'Intelligence Services',
          links: [
            { label: 'Pricing Plans', href: '/en/pricing' },
            { label: 'Blog', href: '/en/blog' },
            { label: 'FAQ', href: '/en/faq' },
          ],
        },
        col3: {
          title: 'Expert Support',
          links: [
            { label: 'Contact Us', href: '/en/contact' },
            { label: 'Book Expert Demo', href: '/en/contact' },
          ],
        },
        col4: {
          title: 'Compliance & Legal',
          links: [
            { label: 'Terms of Service', href: '/en/terms' },
            { label: 'Privacy Policy', href: '/en/privacy' },
          ],
        },
      }
    : {
        tagline: 'AI 驱动的品牌竞品情报引擎',
        col2: {
          title: '情报服务',
          links: [
            { label: '定价方案', href: '/pricing' },
            { label: '博客', href: '/blog' },
            { label: '常见问题', href: '/faq' },
          ],
        },
        col3: {
          title: '专家支持',
          links: [
            { label: '联系我们', href: '/contact' },
            { label: '预约专家演示', href: '/contact' },
          ],
        },
        col4: {
          title: '合规与法律',
          links: [
            { label: '服务协议', href: '/terms' },
            { label: '隐私政策', href: '/privacy' },
          ],
        },
      };

  const linkClass =
    'block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-2 leading-loose';

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={isEn ? '/en' : '/'} aria-label="DataScaler home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo_text.png" alt="DataScaler" className="h-8 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-[240px]">{data.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{data.col2.title}</h4>
            {data.col2.links.map((l) => (
              <Link key={l.label} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{data.col3.title}</h4>
            {data.col3.links.map((l) => (
              <Link key={l.label} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{data.col4.title}</h4>
            {data.col4.links.map((l) => (
              <Link key={l.label} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">&copy; 2026 DataScaler. All rights reserved.</p>
          <button
            onClick={handleLangSwitch}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200"
          >
            <Globe className="h-3 w-3" />
            {isEn ? '中文' : 'English'}
          </button>
        </div>
      </div>
    </footer>
  );
}
