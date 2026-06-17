import { doc, p, h2, h3, ul, img } from './lexical-builder.js';

export function buildEnContent(dashboardId: number | string, insightId: number | string) {
  return doc([
    h3('At a glance'),
    ul([
      "Anker's latest 30-day snapshot shows strong visibility, but not uniformly strong trust.",
      'TikTok and Instagram act more like demand-building data sources.',
      'YouTube and Reddit surface deeper evaluation and higher skepticism.',
      'The most important recurring VOC themes are **compatibility**, **overheating**, **durability**, **charging speed**, and **price**.',
      'Competitor benchmark context matters, but this article does not assign unsupported performance claims to brands without direct comparison data.',
    ]),

    p(
      'Consumer electronics social listening matters because this category is judged on performance, not attention alone. A brand can generate reach, comments, and shares while trust is quietly weakening in product-focused discussion. That is why **consumer electronics social listening** should be used to read both demand creation and trust pressure, not just buzz.',
    ),

    h2('What DataScaler helps teams see that standard social listening misses'),
    h3('Why can healthy social numbers still hide brand risk?'),
    p(
      'In consumer electronics, strong reach, engagement, and share of voice do not always mean brand trust is healthy. A brand can still look strong on the surface while recurring complaints about compatibility, overheating, durability, charging speed, or price are quietly changing how buyers evaluate the product. Teams that only watch mentions and blended sentiment often miss the issues shaping purchase confidence beneath those topline metrics.',
    ),
    h3('What does DataScaler add beyond a standard social listening dashboard?'),
    p(
      'Most social listening tools are good at showing patterns. DataScaler goes a step further by helping teams understand what is actually driving them. Instead of stopping at mentions, sentiment, and keyword movement, it helps teams trace a pattern back to the posts, comments, and repeated conversations driving it. That makes the output far more useful for real decision-making, especially in categories where trust can weaken long before the topline numbers do.',
    ),
    h3('What should a team get from a 30-day brand snapshot?'),
    p(
      'A useful 30-day brand snapshot should do more than summarize buzz. It should show how visible the brand really is, where sentiment starts to split across platforms, which VOC themes keep resurfacing, and where trust pressure may already be building. For brand, product marketing, growth, and insights teams, the value is not in monitoring for its own sake. It is in knowing which signals deserve action now.',
    ),

    h2('Consumer electronics social listening: what this snapshot measures'),
    p(
      "This analysis is based on **Anker's 30-day public social conversation snapshot**. The snapshot is read through six signals: **mentions, reach, comments, shares, sentiment split, and recurring discussion themes**.",
    ),
    p(
      'It reflects public social conversation only and does not include private support interactions, CRM data, or owned customer records.',
    ),
    p(
      'That matters because consumer electronics is a category where public conversation often reveals more than campaign performance. Buyers are not only reacting to creative. They are testing claims around reliability, charging speed, compatibility, portability, and price.',
    ),
    p('In practice, that means social listening can help answer two questions at once:'),
    ul(['where demand is being created', 'where trust is being questioned']),

    h2("What Anker's 30-day snapshot shows"),
    img(dashboardId),
    p('On visibility alone, Anker still looks like a highly relevant brand in the category.'),
    p('The more useful signal emerges at the platform level.'),
    p('On more visual, discovery-led platforms, sentiment trends positive:'),
    ul(['**TikTok positive sentiment: ~55%**', '**Instagram positive sentiment: ~53%**']),
    p('On more evaluation-heavy platforms, negative sentiment rises:'),
    ul(['**YouTube negative sentiment: ~30%**', '**Reddit negative sentiment: ~28%**']),
    p(
      'This split is the main insight. The same brand can look strong in short-form discovery environments while facing harder product scrutiny in longer-form or discussion-heavy environments.',
    ),
    p(
      'Positive discussion clusters around concrete value signals, including **fast charging**, **power banks**, **design**, **portability**, **reliability**, and product-specific conversation around **Soundcore** and **earbuds**.',
    ),
    p(
      'Negative discussion is also highly specific. The main recurring themes are **compatibility**, **overheating**, **durability**, **charging speed**, and **price**, with **"Anker problems"** emerging as a broader problem-framing term.',
    ),

    h2('Where demand is created, and where trust is tested'),
    p('One of the clearest lessons from this snapshot is that platform roles are not interchangeable.'),
    p('**TikTok and Instagram** act more like demand-building environments. They reward:'),
    ul([
      'visual product appeal',
      'creator demonstration',
      'portable everyday use cases',
      'quick recognition of convenience',
      'simple value communication',
    ]),
    p('These platforms help a product become desirable.'),
    p(
      '**YouTube and Reddit** behave more like trust-testing environments. Users ask whether the product performs as promised, whether charging is consistent, whether heat issues appear in normal use, whether the device fits a broader setup, and whether the price is justified.',
    ),
    p(
      'That distinction is operationally important. Social data in consumer electronics is not one flat stream. It is a layered signal system. Some data sources create interest. Others validate or challenge belief.',
    ),
    img(insightId),

    h2('The VOC signals brands should not ignore'),
    p("The negative themes in Anker's snapshot are not random complaints. They map directly to purchase risk."),
    ul([
      '**Compatibility** raises product-fit anxiety.',
      '**Overheating** raises safety and reliability concerns.',
      '**Durability** weakens long-term confidence.',
      '**Charging speed** challenges a core product promise.',
      "**Price** pressures the brand's value equation.",
    ]),
    p(
      'When these themes recur across public discussion, they influence how future buyers interpret the brand, even if top-line engagement still looks healthy.',
    ),
    p(
      'This is the practical value of VOC in consumer electronics. It helps teams separate low-signal noise from repeated trust issues that deserve action across brand, product, and support.',
    ),

    h2('What DataScaler helps teams do with signals like these'),
    p(
      'Signals like compatibility, overheating, durability, charging speed, and price only matter if teams can translate them into decisions.',
    ),
    p(
      'With DataScaler, teams can move from pattern spotting to source-level validation. A 30-day brand snapshot helps quantify share of voice, compare platform sentiment, cluster recurring VOC issues, and identify trust pressure before it becomes harder to manage.',
    ),

    h2('Competitor context should be used as a benchmark, not a shortcut'),
    p('Competitor context still matters, but it should be handled carefully.'),
    p(
      'In this snapshot, brands such as **Ugreen**, **Belkin**, and **Jackery** are relevant reference points because buyers do not evaluate electronics brands in isolation. They compare by use case, trust, ecosystem fit, and value perception.',
    ),
    p(
      "What this dataset supports is the need for **benchmark context**, not broad unsupported claims about competitor positioning. The practical takeaway is straightforward: Anker's visibility and sentiment only become fully useful when read against competitor movement by platform, theme, and subcategory.",
    ),

    h2('What consumer electronics brands should take from this'),
    p('The key lesson is not that visibility is unimportant. It is that visibility is incomplete.'),
    p('Consumer electronics brands need to track:'),
    ul([
      'where desire is being created',
      'where skepticism is building',
      'which complaint clusters repeat',
      'which product promises are under pressure',
      'how performance changes relative to competitor benchmarks',
    ]),
    p(
      'That is why **consumer electronics social listening** should be treated as a shared business input, not just a marketing dashboard. Brand teams need it for positioning. Product teams need it for pattern recognition. Support teams need it for issue visibility. Leadership teams need it for competitive context.',
    ),

    h2('Who should use this kind of workflow?'),
    p('This kind of workflow is especially useful for:'),
    ul([
      '**Brand and product marketing teams** that need clearer visibility into perception, positioning, and recurring product concerns',
      '**Growth and ecommerce teams** that want earlier signals on trust pressure, platform-level shifts, and repeated friction points',
      '**Insights teams** that need faster, more traceable analysis of public social conversation',
    ]),
    p(
      'If your category depends heavily on product claims, trust signals, and side-by-side comparison, this kind of workflow quickly becomes operational, not just observational.',
    ),

    h2('Try the Pro plan on your own brand'),
    p(
      'Anker is only one example. The more useful question is what the same analysis would reveal about your own brand.',
    ),
    p(
      'With DataScaler, teams can use the **Pro plan** to run a 30-day brand snapshot, measure category visibility, compare platform-level sentiment, surface recurring VOC issues, and spot trust pressure earlier. Each insight can be traced back to the posts and comments behind it, making the output easier to validate and act on.',
    ),
    p('Start a **Pro trial** with DataScaler and see which signals deserve action now.'),

    h2('Conclusion'),
    p(
      "Anker's 30-day snapshot shows a pattern many consumer electronics brands will recognize: strong visibility can coexist with trust pressure. Visual platforms can accelerate demand, while discussion-heavy platforms surface deeper skepticism. Repeated VOC themes can look scattered at first, but together they reveal where product expectations are being challenged.",
    ),
    p(
      'The most useful conclusion is simple: in consumer electronics, attention and belief are not the same metric. Brands that monitor both are better positioned to adjust messaging earlier, spot trust gaps faster, and use social listening as an operating input rather than a surface report. That is the kind of decision-ready visibility DataScaler is designed to support.',
    ),
  ]);
}
