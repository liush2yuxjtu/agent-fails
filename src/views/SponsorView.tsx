import { OutboundLink } from "@/components/OutboundLink";
import { SPONSOR_ISSUE_URL, type Lang } from "@/lib/site";
import { getPatterns } from "@/lib/patterns";

const C = {
  en: {
    h1: "Sponsor AgentFails",
    lead: "AgentFails is read by developers who just watched an agent go wrong and are looking for the fix. If your tool or skill solves one of these patterns, put it in front of them.",
    slotsH: "Sponsor slots",
    slots: [
      { t: "Pattern-page slot", d: "One clearly labelled sponsor card on pattern pages, optionally limited to one type (for example review tools on Bug pages, scope-guard tools on Overreach pages)." },
      { t: "Newsletter sponsor", d: "One short sponsor block in the weekly \"翻车 of the week\" email (English and Chinese editions)." },
      { t: "Featured fix", d: "Your tool or skill listed as an extra fix on the patterns it actually addresses, marked as sponsored, after we have checked that it works for that pattern." },
    ],
    rulesH: "House rules",
    rules: [
      "Sponsored content is always labelled.",
      "Sponsorship never changes which fixes we recommend, their order, or what a pattern page says.",
      "We only feature a tool on patterns it really addresses.",
      "Early sponsors get founding rates while traffic grows. We'll share real traffic numbers before you pay.",
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
      { t: "条目页赞助位", d: "在条目页上放一张明确标注“赞助”的卡片，可以只投放某一类（比如审查工具投放“有 Bug”类，范围守卫工具投放“越界”类）。" },
      { t: "周报赞助", d: "在每周的《每周翻车》邮件（中英文版）里放一段简短的赞助内容。" },
      { t: "精选修复", d: "经我们验证确实对某条模式有效后，你的工具或技能会作为额外修复列在对应条目上，并标注为赞助。" },
    ],
    rulesH: "规则",
    rules: [
      "赞助内容一律明确标注。",
      "赞助永远不影响我们推荐哪些修复、修复的顺序，或条目页的内容。",
      "只把工具放在它真正能解决的条目上。",
      "流量增长期间，早期赞助者享受创始价。付款前我们会提供真实的流量数据。",
    ],
    contactH: "联系方式",
    contact: "目前请用赞助模板在 GitHub 上开一个 Issue，说明你想赞助什么、大概什么时候。",
    btn: "在 GitHub 上提交赞助咨询",
    stat: (n: number) => `已上线 ${n} 条翻车模式，中英双语。`,
  },
};

export function SponsorView({ lang }: { lang: Lang }) {
  const c = C[lang];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{c.h1}</h1>
      <p className="mt-3 text-lg text-zinc-600">{c.lead}</p>
      <p className="mt-2 text-sm text-zinc-500">{c.stat(getPatterns().length)}</p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{c.slotsH}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {c.slots.map((s) => (
            <div key={s.t} className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{c.rulesH}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
          {c.rules.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{c.contactH}</h2>
        <p className="mt-2 text-zinc-700">{c.contact}</p>
        <OutboundLink href={SPONSOR_ISSUE_URL} target="_blank" rel="noopener" className="mt-4 inline-block rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700">
          {c.btn} ↗
        </OutboundLink>
      </section>
    </div>
  );
}
