import { dashboardOrigin } from './origin';
import type { Locale, OnPreviewStage, PlaygroundPreview, PreviewStageEvent } from './types';

/**
 * 调用 dashboard 公开预览端点,把用户输入的品牌名换成 Tier A 富化配置。
 *
 * 端点为匿名公开(dashboard `/api/playground/preview`),服务端持 service token
 * 编排后台探测/生成类接口,不创建品牌、不跑采集。跨域基址由 {@link dashboardOrigin}
 * 按官网域名解析(测试官网→测试后台,线上→线上),沿用 DemoDialog 直连后台的既有先例。
 */
export async function fetchPlaygroundPreview(
  brand: string,
  lang: Locale,
  signal?: AbortSignal,
): Promise<PlaygroundPreview | null> {
  const trimmed = brand.trim();
  if (!trimmed) return null;

  try {
    const res = await fetch(`${dashboardOrigin()}/api/playground/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand: trimmed, locale: lang }),
      signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as PlaygroundPreview;
  } catch {
    // 网络/超时失败 → 返回 null,前端回退到样例展示态
    return null;
  }
}

/**
 * 流式版:同一端点带 `?stream=1`,逐行 NDJSON 拿分阶段事件,
 * 每段到达即回调 `onStage`(前端据此渐进点亮弹窗卡片),`done` 事件的
 * data 作为最终完整 preview resolve。任一步失败 → resolve null(前端落 error 态)。
 */
export async function fetchPlaygroundPreviewStream(
  brand: string,
  lang: Locale,
  onStage: OnPreviewStage,
  signal?: AbortSignal,
): Promise<PlaygroundPreview | null> {
  const trimmed = brand.trim();
  if (!trimmed) return null;

  try {
    const res = await fetch(`${dashboardOrigin()}/api/playground/preview?stream=1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand: trimmed, locale: lang }),
      signal,
    });
    if (!res.ok || !res.body) return null;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let final: PlaygroundPreview | null = null;

    const dispatch = (line: string) => {
      const text = line.trim();
      if (!text) return;
      let evt: PreviewStageEvent;
      try {
        evt = JSON.parse(text) as PreviewStageEvent;
      } catch {
        return; // 半行/坏行,忽略(下一 chunk 会补全)
      }
      if (evt.stage === 'done') {
        final = evt.data;
      }
      onStage(evt);
    };

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let nl: number;
      while ((nl = buffer.indexOf('\n')) >= 0) {
        dispatch(buffer.slice(0, nl));
        buffer = buffer.slice(nl + 1);
      }
    }
    // 冲刷末尾残留(通常已随 done 换行结束)
    if (buffer.trim()) dispatch(buffer);

    return final;
  } catch {
    return null;
  }
}

/**
 * Playground「AI 助手」流式提问:把问题连同当前样例(brand + grounding 上下文)
 * POST 到 dashboard 匿名端点 `/api/playground/ask`,读取纯文本 token 流,
 * 每段到达即回调 `onDelta`(前端逐字追加到回答气泡)。
 *
 * 端点匿名公开、不计费、用最便宜的模型;真实回答为纯文本(无 [Ref] 芯片)。
 * 返回 true=正常收尾,false=失败(前端落 error 文案)。
 */
export async function askPlaygroundStream(
  input: { question: string; brand: string; context: string; lang: Locale },
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<boolean> {
  const question = input.question.trim();
  if (!question) return false;

  // 内部 controller:既承接外部 signal(卸载中止),又驱动首字节看门狗。
  const ctrl = new AbortController();
  const onExternalAbort = () => ctrl.abort();
  if (signal) {
    if (signal.aborted) ctrl.abort();
    else signal.addEventListener('abort', onExternalAbort, { once: true });
  }
  // 首字节看门狗:最便宜的模型(deepseek-v4-flash)首 token 延迟波动大(实测 2~7s),
  // 但若 45s 内仍无任何 token(黑洞连接/异常),主动中止并落错误态,避免 UI 永远停在
  // "正在读取"。首个 token 到达即撤销;dashboard 侧另有 60s 超时兜底。
  let watchdog: ReturnType<typeof setTimeout> | null = setTimeout(() => ctrl.abort(), 45_000);
  const clearWatchdog = () => {
    if (watchdog) {
      clearTimeout(watchdog);
      watchdog = null;
    }
  };

  try {
    const res = await fetch(`${dashboardOrigin()}/api/playground/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        brand: input.brand,
        context: input.context,
        locale: input.lang,
      }),
      signal: ctrl.signal,
    });
    if (!res.ok || !res.body) return false;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        clearWatchdog(); // 首字节到达,撤销看门狗
        onDelta(chunk); // 纯文本流,直接累加
      }
    }
    return true;
  } catch {
    // 网络/超时/中止 → 失败(中止场景前端会自行忽略)
    return false;
  } finally {
    clearWatchdog();
    if (signal) signal.removeEventListener('abort', onExternalAbort);
  }
}
