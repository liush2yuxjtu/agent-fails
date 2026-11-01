export type Category = "wrong-feature" | "bug" | "overreach";
export type AgentId = "claude-code" | "cursor" | "codex" | "copilot";

/** Required en+zh in YAML; optional pt/ko/vi/de — UI falls back to en when missing. */
export type L10n = {
  en: string;
  zh: string;
  pt?: string;
  ko?: string;
  vi?: string;
  de?: string;
};

export type Fix = {
  kind: "rules" | "cursor" | "hook" | "skill" | "settings" | "ci" | "spec";
  title: L10n;
  file: string;
  lang: string;
  code: string;
  note?: L10n;
};

export type Source = { title: string; url: string };

export type Pattern = {
  slug: string;
  category: Category;
  agents: AgentId[];
  tags: string[];
  title: L10n;
  summary: L10n;
  symptom: L10n;
  why: L10n;
  example: { caption?: L10n; lang: string; code: string };
  fixes: Fix[];
  sources: Source[];
};

/** Lightweight shape passed to the client-side search. */
export type PatternCard = {
  slug: string;
  category: Category;
  agents: AgentId[];
  title: string;
  altTitle: string;
  summary: string;
  search: string;
  /** True when title/summary fell back to English for the active UI lang. */
  fallback: boolean;
};

export const CATEGORIES: Category[] = ["wrong-feature", "bug", "overreach"];
export const AGENTS: AgentId[] = ["claude-code", "cursor", "codex", "copilot"];
