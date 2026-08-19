import type { Locale } from '@/lib/i18n';

export type { Locale };

/** 证据条目 id —— 与 data.ts EVID / QA refs 一一对应。 */
export type EvidId = 'yt-neveragain' | 'reddit-compare' | 'yt-a1vibe' | 'x-clip' | 'voice-agg';

/** 情感色调:p 正面 / n 负面 / z 中性混合。 */
export type Sentiment = 'p' | 'n' | 'z';

/**
 * 扫描剧场的预览加载态。ScanTheater 光看 `preview===null` 无法区分
 * 「还在加载」和「加载失败」,故由 PlaygroundContent 显式传入。
 *   sample  = 空品牌,不发请求,走示例态
 *   loading = 已发起 preview 请求,等待中(首次可能 40–128s)
 *   ready   = preview 成功返回,卡片滚到真实值
 *   error   = 请求失败/返回 null,走软完成空态
 */
export type PreviewStatus = 'sample' | 'loading' | 'ready' | 'error';

/** 一条证据(原帖溯源)。双语字段随 lang 取。 */
export interface Evid {
  plat: string;
  sent: string;
  sc: Sentiment;
  title: string;
  snip: string;
  author: string;
  date: string;
  stats: string;
  /** 外链原帖;聚合数据为 null(走「完整报告可逐条下钻」提示分支)。 */
  url: string | null;
  agg?: boolean;
}

/** AI 助手预设问答。refs 为 [按钮文案, 证据 id] 元组。 */
export interface Qa {
  q: string;
  a: string;
  refs: [string, EvidId][];
}

/**
 * 后台预览接口(dashboard `/api/playground/preview`)返回的 Tier A 品牌富化配置。
 * 仅凭品牌名即可即时生成,对应向导前 4 步:品牌信息 / DNA / 关键词 / 竞品。
 * Tier B(声量/情感/帖流/证据)需注册后采集,不在此结构内。
 */
export interface PlaygroundPreview {
  brandName: string;
  entityLevel: string;
  brand: {
    description: string | null;
    oneLiner: string | null;
    industries: string[];
    offerings: string[];
    audiences: string[];
    confidence: string | null;
    sources: { url: string; title: string }[];
  };
  dnaTags: string[];
  website: { officialWebsite: string | null };
  social: {
    officialAccounts: { platform: string; url: string; username?: string }[];
    storefronts: { platform: string; url: string; storeName?: string }[];
    amazonProducts: { asin: string; url: string; title?: string }[];
  };
  keywords: { categoryKeywords: string[]; subCategories: { name: string }[] };
  competitors: {
    name: string;
    reason: string;
    description: string;
    dnaTags: string[];
    websites: string[];
    category: string;
  }[];
  /** true 表示后台部分子调用失败,结果不完整。 */
  partial: boolean;
  /**
   * 服务端缓存键。注册跳转时随 URL 携带,dashboard 凭此还原向导前 4 步,
   * 免于重复调用后台。仅当结果完整并被缓存时返回。
   */
  cacheKey?: string;
}

/**
 * 流式预览的分阶段事件(dashboard `/api/playground/preview?stream=1` 逐行 NDJSON)。
 * 每段完成即推一行,前端据此渐进点亮弹窗对应卡片;`done` 携带完整 preview。
 */
export type PreviewStageEvent =
  | { stage: 'brand'; data: Pick<PlaygroundPreview['brand'], 'industries' | 'offerings' | 'audiences' | 'confidence'> }
  | { stage: 'dna'; data: { dnaTags: string[] } }
  | { stage: 'keywords'; data: PlaygroundPreview['keywords'] }
  | { stage: 'competitors'; data: { competitors: PlaygroundPreview['competitors'] } }
  | { stage: 'brandDetail'; data: { sources: PlaygroundPreview['brand']['sources']; description: string | null } }
  | { stage: 'done'; data: PlaygroundPreview }
  | { stage: 'error'; data: { error: string } };

/** 已完成的阶段集合 —— 驱动 ScanTheater 各卡的真实点亮。 */
export interface PreviewStages {
  brand: boolean;
  dna: boolean;
  keywords: boolean;
  competitors: boolean;
  brandDetail: boolean;
}

/** 流式读取回调:每段到达时调用。 */
export type OnPreviewStage = (evt: PreviewStageEvent) => void;

/** 页面所有交互回调,经 context 下传给各子组件,避免逐层 props。 */
export interface PlaygroundApi {
  lang: Locale;
  /** 当前样例品牌名(= COPY[lang].board.brand)。多样例切换时只换此处;埋点 brand 参数统一取此。 */
  sampleBrand: string;
  openGate: (title?: string, msg?: string, source?: string) => void;
  openEvidence: (id: EvidId, source?: string) => void;
  runScan: (brand: string) => void;
  /** hero 品牌输入框的当前值(供扫描剧场读取)。 */
  brand: string;
  setBrand: (v: string) => void;
  scrollToSample: () => void;
  scrollToHero: () => void;
  /**
   * 后台返回的真实 Tier A 预览(用户扫描真实品牌后)。
   * null = 尚未扫描 / 走样例展示态,各组件回退到 COPY 样例数据。
   */
  preview: PlaygroundPreview | null;
}
