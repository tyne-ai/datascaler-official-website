/**
 * Lexical helpers: slug headings deterministically + extract TOC entries.
 *
 * We mutate a copy of the Lexical root and inject `__id` on each H2/H3 node so
 * the JSX converter can render <h2 id="..."> matching the TOC sidebar.
 */

export interface TocEntry {
  id: string;
  label: string;
  level: 2 | 3;
}

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
  __id?: string;
  [key: string]: unknown;
};

export interface LexicalDoc {
  root: LexicalNode;
}

function extractText(node: LexicalNode): string {
  if (!node) return '';
  if (typeof node.text === 'string') return node.text;
  const children = (node.children ?? []) as LexicalNode[];
  return children.map(extractText).join('');
}

function baseSlugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w一-鿿-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function ensureUniqueSlug(base: string, used: Set<string>, idx: number): string {
  const candidate = base || `section-${idx + 1}`;
  if (!used.has(candidate)) {
    used.add(candidate);
    return candidate;
  }
  let n = 2;
  while (used.has(`${candidate}-${n}`)) n++;
  const finalSlug = `${candidate}-${n}`;
  used.add(finalSlug);
  return finalSlug;
}

/**
 * Walks the document, annotates each heading node with `__id`, and returns the TOC.
 * Returns a NEW document tree (immutable) with annotated headings.
 */
export function annotateHeadingsAndExtractToc(
  doc: LexicalDoc | null | undefined,
): { doc: LexicalDoc | null; toc: TocEntry[] } {
  if (!doc?.root) return { doc: null, toc: [] };

  const toc: TocEntry[] = [];
  const used = new Set<string>();
  let counter = 0;

  function walk(node: LexicalNode): LexicalNode {
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const text = extractText(node);
      const slug = ensureUniqueSlug(baseSlugify(text), used, counter);
      counter += 1;
      toc.push({
        id: slug,
        label: text,
        level: node.tag === 'h2' ? 2 : 3,
      });
      return { ...node, __id: slug };
    }
    if (Array.isArray(node.children)) {
      return { ...node, children: node.children.map(walk) };
    }
    return node;
  }

  const annotatedRoot = walk(doc.root);
  return { doc: { ...doc, root: annotatedRoot }, toc };
}

/** Fields carried by a CTA Lexical block (see blocks/CallToAction.ts). */
export interface SidebarCta {
  eyebrow?: string;
  title?: string;
  description?: string;
  label?: string;
  url?: string;
  color?: string;
  customColor?: string;
  placement?: string;
  newTab?: boolean;
}

/**
 * Pulls CTA blocks marked `placement: 'sidebar'` OUT of the content tree so they
 * can be rendered in the right rail instead of inline. Returns a new doc with
 * those nodes removed (immutable) plus the extracted CTA field objects in order.
 */
export function extractSidebarCtas(
  doc: LexicalDoc | null | undefined,
): { doc: LexicalDoc | null; ctas: SidebarCta[] } {
  if (!doc?.root) return { doc: doc ?? null, ctas: [] };

  const ctas: SidebarCta[] = [];

  const isSidebarCta = (node: LexicalNode): boolean => {
    const fields = node.fields as { blockType?: string; placement?: string } | undefined;
    return node.type === 'block' && fields?.blockType === 'cta' && fields?.placement === 'sidebar';
  };

  function walk(node: LexicalNode): LexicalNode {
    if (!Array.isArray(node.children)) return node;
    const kept: LexicalNode[] = [];
    for (const child of node.children) {
      if (isSidebarCta(child)) {
        ctas.push((child.fields as SidebarCta) ?? {});
        continue; // drop from the inline flow
      }
      kept.push(walk(child));
    }
    return { ...node, children: kept };
  }

  return { doc: { ...doc, root: walk(doc.root) }, ctas };
}
