'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TocEntry } from '@/lib/lexical';

interface ArticleTocProps {
  items: TocEntry[];
  label: string;
}

/**
 * Table-of-contents nav for the article right rail. The sticky/visibility
 * wrapper is provided by the page so the rail can also hold sidebar CTAs.
 */
export function ArticleToc({ items, label }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -65% 0px', threshold: 0 },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={label}>
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#24133f]/40">
        {label}
      </div>
      <ul className="space-y-1 border-l border-[#3d2673]/15">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className={cn(item.level === 3 && 'pl-3')}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block -ml-px border-l-2 py-1.5 pl-3 text-xs font-semibold leading-snug transition-colors',
                  isActive
                    ? 'border-[#3d2673] text-[#24133f]'
                    : 'border-transparent text-[#24133f]/40 hover:text-[#24133f]',
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
