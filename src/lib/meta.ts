import type { Metadata } from "next";
import { absolute, alternates, href, SITE_NAME, SITE_NAME_ZH, SITE_URL, type Lang } from "./site";

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
};

export function pageMeta({ lang, path, title, description, type = "website" }: {
  lang: Lang; path: string; title?: string; description: string; type?: "website" | "article";
}): Metadata {
  const fullTitle = title ? `${title} · ${lang === "zh" ? SITE_NAME_ZH : SITE_NAME}` : HOME_SEO[lang].title;
  const url = absolute(href(lang, path));
  const alt = alternates(path);
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
      locale: lang === "zh" ? "zh_CN" : "en_US",
      alternateLocale: lang === "zh" ? ["en_US"] : ["zh_CN"],
      type,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "AgentFails · 智能体翻车库" }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"], creator: "@liushiyumath" },
    robots: { index: true, follow: true },
  };
}
