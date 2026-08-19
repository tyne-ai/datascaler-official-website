# 02 · Posts 集合 API(博客文章)

Posts 是博客文章集合(`slug: posts`),开启了**草稿版本**(drafts)。

- **读取(GET)**:匿名只能读到**已发布**文章;登录后可读全部(含草稿)。
- **创建 / 更新 / 删除需要登录**(`Authorization: JWT <token>`,见 [00-authentication.md](./00-authentication.md))。
- 集合基址:`{{BASE}}/api/posts`(`{{BASE}}` = 测试 `https://stagingmt.datascaler.ai` 或 正式 `https://www.datascaler.ai`)。

---

## 字段说明(传入参数)

| 字段 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | string | ✅ | — | 文章标题 |
| `slug` | string | ⭕ 自动 | 由标题生成 | URL 片段,最终地址 `/blog/<slug>`。留空按标题自动生成;唯一,只能小写字母/数字/连字符。**⚠️ 纯中文标题自动生成的 slug 会是空的(中文字符被过滤),中文文章务必显式提供 `slug`** |
| `lang` | select | ✅ | `zh` | `zh` 或 `en`。决定文章出现在中文站还是英文站列表 |
| `status` | select | ✅ | `published` | `draft`(草稿)或 `published`(发布)。**只有 published 才在前台可见** |
| `category` | string | ✅ | `Social Listening` | 分类,显示为文章上方标签 |
| `tag` | string | ✅ | — | 单个标签,如 `消费电子` / `Consumer Electronics` |
| `excerpt` | textarea | ✅ | — | 摘要,列表页与 SEO 描述回退用 |
| `publishedDate` | date(ISO) | ✅ | — | 发布日期,如 `2026-08-06T00:00:00.000Z`。列表按此倒序 |
| `readTime` | string | ✅ | — | 阅读时长,如 `8 min read` / `阅读约 9 分钟` |
| `content` | richText | ✅ | — | 正文,**Lexical JSON 结构**(见下方「正文结构」),不能直接塞纯文本/Markdown |
| `heroImage` | upload → media | ❌ | — | 头图,填 Media 记录的 `id`(数字) |
| `heroImageHref` | string | ❌ | — | 头图点击跳转链接 |
| `author` | string | ❌ | `DataScaler Research` | 作者署名 |
| `translation` | relationship → posts | ❌ | — | **另一语言的对应文章**(中 ⇄ 英),传对方文章的 `id`(数字)。文章页右上角语言切换按钮据此直接跳到对应译文。服务端有校验:目标必须存在、为**相反语言**、且不能是文章自己。详见下方「双语互链」 |
| `seo` | group | ❌ | — | SEO / 社交分享元数据,见下 |

### `seo` 组(全部选填,留空自动回退到标题/摘要/头图)

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `seo.metaTitle` | string | 覆盖 `<title>`,回退到文章标题 |
| `seo.metaDescription` | textarea | meta 描述(~155 字),回退到摘要 |
| `seo.metaKeywords` | string | 逗号分隔关键词 |
| `seo.canonical` | string | canonical URL,回退到 `/blog/<slug>` |
| `seo.ogTitle` | string | 社交标题,回退到 metaTitle |
| `seo.ogDescription` | textarea | 社交描述,回退到 metaDescription |
| `seo.ogImage` | upload → media | 社交分享图(建议 1200×630),填 Media 的 `id` |
| `seo.noIndex` | boolean | `true` 则加 `noindex,nofollow`,不被搜索引擎收录 |

> **创建一篇文章的最小必填集合**:`title`、`lang`、`status`、`category`、`tag`、`excerpt`、`publishedDate`、`readTime`、`content`(`slug` 可省略自动生成)。

---

## 草稿 vs 发布(重要机制)

本集合有**两层**状态,前台列表会同时按两者过滤(都必须是 published 才显示):

1. `status` 字段(自定义,`draft`/`published`)——你在 body 里传的。
2. `_status`(Payload 版本状态,`draft`/`published`)——由是否带 `?draft=true` 决定。

> ⚠️ **关键**:drafts 开启后,`POST /api/posts` **默认 `_status=draft`**。哪怕 body 里写了 `status:"published"`,不显式带 `_status:"published"` 的话,版本状态仍是 draft,文章**不会出现在前台**。

对应关系:

| 目标 | 传参 | 结果 |
| --- | --- | --- |
| **一步正式发布** | body 里 `status:"published"` **且 `_status:"published"`**,URL 不带 `draft` | 两者都 published → 前台可见 |
| **存草稿** | `POST .../api/posts?draft=true`,body `status:"draft"` | 两者都是 draft → 前台隐藏,可 `?preview=true` 预览 |
| **把已有草稿转发布** | `PATCH .../api/posts/:id`,body `{"_status":"published","status":"published"}` | 版本发布 → 前台可见 |

预览草稿:`{{BASE}}/blog/<slug>?preview=true`。

---

## 双语互链(translation 字段)

中英文文章都在同一个 `/blog/<slug>` 路由渲染(页头/页脚语言跟随文章的 `lang`)。文章页右上角的语言切换按钮,靠 `translation` 字段找到「另一语言的对应文章」并跳过去;**没设**时按钮回退到博客列表(不会 404)。

- `translation` 是**关联字段**(relationship → posts),传值是对方文章的 **`id`(数字)**,不是 slug。
- **只需在一边设置,另一边会自动回填**(见下「自动对等」),不用两边都手动设。
- **服务端校验**(创建/更新都会跑,不满足直接 `400 field is invalid: Translation`):
  1. 目标文章必须**存在**;
  2. 必须是**相反语言**——中文文章只能关联英文文章,反之亦然;
  3. 不能指向**文章自己**;
  4. 目标**不能已经是别的文章的译文**——链接强制 **1:1**,想改绑得先把原来那边解绑。
- 后台 `/admin` 的下拉里也只会列出**相反语言、且尚未被占用**的文章供选择。

### 自动对等(1:1,设一边即可)

绑定是**双向自动维护**的,由服务端 `afterChange` 钩子保证:

- 设 A→X 保存后,X 会被**自动**回填成 X→A;两边同时生效。
- 把 A 从 X 改指到 Y,旧搭档 X 会被**自动解绑**(X 的 `translation` 清空),同时 Y→A 自动建立。
- 因为强制 1:1,**不会**出现「一篇文章被多篇绑定」:目标已被占用时直接 `400` 拒绝。

### 互链示例(建好后设一边即可)

因为互链需要对方的 id,而创建是一篇一篇来的,常规做法:先把两篇建好(`translation` 留空),拿到 id 后**只 PATCH 一边**,另一边自动对等。

```bash
# 假设中文篇 id=1、英文篇 id=2。只设中文篇指向英文篇,英文篇会被自动回填成 →1:
curl -X PATCH "https://stagingmt.datascaler.ai/api/posts/1" \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d '{"lang":"zh","translation":2}'
```

> ⚠️ PATCH 时**务必带上 `lang`**:服务端校验要靠文章的 `lang` 判断「相反语言」应是哪种。只 PATCH `translation`、body 里不带 `lang` 时,校验取不到语言就可能把合法目标误判为非法。创建时因为 body 里本就有 `lang`,不受影响。

如果建第二篇时已经知道第一篇的 id(比如先建英文、再建中文),直接在创建 body 里带 `translation` 即可,连这一次 PATCH 都省了——对方仍会自动回填。

---

## 1. 创建文章(Create)

**`POST {{BASE}}/api/posts`** · 需要登录 · `application/json`

```bash
curl -X POST "https://stagingmt.datascaler.ai/api/posts" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "用社媒信号读懂购买信心",
    "slug": "social-listening-purchase-confidence",
    "lang": "zh",
    "status": "published",
    "_status": "published",
    "category": "Social Listening",
    "tag": "社媒聆听",
    "excerpt": "把跨平台公开讨论整理为可溯源的结论。",
    "publishedDate": "2026-08-06T00:00:00.000Z",
    "readTime": "6 分钟阅读",
    "author": "DataScaler Research",
    "content": {
      "root": {
        "type": "root", "direction": null, "format": "", "indent": 0, "version": 1,
        "children": [
          { "type": "heading", "tag": "h2", "direction": null, "format": "", "indent": 0, "version": 1,
            "children": [ { "type": "text", "text": "为什么声量不等于信任", "detail": 0, "format": 0, "mode": "normal", "style": "", "version": 1 } ] },
          { "type": "paragraph", "direction": null, "format": "", "indent": 0, "version": 1, "textFormat": 0, "textStyle": "",
            "children": [ { "type": "text", "text": "正文段落……", "detail": 0, "format": 0, "mode": "normal", "style": "", "version": 1 } ] }
        ]
      }
    }
  }'
```

### 响应(201)

```json
{ "message": "posts successfully created.", "doc": { "id": 22, "slug": "...", "status": "published", "_status": "published", ... } }
```

创建草稿时改成 `POST .../api/posts?draft=true` 且 body 里 `"status":"draft"`。

---

## 2. 查询文章(Read)

### 2.1 列表

**`GET {{BASE}}/api/posts`** · 公开(匿名只返回已发布)

```bash
# 中文站已发布文章,按发布日期倒序,取前 20 条
curl "https://stagingmt.datascaler.ai/api/posts?where[lang][equals]=zh&where[status][equals]=published&sort=-publishedDate&limit=20&depth=0"
```

响应:

```json
{
  "docs": [ { "id": 21, "title": "...", "slug": "...", "lang": "en", ... } ],
  "totalDocs": 1, "limit": 20, "page": 1, "totalPages": 1,
  "hasNextPage": false, "hasPrevPage": false, "pagingCounter": 1
}
```

### 2.2 单条

**`GET {{BASE}}/api/posts/:id`** · 匿名仅能取已发布

```bash
curl "https://stagingmt.datascaler.ai/api/posts/21?depth=1"
```

### 2.3 读草稿

草稿要**带登录 token**并加 `?draft=true`:

```bash
curl "https://stagingmt.datascaler.ai/api/posts/22?draft=true" -H "Authorization: JWT $TOKEN"
```

### 2.4 计数

**`GET {{BASE}}/api/posts/count`** —— 返回 `{ "totalDocs": N }`,支持 `where`。

---

## 查询参数

以下 query 参数对 Posts 和 Media 的 GET 列表都适用:

| 参数 | 说明 | 示例 |
| --- | --- | --- |
| `where[字段][操作符]=值` | 过滤条件 | `where[lang][equals]=zh` |
| `sort` | 排序,`-` 前缀为倒序 | `sort=-publishedDate` |
| `limit` | 每页条数(默认 10) | `limit=50` |
| `page` | 页码 | `page=2` |
| `depth` | 关联展开深度:`0` 只返 id,`1+` 展开关联对象(如 heroImage) | `depth=1` |
| `select[字段]=true` | 只返回指定字段 | `select[title]=true&select[slug]=true` |
| `draft` | `true` 时返回草稿版本(需登录) | `draft=true` |

常用 `where` 操作符:`equals`、`not_equals`、`greater_than`、`greater_than_equal`、`less_than`、`less_than_equal`、`like`(模糊)、`contains`、`in`、`not_in`、`exists`。

多条件用 `and` / `or`:

```
?where[and][0][lang][equals]=zh&where[and][1][status][equals]=published
```

---

## 3. 更新文章(Update)

### 3.1 按 id 更新

**`PATCH {{BASE}}/api/posts/:id`** · 需要登录 · 只传要改的字段

```bash
curl -X PATCH "https://stagingmt.datascaler.ai/api/posts/22" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tag":"新标签","status":"published"}'
```

响应:`{ "message": "Updated successfully.", "doc": { ... } }`

> 把草稿改成正式发布:`PATCH .../api/posts/22`(不带 `draft=true`)且 `"status":"published"`,会让 `_status` 也变 published。

### 3.2 批量更新

**`PATCH {{BASE}}/api/posts?where[...]=...`** —— 对所有匹配 `where` 的文章批量改。

---

## 4. 删除文章(Delete)

### 4.1 按 id 删除

**`DELETE {{BASE}}/api/posts/:id`** · 需要登录

```bash
curl -X DELETE "https://stagingmt.datascaler.ai/api/posts/22" -H "Authorization: JWT $TOKEN"
```

响应:`{ "message": "Deleted successfully.", "doc": { ... } }`,删除后再 GET 该 id 返回 **404**。

### 4.2 批量删除

**`DELETE {{BASE}}/api/posts?where[...]=...`** —— 删除所有匹配 `where` 的文章(危险,先用同样的 `where` 跑一次 GET 确认命中范围)。

---

## 正文结构(content:Lexical JSON)

`content` 不是纯文本,而是 Lexical 富文本的序列化 JSON。最外层固定为 `{ "root": { ... } }`。各节点形状(与线上真实文章一致):

**根节点**
```json
{ "type": "root", "direction": null, "format": "", "indent": 0, "version": 1, "children": [ /* 块节点 */ ] }
```

**文本节点**(`format` 是位掩码:粗体=1、斜体=2、粗+斜=3、行内代码=16)
```json
{ "type": "text", "text": "内容", "detail": 0, "format": 0, "mode": "normal", "style": "", "version": 1 }
```

**标题**(编辑器仅启用 `h2`/`h3`/`h4`;`h2`/`h3` 会进右侧目录 TOC)
```json
{ "type": "heading", "tag": "h2", "direction": null, "format": "", "indent": 0, "version": 1, "children": [ /* text */ ] }
```

**段落**
```json
{ "type": "paragraph", "direction": null, "format": "", "indent": 0, "version": 1, "textFormat": 0, "textStyle": "", "children": [ /* text */ ] }
```

**列表**(`listType`:`bullet`+`tag:"ul"` 或 `number`+`tag:"ol"`)
```json
{ "type": "list", "listType": "bullet", "tag": "ul", "start": 1, "direction": null, "format": "", "indent": 0, "version": 1,
  "children": [
    { "type": "listitem", "value": 1, "direction": null, "format": "", "indent": 0, "version": 1, "children": [ /* text */ ] }
  ] }
```

> 手写这段 JSON 很繁琐。本目录已附脚本 [`scripts/create-post.mjs`](./scripts/create-post.mjs),直接写带 frontmatter 的 Markdown,自动转 Lexical 并创建文章(支持标题 / 段落 / 有序无序列表 / 粗斜体 / 行内代码)。用法见 README。

---

## 快速参考表

| 操作 | 方法 & 路径 | 登录 |
| --- | --- | --- |
| 创建 | `POST /api/posts`(草稿加 `?draft=true`) | ✅ |
| 列表 | `GET /api/posts` | ❌(匿名仅已发布) |
| 单条 | `GET /api/posts/:id` | ❌(草稿需 ✅ + `?draft=true`) |
| 计数 | `GET /api/posts/count` | ❌ |
| 更新 | `PATCH /api/posts/:id` | ✅ |
| 批量更新 | `PATCH /api/posts?where=...` | ✅ |
| 删除 | `DELETE /api/posts/:id` | ✅ |
| 批量删除 | `DELETE /api/posts?where=...` | ✅ |
