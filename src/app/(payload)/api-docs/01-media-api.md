# 01 · Media 集合 API(图片资源)

Media 是图片 / 资源集合(`slug: media`)。文章的 `heroImage`、`seo.ogImage`、正文内嵌图都指向这里的记录。上传时会自动生成三个尺寸:`thumbnail`(400w)、`card`(768w)、`feature`(1400w)。

- **读取(GET)公开**,无需登录。
- **上传 / 更新 / 删除需要登录**(`Authorization: JWT <token>`,见 [00-authentication.md](./00-authentication.md))。
- 集合基址:`{{BASE}}/api/media`(`{{BASE}}` = 测试 `https://stagingmt.datascaler.ai` 或 正式 `https://www.datascaler.ai`)。

---

## 字段说明(传入参数)

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | 二进制文件 | ✅(仅上传时) | 图片本体,`multipart/form-data`,仅接受 `image/*`,≤ 10MB |
| `alt` | string | ✅ | **替代文本**,屏幕阅读器 / 图片加载失败时显示。描述图片内容,不要写文件名 |
| `caption` | string | ❌ | 图注,渲染在文章图片下方 |
| `credit` | string | ❌ | 图片来源 / 版权说明 |

> 除 `file` 外的字段,在 `multipart` 请求里通过一个名为 **`_payload`** 的字段以 JSON 字符串传入(见下方示例)。

### 上传后自动产生的只读字段

`id`、`filename`、`mimeType`、`filesize`、`width`、`height`、`url`(`/api/media/file/<filename>`)、`thumbnailURL`、`sizes`(含 `thumbnail`/`card`/`feature`,各自带 `url`/`width`/`height`/`filename`)、`createdAt`、`updatedAt`。

---

## 1. 上传图片(Create)

**`POST {{BASE}}/api/media`** · 需要登录 · `multipart/form-data`

- 表单里放两个字段:`file`(二进制)、`_payload`(其余字段的 JSON 字符串)。

```bash
curl -X POST "https://stagingmt.datascaler.ai/api/media" \
  -H "Authorization: JWT $TOKEN" \
  -F 'file=@./hero.png;type=image/png' \
  -F '_payload={"alt":"Anker 社媒聆听看板截图","caption":"30 天平台情绪分布","credit":"DataScaler"}'
```

### 响应(201)

```json
{
  "message": "media successfully created.",
  "doc": {
    "id": 79,
    "alt": "Anker 社媒聆听看板截图",
    "caption": "30 天平台情绪分布",
    "credit": "DataScaler",
    "filename": "hero.png",
    "mimeType": "image/png",
    "filesize": 12345,
    "width": 1400,
    "height": 787,
    "url": "/api/media/file/hero.png",
    "sizes": {
      "thumbnail": { "url": "/api/media/file/hero-400x225.png", "width": 400, "height": 225 },
      "card":      { "url": "/api/media/file/hero-768x432.png", "width": 768, "height": 432 },
      "feature":   { "url": "/api/media/file/hero-1400x787.png", "width": 1400, "height": 787 }
    }
  }
}
```

> 记住返回的 **`doc.id`**,创建文章时把它填给 `heroImage` / `seo.ogImage`。

---

## 2. 查询图片(Read)

### 2.1 列表

**`GET {{BASE}}/api/media`** · 公开

```bash
curl "https://stagingmt.datascaler.ai/api/media?limit=20&sort=-createdAt"
```

返回 `{ docs, totalDocs, page, totalPages, limit, hasNextPage, ... }`。通用查询参数(`where` / `sort` / `limit` / `page` / `depth` / `select`)见 [02-posts-api.md](./02-posts-api.md#查询参数) 一节,Media 完全适用。

### 2.2 单条

**`GET {{BASE}}/api/media/:id`** · 公开

```bash
curl "https://stagingmt.datascaler.ai/api/media/79"
```

### 2.3 取图片文件本体

图片二进制走:`{{BASE}}/api/media/file/<filename>`(如 `.../api/media/file/hero.png`),或用响应里的 `url` / `sizes.*.url` 拼上域名。

---

## 3. 更新图片元数据(Update)

**`PATCH {{BASE}}/api/media/:id`** · 需要登录

- 只改元数据(alt/caption/credit)时用 JSON 即可,不必重传文件。
- 要**替换图片本体**,则跟上传一样用 `multipart/form-data` 带上新的 `file`。

```bash
curl -X PATCH "https://stagingmt.datascaler.ai/api/media/79" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"alt":"更准确的替代文本","caption":"新图注"}'
```

响应:`{ "message": "Updated successfully.", "doc": { ... } }`

---

## 4. 删除图片(Delete)

**`DELETE {{BASE}}/api/media/:id`** · 需要登录

```bash
curl -X DELETE "https://stagingmt.datascaler.ai/api/media/79" -H "Authorization: JWT $TOKEN"
```

响应:`{ "message": "Deleted successfully.", "doc": { ... } }`,删除后再 GET 该 id 返回 **404**。

> ⚠️ 若该图片正被某篇文章的 `heroImage` / `ogImage` 引用,删除后文章对应字段会变空,注意先解除引用或替换。

---

## 快速参考表

| 操作 | 方法 & 路径 | 登录 | Content-Type |
| --- | --- | --- | --- |
| 上传 | `POST /api/media` | ✅ | `multipart/form-data` |
| 列表 | `GET /api/media` | ❌ | — |
| 单条 | `GET /api/media/:id` | ❌ | — |
| 取文件 | `GET /api/media/file/:filename` | ❌ | — |
| 改元数据 | `PATCH /api/media/:id` | ✅ | `application/json` |
| 换图片 | `PATCH /api/media/:id` | ✅ | `multipart/form-data` |
| 删除 | `DELETE /api/media/:id` | ✅ | — |
