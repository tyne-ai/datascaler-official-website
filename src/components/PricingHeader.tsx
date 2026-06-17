'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import { setLocaleCookie } from '@/lib/i18n';

export function PricingHeader({ forceLang }: { forceLang?: 'zh' | 'en' } = {}) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const isEn =
    forceLang === 'en' ||
    (forceLang === undefined && (pathname === '/en' || pathname.startsWith('/en/')));
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const menuItems = isEn
    ? [
        { label: 'Pricing', href: '/en/pricing' },
        { label: 'Blog', href: '/en/blog' },
        { label: 'FAQ', href: '/en/faq' },
        { label: 'Contact', href: '/en/contact' },
      ]
    : [
        { label: '定价', href: '/pricing' },
        { label: '博客', href: '/blog' },
        { label: '常见问题', href: '/faq' },
        { label: '联系我们', href: '/contact' },
      ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={isEn ? '/en' : '/'} aria-label="DataScaler home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_text.png" alt="DataScaler" className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-slate-400 hover:text-white hover:bg-white/5"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="https://app.datascaler.ai/auth/sign-up"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="rounded-full bg-[#22c55e] px-5 text-sm font-bold text-slate-950 hover:bg-[#22c55e]/85 shadow-[0_0_16px_rgba(34,197,94,0.3)]"
            >
              {isEn ? 'Get started' : '开始体验'}
            </Button>
          </a>
          <button
            onClick={handleLangSwitch}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            {isEn ? '中文' : 'EN'}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://app.datascaler.ai/auth/sign-up"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="rounded-full bg-[#22c55e] px-4 text-xs font-bold text-slate-950 hover:bg-[#22c55e]/85"
            >
              {isEn ? 'Get started' : '开始体验'}
            </Button>
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-md px-6 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-2.5 text-sm text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-white/5">
            <button
              onClick={() => {
                handleLangSwitch();
                setMobileOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              {isEn ? '切换中文' : 'Switch to English'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
