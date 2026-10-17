import type { AgentId, Category } from "./types";
import type { Lang } from "./site";

export const CATEGORY_META: Record<Category, { en: string; zh: string; q: { en: string; zh: string }; fix: { en: string; zh: string }; color: string }> = {
  "wrong-feature": {
    en: "Wrong feature",
    zh: "做错了功能",
    q: { en: "Did it build the right thing?", zh: "做的是对的东西吗？" },
    fix: { en: "Spec / artifact annotation, acceptance checks", zh: "在需求文档/产物上批注，写验收标准" },
    color: "blue",
  },
  bug: {
    en: "Bug",
    zh: "有 Bug",
    q: { en: "Is it bug-free?", zh: "没有 bug 吗？" },
    fix: { en: "/code-review skill, real tests, evidence", zh: "/code-review 技能、真实的测试、拿出证据" },
    color: "red",
  },
  overreach: {
    en: "Overreach",
    zh: "越界 / 不理想",
    q: { en: "Is it how you wanted it, with no overreach?", zh: "是你想要的做法吗？有没有越界？" },
    fix: { en: "Shared /verify skill, scope rules, diff budgets, hooks", zh: "共享 /verify 技能、范围规则、diff 预算、钩子" },
    color: "amber",
  },
};

export const AGENT_LABEL: Record<AgentId, string> = {
  "claude-code": "Claude Code",
  cursor: "Cursor",
  codex: "Codex",
  copilot: "Copilot agent",
};

const en = {
  tagline: "How AI coding agents go wrong, each with a copy-paste fix.",
  heroTitle: "Every way your coding agent goes wrong, with the fix.",
  heroSub:
    "A searchable, community-built database of failure patterns for Claude Code, Cursor, Codex and Copilot agent. Each one comes with rules for CLAUDE.md, AGENTS.md and .cursor/rules, plus a hook or /verify skill you can paste in today.",
  nav: { patterns: "Patterns", submit: "Submit", about: "About", sponsor: "Sponsor" },
  langSwitch: "中文",
  searchPlaceholder: "Search: changed unrelated files, skipped tests, invented package…",
  searchLabel: "Search patterns",
  allCategories: "All",
  allAgents: "All agents",
  category: "Type",
  agent: "Agent",
  results: (n: number) => `${n} pattern${n === 1 ? "" : "s"}`,
  noResults: "No pattern matches. Seen this one in the wild?",
  submitCta: "Submit a failure",
  clear: "Clear filters",
  threeQuestions: "Three questions, three kinds of failure",
  threeQuestionsSub: "Every pattern belongs to exactly one of them.",
  fixWith: "Fix with",
  browse: "Browse all patterns",
  // detail
  symptom: "Symptom",
  why: "Why it happens",
  example: "Example",
  fixes: "Copy-paste fixes",
  fixesSub: "Pick the files for the agents you use. Snippets are in English so they work in any repo.",
  sources: "Sources and credit",
  appliesTo: "Applies to",
  editOnGitHub: "Improve this pattern on GitHub",
  related: "Related patterns",
  copy: "Copy",
  copied: "Copied",
  sponsorSlot: "This sponsor slot is open.",
  sponsorSlotCta: "Sponsor AgentFails",
  backToAll: "All patterns",
  report: "Hit this and the fix didn't work? Tell us",
  // newsletter
  nlTitle: "翻车 of the week",
  nlSub: "One real agent failure and its fix, every week. Free, short, no spam.",
  nlPlaceholder: "you@example.com",
  nlButton: "Subscribe",
  nlStubDone: "Thanks! The newsletter isn't open yet, so nothing was saved. Watch the GitHub repo to hear when it launches.",
  nlWatch: "Watch on GitHub",
  footer: "Content is community-submitted via GitHub. Credit and links go to the original authors.",
  footerSource: "Source on GitHub",
};

export type Dict = typeof en;

const zh: Dict = {
  tagline: "AI 编程智能体的各种翻车方式，每一种都附可直接复制的修复。",
  heroTitle: "你的编程智能体会怎么翻车，这里都有，还附修复。",
  heroSub:
    "一个可搜索、由社区共建的翻车模式数据库，覆盖 Claude Code、Cursor、Codex 和 Copilot 智能体。每条都附带可以直接粘贴进 CLAUDE.md、AGENTS.md、.cursor/rules 的规则，以及钩子或 /verify 技能。",
  nav: { patterns: "翻车库", submit: "投稿", about: "关于", sponsor: "赞助" },
  langSwitch: "English",
  searchPlaceholder: "搜索：改了无关文件、跳过测试、编造的包……",
  searchLabel: "搜索翻车模式",
  allCategories: "全部",
  allAgents: "全部智能体",
  category: "类型",
  agent: "智能体",
  results: (n: number) => `共 ${n} 条`,
  noResults: "没有匹配的条目。你遇到过这种翻车吗？",
  submitCta: "投稿翻车案例",
  clear: "清除筛选",
  threeQuestions: "三个问题，三类翻车",
  threeQuestionsSub: "每条模式都只属于其中一类。",
  fixWith: "修复方式",
  browse: "浏览全部条目",
  symptom: "症状",
  why: "为什么会这样",
  example: "示例",
  fixes: "复制即用的修复",
  fixesSub: "按你用的智能体挑选文件。规则片段用英文写，放进任何仓库都能用。",
  sources: "来源与致谢",
  appliesTo: "适用于",
  editOnGitHub: "在 GitHub 上改进这条",
  related: "相关条目",
  copy: "复制",
  copied: "已复制",
  sponsorSlot: "此赞助位空缺中。",
  sponsorSlotCta: "赞助智能体翻车库",
  backToAll: "全部条目",
  report: "遇到了、但修复没用？告诉我们",
  nlTitle: "每周翻车",
  nlSub: "每周一个真实的智能体翻车案例和它的修复。免费、简短、不刷屏。",
  nlPlaceholder: "you@example.com",
  nlButton: "订阅",
  nlStubDone: "谢谢！周报还没正式开通，所以这次没有保存任何信息。可以先在 GitHub 上 Watch 本仓库，开通时会通知。",
  nlWatch: "在 GitHub 上关注",
  footer: "内容由社区通过 GitHub 投稿。版权与链接归原作者。",
  footerSource: "GitHub 源码",
};

export function t(lang: Lang): Dict {
  return lang === "zh" ? zh : en;
}
