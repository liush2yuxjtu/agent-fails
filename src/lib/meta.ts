import type { Metadata } from "next";
import { absolute, alternates, href, SITE_NAME, SITE_NAME_ZH, SITE_URL, type Lang } from "./site";

export function pageMeta({ lang, path, title, description, type = "website" }: {
  lang: Lang; path: string; title?: string; description: string; type?: "website" | "article";
}): Metadata {
  const brand = lang === "zh" ? `${SITE_NAME_ZH} AgentFails` : `${SITE_NAME} (智能体翻车库)`;
  const fullTitle = title ? `${title} · ${lang === "zh" ? SITE_NAME_ZH : SITE_NAME}` : `${brand}: ${lang === "zh" ? "AI 编程智能体翻车模式与修复" : "How AI coding agents fail, with copy-paste fixes"}`;
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
