# 00 · 获取凭证(Authentication)

调用任何**写入**接口(创建 / 更新 / 删除文章、上传 / 删除图片)前,必须先登录拿到 **JWT token**,并在后续请求里带上 `Authorization: JWT <token>` 头。读取已发布内容不需要登录。

## 环境

| 环境 | Base URL |
| --- | --- |
| 测试 | `https://stagingmt.datascaler.ai` |
| 正式 | `https://www.datascaler.ai` |

下文 `{{BASE}}` 代表其中之一。

---

## 1. 登录:换取 token

**`POST {{BASE}}/api/users/login`**

### 传入参数(JSON body)

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `email` | string | ✅ | 管理员邮箱,如 `admin@datascaler.ai` |
| `password` | string | ✅ | 密码 |

### 请求示例

```bash
curl -X POST "https://stagingmt.datascaler.ai/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@datascaler.ai","password":"你的密码"}'
```

### 响应(200)

```json
{
  "message": "Authentication Passed",
  "exp": 1786007939,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@datascaler.ai",
    "name": "DataScaler Admin",
    "createdAt": "2026-05-27T01:54:21.063Z"
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `token` | 后续所有写入请求要带的 JWT |
| `exp` | 过期时间(Unix 秒)。默认有效期 **2 小时**,过期后需重新登录 |
| `user` | 当前登录用户信息 |

- 登录失败返回 **401** `{"errors":[{"message":"The email or password provided is incorrect."}]}`。
- Payload 默认有登录失败次数限制(多次错密码会临时锁定),脚本里不要盲目重试。

---

## 2. 使用 token(鉴权头)

后续写入请求统一加这个头:

```
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ 是 **`JWT`** 前缀,不是 `Bearer`。

```bash
TOKEN="上一步拿到的 token"
curl -X POST "https://stagingmt.datascaler.ai/api/posts" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

一行拿 token 的写法(bash + node):

```bash
TOKEN=$(curl -s -X POST "https://stagingmt.datascaler.ai/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@datascaler.ai","password":"你的密码"}' \
  | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.parse(d).token))")
```

---

## 3. 当前用户 / 校验 token

**`GET {{BASE}}/api/users/me`** —— 带上鉴权头,返回当前登录用户;token 失效则 `user` 为 `null`。

```bash
curl "https://stagingmt.datascaler.ai/api/users/me" -H "Authorization: JWT $TOKEN"
```

---

## 4. 刷新 token

**`POST {{BASE}}/api/users/refresh-token`** —— 带上旧 token,换一个新的、延长有效期。适合长时间运行的脚本在临近过期时调用。

```bash
curl -X POST "https://stagingmt.datascaler.ai/api/users/refresh-token" -H "Authorization: JWT $TOKEN"
```

---

## 5. 登出

**`POST {{BASE}}/api/users/logout`** —— 带上鉴权头,使当前会话失效。

```bash
curl -X POST "https://stagingmt.datascaler.ai/api/users/logout" -H "Authorization: JWT $TOKEN"
```

---

## 安全建议

- **不要**把邮箱 / 密码 / token 写死进代码或提交到 Git。统一用环境变量:

  ```bash
  export PAYLOAD_BASE="https://stagingmt.datascaler.ai"
  export PAYLOAD_EMAIL="admin@datascaler.ai"
  export PAYLOAD_PASSWORD="********"
  ```

- token 只在内存里传递;每次脚本运行时现登录现用。
- 如果要做**长期不过期**的自动化(定时批量发文),更推荐给 Users 集合开启 API Key(需改 `src/collections/Users.ts` 的 `auth: { useAPIKey: true }` 并重新部署),用 `Authorization: users API-Key <key>` 调用,不受 2 小时过期限制。
