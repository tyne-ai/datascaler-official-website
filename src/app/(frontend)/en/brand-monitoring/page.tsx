import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import {
  BrandMonitoringPillarPage,
  getBrandMonitoringFaqs,
} from "@/components/pages/BrandMonitoringPillarPage";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const canonical = "/en/brand-monitoring";
const description =
  "Monitor brand mentions, sentiment, reputation risk, customer demand, and competitors across 10 public platforms. Every DataScaler finding links to the source.";

export const metadata: Metadata = buildMetadata({
  title: "Brand Monitoring Software for Ecommerce Brands | DataScaler",
  description,
  canonical,
  keywords:
    "brand monitoring, online brand monitoring, brand monitoring software, brand reputation monitoring, brand mention monitoring",
});

export default function Page() {
  const faqs = getBrandMonitoringFaqs("en");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "DataScaler Brand Monitoring",
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
      <BrandMonitoringPillarPage lang="en" />
    </>
  );
}
