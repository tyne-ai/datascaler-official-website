import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watch the DataScaler product demo',
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
    <main className="flex min-h-dvh items-center justify-center bg-[#05030b]">
      <video
        className="h-auto max-h-dvh w-full bg-[#05030b] object-contain"
        autoPlay
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={isEnglish ? 'DataScaler full product demo' : 'DataScaler 完整产品演示'}
      >
        <source src={video} type="video/mp4" />
      </video>
    </main>
  );
}
