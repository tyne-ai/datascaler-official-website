/**
 * 营销站事件埋点工具 — 统一向 GTM dataLayer 推送自定义事件。
 *
 * 分工(见 PRD v3 §2.1)：
 * - GA4 基础 pageview 由 frontend layout 里的 gtag.js 负责；
 * - GTM 容器只配置 GA4「事件代码」，监听这里 push 的自定义事件触发上报
 *   (GTM 内不再加 GA4 配置代码，否则 pageview 会重复计数)。
 *
 * track() 在任何环境都安全：dataLayer 不存在时自动初始化，SSR 阶段直接跳过。
 * 实际是否上报取决于生产环境是否加载了 GTM 容器(见 layout.tsx)。
 */

/** 允许作为事件参数的标量类型。不传域名等 PII，仅传布尔/枚举/数值。 */
type TrackValue = string | number | boolean | null | undefined;
export type TrackParams = Record<string, TrackValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * 向 dataLayer 推送一个自定义事件。
 *
 * @param event  事件名，与 GTM 触发器一一对应(如 sign_up_click / plan_click)
 * @param params 附加参数(button_location / plan_name / cta_type 等)
 */
export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
