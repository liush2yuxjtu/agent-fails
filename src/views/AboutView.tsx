import Link from "next/link";
import { CATEGORY_META } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/types";
import { href, OWNER_POSTS, OWNER_X_HANDLE, OWNER_X_URL, REPO_URL, type Lang } from "@/lib/site";
import { CAT_STYLES } from "@/components/Badges";

const CREDITS = [
  { name: "ralfyishere/agent-failure-modes (AFM index, CC BY 4.0)", url: "https://github.com/ralfyishere/agent-failure-modes" },
  { name: "vnmoorthy/agent-review: TAXONOMY.md (35 agent bug patterns)", url: "https://github.com/vnmoorthy/agent-review/blob/main/TAXONOMY.md" },
  { name: "developertoolkit.ai: A failure taxonomy for agent-written changes", url: "https://developertoolkit.ai/en/workflows/operate/failure-taxonomy/" },
  { name: "Agentic SDLC handbook, ch. 20: Anti-patterns and failure modes", url: "https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch20-anti-patterns-and-failure-modes.html" },
  { name: "Kaplira: When an AI agent changes unrelated files", url: "https://kaplira.com/guides/ai-agent-changes-unrelated-files/" },
  { name: "Night Forge: Stop your AI agent editing the wrong files", url: "https://night-forge.com/blog/stop-ai-agent-editing-wrong-files" },
  { name: "dev.to (yureki_lab): scope creep and the diff budget", url: "https://dev.to/yureki_lab/how-i-stopped-my-ai-coding-agents-scope-creep-with-a-diff-budget-47lj" },
  { name: "claudecodeguides.com: Stop Claude Code modifying unrelated files", url: "https://claudecodeguides.com/claude-code-stop-modifying-unrelated-files/" },
  { name: "Anthropic: Solving code review at Anthropic", url: "https://claude.dev/blog/solving-code-review-at-anthropic/" },
];

const C = {
  en: {
    h1: "About AgentFails",
    lead: "AgentFails (智能体翻车库) collects the ways AI coding agents go wrong and pairs each one with a fix you can paste into your repo today. It is free, open source, and built from community submissions.",
    viewH: "The three-part view",
    viewP1: "Checking an agent's work comes down to three questions. The framing comes from ",
    viewP2: "'s X thread on reviewing agent output. Every pattern here belongs to exactly one:",
    explain: {
      "wrong-feature": "It built something other than what you intended. Reviewing the PR is too late. Have teammates annotate the spec, mockup or artifact before code, and write acceptance checks that rule out the wrong reading.",
      bug: "The feature is right but buggy. Catch it with a review pass (a /code-review style skill or a fresh-context reviewer), real tests the agent cannot weaken, and evidence instead of claims.",
      overreach: "It works and has no bugs, but it isn't how you wanted it. Example: you asked for a small frontend tweak and the agent changed backend logic. Fix it with a shared /verify skill, scope rules, diff budgets and hooks kept in the repo, so the whole team runs the same guardrails.",
    } as Record<string, string>,
    howH: "How a pattern is built",
    how: [
      "A name and a type (wrong feature, bug or overreach).",
      "The symptom you see, why agents do it, and a minimal example.",
      "Copy-paste fixes: rules for CLAUDE.md, AGENTS.md and .cursor/rules, plus a Claude Code hook, skill or CI check where one helps.",
      "Sources. Rules in a context file are advice; hooks, permissions and CI checks are enforcement. We say which is which.",
    ],
    agentsNote: "Agent tags show which agents a pattern's fixes cover. Most patterns are reported across agents, so most entries carry all four.",
    creditsH: "Credits",
    creditsP: "The seed patterns are adapted from these public taxonomies and guides. Each pattern page links its specific sources. Go read the originals.",
    who: "Maintained by ",
    who2: ". Content lives in ",
    who3: "; changes are pull requests.",
    submit: "Submit a failure",
  },
  zh: {
    h1: "关于智能体翻车库",
    lead: "智能体翻车库（AgentFails）收集 AI 编程智能体的各种翻车方式，并为每一种配上今天就能粘贴进仓库的修复。它免费、开源，内容来自社区投稿。",
    viewH: "三分法",
    viewP1: "检查智能体的产出，归根结底是三个问题。这个分法来自 ",
    viewP2: " 关于审查智能体产出的 X 帖子。这里的每条模式都只属于其中一类：",
    explain: {
      "wrong-feature": "它做的东西不是你想要的。到审 PR 时已经太晚了。应该让队友在写代码之前就在需求文档、设计稿或产物上批注，并写出能排除错误理解的验收标准。",
      bug: "功能是对的，但有 bug。用审查环节来抓（/code-review 类技能或上下文干净的审查者）、用智能体改不了的真实测试、用证据代替口头声明。",
      overreach: "能用、也没 bug，但不是你想要的做法。例如：你只让改个前端小地方，智能体却动了后端逻辑。修复方式是把共享的 /verify 技能、范围规则、diff 预算和钩子放进仓库，让整个团队用同一套护栏。",
    } as Record<string, string>,
    howH: "一条模式包含什么",
    how: [
      "名称和类型（做错功能、有 bug 或越界）。",
      "你看到的症状、智能体为什么会这样、一个最小示例。",
      "复制即用的修复：CLAUDE.md、AGENTS.md、.cursor/rules 的规则，必要时再加 Claude Code 钩子、技能或 CI 检查。",
      "来源。写在上下文文件里的规则是建议；钩子、权限和 CI 检查才是强制。我们会说明哪个是哪个。",
    ],
    agentsNote: "智能体标签表示这条模式的修复覆盖了哪些智能体。大多数模式在各家智能体上都有报告，所以多数条目四个标签都有。",
    creditsH: "致谢",
    creditsP: "首批条目改编自以下公开的分类和指南。每个条目页面都链接了具体来源，建议去读原文。",
    who: "维护者：",
    who2: "。内容存放在 ",
    who3: "，修改都通过 Pull Request 进行。",
    submit: "投稿翻车案例",
  },
};

export function AboutView({ lang }: { lang: Lang }) {
  const c = C[lang];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{c.h1}</h1>
      <p className="mt-3 text-lg text-zinc-600">{c.lead}</p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{c.viewH}</h2>
        <p className="mt-2 text-zinc-700">
          {c.viewP1}
          <a href={OWNER_POSTS[0]} className="underline">{OWNER_X_HANDLE}</a>
          {c.viewP2}
        </p>
        <ol className="mt-5 space-y-4">
          {CATEGORIES.map((cat, i) => (
            <li key={cat} className={`rounded-xl border bg-white p-5 ${CAT_STYLES[cat].ring}`}>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <span className={`h-2.5 w-2.5 rounded-full ${CAT_STYLES[cat].dot}`} aria-hidden />
                {i + 1}. {CATEGORY_META[cat][lang]}: {CATEGORY_META[cat].q[lang]}
              </h3>
              <p className="mt-2 text-zinc-700">{c.explain[cat]}</p>
              <Link href={`${href(lang, "/")}?cat=${cat}#patterns`} className="mt-2 inline-block text-sm font-medium text-orange-700 underline">
                {CATEGORY_META[cat][lang]} →
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-zinc-500">
          X: {OWNER_POSTS.map((u, i) => <a key={u} href={u} className="mr-3 underline">{`post ${i + 1}`}</a>)}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{c.howH}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
          {c.how.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <p className="mt-3 text-sm text-zinc-500">{c.agentsNote}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{c.creditsH}</h2>
        <p className="mt-2 text-zinc-700">{c.creditsP}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {CREDITS.map((x) => <li key={x.url}><a href={x.url} className="text-blue-700 hover:underline" rel="noopener">{x.name}</a></li>)}
        </ul>
        <p className="mt-6 text-zinc-700">
          {c.who}<a href={OWNER_X_URL} className="underline">{OWNER_X_HANDLE}</a>{c.who2}
          <a href={REPO_URL} className="underline">GitHub</a>{c.who3}
        </p>
        <Link href={href(lang, "/submit")} className="mt-4 inline-block rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">{c.submit}</Link>
      </section>
    </div>
  );
}
