import { dashboardOrigin } from '@/components/playground/origin';

export type MarketingLocale = 'zh' | 'en';

// 后台 origin 不再写死线上,统一走 dashboardOrigin():
//   env NEXT_PUBLIC_DASHBOARD_ORIGIN > 运行时按官网域名(stagingmt→staging) > 线上兜底。
// 这样测试官网的注册/登录会跳测试后台,与 playground 的真实请求同一真源。
const LEGACY_PLANS_URL = /^https:\/\/app\.datascaler\.ai\/plans\/?(?:\?.*)?$/i;

export function getSignUpUrl(locale: MarketingLocale): string {
  const language = locale === 'en' ? 'en-US' : 'zh-CN';
  return `${dashboardOrigin()}/auth/sign-up?language=${language}`;
}

export function resolveMarketingCtaUrl(url: string, locale: MarketingLocale): string {
  const normalizedUrl = url.trim();
  if (normalizedUrl === '/plans' || LEGACY_PLANS_URL.test(normalizedUrl)) {
    return getSignUpUrl(locale);
  }
  return normalizedUrl;
}

export function getPlaygroundUrl(locale: MarketingLocale): string {
  return locale === 'en' ? '/en/playground' : '/playground';
}

export function getPlaygroundSampleUrl(locale: MarketingLocale): string {
  return `${getPlaygroundUrl(locale)}#sample`;
}
