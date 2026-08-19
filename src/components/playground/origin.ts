/**
 * Playground 跨域调用 dashboard(后台)的基址解析。
 *
 * 优先级:
 *  1) 显式 env `NEXT_PUBLIC_DASHBOARD_ORIGIN`(本地 .env.local 指向 http://localhost:3000);
 *  2) 运行时按当前官网域名映射:
 *       测试官网 stagingmt.datascaler.ai  → 测试后台 https://staging.datascaler.ai
 *       线上官网 datascaler.ai            → 线上后台 https://app.datascaler.ai
 *  3) 兜底线上 app.datascaler.ai。
 *
 * 为什么运行时按域名判定而非只靠 env:`NEXT_PUBLIC_*` 是构建期注入,测试站构建
 * 常未单独注入该变量,会误回退到线上后台。按 hostname 判定可让同一份构建在
 * stagingmt / 线上两种域名下各自指向正确后台;env 仍可显式覆盖(本地开发)。
 */
const EXPLICIT_ORIGIN = process.env.NEXT_PUBLIC_DASHBOARD_ORIGIN?.replace(/\/+$/, '');

export function dashboardOrigin(): string {
  if (EXPLICIT_ORIGIN) return EXPLICIT_ORIGIN;
  if (typeof window !== 'undefined') {
    // 测试环境官网(stagingmt.datascaler.ai,或任何含 "staging" 的官网域名)→ 测试后台
    if (window.location.hostname.includes('staging')) return 'https://staging.datascaler.ai';
  }
  return 'https://app.datascaler.ai';
}