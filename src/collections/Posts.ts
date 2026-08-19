import type {
  CollectionAfterChangeHook,
  CollectionConfig,
  FieldHook,
  RelationshipFieldSingleValidation,
  Where,
} from 'payload';

const slugify = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// Auto-fill slug from title when slug is left empty.
const ensureSlug: FieldHook = ({ value, data }) => {
  if (typeof value === 'string' && value.length > 0) return value;
  if (data?.title) return slugify(String(data.title));
  return value;
};

// Normalize a relationship value (number id, `{ id }`, `{ value }`, or empty) to a numeric id.
const relIdOf = (v: unknown): number | null => {
  if (v == null || v === '') return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object') {
    const raw = (v as { id?: unknown; value?: unknown }).id ?? (v as { value?: unknown }).value;
    return raw == null ? null : Number(raw);
  }
  return null;
};

// Server-side guard for the `translation` link. The referenced post must:
//   1. exist,
//   2. be in the OPPOSITE language of the article being saved,
//   3. not be the article itself,
//   4. not already be some OTHER article's translation (keeps links strictly 1:1).
const validateTranslation: RelationshipFieldSingleValidation = async (
  value,
  { req, data, id },
) => {
  const relId = relIdOf(Array.isArray(value) ? value[0] : value);
  if (relId == null) return true; // optional field

  const currentLang = (data as { lang?: string } | undefined)?.lang;
  const expected = currentLang === 'en' ? 'zh' : 'en';
  try {
    const target = await req.payload.findByID({
      collection: 'posts',
      id: relId,
      depth: 0,
      req,
    });
    if (!target) return 'Selected translation does not exist.';
    if (id != null && String(target.id) === String(id)) {
      return 'An article cannot be its own translation.';
    }
    if (target.lang !== expected) {
      return `Translation must be a ${
        expected === 'zh' ? 'Chinese (中文)' : 'English'
      } article — it has to be the opposite language of this one.`;
    }

    // (4) A post can be the translation of at most ONE article. Reject if another
    // post already points at this target (the article being saved is excluded).
    // Note: counts the published view — a link that lives only in an unpublished
    // draft won't be seen here, which is an acceptable edge for the blog.
    const { totalDocs } = await req.payload.count({
      collection: 'posts',
      where:
        id != null
          ? { and: [{ translation: { equals: target.id } }, { id: { not_equals: id } }] }
          : { translation: { equals: target.id } },
      req,
    });
    if (totalDocs > 0) {
      return 'That article is already another post’s translation. Unlink it there first, or pick a different one.';
    }
    return true;
  } catch {
    return 'Selected translation does not exist.';
  }
};

// Auto-reciprocate the translation link: setting A→X also makes X→A, and
// re-pointing A elsewhere clears the now-stale partner. The hook writes ONLY when
// a link isn't already correct, so nested re-fires converge to the fixed point and
// stop — no recursion flag needed. The stale partner is detached BEFORE the new one
// is linked, so the 1:1 uniqueness guard in validateTranslation never trips on our
// own writes.
const syncTranslation: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const self = doc.id as number;
  const newT = relIdOf(doc.translation);
  const oldT = relIdOf(previousDoc?.translation);
  if (newT === oldT) return doc; // translation link unchanged — nothing to sync

  // 1) Detach the previous partner if it still points back at us.
  if (oldT != null && oldT !== newT) {
    try {
      const old = await req.payload.findByID({ collection: 'posts', id: oldT, depth: 0, req });
      if (old && relIdOf(old.translation) === self) {
        await req.payload.update({
          collection: 'posts',
          id: oldT,
          data: { translation: null },
          req,
          overrideAccess: true,
        });
      }
    } catch {
      /* old partner already gone — nothing to detach */
    }
  }

  // 2) Point the new partner back at us (unless it already does).
  if (newT != null) {
    try {
      const target = await req.payload.findByID({ collection: 'posts', id: newT, depth: 0, req });
      if (target && relIdOf(target.translation) !== self) {
        await req.payload.update({
          collection: 'posts',
          id: newT,
          data: { translation: self },
          req,
          overrideAccess: true,
        });
      }
    } catch {
      /* target missing — validateTranslation would already have rejected this */
    }
  }

  return doc;
};

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'lang', 'translation', 'category', 'publishedDate', 'status'],
    description:
      'Marketing blog articles. Pick "Published" status to make a post live. Use the rich text editor for headings, bold paragraphs, lists, and embedded images.',
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3200';
      if (!doc?.slug) return null;
      return `${base}/blog/${doc.slug}?preview=true`;
    },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        status: { equals: 'published' },
      };
    },
  },
  versions: {
    drafts: true,
  },
  hooks: {
    // Keep translation links reciprocal and 1:1 (see syncTranslation).
    afterChange: [syncTranslation],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [ensureSlug] },
      admin: {
        description:
          'URL path segment. Final URL: /blog/<slug>. Leave blank to auto-generate from title. Use lowercase letters, digits, and dashes only.',
        placeholder: 'consumer-electronics-anker-en',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lang',
          type: 'select',
          required: true,
          defaultValue: 'zh',
          options: [
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
      ],
    },
    {
      name: 'translation',
      type: 'relationship',
      relationTo: 'posts',
      maxDepth: 1,
      admin: {
        description:
          'The matching article in the OTHER language (Chinese ⇄ English). Only opposite-language posts are selectable. Set it on BOTH articles so the header language toggle jumps between them. Leave blank if no translation exists — the toggle then falls back to the blog list.',
      },
      // Dropdown only offers opposite-language posts that are still free to link —
      // i.e. not this same post, and either unlinked or already paired with THIS one.
      // Posts already claimed by another article are hidden (mirrors the 1:1 guard).
      filterOptions: ({ data, id }) => {
        const otherLang = data?.lang === 'en' ? 'zh' : 'en';
        const and: Where[] = [{ lang: { equals: otherLang } }];
        if (id != null) and.push({ id: { not_equals: id } });
        and.push({
          or: [
            { translation: { exists: false } },
            ...(id != null ? [{ translation: { equals: id } }] : []),
          ],
        });
        return { and };
      },
      // Server-side guard: the referenced post must exist AND be in the opposite language.
      validate: validateTranslation,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          defaultValue: 'Social Listening',
        },
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: { description: 'Single tag chip, e.g. "Consumer Electronics" or "消费电子"' },
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'dayOnly' } },
        },
        {
          name: 'readTime',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "8 min read" or "阅读约 9 分钟"' },
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroImageHref',
      type: 'text',
      admin: { description: 'Optional click-through URL for the hero image' },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'DataScaler Research',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description:
          'Use H2/H3 headings — they become the side TOC. Use bold for emphasis. Images can be embedded via the upload button.',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Social',
      admin: {
        description:
          'Search-engine and social-share metadata. Empty fields fall back to the article title / excerpt / hero image.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: { description: 'Overrides the <title>. Falls back to the article title.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: { description: 'Meta description (~155 chars). Falls back to the excerpt.' },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          admin: { description: 'Comma-separated keywords (optional).' },
        },
        {
          name: 'canonical',
          type: 'text',
          admin: {
            description: 'Absolute or relative canonical URL. Falls back to /blog/<slug>.',
            placeholder: '/blog/your-slug',
          },
        },
        {
          name: 'ogTitle',
          type: 'text',
          admin: { description: 'Open Graph / social title. Falls back to meta title.' },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          admin: { description: 'Open Graph / social description. Falls back to meta description.' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Social share image (1200×630 recommended). Falls back to hero image.' },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Add noindex,nofollow to keep this page out of search engines.' },
        },
      ],
    },
  ],
};
