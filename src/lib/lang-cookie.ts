import { LANG_COOKIE, LANG_COOKIE_MAX_AGE } from "./locale";
import type { Lang } from "./site";

/** Stamp af_lang in the browser before a manual language navigation. */
export function rememberLang(lang: Lang): void {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}
