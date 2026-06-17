import { RichText } from '@payloadcms/richtext-lexical/react';
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';

import { CtaBlock } from './CtaBlock';

function buildConverters(lang?: 'zh' | 'en'): JSXConvertersFunction {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    // Custom blocks inserted via the Lexical "Blocks" feature (key = block slug).
    blocks: {
      cta: ({ node }: any) => {
        const fields = node?.fields ?? {};
        // Sidebar CTAs are lifted out of the flow and rendered in the right rail.
        if (fields.placement === 'sidebar') return null;
        return <CtaBlock {...fields} variant="inline" lang={lang} />;
      },
    },
    // Override heading converter to add anchor ids (pre-injected via __id by annotateHeadingsAndExtractToc)
    heading: ({ node, nodesToJSX }: any) => {
      const id = node.__id as string | undefined;
      const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const children = nodesToJSX({ nodes: node.children ?? [] });
      return (
        <Tag id={id} className="scroll-mt-24">
          {children}
        </Tag>
      );
    },
  });
}

export function RichTextRenderer({ data, lang }: { data: any; lang?: 'zh' | 'en' }) {
  if (!data) return null;
  return <RichText data={data} converters={buildConverters(lang)} />;
}
