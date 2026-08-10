'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

type WatchDemoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: 'zh' | 'en';
};

const copy = {
  zh: {
    title: 'DataScaler 完整产品演示',
    close: '关闭产品演示',
    frameTitle: 'DataScaler 完整产品演示播放器',
  },
  en: {
    title: 'DataScaler full product demo',
    close: 'Close product demo',
    frameTitle: 'DataScaler full product demo player',
  },
};

export function WatchDemoDialog({ open, onOpenChange, lang = 'zh' }: WatchDemoDialogProps) {
  const t = copy[lang];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-[#05030b]/90 backdrop-blur-md"
            aria-label={t.close}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="watch-demo-title"
            className="relative z-10 w-full max-w-7xl overflow-hidden rounded-2xl border border-ring/35 bg-[#090710] shadow-2xl shadow-black/70 md:rounded-3xl"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex h-12 items-center justify-between border-b border-white/10 px-4 md:h-14 md:px-5">
              <h2 id="watch-demo-title" className="text-sm font-semibold text-white md:text-base">
                {t.title}
              </h2>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={t.close}
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <iframe
              src={`/demo/watch?lang=${lang}`}
              title={t.frameTitle}
              className="aspect-video w-full bg-[#05030b]"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
