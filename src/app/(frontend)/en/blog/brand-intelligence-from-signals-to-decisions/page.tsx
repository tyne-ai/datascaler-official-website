import { StaticBlogExamplePage } from "@/components/pages/StaticBlogExamplePage";
import { buildMetadata } from "@/lib/seo";
import { STATIC_BLOG_EXAMPLE_EN_PATH } from "@/lib/static-blog";

export const metadata = buildMetadata({
  title: "From Public Conversations to Brand Decisions",
  description:
    "A static brand intelligence example showing how DataScaler turns cross-platform public conversations into metrics, traceable findings and clear actions.",
  canonical: STATIC_BLOG_EXAMPLE_EN_PATH,
  ogType: "article",
  image: "/blog-seed/anker-hero.jpg",
  noIndex: true,
});

export default function StaticBlogExampleEnPage() {
  return <StaticBlogExamplePage lang="en" />;
}
