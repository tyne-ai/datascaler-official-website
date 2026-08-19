export const STATIC_BLOG_EXAMPLE_SLUG = "brand-intelligence-from-signals-to-decisions";

export const STATIC_BLOG_EXAMPLE_ZH_PATH = `/blog/${STATIC_BLOG_EXAMPLE_SLUG}`;
export const STATIC_BLOG_EXAMPLE_EN_PATH = `/en/blog/${STATIC_BLOG_EXAMPLE_SLUG}`;

export const STATIC_BLOG_EXAMPLE_CARD = {
  zh: {
    id: "static-brand-intelligence-example-zh",
    href: STATIC_BLOG_EXAMPLE_ZH_PATH,
    title: "从公开讨论到品牌决策：一份可溯源的 AI 品牌情报示例",
    category: "示例报告",
    tag: "品牌情报",
    excerpt:
      "用一份完整的静态案例，展示 DataScaler 如何把跨平台公开讨论整理为关键指标、可溯源结论与可执行建议。",
    publishedDate: "2026-08-05T00:00:00.000Z",
    readTime: "阅读约 6 分钟",
  },
  en: {
    id: "static-brand-intelligence-example-en",
    href: STATIC_BLOG_EXAMPLE_EN_PATH,
    title: "From Public Conversations to Brand Decisions: A Traceable AI Intelligence Example",
    category: "Example report",
    tag: "Brand intelligence",
    excerpt:
      "A complete static case showing how DataScaler turns cross-platform public conversations into key metrics, traceable findings and decision-ready actions.",
    publishedDate: "2026-08-05T00:00:00.000Z",
    readTime: "6 min read",
  },
} as const;
