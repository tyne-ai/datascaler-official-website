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
      <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-4 font-semibold">
        {label}
      </div>
      <ul className="space-y-2 border-l border-white/10">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className={cn(item.level === 3 && 'pl-3')}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block -ml-px border-l-2 pl-3 py-1 text-xs leading-snug transition-colors',
                  isActive
                    ? 'border-emerald-400 text-emerald-300 font-medium'
                    : 'border-transparent text-slate-400 hover:text-white',
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
