import Link from 'next/link';
import { PricingHeader } from '@/components/PricingHeader';
import { PricingFooter } from '@/components/PricingFooter';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <PricingHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">404</p>
        <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">页面未找到 / Page not found</h1>
        <p className="mt-4 max-w-md text-slate-400">
          抱歉，您访问的页面不存在或已被移动。
          <br />
          Sorry, the page you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-[#22c55e] px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-[#22c55e]/85 transition-colors"
        >
          返回首页 / Back home
        </Link>
      </main>
      <PricingFooter />
    </div>
  );
}
