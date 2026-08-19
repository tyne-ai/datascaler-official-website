import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import {
  getSocialListeningFaqs,
  SocialListeningPillarPage,
} from "@/components/pages/SocialListeningPillarPage";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const canonical = "/social-listening";
const description =
  "从海外社交媒体、社区与评论中识别消费者需求、购买顾虑、平台差异与增长机会，每条 DataScaler 结论都可回到原帖核验。";

export const metadata: Metadata = buildMetadata({
  title: "面向出海消费品牌的社交媒体聆听｜DataScaler",
  description,
  canonical,
  keywords:
    "社交媒体聆听, 海外社媒洞察, 消费者声音分析, 购买决策洞察, 用户口碑分析, 海外社媒舆情监测",
});

export default function Page() {
  const faqs = getSocialListeningFaqs("zh");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "DataScaler 社交媒体聆听",
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
      <SocialListeningPillarPage lang="zh" />
    </>
  );
}
