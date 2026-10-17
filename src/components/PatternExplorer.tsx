"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AGENT_LABEL, CATEGORY_META, t } from "@/lib/i18n";
import { AGENTS, CATEGORIES, type AgentId, type Category, type PatternCard } from "@/lib/types";
import { href, ISSUE_URL, type Lang } from "@/lib/site";
import { AgentChips, CategoryBadge, CAT_STYLES } from "./Badges";

function matches(card: PatternCard, q: string): boolean {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.every((term) => card.search.includes(term));
}

export function PatternExplorer({ cards, lang }: { cards: PatternCard[]; lang: Lang }) {
  const d = t(lang);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "">("");
  const [agent, setAgent] = useState<AgentId | "">("");

  // Read initial state from the URL (?q=&cat=&agent=) so filtered views are shareable.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get("cat") as Category | null;
    const a = sp.get("agent") as AgentId | null;
    /* eslint-disable react-hooks/set-state-in-effect */
    setQ(sp.get("q") ?? "");
    if (c && CATEGORIES.includes(c)) setCat(c);
    if (a && AGENTS.includes(a)) setAgent(a);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (cat) sp.set("cat", cat);
    if (agent) sp.set("agent", agent);
    const qs = sp.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [q, cat, agent]);

  const filtered = useMemo(
    () => cards.filter((c) => (!cat || c.category === cat) && (!agent || c.agents.includes(agent)) && (!q || matches(c, q))),
    [cards, q, cat, agent],
  );

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition ${active ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"}`;

  return (
    <div id="patterns">
      <div className="relative">
        <label htmlFor="pattern-search" className="sr-only">{d.searchLabel}</label>
        <input
          id="pattern-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={d.searchPlaceholder}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={d.category}>
          <span className="w-16 text-xs font-medium uppercase tracking-wide text-zinc-500">{d.category}</span>
          <button type="button" className={chip(!cat)} onClick={() => setCat("")} aria-pressed={!cat}>{d.allCategories}</button>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className={chip(cat === c)} onClick={() => setCat(cat === c ? "" : c)} aria-pressed={cat === c} data-cat={c}>
              <span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${CAT_STYLES[c].dot}`} aria-hidden />
              {CATEGORY_META[c][lang]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={d.agent}>
          <span className="w-16 text-xs font-medium uppercase tracking-wide text-zinc-500">{d.agent}</span>
          <button type="button" className={chip(!agent)} onClick={() => setAgent("")} aria-pressed={!agent}>{d.allAgents}</button>
          {AGENTS.map((a) => (
            <button key={a} type="button" className={chip(agent === a)} onClick={() => setAgent(agent === a ? "" : a)} aria-pressed={agent === a}>
              {AGENT_LABEL[a]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">
        <span aria-live="polite" data-testid="result-count">{d.results(filtered.length)}</span>
        {(q || cat || agent) && (
          <button type="button" onClick={() => { setQ(""); setCat(""); setAgent(""); }} className="underline hover:text-zinc-800">
            {d.clear}
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-600">
          <p>{d.noResults}</p>
          <a href={`${ISSUE_URL}&title=${encodeURIComponent("[Failure] " + q)}`} className="mt-3 inline-block rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
            {d.submitCta}
          </a>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <li key={c.slug}>
              <Link
                href={href(lang, `/patterns/${c.slug}`)}
                className={`group flex h-full flex-col rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${CAT_STYLES[c.category].ring}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <CategoryBadge category={c.category} lang={lang} />
                </div>
                <h3 className="mt-3 font-semibold leading-snug text-zinc-900 group-hover:text-orange-700">{c.title}</h3>
                <p className="mt-0.5 text-xs text-zinc-400">{c.altTitle}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-zinc-600">{c.summary}</p>
                <div className="mt-3">
                  <AgentChips agents={c.agents} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
