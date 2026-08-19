import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';
import { JsonLd } from '@/components/JsonLd';
import { pathLocale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

// 第三方监测/验证 ID。营销站独享,所以直接落到 (frontend) layout —
// (payload) admin 不会注入。需要按环境拆分时改成 NEXT_PUBLIC_* 注入,但
// Docker 构建要在 Dockerfile 里加对应 --build-arg(Next 在 next build 时
// 把 NEXT_PUBLIC_* 烘进 JS bundle,运行期再设没用)。
const GOOGLE_SITE_VERIFICATION = 'elGpozfT2dRazwgOtC1SlHwl5pmqKym7Qephpm-3WL4';
const GA_MEASUREMENT_ID = 'G-M5NX3Y8KY6';
const CLARITY_PROJECT_ID = 'x04rt4ltvq';
// GTM 容器 ID(见 PRD v3 §2.1)。GTM 后台只配 GA4「事件代码」，不要再加 GA4 配置代码，
// 否则与下方 gtag.js 的 GA4 基础 pageview 重复计数。仅生产环境注入容器。
const GTM_CONTAINER_ID = 'GTM-KVXS5X93';

const ENABLE_ANALYTICS = process.env.NODE_ENV === 'production';
const ENABLE_GTM = ENABLE_ANALYTICS && /^GTM-[A-Z0-9]{4,}$/.test(GTM_CONTAINER_ID);

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'DataScaler',
  url: SITE_URL,
  logo: `${SITE_URL}/logo_text.png`,
  description: 'Social listening and consumer intelligence for global brands.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'support@datascaler.ai',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Chinese'],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'DataScaler',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: ['zh-CN', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/playground?brand={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'DataScaler AI | 出海品牌 AI 市场舆情与增长引擎',
  description:
    'DataScaler 监控 10 个海外公开平台的品牌讨论，每条结论都能点回原帖核验。',
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
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {ENABLE_GTM && (
          // GTM noscript 兜底：JS 关闭时仍能记录 pageview。需紧跟 <body> 开标签。
          <noscript>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="gtm"
            />
          </noscript>
        )}
        {children}
        {ENABLE_GTM && (
          <Script id="gtm-loader" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
          `}</Script>
        )}
        {ENABLE_ANALYTICS && (
          <>
            <Script
              id="ga-loader"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            {/* 跨域追踪(PRD §2.2)：linker 装饰指向 app 域的出站链接(_gl 参数)，把
                datascaler.ai 与 app.datascaler.ai 串成同一 GA4 会话，注册来源才不会变成
                (direct)。前提:app 端需装同一 GA4 属性(G-M5NX3Y8KY6)，否则 linker 无效；
                GA4 后台 Data Stream「配置您的域名」也应同步加入这两个域。 */}
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                linker: { domains: ['datascaler.ai', 'app.datascaler.ai'] },
                cookie_domain: 'datascaler.ai'
              });
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
