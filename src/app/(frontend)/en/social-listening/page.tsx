import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import {
  getSocialListeningFaqs,
  SocialListeningPillarPage,
} from "@/components/pages/SocialListeningPillarPage";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const canonical = "/en/social-listening";
const description =
  "Social listening tools for consumer brands that turn public posts, comments, communities, and reviews into source-linked insights on demand, trust, and purchase objections.";

export const metadata: Metadata = buildMetadata({
  title: "Social Listening Tools for Consumer Brands | DataScaler",
  description,
  canonical,
  keywords:
    "social listening, social listening tools, social listening software, social listening platform, social media listening tools, social media listening software",
});

export default function Page() {
  const faqs = getSocialListeningFaqs("en");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "DataScaler Social Listening",
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
      <SocialListeningPillarPage lang="en" />
    </>
  );
}
