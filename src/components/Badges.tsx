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

/** Display ids such as WF-01. Index follows the list order passed in, which is category then English title. */
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

export function CategoryBadge({ category, lang }: { category: Category; lang: Lang }) {
  return (
    <span className="af-badge">
      <span className={`rail ${CAT_STYLES[category].dot}`} aria-hidden />
      {CAT_CODE[category]} · {CATEGORY_META[category][lang]}
    </span>
  );
}

export function AgentChips({ agents }: { agents: AgentId[] }) {
  return (
    <span className="af-agents">
      {agents.map((a) => (
        <span key={a}>{AGENT_LABEL[a]}</span>
      ))}
    </span>
  );
}
