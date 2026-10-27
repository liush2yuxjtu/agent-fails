import { CATEGORY_META, AGENT_LABEL } from "@/lib/i18n";
import type { AgentId, Category } from "@/lib/types";
import type { Lang } from "@/lib/site";

export const CAT_CODE: Record<Category, string> = {
  "wrong-feature": "WF",
  bug: "BUG",
  overreach: "OVR",
};

export const CAT_RAIL: Record<Category, string> = {
  "wrong-feature": "af-rail-wf",
  bug: "af-rail-bug",
  overreach: "af-rail-ovr",
};

/**
 * Map slugs to display IDs such as WF-01, counting from 1 per category in input order.
 * Numbers use at least two digits; later duplicate slugs replace earlier entries.
 */
export function frameIndex(items: { slug: string; category: Category }[]): Map<string, string> {
  const n: Partial<Record<Category, number>> = {};
  const out = new Map<string, string>();
  for (const item of items) {
    const next = (n[item.category] ?? 0) + 1;
    n[item.category] = next;
    out.set(item.slug, `${CAT_CODE[item.category]}-${String(next).padStart(2, "0")}`);
  }
  return out;
}

export const CAT_STYLES: Record<Category, { badge: string; dot: string; ring: string }> = {
  "wrong-feature": { badge: "", dot: "wf", ring: "" },
  bug: { badge: "", dot: "bug", ring: "" },
  overreach: { badge: "", dot: "ovr", ring: "" },
};

/** Render a category code alongside its localized label. */
export function CategoryBadge({ category, lang }: { category: Category; lang: Lang }) {
  return (
    <span className="af-badge">
      <span className={`rail ${CAT_STYLES[category].dot}`} aria-hidden />
      {CAT_CODE[category]} · {CATEGORY_META[category][lang]}
    </span>
  );
}

/** Render agent display labels in the supplied order. */
export function AgentChips({ agents }: { agents: AgentId[] }) {
  return (
    <span className="af-agents">
      {agents.map((a) => (
        <span key={a}>{AGENT_LABEL[a]}</span>
      ))}
    </span>
  );
}
