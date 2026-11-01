import type { Metadata } from "next";
import {
  absolute,
  alternates,
  href,
  LANG_OG,
  LANGS,
  SITE_NAME,
  SITE_NAME_ZH,
  SITE_URL,
  type Lang,
} from "./site";

export const HOME_SEO: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "AgentFails: How AI coding agents fail, with copy-paste fixes",
    description:
      "Searchable database of how AI coding agents fail: wrong feature, bugs and overreach, with copy-paste fixes for Claude Code, Cursor, Codex and Copilot.",
  },
  zh: {
    title: "智能体翻车库 AgentFails: AI 编程智能体翻车模式与修复",
    description:
      "可搜索的 AI 编程智能体翻车模式库：做错功能、有 bug、越界。每条都有可直接复制的修复，适用于 Claude Code、Cursor、Codex 和 Copilot。",
  },
  pt: {
    title: "AgentFails: como agentes de código com IA falham, com consertos copy-paste",
    description:
      "Base pesquisável de falhas de agentes de código com IA: funcionalidade errada, bugs e excesso de escopo, com consertos copy-paste para Claude Code, Cursor, Codex e Copilot.",
  },
  ko: {
    title: "AgentFails: AI 코딩 에이전트 실패 패턴과 복사·붙여넣기 수정",
    description:
      "AI 코딩 에이전트 실패를 검색할 수 있는 데이터베이스: 잘못된 기능, 버그, 범위 초과. Claude Code, Cursor, Codex, Copilot용 복사·붙여넣기 수정 포함.",
  },
  vi: {
    title: "AgentFails: cách agent lập trình AI thất bại, kèm bản sửa copy-paste",
    description:
      "Cơ sở dữ liệu có thể tìm kiếm về lỗi agent lập trình AI: sai tính năng, bug và vượt phạm vi, kèm bản sửa copy-paste cho Claude Code, Cursor, Codex và Copilot.",
  },
  de: {
    title: "AgentFails: Wie KI-Coding-Agenten scheitern — mit Copy-Paste-Fixes",
    description:
      "Durchsuchbare Datenbank zu KI-Coding-Agent-Fehlern: falsches Feature, Bugs und Übergriff, mit Copy-Paste-Fixes für Claude Code, Cursor, Codex und Copilot.",
  },
};

export function pageMeta({ lang, path, title, description, type = "website" }: {
  lang: Lang; path: string; title?: string; description: string; type?: "website" | "article";
}): Metadata {
  const fullTitle = title
    ? `${title} · ${lang === "zh" ? SITE_NAME_ZH : SITE_NAME}`
    : HOME_SEO[lang].title;
  const url = absolute(href(lang, path));
  const alt = alternates(path);
  const alternateLocale = LANGS.filter((l) => l !== lang).map((l) => LANG_OG[l]);
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: fullTitle },
    description,
    alternates: { ...alt, canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: lang === "zh" ? SITE_NAME_ZH : SITE_NAME,
      locale: LANG_OG[lang],
      alternateLocale,
      type,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "AgentFails · 智能体翻车库" }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"], creator: "@liushiyumath" },
    robots: { index: true, follow: true },
  };
}
