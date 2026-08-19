"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Globe2, Menu, Play, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { track } from "@/lib/analytics";
import { getPlaygroundUrl, getSignUpUrl } from "@/lib/app-links";
import { dashboardOrigin } from "@/components/playground/origin";
import {
  STATIC_BLOG_EXAMPLE_EN_PATH,
  STATIC_BLOG_EXAMPLE_ZH_PATH,
} from "@/lib/static-blog";
import { WatchDemoDialog } from "@/components/WatchDemoDialog";

export type SiteLang = "zh" | "en";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type NavItem = NavLink | { label: string; children: NavLink[] };

const NAV: Record<SiteLang, NavItem[]> = {
  zh: [
    { label: "产品", href: getPlaygroundUrl("zh") },
    {
      label: "解决方案",
      children: [
        { label: "海外社媒舆情监测", href: "/brand-monitoring" },
        { label: "社交媒体聆听", href: "/social-listening" },
      ],
    },
    { label: "MCP", href: "/mcp" },
    { label: "定价", href: "/pricing" },
    {
      label: "资源",
      children: [
        { label: "博客", href: "/blog" },
        { label: "常见问题", href: "/faq" },
        {
          label: "文档",
          href: "https://docs.datascaler.ai/cn",
          external: true,
        },
      ],
    },
  ],
  en: [
    { label: "Product", href: getPlaygroundUrl("en") },
    {
      label: "Solutions",
      children: [
        { label: "Brand Monitoring", href: "/en/brand-monitoring" },
        { label: "Social Listening", href: "/en/social-listening" },
      ],
    },
    { label: "MCP", href: "/en/mcp" },
    { label: "Pricing", href: "/en/pricing" },
    {
      label: "Resources",
      children: [
        { label: "Blog", href: "/en/blog" },
        { label: "FAQ", href: "/en/faq" },
        {
          label: "Docs",
          href: "https://docs.datascaler.ai/en",
          external: true,
        },
      ],
    },
  ],
};

function isNavGroup(
  item: NavItem,
): item is { label: string; children: NavLink[] } {
  return "children" in item;
}

export function CleanWordmark({ inverse = false }: { inverse?: boolean }) {
  if (inverse) {
    return (
      <Image src="/logo_text.png" alt="DataScaler" width={136} height={30} />
    );
  }

  return (
    <span className="relative block h-[30px] w-[136px] shrink-0">
      <Image
        src="/logo_text.png"
        alt="DataScaler"
        width={136}
        height={30}
        className="absolute inset-0 h-[30px] w-[136px] brightness-0"
      />
      <Image
        src="/logo_text.png"
        alt=""
        aria-hidden="true"
        width={136}
        height={30}
        className="absolute inset-0 h-[30px] w-[136px]"
        style={{ clipPath: "inset(0 80% 0 0)" }}
      />
    </span>
  );
}

function languageTarget(pathname: string, lang: SiteLang): string {
  if (lang === "en") {
    if (pathname === "/en") return "/";
    if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
    return "/";
  }

  if (pathname === STATIC_BLOG_EXAMPLE_ZH_PATH) {
    return STATIC_BLOG_EXAMPLE_EN_PATH;
  }
  if (pathname.startsWith("/blog/")) return "/en/blog";
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

export function CleanSiteHeader({
  lang,
  languageHref,
}: {
  lang: SiteLang;
  languageHref?: string;
}) {
  const t =
    lang === "en"
      ? {
          demo: "Watch a Demo",
          login: "Log in",
          signup: "Sign up",
          switcher: "中文",
        }
      : {
          demo: "观看演示",
          login: "登录",
          signup: "注册",
          switcher: "English",
        };
  const nav = NAV[lang];
  const pathname = usePathname() || (lang === "en" ? "/en" : "/");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const signupUrl = getSignUpUrl(lang);
  const loginUrl = `${dashboardOrigin()}/auth/sign-in?language=${lang === "en" ? "en-US" : "zh-CN"}`;

  const nextLang = lang === "en" ? "zh" : "en";
  const languageSwitchHref = `${languageHref ?? languageTarget(pathname, lang)}?lang=${nextLang}`;

  const openDemo = () => {
    track("watch_demo_click", { button_location: "header", locale: lang });
    setDemoOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#3d2673]/10 bg-[#fbf9ff]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href={lang === "en" ? "/en" : "/"} aria-label="DataScaler home">
            <CleanWordmark />
          </Link>

          <nav
            className="hidden items-center gap-5 lg:flex"
            aria-label="Main navigation"
          >
            {nav.map((item) =>
              isNavGroup(item) ? (
                <details key={item.label} className="group relative">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[13px] font-semibold text-[#24133f]/60 transition-colors hover:text-[#24133f] [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="absolute left-1/2 top-[calc(100%+14px)] z-50 w-60 -translate-x-1/2 rounded-2xl border border-[#3d2673]/10 bg-white p-2 shadow-[0_20px_55px_rgba(61,38,115,0.18)]">
                    {item.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-xl px-4 py-3 text-sm font-bold text-[#24133f]/70 transition-colors hover:bg-[#f2edff] hover:text-[#24133f]"
                        >
                          {child.label}
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 text-sm font-bold text-[#24133f]/70 transition-colors hover:bg-[#f2edff] hover:text-[#24133f]"
                        >
                          {child.label}
                        </Link>
                      ),
                    )}
                  </div>
                </details>
              ) : item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold text-[#24133f]/60 transition-colors hover:text-[#24133f]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] font-semibold text-[#24133f]/60 transition-colors hover:text-[#24133f]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#7047eb]/25 bg-white/80 px-4 text-sm font-bold text-[#7047eb] shadow-[0_6px_18px_rgba(112,71,235,0.1)] transition hover:-translate-y-0.5 hover:border-[#7047eb]/45 hover:bg-white"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              {t.demo}
            </button>
            <a
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header_login"
              onClick={() =>
                track("login_click", {
                  button_location: "header",
                  locale: lang,
                })
              }
              className="inline-flex h-10 items-center px-4 text-sm font-bold text-[#24133f]"
            >
              {t.login}
            </a>
            <a
              href={signupUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header_sign_up"
              onClick={() =>
                track("sign_up_click", {
                  button_location: "header",
                  locale: lang,
                })
              }
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#7047eb] px-5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(112,71,235,0.24)] transition-transform hover:-translate-y-0.5"
            >
              {t.signup}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={languageSwitchHref}
              aria-label={t.switcher}
              title={t.switcher}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#3d2673]/15 text-[#24133f]/55 transition-colors hover:border-[#3d2673]/30 hover:text-[#24133f]"
            >
              <Globe2 className="h-4 w-4" />
              <span className="sr-only">{t.switcher}</span>
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#3d2673]/15 text-[#24133f] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[#3d2673]/10 bg-[#fbf9ff] px-5 pb-6 lg:hidden">
            <nav className="flex flex-col py-3" aria-label="Mobile navigation">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openDemo();
                }}
                className="flex items-center gap-2 border-b border-[#3d2673]/10 py-3 text-left text-sm font-bold text-[#7047eb]"
              >
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                {t.demo}
              </button>
              {nav.map((item) =>
                isNavGroup(item) ? (
                  <div
                    key={item.label}
                    className="border-b border-[#3d2673]/10 py-3"
                  >
                    <div className="text-xs font-black uppercase tracking-[0.12em] text-[#24133f]/45">
                      {item.label}
                    </div>
                    <div className="mt-2 flex flex-col border-l border-[#7047eb]/20 pl-4">
                      {item.children.map((child) =>
                        child.external ? (
                          <a
                            key={child.label}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-sm font-bold text-[#24133f]"
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-sm font-bold text-[#24133f]"
                          >
                            {child.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                ) : item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-[#3d2673]/10 py-3 text-sm font-bold text-[#24133f]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-[#3d2673]/10 py-3 text-sm font-bold text-[#24133f]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <div className="mt-3 flex items-center gap-3">
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-3 text-sm font-bold text-[#24133f]"
              >
                {t.login}
              </a>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#7047eb] px-5 py-3 text-sm font-bold text-white"
              >
                {t.signup}
              </a>
              <Link
                href={languageSwitchHref}
                aria-label={t.switcher}
                title={t.switcher}
                className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-[#3d2673]/15 text-[#24133f]/55"
              >
                <Globe2 className="h-4 w-4" />
                <span className="sr-only">{t.switcher}</span>
              </Link>
            </div>
          </div>
        ) : null}
      </header>
      <WatchDemoDialog open={demoOpen} onOpenChange={setDemoOpen} lang={lang} />
    </>
  );
}

export function CleanSectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#24133f]/55">
      <span className="h-2 w-2 rounded-full bg-[#7047eb]" />
      {children}
    </div>
  );
}

export function CleanPageHero({
  eyebrow,
  title,
  description,
  tone = "blue",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "blue" | "yellow" | "neutral";
}) {
  const background =
    tone === "yellow"
      ? "bg-[#f5ff63]"
      : tone === "neutral"
        ? "bg-[#f4f0fa]"
        : "bg-[radial-gradient(circle_at_50%_15%,#d8c8ff_0%,#eee7ff_38%,#fbf9ff_78%)]";

  return (
    <header
      className={`border-b border-[#3d2673] px-5 py-20 lg:px-8 lg:py-28 ${background}`}
    >
      <div className="mx-auto max-w-[1180px]">
        <CleanSectionLabel>{eyebrow}</CleanSectionLabel>
        <h1 className="mt-7 max-w-[970px] text-balance text-[clamp(40px,6.5vw,76px)] font-black leading-[0.98] tracking-[-0.055em] text-[#24133f]">
          {title}
        </h1>
        <p className="mt-7 max-w-[670px] text-base leading-7 text-[#24133f]/60 sm:text-lg">
          {description}
        </p>
      </div>
    </header>
  );
}

export function CleanCtaBand({
  lang,
  eyebrow,
  title,
  label,
}: {
  lang: SiteLang;
  eyebrow: string;
  title: string;
  label: string;
}) {
  const signupUrl = getSignUpUrl(lang);

  return (
    <section className="border-y border-[#3d2673] bg-[#f5ff63] px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <CleanSectionLabel>{eyebrow}</CleanSectionLabel>
          <h2 className="mt-5 max-w-[820px] text-[clamp(34px,4.6vw,58px)] font-black leading-[1] tracking-[-0.05em] text-[#24133f]">
            {title}
          </h2>
        </div>
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="inner_page_cta"
          onClick={() =>
            track("sign_up_click", {
              button_location: "inner_page",
              locale: lang,
            })
          }
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#7047eb] px-6 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(36,19,63,0.22)] transition-transform hover:-translate-y-0.5 lg:self-auto"
        >
          {label}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

const FOOTER_COLUMNS: Record<
  SiteLang,
  [FooterColumn, FooterColumn, FooterColumn]
> = {
  zh: [
    {
      title: "产品与解决方案",
      links: [
        { label: "产品体验", href: getPlaygroundUrl("zh") },
        { label: "海外社媒舆情监测", href: "/brand-monitoring" },
        { label: "社交媒体聆听", href: "/social-listening" },
        { label: "MCP 接入", href: "/mcp" },
        { label: "定价方案", href: "/pricing" },
      ],
    },
    {
      title: "资源",
      links: [
        { label: "博客", href: "/blog" },
        { label: "常见问题", href: "/faq" },
        {
          label: "文档",
          href: "https://docs.datascaler.ai/cn",
          external: true,
        },
      ],
    },
    {
      title: "联系我们",
      links: [
        { label: "预约演示", href: "/contact" },
        { label: "联系我们", href: "/contact" },
      ],
    },
  ],
  en: [
    {
      title: "Product & Solutions",
      links: [
        { label: "Playground", href: getPlaygroundUrl("en") },
        { label: "Brand Monitoring", href: "/en/brand-monitoring" },
        { label: "Social Listening", href: "/en/social-listening" },
        { label: "MCP Access", href: "/en/mcp" },
        { label: "Pricing Plans", href: "/en/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/en/blog" },
        { label: "FAQ", href: "/en/faq" },
        {
          label: "Documentation",
          href: "https://docs.datascaler.ai/en",
          external: true,
        },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Book a Demo", href: "/en/contact" },
        { label: "Contact Us", href: "/en/contact" },
      ],
    },
  ],
};

export function CleanSiteFooter({ lang }: { lang: SiteLang }) {
  const isEn = lang === "en";
  const tagline = isEn
    ? "Social listening and consumer intelligence for global brands"
    : "出海品牌的海外舆情监控引擎";
  const columns = FOOTER_COLUMNS[lang];
  const linkClass =
    "text-sm font-semibold text-white/70 transition-colors hover:text-white";

  return (
    <footer className="border-t border-[#3d2673] bg-[#24133f] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <CleanWordmark inverse />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
            {tagline}
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <div className="text-xs font-black uppercase tracking-[0.14em] text-white/35">
              {column.title}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {column.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-white/15 px-5 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>
            © 2026 DataScaler. {isEn ? "All rights reserved." : "保留所有权利。"}
          </span>
          <Link
            href={isEn ? "/en/terms" : "/terms"}
            className="transition-colors hover:text-white"
          >
            {isEn ? "Terms of Service" : "服务协议"}
          </Link>
          <Link
            href={isEn ? "/en/privacy" : "/privacy"}
            className="transition-colors hover:text-white"
          >
            {isEn ? "Privacy Policy" : "隐私政策"}
          </Link>
        </div>
        <span>
          {isEn
            ? "Consumer intelligence · Every finding links to the source"
            : "海外消费者洞察 · 原帖可查"}
        </span>
      </div>
    </footer>
  );
}

export function CleanSitePage({
  children,
  lang,
  languageHref,
}: {
  children: ReactNode;
  lang: SiteLang;
  languageHref?: string;
}) {
  return (
    <div className="clean-landing min-h-screen bg-[#fbf9ff] text-[#24133f]">
      <CleanSiteHeader lang={lang} languageHref={languageHref} />
      {children}
      <CleanSiteFooter lang={lang} />
    </div>
  );
}
