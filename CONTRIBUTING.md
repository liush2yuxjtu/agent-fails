# Contributing to AgentFails · 投稿指南

Thanks for helping! There are two ways to contribute. 两种投稿方式：

## 1. Open an issue (easiest) / 开 Issue（最简单）

Use the [failure case form](https://github.com/liush2yuxjtu/agent-fails/issues/new?template=failure-case.yml).
Tell us what you asked, what the agent did, and why it was wrong. A maintainer will turn good cases into patterns.
English or Chinese are both fine. 中英文均可。

## 2. Open a pull request / 提 Pull Request

Each pattern is **one YAML file** in `content/patterns/<slug>.yaml`. The site, search, sitemap and the
`/zh` mirror are generated from these files.

```yaml
slug: your-pattern-slug          # kebab-case, must equal the file name
category: overreach              # wrong-feature | bug | overreach (exactly one)
agents: [claude-code, cursor, codex, copilot]
tags: [words, people, search, for]
title:   { en: "...", zh: "..." }
summary: { en: "...", zh: "..." }
symptom: { en: "...", zh: "..." }
why:     { en: "...", zh: "..." }
example:
  caption: { en: "Illustrative.", zh: "示意。" }
  lang: diff
  code: |
    minimal, anonymized example
rule: |
  ## Heading
  - Rules rendered for CLAUDE.md, AGENTS.md and .cursor/rules/<slug>.mdc
cursor_globs: "**/*.ts"          # optional: scope the Cursor rule instead of alwaysApply
extras:                          # optional extra fixes
  - ref: scope-guard-hook        # reuse a shared snippet from content/snippets.yaml
  - kind: hook                   # or write one inline: hook | skill | settings | ci | spec
    title: { en: "...", zh: "..." }
    file: .claude/hooks/x.py
    lang: python
    code: |
      ...
sources:
  - title: Where it was reported
    url: https://...
```

### Choosing the type / 如何选类型

- **wrong-feature**: it built something other than what was intended.
- **bug**: the feature is right but buggy (including fake "tests pass" claims and weakened tests).
- **overreach**: it works and is bug-free, but isn't how you wanted it (touched unrelated code, added
  features, changed config, ran destructive commands).

### House rules / 规则

1. **No invented statistics or quotes.** Quote only what a source actually says, and link it.
2. **Credit sources.** Every pattern needs at least one source link. Adapting a public taxonomy is welcome
   with attribution.
3. **Fixes should be concrete and checkable.** "Be careful" is not a rule. Say which file, which command, which
   behavior. Rules in context files are advice; hooks, permissions and CI are enforcement. Prefer both.
4. **Test hook code** before submitting, and keep it dependency-free where possible.
5. **Anonymize** code and **never include secrets**.
6. Both `en` and `zh` are required for title, summary, symptom and why. Fix snippets can stay in English.
   If you can only write one language, open the PR anyway and say so. Someone will help translate.

### Check locally / 本地检查

```bash
npm install
npm run validate
npm run build
```
