# 官网改动清单（2026-06，增长侧转化优化 + 计费文案 + 埋点）

基于原始源码（归档.zip）修改。本地运行：
```bash
PAYLOAD_SECRET=demo-secret-123 DATABASE_URI=file:./payload.db NEXT_PUBLIC_SITE_URL=http://localhost:3200 pnpm dev
# 中文 http://localhost:3200/   英文 http://localhost:3200/en
```
（首次需 `pnpm install` 并 `pnpm rebuild sharp`。）

需求文档见：`DataScaler_官网优化与埋点_整体需求_v3.docx/.md`。

## 一、CTA 文案与分流（终版，首页 + 定价页，中英）
- Free → 开始体验 / Get started
- Pro → 选择 Pro / Choose Pro（Pro 即时扣费、无试用期，不用 "Start free trial"）
- Team → 预约演示 / Book a demo（走 Demo 弹窗）
- Enterprise → 联系销售 / Contact sales
- 通用按钮（Hero / 导航 / FAQ 底部 / FooterCTA）→ 开始体验 / Get started
- Hero 次级：团队采购？预约演示 / Book a demo → /contact

涉及：`IndexContent.tsx`、`EnIndexContent.tsx`、`PricingContent.tsx`、`PricingEnContent.tsx`、`PricingHeader.tsx`、`FaqContent.tsx`、`FaqEnContent.tsx`

## 二、计费文案改为新模型（中英全站）
- 免费版：永久免费 · 无需绑卡 · 不自动扣费 · 额度一次性（1 品牌 / 1 完整报告 / 6 次追问）
- 付费套餐：绑卡 · 按月自动续费 · 可随时取消
- 移除旧的「30 天试用 / 绑卡激活 / 预订阅 Pro / 到期自动转 Pro 扣款」
- Hero 删除首屏绑卡提示；价值文案改「每条洞察都可溯源到原帖 / Every insight backed by a traceable source」（不提报告生成时间，实际 2–3h）

涉及：`IndexContent.tsx`、`EnIndexContent.tsx`、`PricingContent.tsx`、`PricingEnContent.tsx`、`FaqContent.tsx`、`FaqEnContent.tsx`、`app/(frontend)/page.tsx`、`app/(frontend)/pricing/page.tsx`、`app/(frontend)/en/page.tsx`、`app/(frontend)/en/pricing/page.tsx`（SEO meta）

## 三、其它转化优化
- Demo 表单（`ContactContent.tsx`/`ContactEnContent.tsx`）：删 Decision Challenge 字段，按钮 → 预约演示 / Request a Demo
- 首页社会证明模块（`IndexContent.tsx`/`EnIndexContent.tsx`）：四格数据（均为已确认真实数据/产品事实，无待确认）+ 3 条 Quote（Ashley Y. 为真实反馈；仅 Sarah C./Marcus R. 为占位，待替换）
- FAQ 底部 CTA（`FaqContent.tsx`/`FaqEnContent.tsx`）
- 字体：标题 Space Grotesk → Inter；补中文兜底栈（`globals.css`、`tailwind.config.ts`）

## 四、数据埋点（方案 A：GTM）
- `app/(frontend)/layout.tsx`：装 GTM 容器（占位 `GTM-XXXXXXX`，待换真实 ID）；保留 gtag.js 管 GA4 pageview，GTM 只配 GA4 事件代码
- `track(event, params)` helper + `data-cta` / `data-plan` 属性已预埋
- 已埋事件：`sign_up_click`(Hero)、`plan_click`(定价卡)、`demo_cta_click`(Hero 次级)
- 待研发补：`demo_request_submit`、`hero_brand_search`，以及 nav/FAQ/footer 的 `sign_up_click`
- 跨域：需在 GTM/GA4 配 datascaler.ai ↔ app.datascaler.ai，且 app 端装同一 GA4 属性

## 未做（明确不做）
- 样本报告页 `/report-sample`、博客文末 CTA、Amazon 加入默认数据源
