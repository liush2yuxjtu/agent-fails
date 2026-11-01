import type { Lang } from "./site";

/** Cookie that remembers the visitor's last chosen / detected UI language. */
export const LANG_COOKIE = "af_lang";

/** One year. Long-lived so return visits follow the cookie, not Accept-Language. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "zh";
}

/** Path is the Chinese route tree (`/zh` or `/zh/...`). */
export function isZhPath(pathname: string): boolean {
  return pathname === "/zh" || pathname.startsWith("/zh/");
}

/** Strip the `/zh` prefix; `/zh` → `/`. */
export function stripZhPrefix(pathname: string): string {
  if (pathname === "/zh") return "/";
  if (pathname.startsWith("/zh/")) return pathname.slice(3);
  return pathname;
}

/** Add the `/zh` prefix; `/` → `/zh`. */
export function withZhPrefix(pathname: string): string {
  if (pathname === "/") return "/zh";
  return `/zh${pathname}`;
}

/**
 * True when Accept-Language prefers a zh* tag over en* (highest-q first).
 * Other languages are skipped until zh or en appears.
 */
export function acceptsChineseFirst(header: string | null | undefined): boolean {
  if (!header) return false;
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
    if (tag === "zh" || tag.startsWith("zh-")) return true;
    if (tag === "en" || tag.startsWith("en-")) return false;
  }
  return false;
}
