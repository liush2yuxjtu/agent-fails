import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LANG_COOKIE,
  LANG_COOKIE_MAX_AGE,
  isLang,
  preferLocale,
  withLangPath,
} from "@/lib/locale";
import { pathLang, type Lang } from "@/lib/site";

/**
 * Visitor language preference across en / zh / pt / ko / vi / de.
 *
 * Behavior (documented choice):
 * - Cookie `af_lang` wins on every tree (full mirror).
 * - No cookie + EN path + Accept-Language maps to a supported non-en → one 307 into that prefix, set cookie.
 * - No cookie + already on a prefixed tree → stay, set cookie to that path lang
 *   (do not bounce e.g. /pt → /ko from Accept-Language).
 * - No cookie + EN path + no preferred non-en → stay, set cookie=en.
 * - Manual LangSwitch sets the cookie client-side before navigation so proxy does not bounce.
 * - SEO hreflang / x-default unchanged; detect redirects are temporary (307).
 * - pt means Brazilian Portuguese (URL /pt, hreflang pt-BR).
 *
 * Note: Next.js 16 Proxy strips `RSC` / `Next-Router-*` request headers, so document
 * detection uses Sec-Fetch-Dest (and Accept heuristics when Fetch Metadata is absent).
 */
export function proxy(request: NextRequest) {
  if (!isDocumentNavigation(request)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const pathL: Lang = pathLang(pathname);
  const rawCookie = request.cookies.get(LANG_COOKIE)?.value;
  const cookieLang = isLang(rawCookie) ? rawCookie : undefined;

  let desired: Lang;
  if (cookieLang) {
    desired = cookieLang;
  } else if (pathL === "en") {
    desired = preferLocale(request.headers.get("accept-language")) ?? "en";
  } else {
    desired = pathL;
  }

  if (desired !== pathL) {
    const url = request.nextUrl.clone();
    url.pathname = withLangPath(desired, pathname);
    const res = NextResponse.redirect(url, 307);
    setLangCookie(res, desired);
    return res;
  }

  const res = NextResponse.next();
  if (!cookieLang) {
    setLangCookie(res, desired);
  }
  return res;
}

function setLangCookie(res: NextResponse, lang: Lang) {
  res.cookies.set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: LANG_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function isDocumentNavigation(request: NextRequest): boolean {
  const dest = request.headers.get("sec-fetch-dest");
  if (dest === "document") return true;
  if (dest && dest !== "document") return false;

  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/x-component")) return false;
  if (/\brsc\b/i.test(accept)) return false;
  return true;
}

export const config = {
  matcher: [
    "/((?!_next/|api/|.*\\..*).*)",
  ],
};
