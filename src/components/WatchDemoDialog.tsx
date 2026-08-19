'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';

type WatchDemoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: 'zh' | 'en';
};

const copy = {
  zh: {
    title: '提前了解 DataScaler 如何工作',
    description: '快速预览从品牌配置到洞察、原帖追溯与 AI 追问的完整流程。',
    close: '关闭产品演示',
    frameTitle: 'DataScaler 产品流程预览播放器',
    duration: '产品流程预览 · 约 30 秒',
    evidence: '每条洞察均可追溯至原始来源',
  },
  en: {
    title: 'Preview how DataScaler works',
    description: 'A quick look at the flow from brand setup to insights, source tracing, and AI follow-ups.',
    close: 'Close product demo',
    frameTitle: 'DataScaler product flow preview player',
    duration: 'Product flow preview · about 30 sec',
    evidence: 'Every insight links back to the source',
  },
} as const;

export function WatchDemoDialog({ open, onOpenChange, lang = 'zh' }: WatchDemoDialogProps) {
  const t = copy[lang];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#24133f]/45 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[min(1120px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] border border-[#3d2673]/20 bg-[#fbf9ff] shadow-[0_32px_100px_rgba(36,19,63,0.35)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 sm:w-[min(1120px,calc(100vw-48px))]">
          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:items-center sm:px-6">
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5ff63] text-[#24133f] shadow-[0_7px_18px_rgba(112,71,235,0.14)]">
                <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <Dialog.Title className="text-base font-black tracking-[-0.025em] text-[#24133f] sm:text-lg">
                  {t.title}
                </Dialog.Title>
                <Dialog.Description className="mt-0.5 text-xs leading-5 text-[#24133f]/55 sm:text-sm">
                  {t.description}
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close
              aria-label={t.close}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#3d2673]/15 bg-white text-[#24133f]/60 transition hover:border-[#7047eb]/40 hover:text-[#7047eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7047eb] focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="mx-2 overflow-hidden rounded-[18px] border border-[#3d2673]/25 bg-[#10091d] sm:mx-3">
            <iframe
              src={`/demo/watch?lang=${lang}`}
              title={t.frameTitle}
              className="aspect-video w-full bg-[#10091d]"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-1.5 px-5 py-3 text-[11px] font-bold text-[#24133f]/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 sm:text-xs">
            <span>{t.duration}</span>
            <span className="inline-flex items-center gap-2 text-[#24133f]/65">
              <span className="h-2 w-2 rounded-full bg-[#7047eb]" aria-hidden="true" />
              {t.evidence}
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
