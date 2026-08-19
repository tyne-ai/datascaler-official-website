# DataScaler 博客 CMS —— REST API 说明

本目录是 Payload CMS(marketing-next)对外 REST 接口的使用文档,覆盖 **Media(图片资源)** 与 **Posts(博客文章)** 两个集合的**增 / 删 / 改 / 查**,以及调用前必须先拿到的**登录凭证**。

## 文档索引

| 文件 | 内容 |
| --- | --- |
| [00-authentication.md](./00-authentication.md) | 获取凭证:登录拿 token、鉴权头、有效期、登出 |
| [01-media-api.md](./01-media-api.md) | Media 集合:图片上传 / 查询 / 更新 / 删除 |
| [02-posts-api.md](./02-posts-api.md) | Posts 集合:文章创建 / 查询 / 更新 / 删除 + Lexical 正文结构 |
| [scripts/](./scripts/) | 一键发文脚本 `create-post.mjs`(写 Markdown 自动转 Lexical 发布)+ 示例 `sample-article.md` |

## 一键发文脚本

不想手写 Lexical JSON,就用 [scripts/create-post.mjs](./scripts/create-post.mjs):写带 frontmatter 的 Markdown,自动转富文本并发布。在 `apps/marketing-next` 目录下运行:

```bash
# 预览将提交的 JSON(不登录、不创建)
node "src/app/(payload)/api-docs/scripts/create-post.mjs" \
     "src/app/(payload)/api-docs/scripts/sample-article.md" --dry

# 真正发布
PAYLOAD_BASE="https://stagingmt.datascaler.ai" \
PAYLOAD_EMAIL="admin@datascaler.ai" PAYLOAD_PASSWORD="********" \
node "src/app/(payload)/api-docs/scripts/create-post.mjs" \
     "src/app/(payload)/api-docs/scripts/sample-article.md"
```

## 环境区分(重要)

| 环境 | Base URL | 说明 |
| --- | --- | --- |
| **测试环境**(staging) | `https://stagingmt.datascaler.ai` | 随便造数据,本文所有写入示例都在这里跑通过 |
| **正式环境**(production) | `https://www.datascaler.ai` | 面向真实用户,写入前务必先在测试环境验证 |

> 所有接口路径都是 `{{BASE}}/api/...`,把 `{{BASE}}` 换成上面对应环境的域名即可。
> 例:测试环境登录 = `https://stagingmt.datascaler.ai/api/users/login`。

## 鉴权速览

| 操作 | 是否需要登录 |
| --- | --- |
| 读取(GET)已发布文章 / 任意图片 | ❌ 不需要 |
| 创建 / 更新 / 删除文章 | ✅ 需要(`Authorization: JWT <token>`) |
| 上传 / 更新 / 删除图片 | ✅ 需要 |
| 读取草稿文章(`?draft=true` / `status=draft`) | ✅ 需要 |

## 已验证账号

- 邮箱:`admin@datascaler.ai`
- 该账号在**测试环境**和**正式环境**均可登录(已实测)。
- 密码请勿写进代码 / 提交到仓库,统一走环境变量(见 00 文档)。

## 通用约定

- 请求 / 响应体均为 JSON;**图片上传是唯一例外**,用 `multipart/form-data`(见 01 文档)。
- 时间字段为 ISO 8601 字符串(如 `2026-08-06T00:00:00.000Z`)。
- 鉴权头格式是 **`Authorization: JWT <token>`**(注意是 `JWT` 不是 `Bearer`)。
- 列表查询、分页、过滤、排序、关联展开等**通用 query 参数**在 02 文档「查询参数」一节统一说明,Media 同样适用。

---

> 本文档中所有 curl 示例默认使用测试环境。切正式环境时,只需把域名换成 `https://www.datascaler.ai`。
