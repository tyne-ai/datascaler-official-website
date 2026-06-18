# DataScaler · GTM 后台配置手册

**容器**：`GTM-KVXS5X93`（datascaler.ai）　**GA4**：`G-M5NX3Y8KY6`
**前提**：代码侧 GTM 容器已装好（layout.tsx），部署到生产后容器即加载。本手册是在 https://tagmanager.google.com 后台把事件配出来。

> 核心原则：**只在 GTM 里建 GA4「事件」代码，不要建 GA4「配置/Configuration」代码**——基础 pageview 由网站已有的 gtag.js 负责，重复配会导致 pageview 双计。

---

## 第 1 步：建数据层变量（变量 → 新建 → 数据层变量）
逐个建，"数据层变量名称"照填：

| 变量名 | 数据层变量名称 |
|--------|----------------|
| DLV - button_location | `button_location` |
| DLV - plan_name | `plan_name` |
| DLV - cta_type | `cta_type` |
| DLV - form_type | `form_type` |
| DLV - has_query | `has_query` |

## 第 2 步：建触发器（触发器 → 新建 → 类型选「自定义事件」）
每个触发器的"事件名称"必须和代码里的事件名**完全一致**：

| 触发器名 | 事件名称（自定义事件） |
|----------|------------------------|
| CE - sign_up_click | `sign_up_click` |
| CE - plan_click | `plan_click` |
| CE - demo_request_submit | `demo_request_submit` |
| CE - demo_cta_click | `demo_cta_click` |
| CE - hero_brand_search | `hero_brand_search` |

## 第 3 步：建 GA4 事件代码（代码 → 新建 → 类型「Google Analytics: GA4 事件」）
每个事件建一个代码。**衡量 ID 直接填 `G-M5NX3Y8KY6`**（不引用配置代码）。"事件名称"与触发器同名，参数按下表映射，"触发条件"选对应触发器。

| 代码名 | 事件名称 | 事件参数（参数名 → 值） | 触发器 |
|--------|----------|--------------------------|--------|
| GA4 - sign_up_click | `sign_up_click` | button_location → `{{DLV - button_location}}` | CE - sign_up_click |
| GA4 - plan_click | `plan_click` | plan_name → `{{DLV - plan_name}}`；cta_type → `{{DLV - cta_type}}` | CE - plan_click |
| GA4 - demo_request_submit | `demo_request_submit` | form_type → `{{DLV - form_type}}` | CE - demo_request_submit |
| GA4 - demo_cta_click | `demo_cta_click` | button_location → `{{DLV - button_location}}` | CE - demo_cta_click |
| GA4 - hero_brand_search | `hero_brand_search` | has_query → `{{DLV - has_query}}` | CE - hero_brand_search |

## 第 4 步：跨域（在 GA4 后台，不在 GTM）
GA4 → 管理 → 数据流 → 选 Web 数据流 → 配置代码设置 → **配置您的网域** → 添加：
- `datascaler.ai`
- `app.datascaler.ai`

⚠️ **前提**：`app.datascaler.ai` 必须用**同一个 GA4 属性（G-M5NX3Y8KY6）**，否则跨域 linker 无效——先找 app 端确认。

## 第 5 步：预览 → 发布
- GTM 右上「预览」→ 输入 https://datascaler.ai （需生产已部署带容器的版本）→ 点页面上的「开始体验 / 选择 Pro / 预约演示」等，确认 Tag Assistant 里事件触发、参数有值。
- 没问题后点 GTM「提交」发布。

## 第 6 步：GA4 标转化 + 自定义维度
- GA4 → 管理 → 关键事件（Key events）：把 `sign_up_click`、`plan_click`、`demo_request_submit` 标为关键事件（转化）。`demo_cta_click`、`hero_brand_search` 可设为关键事件用于观察。
- GA4 → 管理 → 自定义定义 → 自定义维度（事件范围）：注册 `button_location`、`plan_name`、`cta_type`，否则报表里看不到这些参数。

---

## 还需研发补的 dataLayer（GTM 配完也要这几个才齐）
代码已埋：`sign_up_click`(Hero)、`plan_click`(定价卡)、`demo_cta_click`(Hero 次级)。还差：
- `demo_request_submit` —— /contact 表单提交成功回调里 `track('demo_request_submit',{form_type:'demo',locale:'zh'})`
- `hero_brand_search` —— Hero 品牌域名输入框提交时 `track('hero_brand_search',{has_query:true})`
- 给 nav / FAQ / footer 的「开始体验 / Get started」补 `sign_up_click` 的 onClick
