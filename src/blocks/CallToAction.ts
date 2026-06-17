import type { Block } from 'payload';

/**
 * Call-to-Action block — inserted inline in the article rich-text editor via the
 * Lexical "Blocks" feature.
 *
 * Only the link is required; everything else is optional with sensible defaults.
 * `placement` decides whether it renders as an inline banner in the article body
 * or as a sticky card in the right sidebar (extracted out of the flow at render).
 * `color` picks an accent; pick "Custom" to drive any hex — all tints, borders,
 * hover and button-ink are derived from that one color at render time.
 *
 * Serialized into the `content` field JSON — no extra DB table.
 */
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: {
    singular: 'Call to Action (CTA)',
    plural: 'Call to Action (CTA)',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: '小标签 / Eyebrow',
      admin: {
        placeholder: 'NEXT STEP · 下一步',
        description: 'Optional small label above the title. 标题上方的小标签,可留空。',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '标题 / Title',
      admin: { description: 'Optional headline. 可选标题。' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述 / Description',
      admin: { description: 'Optional supporting line. 可选副文案。' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: '按钮文本 / Button text',
          admin: {
            width: '50%',
            placeholder: '免费试用 / Start free',
            description: 'Optional — defaults to "Learn more / 了解更多".',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: '跳转链接 / Link',
          admin: {
            width: '50%',
            placeholder: 'https://app.datascaler.ai/plans',
            description: 'The only required field. 唯一必填项。',
          },
          validate: (value: unknown) => {
            const v = typeof value === 'string' ? value.trim() : '';
            if (!v) return 'Link is required / 请填写跳转链接';
            if (/^(https?:\/\/|\/|mailto:|tel:|#)/i.test(v)) return true;
            return 'Use a full URL (https://…) or a relative path starting with / · 请使用完整链接或以 / 开头的路径';
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'placement',
          type: 'select',
          defaultValue: 'inline',
          label: '位置 / Placement',
          admin: {
            width: '50%',
            description: 'Inline = 嵌在正文的横幅;Sidebar = 右侧粘性卡片(移动端落到文末)。',
          },
          options: [
            { label: '📄 文章内 / Inline banner', value: 'inline' },
            { label: '📌 侧边栏 / Sidebar card', value: 'sidebar' },
          ],
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'default',
          label: '颜色 / Color',
          admin: { width: '50%', description: 'Pick a preset or "Custom" for any hex.' },
          options: [
            { label: '🟢 Emerald · 品牌默认', value: 'default' },
            { label: '🩵 Teal', value: 'teal' },
            { label: '🩵 Sky', value: 'sky' },
            { label: '🔵 Blue', value: 'blue' },
            { label: '🟣 Indigo', value: 'indigo' },
            { label: '🟣 Violet', value: 'violet' },
            { label: '🟣 Fuchsia', value: 'fuchsia' },
            { label: '🩷 Pink', value: 'pink' },
            { label: '🌹 Rose', value: 'rose' },
            { label: '🟠 Orange', value: 'orange' },
            { label: '🟡 Amber', value: 'amber' },
            { label: '⚪ Slate · 中性', value: 'slate' },
            { label: '🎨 自定义 / Custom…', value: 'custom' },
          ],
        },
      ],
    },
    {
      name: 'customColor',
      type: 'text',
      label: '自定义颜色 / Custom color',
      admin: {
        placeholder: '#6366f1',
        description: 'Hex color, e.g. #6366f1. 十六进制颜色。',
        condition: (_data, siblingData) =>
          (siblingData as { color?: string } | undefined)?.color === 'custom',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      defaultValue: true,
      label: '新标签页打开 / Open in new tab',
    },
  ],
};
