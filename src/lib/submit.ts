import { ISSUE_URL, REPO_URL } from "./site";

export const PATTERN_TEMPLATE = `slug: your-pattern-slug   # must match the file name
category: overreach       # wrong-feature | bug | overreach
agents: [claude-code, cursor, codex, copilot]
tags: [keywords, people, would, search]
title:
  en: Short title of the failure
  zh: 中文标题
summary:
  en: One or two sentences.
  zh: 一两句话。
symptom:
  en: What you see when it happens.
  zh: 发生时你会看到什么。
why:
  en: Why agents do this. Credit sources; no invented numbers.
  zh: 智能体为什么会这样。注明来源，不要编数据。
example:
  caption:
    en: Illustrative, or link to the real case.
    zh: 示意，或附真实案例链接。
  lang: text
  code: |
    Paste a minimal (anonymized) diff, prompt or transcript excerpt.
rule: |
  ## Rule heading
  - Concrete, checkable instruction for CLAUDE.md / AGENTS.md / .cursor/rules.
extras:
  - ref: verify-skill      # or scope-guard-hook, diff-budget-check, ... (see content/snippets.yaml)
sources:
  - title: Where this was reported
    url: https://example.com/your-source
`;

export const PR_URL = `${REPO_URL}/new/main/content/patterns?filename=${encodeURIComponent("your-pattern-slug.yaml")}&value=${encodeURIComponent(PATTERN_TEMPLATE)}`;

export function issueUrl(fields: Record<string, string>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(fields)) if (v) sp.set(k, v);
  const qs = sp.toString();
  return qs ? `${ISSUE_URL}&${qs}` : ISSUE_URL;
}
