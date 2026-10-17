import "server-only";
import fs from "node:fs";
import path from "node:path";
import { load as yamlLoad } from "js-yaml";
import { AGENTS, CATEGORIES, type Fix, type Pattern, type PatternCard } from "./types";
import type { Lang } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "content");

type RawExtra = (Partial<Fix> & { ref?: string });
type RawPattern = Omit<Pattern, "fixes"> & {
  rule: string;
  cursor_globs?: string;
  extras?: RawExtra[];
};

let cache: Pattern[] | null = null;

function fail(file: string, msg: string): never {
  throw new Error(`[content] ${file}: ${msg}`);
}

function cursorRule(p: RawPattern): string {
  const scope = p.cursor_globs ? `globs: ${p.cursor_globs}\nalwaysApply: false` : "alwaysApply: true";
  return `---\ndescription: "AgentFails: ${p.title.en.replace(/"/g, "'")}"\n${scope}\n---\n\n${p.rule.trim()}\n`;
}

export function getPatterns(): Pattern[] {
  if (cache) return cache;
  const snippets = yamlLoad(fs.readFileSync(path.join(CONTENT_DIR, "snippets.yaml"), "utf8")) as Record<string, Fix>;
  const dir = path.join(CONTENT_DIR, "patterns");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));

  const patterns = files.map((file): Pattern => {
    const raw = yamlLoad(fs.readFileSync(path.join(dir, file), "utf8")) as RawPattern;
    for (const key of ["slug", "category", "agents", "title", "summary", "symptom", "why", "example", "rule", "sources"] as const) {
      if (!raw?.[key]) fail(file, `missing "${key}"`);
    }
    if (`${raw.slug}.yaml` !== file && `${raw.slug}.yml` !== file) fail(file, `slug "${raw.slug}" must match file name`);
    if (!CATEGORIES.includes(raw.category)) fail(file, `unknown category "${raw.category}"`);
    for (const a of raw.agents) if (!AGENTS.includes(a)) fail(file, `unknown agent "${a}"`);
    for (const k of ["title", "summary", "symptom", "why"] as const) {
      if (!raw[k].en || !raw[k].zh) fail(file, `"${k}" needs both en and zh`);
    }
    if (!raw.sources.length) fail(file, "needs at least one source");

    const rule = raw.rule.trim() + "\n";
    const fixes: Fix[] = [
      { kind: "rules", title: { en: "Claude Code: add to CLAUDE.md", zh: "Claude Code：加入 CLAUDE.md" }, file: "CLAUDE.md", lang: "markdown", code: rule },
      { kind: "rules", title: { en: "Codex, Copilot coding agent and others: add to AGENTS.md", zh: "Codex、Copilot 编码智能体等：加入 AGENTS.md" }, file: "AGENTS.md", lang: "markdown", code: rule },
      { kind: "cursor", title: { en: "Cursor: project rule", zh: "Cursor：项目规则" }, file: `.cursor/rules/${raw.slug}.mdc`, lang: "markdown", code: cursorRule(raw) },
    ];
    for (const extra of raw.extras ?? []) {
      if (extra.ref) {
        const s = snippets[extra.ref];
        if (!s) fail(file, `unknown snippet ref "${extra.ref}"`);
        fixes.push({ ...s });
      } else {
        if (!extra.title || !extra.file || !extra.code) fail(file, "extra fix needs title, file, code");
        fixes.push({ kind: extra.kind ?? "spec", title: extra.title, file: extra.file, lang: extra.lang ?? "text", code: extra.code, note: extra.note });
      }
    }

    return {
      slug: raw.slug,
      category: raw.category,
      agents: raw.agents,
      tags: raw.tags ?? [],
      title: raw.title,
      summary: raw.summary,
      symptom: raw.symptom,
      why: raw.why,
      example: raw.example,
      fixes,
      sources: raw.sources,
    };
  });

  const order = (c: string) => CATEGORIES.indexOf(c as never);
  patterns.sort((a, b) => order(a.category) - order(b.category) || a.title.en.localeCompare(b.title.en));
  cache = patterns;
  return patterns;
}

export function getPattern(slug: string): Pattern | undefined {
  return getPatterns().find((p) => p.slug === slug);
}

export function toCards(lang: Lang): PatternCard[] {
  const other: Lang = lang === "en" ? "zh" : "en";
  return getPatterns().map((p) => ({
    slug: p.slug,
    category: p.category,
    agents: p.agents,
    title: p.title[lang],
    altTitle: p.title[other],
    summary: p.summary[lang],
    search: [p.slug, p.title.en, p.title.zh, p.summary.en, p.summary.zh, p.symptom.en, p.symptom.zh, p.tags.join(" "), p.category]
      .join(" ")
      .toLowerCase(),
  }));
}
