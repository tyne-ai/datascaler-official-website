'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';

import {
  CleanPageHero,
  CleanSectionLabel,
  CleanSitePage,
  type SiteLang,
} from '@/components/CleanSiteChrome';
import { track } from '@/lib/analytics';
import { dashboardOrigin } from '@/components/playground/origin';

const COPY = {
  zh: {
    hero: {
      eyebrow: '联系我们',
      title: '带着一个真实问题来聊。',
      description: '告诉我们你在盯的品牌、市场或竞争信号。我们用 DataScaler 实际工作流回答，不做泛产品演示。',
    },
    asideEyebrow: '你会拿到什么',
    asideTitle: '一次围绕你业务问题的 30 分钟讨论。',
    benefits: ['确认最适合监控的品牌和主题', '现场看真实信号和原始证据', '聊团队接入、MCP 和数据需求'],
    emailTitle: '也可以直接发邮件',
    emailNote: '战略合作、企业采购、API / MCP 集成',
    formTitle: '预约专家演示',
    labels: { name: '姓名', email: '公司邮箱', company: '想监控的品牌' },
    placeholders: { name: '您的姓名', email: 'name@company.com', company: '例如：Anker、DJI、SHEIN' },
    submit: '提交预约',
    sending: '提交中…',
    success: '已收到您的请求，我们将尽快联系您。',
    failure: '提交失败，请稍后重试。',
  },
  en: {
    hero: {
      eyebrow: 'Contact',
      title: 'Bring one real market question.',
      description: "Tell us the brand, market, or competitive signal you're watching. We'll answer through a real DataScaler workflow—not a generic product tour.",
    },
    asideEyebrow: 'What to expect',
    asideTitle: 'A 30-minute conversation around the decision you need to make.',
    benefits: ['Define the right brands and topics to monitor', 'Inspect real signals and their original evidence', 'Discuss team access, MCP and data requirements'],
    emailTitle: 'Or contact us directly',
    emailNote: 'Partnerships, enterprise purchasing and API / MCP integration',
    formTitle: 'Book an expert demo',
    labels: { name: 'Name', email: 'Work email', company: 'Brand of interest' },
    placeholders: { name: 'Your name', email: 'name@company.com', company: 'e.g. Anker, DJI, SHEIN' },
    submit: 'Request a demo',
    sending: 'Sending…',
    success: "Request received. We'll be in touch shortly.",
    failure: 'Submission failed. Please try again later.',
  },
};

const INPUT_CLASS =
  'h-[52px] w-full border border-[#3d2673] bg-white px-4 py-3.5 text-sm font-semibold text-[#24133f] outline-none transition-shadow placeholder:text-[#24133f]/30 focus:shadow-[4px_4px_0_#d8c8ff] disabled:opacity-50';

export function CleanContactPage({ lang }: { lang: SiteLang }) {
  const t = COPY[lang];
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${dashboardOrigin()}/api/presentation/rese`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      track('demo_request_submit', { form_type: 'demo', locale: lang });
      alert(t.success);
      setForm({ name: '', email: '', company: '' });
    } catch (error) {
      console.error('Submit error:', error);
      alert(t.failure);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CleanSitePage lang={lang}>
      <main>
        <CleanPageHero {...t.hero} tone="yellow" />
        <section className="border-b border-[#3d2673] bg-[#fbf9ff] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <CleanSectionLabel>{t.asideEyebrow}</CleanSectionLabel>
              <h2 className="mt-6 max-w-[560px] text-[clamp(32px,3.7vw,48px)] font-black leading-[1.05] tracking-[-0.045em] text-[#24133f]">
                {t.asideTitle}
              </h2>
              <ul className="mt-10 border-t border-[#3d2673]">
                {t.benefits.map((benefit, index) => (
                  <li key={benefit} className="grid grid-cols-[42px_1fr] gap-3 border-b border-[#3d2673] py-5 text-sm font-bold leading-6 text-[#24133f]/70">
                    <span className="text-xs font-black text-[#24133f]/35">0{index + 1}</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 border border-[#3d2673] bg-[#d8c8ff] p-6">
                <Mail className="h-5 w-5" />
                <h3 className="mt-7 text-lg font-black text-[#24133f]">{t.emailTitle}</h3>
                <a href="mailto:support@datascaler.ai" className="mt-2 block text-sm font-black underline underline-offset-4">
                  support@datascaler.ai
                </a>
                <p className="mt-2 text-xs leading-5 text-[#24133f]/55">{t.emailNote}</p>
              </div>
            </div>

            <div className="border border-[#3d2673] bg-white p-6 shadow-[10px_10px_0_#d8c8ff] sm:p-9">
              <div className="flex items-center justify-between border-b border-[#3d2673] pb-5">
                <h2 className="text-2xl font-black tracking-[-0.04em] text-[#24133f]">{t.formTitle}</h2>
                <ShieldCheck className="h-5 w-5 text-[#24133f]/40" />
              </div>
              <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#24133f]/45">{t.labels.name}</span>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder={t.placeholders.name}
                    disabled={loading}
                    className={INPUT_CLASS}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#24133f]/45">{t.labels.email}</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder={t.placeholders.email}
                    disabled={loading}
                    className={INPUT_CLASS}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#24133f]/45">{t.labels.company}</span>
                  <input
                    required
                    value={form.company}
                    onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                    placeholder={t.placeholders.company}
                    disabled={loading}
                    className={INPUT_CLASS}
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-between rounded-full bg-[#7047eb] px-6 py-4 text-sm font-black text-white disabled:opacity-50"
                >
                  {loading ? t.sending : t.submit}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </CleanSitePage>
  );
}
