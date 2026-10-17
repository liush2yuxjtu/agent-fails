# AgentFails · 智能体翻车库

**Every way your AI coding agent goes wrong, with a copy-paste fix.**

AgentFails is a searchable, community-built database of failure patterns for AI coding agents:
Claude Code, Cursor, Codex, Copilot agent and friends. Each pattern ships with ready-to-paste rules for
`CLAUDE.md`, `AGENTS.md` and `.cursor/rules`, plus a Claude Code hook, `/verify` skill or CI check where it helps.

Live: **https://agent-fails.vercel.app** · 中文: **https://agent-fails.vercel.app/zh**

## The three-part view

Every pattern belongs to exactly one type, following
[@liushiyumath's thread](https://x.com/liushiyumath/status/2111233400346710364) on checking agent output:

| # | Type | Question | Typical fix |
|---|------|----------|-------------|
| 1 | **Wrong feature** (做错功能) | Did it build the right thing? | Annotate the spec or artifact before code; acceptance checks |
| 2 | **Bug** (有 Bug) | Is it bug-free? | `/code-review`-style review, real tests, evidence instead of claims |
| 3 | **Overreach** (越界 / 不理想) | Is it how you wanted it? Example: you asked for a small frontend tweak and it changed backend logic | Shared `/verify` skill, scope rules, diff budgets, hooks |

## Contribute a failure

- Quick: [open a failure-case issue](https://github.com/liush2yuxjtu/agent-fails/issues/new?template=failure-case.yml)
- Full: add one YAML file to [`content/patterns/`](content/patterns/). See [CONTRIBUTING.md](CONTRIBUTING.md).

Accepted cases are credited on the site and in the "翻车 of the week" newsletter.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run validate   # check content/patterns/*.yaml
npm run build      # validate + production build
```

Stack: Next.js (App Router, TypeScript, Tailwind CSS). Every page is statically generated from the YAML files
in `content/`, with an English site at `/` and a full Chinese mirror at `/zh`. Pushes to `main` deploy on Vercel.

Environment variables (all optional, all public; see `.env.example`):

- `NEXT_PUBLIC_SITE_URL`: canonical URL (default `https://agent-fails.vercel.app`)
- `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION`: public newsletter subscribe URL. When unset, the signup form is a
  stub that stores nothing.

## Credits

The seed patterns are adapted from, and link back to, these public sources:
[agent-failure-modes](https://github.com/ralfyishere/agent-failure-modes) (CC BY 4.0),
[agent-review TAXONOMY](https://github.com/vnmoorthy/agent-review/blob/main/TAXONOMY.md),
[developertoolkit.ai failure taxonomy](https://developertoolkit.ai/en/workflows/operate/failure-taxonomy/),
[Agentic SDLC handbook ch. 20](https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch20-anti-patterns-and-failure-modes.html),
[Kaplira](https://kaplira.com/guides/ai-agent-changes-unrelated-files/),
[Night Forge](https://night-forge.com/blog/stop-ai-agent-editing-wrong-files),
[dev.to diff budget](https://dev.to/yureki_lab/how-i-stopped-my-ai-coding-agents-scope-creep-with-a-diff-budget-47lj),
[claudecodeguides.com](https://claudecodeguides.com/claude-code-stop-modifying-unrelated-files/) and
[Anthropic's code review post](https://claude.dev/blog/solving-code-review-at-anthropic/).

## License

Code: MIT. Content in `content/`: CC BY 4.0. See [LICENSE](LICENSE).
