import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import config from '../payload.config.js';
import { buildEnContent } from './content-en.js';
import { buildCnContent } from './content-cn.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const PUBLIC_BLOG = path.resolve(dirname, '../../public/blog-seed');

async function upsertMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  file: string,
  alt: string,
): Promise<number | string> {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  });
  if (existing.docs[0]) return existing.docs[0].id;
  const created = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.join(PUBLIC_BLOG, file),
  });
  return created.id;
}

async function upsertPost(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs[0]) {
    await payload.update({
      collection: 'posts',
      id: existing.docs[0].id,
      data: data as never,
    });
    console.log(`Updated post: ${slug}`);
  } else {
    await payload.create({ collection: 'posts', data: data as never });
    console.log(`Created post: ${slug}`);
  }
}

async function run() {
  const payload = await getPayload({ config });

  // 1. Admin user
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@datascaler.local';
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026';
  const users = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 });
  if (!users.docs[0]) {
    await payload.create({ collection: 'users', data: { email, password, name: 'DataScaler Admin' } });
    console.log(`Created admin user: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  // 2. Media
  const heroId = await upsertMedia(payload, 'anker-hero.jpg', 'Anker Social Listening — hero');
  const dashboardId = await upsertMedia(payload, 'anker-dashboard.jpg', 'Anker Snapshot — 30-day social listening dashboard');
  const insightId = await upsertMedia(payload, 'anker-insight-engine.jpg', 'DataScaler Insight Engine — demand drivers and trust risks');

  // 3. Posts
  await upsertPost(payload, 'consumer-electronics-social-listening-anker-growth-trust-voc-risk', {
    title: "Consumer Electronics Social Listening: What Anker's Data Reveals About Growth, Trust, and VOC Risk",
    slug: 'consumer-electronics-social-listening-anker-growth-trust-voc-risk',
    lang: 'en',
    status: 'published',
    category: 'Social Listening',
    tag: 'Consumer Electronics',
    excerpt:
      "Anker's 30-day public social conversation snapshot shows how social listening reveals demand formation, platform-level sentiment shifts, recurring VOC issues, and early trust-risk signals.",
    publishedDate: '2026-05-22T00:00:00.000Z',
    readTime: '8 min read',
    author: 'DataScaler Research',
    heroImage: heroId,
    heroImageHref: 'https://app.datascaler.ai/plans',
    content: buildEnContent(dashboardId, insightId),
    seo: {
      metaTitle: 'Anker Social Listening: Growth, Trust & VOC Risk | DataScaler',
      metaDescription:
        "Anker's 30-day social conversation snapshot: demand formation, sentiment shifts, recurring VOC issues, and early trust-risk signals for consumer electronics brands.",
      canonical: '/blog/consumer-electronics-social-listening-anker-growth-trust-voc-risk',
    },
  });

  await upsertPost(payload, 'consumer-electronics-social-listening-anker-datascaler-cn', {
    title: '消费电子 Social Listening：Anker 的热度背后，藏着哪些信任压力与 VOC 风险？',
    slug: 'consumer-electronics-social-listening-anker-datascaler-cn',
    lang: 'zh',
    status: 'published',
    category: 'Social Listening',
    tag: '消费电子',
    excerpt:
      '基于 Anker 最近 30 天的公开社交讨论，拆解消费电子品牌在高热度背后正在累积的信任压力、平台分化和 VOC 风险，并展示 DataScaler 如何把公开讨论整理成可追溯、可验证的业务判断。',
    publishedDate: '2026-05-22T00:00:00.000Z',
    readTime: '阅读约 9 分钟',
    author: 'DataScaler Research',
    heroImage: heroId,
    heroImageHref: 'https://app.datascaler.ai/plans',
    content: buildCnContent(dashboardId, insightId),
    seo: {
      metaTitle: '消费电子 Social Listening：Anker 的信任压力与 VOC 风险 | DataScaler',
      metaDescription:
        '基于 Anker 最近 30 天的公开社交讨论，这篇文章拆解了消费电子品牌在高热度背后正在累积的信任压力、平台分化和 VOC 风险。',
      canonical: '/blog/consumer-electronics-social-listening-anker-datascaler-cn',
    },
  });

  console.log('Seed complete.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
