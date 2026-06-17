import type { CollectionConfig, FieldHook } from 'payload';

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

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'lang', 'category', 'publishedDate', 'status'],
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
