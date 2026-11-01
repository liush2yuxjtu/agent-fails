import { LANG_PREFIX, LANGS, pathLang, stripLangPrefix, type Lang, href } from "./site";

/** Cookie that remembers the visitor's last chosen / detected UI language. */
export const LANG_COOKIE = "af_lang";

/** One year. Long-lived so return visits follow the cookie, not Accept-Language. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLang(value: string | undefined | null): value is Lang {
  return (LANGS as readonly string[]).includes(value ?? "");
}

/** @deprecated use pathLang — kept for call-site clarity in older comments */
export function isZhPath(pathname: string): boolean {
  return pathLang(pathname) === "zh";
}

export function stripZhPrefix(pathname: string): string {
  return stripLangPrefix(pathname);
}

export function withZhPrefix(pathname: string): string {
  return href("zh", pathname);
}

const TAG_TO_LANG: Array<{ test: (tag: string) => boolean; lang: Lang }> = [
  { test: (t) => t === "zh" || t.startsWith("zh-"), lang: "zh" },
  { test: (t) => t === "pt" || t.startsWith("pt-"), lang: "pt" },
  { test: (t) => t === "ko" || t.startsWith("ko-"), lang: "ko" },
  { test: (t) => t === "vi" || t.startsWith("vi-"), lang: "vi" },
  { test: (t) => t === "de" || t.startsWith("de-"), lang: "de" },
  { test: (t) => t === "en" || t.startsWith("en-"), lang: "en" },
];

/**
 * Pick the first supported locale from Accept-Language (highest-q first).
 * Returns undefined when the header is empty or only lists unsupported tags.
 */
export function preferLocale(header: string | null | undefined): Lang | undefined {
  if (!header) return undefined;
  const tags = header
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const tag = rawTag.trim().toLowerCase();
      let q = 1;
      for (const param of params) {
        const [k, v] = param.trim().split("=");
        if (k === "q" && v != null) {
          const parsed = Number.parseFloat(v);
          if (Number.isFinite(parsed)) q = parsed;
        }
      }
      return { tag, q };
    })
    .filter((t) => t.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    if (tag === "*") continue;
    for (const rule of TAG_TO_LANG) {
      if (rule.test(tag)) return rule.lang;
    }
  }
  return undefined;
}

/** True when Accept-Language prefers a zh* tag over en* (legacy helper). */
export function acceptsChineseFirst(header: string | null | undefined): boolean {
  return preferLocale(header) === "zh";
}

export function withLangPath(lang: Lang, pathname: string): string {
  return href(lang, stripLangPrefix(pathname));
}

export { LANG_PREFIX, pathLang, stripLangPrefix };
