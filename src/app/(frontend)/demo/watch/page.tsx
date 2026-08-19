import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview how DataScaler works',
  robots: { index: false, follow: false },
};

type WatchDemoPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function WatchDemoPage({ searchParams }: WatchDemoPageProps) {
  const { lang } = await searchParams;
  const isEnglish = lang === 'en';
  const poster = isEnglish
    ? '/demo/datascaler-watch-a-demo-en-poster.png'
    : '/demo/datascaler-watch-a-demo-poster.png';
  const video = isEnglish
    ? '/demo/datascaler-watch-a-demo-en.mp4'
    : '/demo/datascaler-watch-a-demo-zh.mp4';

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#10091d]">
      <video
        className="h-auto max-h-dvh w-full bg-[#10091d] object-contain"
        autoPlay
        controls
        muted
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={isEnglish ? 'DataScaler product flow preview' : 'DataScaler 产品流程预览'}
      >
        <source src={video} type="video/mp4" />
      </video>
    </main>
  );
}
