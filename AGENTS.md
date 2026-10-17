<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AgentFails project rules

- Content lives in `content/patterns/*.yaml` (one file per pattern) and `content/snippets.yaml`.
  Run `npm run validate` after editing content and `npm run build` before saying done.
- Only modify files the task needs. No drive-by refactors, reformatting, dependency or config changes.
- Every page exists in English (`src/app/(en)`) and Chinese (`src/app/(zh)/zh`); keep them in sync via the
  shared views in `src/views`.
- Never invent statistics or quotes in content; every pattern needs a source link.
- No secrets in the repo. Newsletter config is the public env var `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION`.
