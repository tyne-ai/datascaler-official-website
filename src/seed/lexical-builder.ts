/**
 * Minimal Lexical node builders for seeding Payload posts.
 * Supports paragraphs, headings, bullet/number lists, blockquotes, hr, and inline images.
 * Inline bold is written with **double asterisks**.
 */

type TextNode = {
  type: 'text';
  text: string;
  format: number;
  detail: number;
  mode: 'normal';
  style: '';
  version: 1;
};

function textNode(text: string, format = 0): TextNode {
  return { type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 };
}

/** Parse a string with **bold** markers into Lexical text nodes. */
function inline(text: string): TextNode[] {
  const parts = text.split('**');
  const nodes: TextNode[] = [];
  parts.forEach((part, i) => {
    if (part === '') return;
    nodes.push(textNode(part, i % 2 === 1 ? 1 : 0));
  });
  return nodes.length ? nodes : [textNode(text)];
}

const baseBlock = {
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
};

export function p(text: string) {
  return { type: 'paragraph', ...baseBlock, children: inline(text) };
}

export function h2(text: string) {
  return { type: 'heading', tag: 'h2', ...baseBlock, children: inline(text) };
}

export function h3(text: string) {
  return { type: 'heading', tag: 'h3', ...baseBlock, children: inline(text) };
}

export function ul(items: string[]) {
  return {
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    ...baseBlock,
    children: items.map((item, i) => ({
      type: 'listitem',
      value: i + 1,
      ...baseBlock,
      children: inline(item),
    })),
  };
}

export function ol(items: string[]) {
  return {
    type: 'list',
    listType: 'number',
    tag: 'ol',
    start: 1,
    ...baseBlock,
    children: items.map((item, i) => ({
      type: 'listitem',
      value: i + 1,
      ...baseBlock,
      children: inline(item),
    })),
  };
}

export function quote(text: string) {
  return { type: 'quote', ...baseBlock, children: inline(text) };
}

export function hr() {
  return { type: 'horizontalrule', version: 1 };
}

/** Inline image (upload node) referencing a media doc id. */
export function img(mediaId: number | string) {
  return {
    type: 'upload',
    relationTo: 'media',
    value: mediaId,
    fields: null,
    format: '',
    version: 3,
  };
}

/** Call-to-Action block (Lexical "Blocks" feature). Serialized inside the field JSON. */
export function cta(opts: {
  label: string;
  url: string;
  title?: string;
  description?: string;
  color?: 'default' | 'blue' | 'violet' | 'amber' | 'rose' | 'slate';
  newTab?: boolean;
}) {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      blockType: 'cta',
      label: opts.label,
      url: opts.url,
      title: opts.title ?? '',
      description: opts.description ?? '',
      color: opts.color ?? 'default',
      newTab: opts.newTab ?? true,
    },
  };
}

export function doc(children: unknown[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children,
    },
  };
}
