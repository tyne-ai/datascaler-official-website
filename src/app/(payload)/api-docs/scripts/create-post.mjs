#!/usr/bin/env node
/**
 * create-post.mjs — 用管理员账号登录 Payload,把一篇 Markdown 直接发布为博客文章。
 * 不改任何后端代码:走 Payload 原生 REST(/api/users/login → /api/posts)。
 *
 * 位置:apps/marketing-next/src/app/(payload)/api-docs/scripts/
 * 用法(在 apps/marketing-next 下运行,注意路径带括号需加引号):
 *   PAYLOAD_EMAIL=you@x.com PAYLOAD_PASSWORD=*** \
 *     node "src/app/(payload)/api-docs/scripts/create-post.mjs" \
 *          "src/app/(payload)/api-docs/scripts/sample-article.md" [--dry]
 *
 * 可选环境变量:
 *   PAYLOAD_BASE   接口根地址,默认 https://stagingmt.datascaler.ai
 *   PAYLOAD_EMAIL  管理员邮箱(必填,--dry 除外)
 *   PAYLOAD_PASSWORD 管理员密码(必填,--dry 除外)
 *
 * Markdown 文件格式(顶部 frontmatter + 正文):
 *   ---
 *   title: 标题(必填)
 *   lang: zh            # zh | en,默认 zh
 *   status: published   # published | draft,默认 published
 *   excerpt: 摘要
 *   category: Social Listening
 *   tag: 关键词1, 关键词2
 *   readTime: 6 min read
 *   author: DataScaler Research
 *   publishedDate: 2026-08-06   # 省略则用当前时间
 *   translation: 2              # 另一语言对应文章的 id(数字);须为相反语言,对方会自动回填(1:1)
 *   seo.metaTitle: ...          # 点号写法 → 嵌套到 seo 组
 *   ---
 *
 *   ## 一级小节(## / ### 会进目录 TOC)
 *   正文段落,支持 **粗体**、*斜体*、`行内代码`。
 *
 *   - 无序列表项
 *   1. 有序列表项
 *
 * 说明:富文本仅支持标题/段落/列表/粗斜体/行内代码。图片、链接、引用块等
 * 请发布后在 /admin 里补,或告诉我扩展转换器。
 */

import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.env.PAYLOAD_BASE || 'https://stagingmt.datascaler.ai').replace(/\/+$/, '');
const EMAIL = process.env.PAYLOAD_EMAIL;
const PASSWORD = process.env.PAYLOAD_PASSWORD;

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const file = argv.find((a) => !a.startsWith('--'));
if (!file) {
  console.error('用法: node scripts/create-post.mjs <article.md> [--dry]');
  process.exit(1);
}
if (!DRY && (!EMAIL || !PASSWORD)) {
  console.error('缺少凭据: 请设置环境变量 PAYLOAD_EMAIL 和 PAYLOAD_PASSWORD');
  process.exit(1);
}

// ---------- 1) 读取 & 解析 frontmatter + 正文 ----------
const raw = fs.readFileSync(path.resolve(file), 'utf8').replace(/\r\n/g, '\n');
const { meta, body } = parseFrontmatter(raw);
if (!meta.title) {
  console.error('frontmatter 缺少必填字段: title');
  process.exit(1);
}

// ---------- 2) 组装文章字段 ----------
const KNOWN = new Set([
  'title', 'slug', 'lang', 'status', 'category', 'tag',
  'excerpt', 'publishedDate', 'readTime', 'author', 'heroImageHref', 'translation',
]);
const post = { lang: 'zh', status: 'published' };
const seo = {};
for (const [k, v] of Object.entries(meta)) {
  if (k.startsWith('seo.')) seo[k.slice(4)] = v;
  else if (KNOWN.has(k)) post[k] = v;
}
if (Object.keys(seo).length) post.seo = seo;
if (!post.publishedDate) post.publishedDate = new Date().toISOString();
// translation 是关联字段,后端要的是数字 id(校验:须为相反语言、必须存在、不能是自己)。
if (post.translation != null && post.translation !== '') post.translation = Number(post.translation);
else delete post.translation;
if (body.trim()) post.content = { root: mdToLexicalRoot(body) };

if (DRY) {
  console.log('--- DRY RUN: 将提交到 ' + BASE + '/api/posts ---');
  console.log(JSON.stringify(post, null, 2));
  process.exit(0);
}

// ---------- 3) 登录拿 token ----------
const token = await login();

// ---------- 4) 创建文章 ----------
// drafts 已开启:POST 默认 _status=draft。要一步发布必须在 body 里显式带 _status='published';
// 草稿则带 ?draft=true 让版本状态置为 draft。前台匿名列表要求 status 与 _status 同为 published。
const isDraft = post.status === 'draft';
const createUrl = `${BASE}/api/posts${isDraft ? '?draft=true' : ''}`;
const createBody = { ...post, _status: isDraft ? 'draft' : 'published' };
const res = await fetch(createUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
  body: JSON.stringify(createBody),
});
const out = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(`创建失败 HTTP ${res.status}:`);
  console.error(JSON.stringify(out, null, 2));
  process.exit(1);
}
const doc = out.doc || out;
const url = `${BASE}/${post.lang === 'en' ? 'en/' : ''}blog/${doc.slug}`;
console.log('✅ 已创建');
console.log(`   id:     ${doc.id}`);
console.log(`   slug:   ${doc.slug}`);
console.log(`   status: ${doc.status} / _status=${doc._status}`);
console.log(`   url:    ${url}`);

// ==================== helpers ====================

async function login() {
  const r = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.token) {
    console.error(`登录失败 HTTP ${r.status}: ${JSON.stringify(j)}`);
    process.exit(1);
  }
  return j.token;
}

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key) meta[key] = val;
  }
  return { meta, body: text.slice(m[0].length) };
}

// ---- Markdown → Lexical ----
function node(type, extra, children) {
  return { children: children || [], direction: null, format: '', indent: 0, type, version: 1, ...extra };
}
function textNode(text, format = 0) {
  return { detail: 0, format, mode: 'normal', style: '', text, type: 'text', version: 1 };
}

// 行内: **粗体** *斜体* `代码`  (位掩码: bold=1 italic=2 code=16)
function parseInline(str) {
  const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|_[^_]+_)/g).filter((s) => s !== '');
  const nodes = [];
  for (const p of parts) {
    if (p.startsWith('**') && p.endsWith('**')) nodes.push(textNode(p.slice(2, -2), 1));
    else if (p.startsWith('`') && p.endsWith('`')) nodes.push(textNode(p.slice(1, -1), 16));
    else if ((p.startsWith('*') && p.endsWith('*')) || (p.startsWith('_') && p.endsWith('_')))
      nodes.push(textNode(p.slice(1, -1), 2));
    else nodes.push(textNode(p));
  }
  return nodes.length ? nodes : [textNode('')];
}

function paragraph(text) {
  return node('paragraph', { textFormat: 0, textStyle: '' }, parseInline(text));
}
function heading(hashes, text) {
  const level = Math.min(Math.max(hashes, 2), 4); // 编辑器仅启用 h2/h3/h4
  return node('heading', { tag: `h${level}` }, parseInline(text));
}
function listBlock(items, ordered) {
  const children = items.map((t, i) => node('listitem', { value: i + 1 }, parseInline(t)));
  return node('list', {
    listType: ordered ? 'number' : 'bullet',
    start: 1,
    tag: ordered ? 'ol' : 'ul',
  }, children);
}

function mdToLexicalRoot(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let para = [];
  let list = null; // { ordered, items }
  const flushPara = () => { if (para.length) { blocks.push(paragraph(para.join(' '))); para = []; } };
  const flushList = () => { if (list) { blocks.push(listBlock(list.items, list.ordered)); list = null; } };

  for (const line of lines) {
    const t = line.trim();
    if (t === '') { flushPara(); flushList(); continue; }
    const h = t.match(/^(#{1,6})\s+(.*)$/);
    const ul = t.match(/^[-*]\s+(.*)$/);
    const ol = t.match(/^\d+\.\s+(.*)$/);
    if (h) { flushPara(); flushList(); blocks.push(heading(h[1].length, h[2])); continue; }
    if (ul) {
      flushPara();
      if (list && !list.ordered) list.items.push(ul[1]);
      else { flushList(); list = { ordered: false, items: [ul[1]] }; }
      continue;
    }
    if (ol) {
      flushPara();
      if (list && list.ordered) list.items.push(ol[1]);
      else { flushList(); list = { ordered: true, items: [ol[1]] }; }
      continue;
    }
    flushList();
    para.push(t.replace(/^>\s?/, ''));
  }
  flushPara();
  flushList();
  return node('root', {}, blocks);
}
