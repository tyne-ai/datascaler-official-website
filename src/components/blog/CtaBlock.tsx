import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';

export type CtaColor =
  | 'default'
  | 'teal'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'orange'
  | 'amber'
  | 'slate'
  | 'custom';

export type CtaPlacement = 'inline' | 'sidebar';

export interface CtaBlockProps {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  label?: string | null;
  url?: string | null;
  color?: CtaColor | string | null;
  customColor?: string | null;
  placement?: CtaPlacement | string | null;
  newTab?: boolean | null;
  /** Overrides `placement` when the page renders the block in a fixed location. */
  variant?: CtaPlacement;
  /** Article language — drives the default button label. */
  lang?: 'zh' | 'en';
  // Carried by the Lexical block node; ignored here.
  blockType?: string;
  id?: string | null;
}

/** One accent hex per preset. Every other color is derived from it via color-mix. */
const PRESET_ACCENTS: Record<Exclude<CtaColor, 'custom'>, string> = {
  default: '#10b981',
  teal: '#14b8a6',
  sky: '#0ea5e9',
  blue: '#3b82f6',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  fuchsia: '#d946ef',
  pink: '#ec4899',
  rose: '#f43f5e',
  orange: '#f97316',
  amber: '#f59e0b',
  slate: '#64748b',
};

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function normalizeHex(input: string): string | null {
  const v = input.trim();
  if (!HEX.test(v)) return null;
  const h = v.slice(1);
  return h.length === 3
    ? `#${h
        .split('')
        .map((c) => c + c)
        .join('')}`
    : `#${h}`;
}

/** Relative luminance (WCAG) of a #rrggbb color. */
function luminance(hex: string): number {
  const h = hex.slice(1);
  const channel = (i: number) => {
    const s = parseInt(h.slice(i, i + 2), 16) / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

/** Pick legible button ink: prefer light text, fall back to dark when contrast is poor. */
function inkFor(accentHex: string): string {
  const contrastWithWhite = 1.05 / (luminance(accentHex) + 0.05);
  return contrastWithWhite >= 3.1 ? '#f7faf9' : '#0a0f14';
}

function resolveAccent(color: CtaBlockProps['color'], customColor: CtaBlockProps['customColor']): string {
  if (color === 'custom') return (customColor && normalizeHex(customColor)) || PRESET_ACCENTS.default;
  if (color && color in PRESET_ACCENTS) return PRESET_ACCENTS[color as Exclude<CtaColor, 'custom'>];
  return PRESET_ACCENTS.default;
}

export function CtaBlock({
  eyebrow,
  title,
  description,
  label,
  url,
  color,
  customColor,
  placement,
  newTab,
  variant,
  lang,
}: CtaBlockProps) {
  // The link is the only thing a CTA truly needs.
  if (!url) return null;

  const accent = resolveAccent(color, customColor);
  const resolvedVariant: CtaPlacement = variant ?? (placement === 'sidebar' ? 'sidebar' : 'inline');
  const resolvedLabel = (label && label.trim()) || (lang === 'en' ? 'Get started' : '立即开始');
  const hasCopy = Boolean(eyebrow || title || description);
  const external = newTab !== false;

  const style = { '--cta-accent': accent, '--cta-ink': inkFor(accent) } as CSSProperties;

  return (
    <div
      className={`cta-block cta--${resolvedVariant}`}
      data-has-copy={hasCopy ? 'true' : 'false'}
      style={style}
    >
      <div className="cta-surface">
        {hasCopy && (
          <div className="cta-copy">
            {eyebrow ? <span className="cta-eyebrow">{eyebrow}</span> : null}
            {title ? <p className="cta-title">{title}</p> : null}
            {description ? <p className="cta-desc">{description}</p> : null}
          </div>
        )}
        <a
          className="cta-button"
          href={url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className="cta-button-label">{resolvedLabel}</span>
          <ArrowRight className="cta-arrow" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
