import { StaticBlogExamplePage } from "@/components/pages/StaticBlogExamplePage";
import { buildMetadata } from "@/lib/seo";
import { STATIC_BLOG_EXAMPLE_ZH_PATH } from "@/lib/static-blog";

export const metadata = buildMetadata({
  title: "从公开讨论到品牌决策：一份可溯源的 AI 品牌情报示例",
  description:
    "一份静态品牌情报示例，展示 DataScaler 如何把跨平台公开讨论整理为关键指标、可溯源结论与行动建议。",
  canonical: STATIC_BLOG_EXAMPLE_ZH_PATH,
  ogType: "article",
  image: "/blog-seed/anker-hero.jpg",
  noIndex: true,
});

export default function StaticBlogExampleZhPage() {
  return <StaticBlogExamplePage lang="zh" />;
}
