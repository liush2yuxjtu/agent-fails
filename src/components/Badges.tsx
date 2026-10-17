import { CATEGORY_META, AGENT_LABEL } from "@/lib/i18n";
import type { AgentId, Category } from "@/lib/types";
import type { Lang } from "@/lib/site";

export const CAT_STYLES: Record<Category, { badge: string; dot: string; ring: string }> = {
  "wrong-feature": { badge: "bg-blue-50 text-blue-700 ring-blue-200", dot: "bg-blue-500", ring: "border-blue-200" },
  bug: { badge: "bg-red-50 text-red-700 ring-red-200", dot: "bg-red-500", ring: "border-red-200" },
  overreach: { badge: "bg-amber-50 text-amber-800 ring-amber-200", dot: "bg-amber-500", ring: "border-amber-200" },
};

export function CategoryBadge({ category, lang }: { category: Category; lang: Lang }) {
  const s = CAT_STYLES[category];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {CATEGORY_META[category][lang]}
    </span>
  );
}

export function AgentChips({ agents }: { agents: AgentId[] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {agents.map((a) => (
        <span key={a} className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] font-medium text-zinc-600">
          {AGENT_LABEL[a]}
        </span>
      ))}
    </span>
  );
}
