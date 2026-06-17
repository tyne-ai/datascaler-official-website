import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';
import { pathLocale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

// 第三方监测/验证 ID。营销站独享,所以直接落到 (frontend) layout —
// (payload) admin 不会注入。需要按环境拆分时改成 NEXT_PUBLIC_* 注入,但
// Docker 构建要在 Dockerfile 里加对应 --build-arg(Next 在 next build 时
// 把 NEXT_PUBLIC_* 烘进 JS bundle,运行期再设没用)。
const GOOGLE_SITE_VERIFICATION = 'elGpozfT2dRazwgOtC1SlHwl5pmqKym7Qephpm-3WL4';
const GA_MEASUREMENT_ID = 'G-M5NX3Y8KY6';
const CLARITY_PROJECT_ID = 'x04rt4ltvq';
// GTM 容器：承载官网自定义转化/意向事件（sign_up_click / plan_click / sample_report_click 等，
// 经 dataLayer 触发）。GA4 基础 pageview 仍由上面的 gtag.js 负责——GTM 内只配 GA4「事件」代码、
// 不要再加 GA4「配置」代码，否则 pageview 会重复计数。
// TODO(growth): 替换为真实 GTM 容器 ID（GTM 后台 → 容器设置）。
const GTM_CONTAINER_ID = 'GTM-XXXXXXX';

const ENABLE_ANALYTICS = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DataScaler AI | 出海品牌 AI 市场舆情与增长引擎',
    template: '%s | DataScaler',
  },
  description:
    'DataScaler 提供 100% 可溯源的 AI 市场洞察。AI Assistant 深度分析 TikTok、YouTube、Reddit 等社媒舆情，结论先行、数据验证。',
  icons: { icon: '/favicon.ico' },
  // Search Console 也支持 DNS TXT 验证,但 meta 验证不依赖 DNS 同步,生产部署后
  // 立即可验。两种方式同时存在不冲突。
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  // pathname 由 middleware 注入(x-pathname)。共享 root layout 同时服务中文(/)
  // 与英文(/en)两套页面，据此为 <html> 设置正确的 lang——SSR HTML 的 lang
  // 才是搜索引擎/读屏软件实际读取的值。
  const pathname = (await headers()).get('x-pathname') ?? '/';
  const lang = pathLocale(pathname) === 'en' ? 'en' : 'zh-CN';

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        {ENABLE_ANALYTICS && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
        {ENABLE_ANALYTICS && (
          <>
            <Script id="gtm-loader" strategy="afterInteractive">{`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
            `}</Script>
            <Script
              id="ga-loader"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}</Script>
            <Script id="ms-clarity" strategy="afterInteractive">{`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
