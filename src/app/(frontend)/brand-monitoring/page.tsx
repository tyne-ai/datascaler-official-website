import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import {
  BrandMonitoringPillarPage,
  getBrandMonitoringFaqs,
} from "@/components/pages/BrandMonitoringPillarPage";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const canonical = "/brand-monitoring";
const description =
  "监测海外社交媒体、社区与评论中的品牌讨论，发现口碑风险、消费者需求和竞品变化，并查看每条结论背后的原始来源。";

export const metadata: Metadata = buildMetadata({
  title: "海外社媒舆情监测与品牌洞察｜DataScaler",
  description,
  canonical,
  keywords:
    "海外社媒舆情监测, 社交媒体聆听, 品牌舆情监测, 海外舆情监测, 品牌口碑监测, 竞品监测, 消费者洞察",
});

export default function Page() {
  const faqs = getBrandMonitoringFaqs("zh");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "DataScaler 海外社媒舆情监测",
            url: `${SITE_URL}${canonical}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <BrandMonitoringPillarPage lang="zh" />
    </>
  );
}
