import { type NextRequest, NextResponse } from 'next/server';

import {
  LOCALE_COOKIE,
  type Locale,
  hasEnVersion,
  pathLocale,
  toEnPath,
  toZhPath,
} from '@/lib/i18n';

/**
 * 解析 Accept-Language，返回首选语言(只区分 en / zh)。按 q 权重从高到低取第
 * 一个命中的 zh* / en* 标签：只有访客明确把中文排在英文之前才返回 zh，其余
 * (英文、其它语言如 fr/de、甚至缺失 Accept-Language)一律 en——面向海外的默认。
 */
function preferredFromHeader(header: string | null): Locale {
  if (!header) return 'en';

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number.parseFloat(q) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith('zh')) return 'zh';
    if (tag.startsWith('en')) return 'en';
  }
  return 'en';
}

function redirect(req: NextRequest, pathname: string): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  const res = NextResponse.redirect(url);
  // 重定向结果取决于请求头/cookie，告知缓存层按此分流，避免把某语言的
  // 跳转结果错误地复用给另一语言的访客。
  res.headers.set('Vary', 'Accept-Language, Cookie');
  return res;
}

/**
 * 放行请求，同时把当前 pathname 透传给共享 root layout——它据此为 <html>
 * 设置正确的 lang(中文 / en)。物理双目录结构下 layout 拿不到路由段，只能
 * 经 header 传递。
 */
function pass(req: NextRequest): NextResponse {
  const headers = new Headers(req.headers);
  headers.set('x-pathname', req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

/**
 * 自动语言重定向：
 *   - cookie(手动选择) 优先级最高，其次才看 Accept-Language；
 *   - 匿名访客(无 cookie)只做「默认中文 → /en」的自动跳转，绝不剥离别人
 *     特意分享的 /en 链接(避免把英文分享链接强行带回中文)；
 *   - 已表达偏好(有 cookie)的访客双向尊重其选择；
 *   - 无英文版本的中文路径(如博客详情页)不跳转，避免 404。
 */
export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  const cookieValue = req.cookies.get(LOCALE_COOKIE)?.value;
  const cookieLocale: Locale | undefined =
    cookieValue === 'en' || cookieValue === 'zh' ? cookieValue : undefined;

  const desired: Locale =
    cookieLocale ?? preferredFromHeader(req.headers.get('accept-language'));
  const current = pathLocale(pathname);

  if (desired === current) return pass(req);

  // 匿名访客不剥离显式的 /en 链接。
  if (!cookieLocale && current === 'en') return pass(req);

  if (current === 'zh' && desired === 'en') {
    if (!hasEnVersion(pathname)) return pass(req);
    return redirect(req, toEnPath(pathname));
  }

  if (current === 'en' && desired === 'zh') {
    return redirect(req, toZhPath(pathname));
  }

  return pass(req);
}

export const config = {
  // 跳过 Payload admin/api、Next 内部资源，以及任何带扩展名的静态文件
  // (favicon.ico、*.png、robots.txt、sitemap.xml、llms.txt、/api/media/* 等)。
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
};
