"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useMemo, useRef, useState, type ReactNode } from "react";
import { AGENT_LABEL, CATEGORY_META, t } from "@/lib/i18n";
import { AGENTS, CATEGORIES, type AgentId, type Category, type PatternCard } from "@/lib/types";
import { href, ISSUE_URL, type Lang } from "@/lib/site";
import { CAT_CODE, CAT_RAIL, frameIndex } from "./Badges";

function matches(card: PatternCard, q: string): boolean {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.every((term) => card.search.includes(term));
}

/**
 * Render category-grouped pattern search with an optional hero above the controls.
 * Cards need lowercase search text; every query term must match a substring.
 * Display IDs follow the full cards array and stay unchanged when filtering.
 *
 * Initialize q, cat, and agent from the URL on mount, ignoring unknown categories
 * and agents. Filter edits replace the query string while preserving the hash.
 * Slash focuses and selects search outside editable fields; Ctrl/Cmd+K does so
 * from any target. Submitting scrolls to results, respecting reduced motion.
 */
export function PatternExplorer({ cards, lang, hero }: { cards: PatternCard[]; lang: Lang; hero?: ReactNode }) {
  const d = t(lang);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "">("");
  const [agent, setAgent] = useState<AgentId | "">("");
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get("cat") as Category | null;
    const a = sp.get("agent") as AgentId | null;
    /* eslint-disable react-hooks/set-state-in-effect */
    setQ(sp.get("q") ?? "");
    if (c && CATEGORIES.includes(c)) setCat(c);
    if (a && AGENTS.includes(a)) setAgent(a);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!ready) return;
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (cat) sp.set("cat", cat);
    if (agent) sp.set("agent", agent);
    const qs = sp.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [q, cat, agent, ready]);

  const onHotkey = useEffectEvent((e: KeyboardEvent) => {
    const meta = e.metaKey || e.ctrlKey;
    const isFind = e.key === "/" || (meta && e.key.toLowerCase() === "k");
    if (!isFind) return;
    const el = e.target as HTMLElement | null;
    if (e.key === "/" && (el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" || el?.isContentEditable)) return;
    e.preventDefault();
    inputRef.current?.focus();
    inputRef.current?.select();
  });

  useEffect(() => {
    window.addEventListener("keydown", onHotkey);
    return () => window.removeEventListener("keydown", onHotkey);
  }, []);

  const filtered = useMemo(
    () => cards.filter((c) => (!cat || c.category === cat) && (!agent || c.agents.includes(agent)) && (!q || matches(c, q))),
    [cards, q, cat, agent],
  );

  const byCat = useMemo(() => {
    const map = Object.fromEntries(CATEGORIES.map((c) => [c, [] as PatternCard[]])) as Record<Category, PatternCard[]>;
    for (const card of filtered) map[card.category].push(card);
    return map;
  }, [filtered]);

  const ids = useMemo(() => frameIndex(cards), [cards]);
  const visibleCats = cat ? ([cat] as Category[]) : CATEGORIES;

  return (
    <div className="af-deck">
      {hero}
      <form
        className="af-recall"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          document.getElementById("patterns")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }}
      >
        <label htmlFor="pattern-search" className="sr-only">
          {d.searchLabel}
        </label>
        <input
          ref={inputRef}
          id="pattern-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={d.searchPlaceholder}
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit">{d.searchButton}</button>
      </form>

      <div className="af-deck-rest" id="patterns">
        <div className="af-filters">
          <div className="af-flt-row" role="group" aria-label={d.category}>
            <span>{d.category}</span>
            <button type="button" className="af-chip" onClick={() => setCat("")} aria-pressed={!cat}>
              {d.allCategories}
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className="af-chip"
                onClick={() => setCat(cat === c ? "" : c)}
                aria-pressed={cat === c}
                data-cat={c}
              >
                {CAT_CODE[c]} · {CATEGORY_META[c][lang]}
              </button>
            ))}
          </div>
          <div className="af-flt-row" role="group" aria-label={d.agent}>
            <span>{d.agent}</span>
            <button type="button" className="af-chip" onClick={() => setAgent("")} aria-pressed={!agent}>
              {d.allAgents}
            </button>
            {AGENTS.map((a) => (
              <button
                key={a}
                type="button"
                className="af-chip"
                onClick={() => setAgent(agent === a ? "" : a)}
                aria-pressed={agent === a}
              >
                {AGENT_LABEL[a]}
              </button>
            ))}
          </div>
        </div>

        <div className="af-results">
          <span aria-live="polite" data-testid="result-count">
            {d.results(filtered.length)}
          </span>
          {(q || cat || agent) && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                setCat("");
                setAgent("");
              }}
            >
              {d.clear}
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="af-empty">
            <p>{d.noResults}</p>
            <a href={`${ISSUE_URL}&title=${encodeURIComponent("[Failure] " + q)}`}>{d.submitCta}</a>
          </div>
        ) : (
          <div className="af-chans" style={cat ? { gridTemplateColumns: "1fr" } : undefined}>
            {visibleCats.map((c) => {
              const list = byCat[c];
              if (!list.length) return null;
              const meta = CATEGORY_META[c];
              return (
                <section key={c} className="af-chan" data-cat={c} aria-labelledby={`chan-${c}`}>
                  <span className={`af-rail ${CAT_RAIL[c]}`} aria-hidden />
                  <h2 className="af-chan-h" id={`chan-${c}`}>
                    <span className="af-chan-name">
                      <span className="code">{CAT_CODE[c]}</span>
                      {meta[lang]}
                    </span>
                    <span className="af-chan-q">{meta.q[lang]}</span>
                  </h2>
                  {list.map((card) => (
                    <Link key={card.slug} href={href(lang, `/patterns/${card.slug}`)} className="af-hit">
                      <span className="id">{ids.get(card.slug)}</span>
                      <span className="af-hit-copy">
                        <span className="af-hit-title">{card.title}</span>
                        <span className="af-altline">{card.altTitle}</span>
                        <span className="af-slug">{card.slug}</span>
                      </span>
                    </Link>
                  ))}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
