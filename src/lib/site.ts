export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://agent-fails.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "AgentFails";
export const SITE_NAME_ZH = "智能体翻车库";
export const REPO = "liush2yuxjtu/agent-fails";
export const REPO_URL = `https://github.com/${REPO}`;
export const OWNER_X_HANDLE = "@liushiyumath";
export const OWNER_X_URL = "https://x.com/liushiyumath";
export const OWNER_POSTS = [
  "https://x.com/liushiyumath/status/2111201130277662883",
  "https://x.com/liushiyumath/status/2111233400346710364",
];
export const NEWSLETTER_FORM_ACTION = (process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION || "").trim();

export const ISSUE_URL = `${REPO_URL}/issues/new?template=failure-case.yml`;
export const SPONSOR_ISSUE_URL = `${REPO_URL}/issues/new?template=sponsor.yml`;

/**
 * UI locales.
 * URL map (documented choice):
 *   en → /…
 *   zh → /zh…
 *   pt → /pt…   (Brazilian Portuguese; hreflang pt-BR — short /pt to match /zh style)
 *   ko → /ko…
 *   vi → /vi…
 *   de → /de…
 */
export const LANGS = ["en", "zh", "pt", "ko", "vi", "de"] as const;
export type Lang = (typeof LANGS)[number];

/** Path segment for each lang; empty for English (lives at /). */
export const LANG_PREFIX: Record<Lang, string> = {
  en: "",
  zh: "zh",
  pt: "pt",
  ko: "ko",
  vi: "vi",
  de: "de",
};

export const LANG_HREFLANG: Record<Lang, string> = {
  en: "en",
  zh: "zh-CN",
  pt: "pt-BR",
  ko: "ko",
  vi: "vi",
  de: "de",
};

export const LANG_HTML: Record<Lang, string> = {
  en: "en",
  zh: "zh-CN",
  pt: "pt-BR",
  ko: "ko",
  vi: "vi",
  de: "de",
};

export const LANG_OG: Record<Lang, string> = {
  en: "en_US",
  zh: "zh_CN",
  pt: "pt_BR",
  ko: "ko_KR",
  vi: "vi_VN",
  de: "de_DE",
};

/** Compact switcher labels. */
export const LANG_LABEL: Record<Lang, string> = {
  en: "EN",
  zh: "中文",
  pt: "PT",
  ko: "KO",
  vi: "VI",
  de: "DE",
};

export function href(lang: Lang, path: string): string {
  const prefix = LANG_PREFIX[lang];
  if (!prefix) return path;
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
}

export function pathLang(pathname: string): Lang {
  for (const lang of LANGS) {
    const prefix = LANG_PREFIX[lang];
    if (!prefix) continue;
    if (pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)) return lang;
  }
  return "en";
}

export function stripLangPrefix(pathname: string): string {
  const lang = pathLang(pathname);
  const prefix = LANG_PREFIX[lang];
  if (!prefix) return pathname;
  if (pathname === `/${prefix}`) return "/";
  return pathname.slice(prefix.length + 1);
}

export function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = { "x-default": absolute(path) };
  for (const lang of LANGS) {
    out[LANG_HREFLANG[lang]] = absolute(href(lang, path));
  }
  return out;
}

export function alternates(path: string) {
  return {
    canonical: absolute(path),
    languages: languageAlternates(path),
  };
}

/** Resolve a bilingual (or partially translated) string for the active UI lang; falls back to English. */
export function lx<T extends { en: string; zh?: string } & Partial<Record<Lang, string>>>(
  text: T,
  lang: Lang,
): string {
  return text[lang] ?? text.en;
}

export function hasLx<T extends Partial<Record<Lang, string>>>(text: T | undefined, lang: Lang): boolean {
  return Boolean(text?.[lang]);
}
