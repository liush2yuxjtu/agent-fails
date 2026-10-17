// Route factories so /en and /zh pages share one implementation.
import type { Metadata } from "next";
import { t } from "./i18n";
import { pageMeta } from "./meta";
import { getPattern, getPatterns } from "./patterns";
import type { Lang } from "./site";
import { SiteShell } from "@/components/SiteShell";
import { HomeView } from "@/views/HomeView";
import { PatternView } from "@/views/PatternView";
import { SubmitView } from "@/views/SubmitView";
import { AboutView } from "@/views/AboutView";
import { SponsorView } from "@/views/SponsorView";

const DESC = {
  home: {
    en: "Searchable database of the ways AI coding agents (Claude Code, Cursor, Codex, Copilot agent) go wrong: wrong feature, bugs and overreach. Each pattern has copy-paste fixes for CLAUDE.md, AGENTS.md, .cursor/rules and Claude Code hooks.",
    zh: "可搜索的 AI 编程智能体（Claude Code、Cursor、Codex、Copilot）翻车模式库：做错功能、有 bug、越界。每条都附 CLAUDE.md、AGENTS.md、.cursor/rules 和 Claude Code 钩子的复制即用修复。",
  },
  submit: { en: "Submit an AI coding agent failure case to AgentFails via a prefilled GitHub issue or pull request.", zh: "通过预填好的 GitHub Issue 或 Pull Request，向智能体翻车库投稿 AI 编程智能体的翻车案例。" },
  about: { en: "The three-part view of AI coding agent failures (wrong feature, bug, overreach) behind AgentFails, and credits to the public taxonomies it builds on.", zh: "智能体翻车库背后的三分法（做错功能、有 bug、越界），以及对所引用公开分类的致谢。" },
  sponsor: { en: "Sponsor slots on AgentFails: pattern pages, the weekly newsletter, and featured fixes. Contact via GitHub issue.", zh: "智能体翻车库赞助位：条目页、每周周报、精选修复。通过 GitHub Issue 联系。" },
};

const TITLES = {
  submit: { en: "Submit a failure", zh: "投稿翻车案例" },
  about: { en: "About: the three-part view", zh: "关于：三分法" },
  sponsor: { en: "Sponsor", zh: "赞助" },
};

export function homeRoute(lang: Lang) {
  return {
    metadata: pageMeta({ lang, path: "/", description: DESC.home[lang] }),
    Page: () => <SiteShell lang={lang} path="/"><HomeView lang={lang} /></SiteShell>,
  };
}

export function staticRoute(lang: Lang, key: "submit" | "about" | "sponsor") {
  const View = { submit: SubmitView, about: AboutView, sponsor: SponsorView }[key];
  return {
    metadata: pageMeta({ lang, path: `/${key}`, title: TITLES[key][lang], description: DESC[key][lang] }),
    Page: () => <SiteShell lang={lang} path={`/${key}`}><View lang={lang} /></SiteShell>,
  };
}

type SlugProps = { params: Promise<{ slug: string }> };

export function patternRoute(lang: Lang) {
  return {
    generateStaticParams: () => getPatterns().map((p) => ({ slug: p.slug })),
    generateMetadata: async ({ params }: SlugProps): Promise<Metadata> => {
      const { slug } = await params;
      const p = getPattern(slug);
      if (!p) return { title: t(lang).noResults };
      return pageMeta({ lang, path: `/patterns/${slug}`, title: p.title[lang], description: p.summary[lang], type: "article" });
    },
    Page: async ({ params }: SlugProps) => {
      const { slug } = await params;
      return <SiteShell lang={lang} path={`/patterns/${slug}`}><PatternView slug={slug} lang={lang} /></SiteShell>;
    },
  };
}
