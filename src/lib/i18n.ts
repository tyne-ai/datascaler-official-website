// 营销站语言路由约定：
//   - 中文(zh-CN)是默认语言，路径不带前缀(/、/pricing、/blog ...)
//   - 英文(en)是镜像路由，统一挂在 /en 前缀下(/en、/en/pricing ...)
// 这里集中维护两套路由的映射与语言判定，供 middleware(自动重定向)和
// 页头/页脚的语言切换器复用，避免常量散落各处。

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export type Locale = 'zh' | 'en';

/**
 * 同时拥有中英文两套页面的「中文」路径白名单。
 * 只有在册的路径才会被自动重定向到 /en 对应版本——例如博客详情页
 * (/blog/<slug>) 没有英文版本，必须排除，否则重定向后会 404。
 */
const EN_AVAILABLE_PATHS = new Set<string>([
  '/',
  '/pricing',
  '/blog',
  '/faq',
  '/contact',
  '/privacy',
  '/terms',
]);

/** 去掉尾部斜杠(根路径除外)，统一比较口径。 */
function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.replace(/\/+$/, '') || '/';
  }
  return pathname;
}

/** 根据路径判断当前语言：/en 或 /en/* 为英文，其余为中文。 */
export function pathLocale(pathname: string): Locale {
  const p = normalizePath(pathname);
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'zh';
}

/** 该中文路径是否存在对应的英文版本。 */
export function hasEnVersion(zhPathname: string): boolean {
  return EN_AVAILABLE_PATHS.has(normalizePath(zhPathname));
}

/** 中文路径 → 英文路径(加 /en 前缀)。 */
export function toEnPath(zhPathname: string): string {
  const p = normalizePath(zhPathname);
  return p === '/' ? '/en' : `/en${p}`;
}

/** 英文路径 → 中文路径(去 /en 前缀)。 */
export function toZhPath(enPathname: string): string {
  const p = normalizePath(enPathname);
  if (p === '/en') return '/';
  return p.slice('/en'.length) || '/';
}

/**
 * 客户端写入语言偏好 cookie(有效期一年)。
 * 用户一旦手动切换语言，middleware 即以 cookie 为准，不再依据
 * Accept-Language 反复跳转——既记住选择，也避免来回重定向。
 */
export function setLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
