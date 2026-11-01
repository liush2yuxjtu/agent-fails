import { OutboundLink } from "@/components/OutboundLink";
import { SPONSOR_ISSUE_URL, type Lang } from "@/lib/site";
import { getPatterns } from "@/lib/patterns";

const C = {
  en: {
    h1: "Sponsor AgentFails",
    lead: "AgentFails is read by developers who just watched an agent go wrong and are looking for the fix. If your tool or skill solves one of these patterns, put it in front of them.",
    slotsH: "Sponsor slots",
    slots: [
      { t: "Pattern-page slot", price: "$99 per month", d: "One clearly labelled sponsor card on pattern pages, optionally limited to one type (for example review tools on Bug pages, scope-guard tools on Overreach pages)." },
      { t: "Newsletter sponsor", price: "$49 per issue", d: "One short sponsor block in the weekly \"翻车 of the week\" email (English and Chinese editions)." },
      { t: "Featured fix", price: "$29 one-time", d: "Your tool or skill listed as an extra fix on the patterns it actually addresses, marked as sponsored, after we have checked that it works for that pattern." },
    ],
    rulesH: "House rules",
    rules: [
      "Sponsored content is always labelled.",
      "Sponsorship never changes which fixes we recommend, their order, or what a pattern page says.",
      "We only feature a tool on patterns it really addresses.",
      "These are founding rates while traffic grows. Real traffic numbers are shared before payment.",
    ],
    contactH: "Contact",
    contact: "For now, open a GitHub issue using the sponsor template. Say what you'd like to sponsor and roughly when.",
    btn: "Open a sponsor inquiry on GitHub",
    stat: (n: number) => `${n} patterns live, in English and Chinese.`,
  },
  zh: {
    h1: "赞助智能体翻车库",
    lead: "来智能体翻车库的读者，都是刚看着智能体翻车、正在找修复办法的开发者。如果你的工具或技能能解决其中某种模式，这里就是展示给他们的地方。",
    slotsH: "赞助位",
    slots: [
      { t: "条目页赞助位", price: "$99/月", d: "在条目页上放一张明确标注“赞助”的卡片，可以只投放某一类（比如审查工具投放“有 Bug”类，范围守卫工具投放“越界”类）。" },
      { t: "周报赞助", price: "$49/期", d: "在每周的《每周翻车》邮件（中英文版）里放一段简短的赞助内容。" },
      { t: "精选修复", price: "$29/次，一次性", d: "经我们验证确实对某条模式有效后，你的工具或技能会作为额外修复列在对应条目上，并标注为赞助。" },
    ],
    rulesH: "规则",
    rules: [
      "赞助内容一律明确标注。",
      "赞助永远不影响我们推荐哪些修复、修复的顺序，或条目页的内容。",
      "只把工具放在它真正能解决的条目上。",
      "这些是流量增长期间的创始价。付款前会分享真实的流量数据。",
    ],
    contactH: "联系方式",
    contact: "目前请用赞助模板在 GitHub 上开一个 Issue，说明你想赞助什么、大概什么时候。",
    btn: "在 GitHub 上提交赞助咨询",
    stat: (n: number) => `已上线 ${n} 条翻车模式，中英双语。`,
  },
};

/**
 * Render localized sponsorship options, the catalog count, and an inquiry link.
 * Errors reading, parsing, or validating catalog content propagate.
 */
export function SponsorView({ lang }: { lang: Lang }) {
  const c = C[lang];
  return (
    <div className="af-page">
      <h1 className="af-h1">{c.h1}</h1>
      <p className="af-lead">{c.lead}</p>
      <p className="af-meta">{c.stat(getPatterns().length)}</p>

      <section className="af-section">
        <h2 className="af-h2">{c.slotsH}</h2>
        <div className="af-slots">
          {c.slots.map((s) => (
            <div key={s.t} className="af-slot">
              <h3>{s.t}</h3>
              <p className="af-price">{s.price}</p>
              <p className="af-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.rulesH}</h2>
        <ul className="af-list">
          {c.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.contactH}</h2>
        <p className="af-muted" style={{ color: "var(--ink-soft)" }}>
          {c.contact}
        </p>
        <OutboundLink href={SPONSOR_ISSUE_URL} target="_blank" rel="noopener" className="af-btn" style={{ marginTop: 16 }}>
          {c.btn} ↗
        </OutboundLink>
      </section>
    </div>
  );
}
