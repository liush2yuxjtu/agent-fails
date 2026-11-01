import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LANG_COOKIE,
  LANG_COOKIE_MAX_AGE,
  acceptsChineseFirst,
  isLang,
  isZhPath,
  stripZhPrefix,
  withZhPrefix,
} from "@/lib/locale";
import type { Lang } from "@/lib/site";

/**
 * Visitor language preference.
 *
 * Behavior (documented choice):
 * - Cookie `af_lang` wins on both EN and ZH trees (full mirror).
 * - No cookie + EN path + Accept-Language prefers zh* → one 307 into `/zh…`, set cookie=zh.
 * - No cookie + already on `/zh…` → stay, set cookie=zh (do not bounce ZH→EN from Accept-Language).
 * - No cookie + EN path + not zh-preferring → stay, set cookie=en.
 * - Manual SiteShell switch sets the cookie client-side before navigation so proxy does not bounce.
 * - SEO hreflang / x-default unchanged; detect redirects are temporary (307).
 *
 * Note: Next.js 16 Proxy strips `RSC` / `Next-Router-*` request headers, so document
 * detection uses Sec-Fetch-Dest (and Accept heuristics when Fetch Metadata is absent).
 */
export function proxy(request: NextRequest) {
  if (!isDocumentNavigation(request)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const pathLang: Lang = isZhPath(pathname) ? "zh" : "en";
  const rawCookie = request.cookies.get(LANG_COOKIE)?.value;
  const cookieLang = isLang(rawCookie) ? rawCookie : undefined;

  let desired: Lang;
  if (cookieLang) {
    desired = cookieLang;
  } else if (pathLang === "en" && acceptsChineseFirst(request.headers.get("accept-language"))) {
    desired = "zh";
  } else {
    desired = pathLang;
  }

  if (desired !== pathLang) {
    const targetPath = desired === "zh" ? withZhPrefix(pathname) : stripZhPrefix(pathname);
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
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

/**
 * Only redirect full document loads.
 * - Browser navigations: Sec-Fetch-Dest=document
 * - Browser RSC/fetch: Sec-Fetch-Dest=empty (or other) → skip
 * - No Fetch Metadata (curl/bots): allow unless Accept looks like an RSC flight
 */
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
    /*
     * Match all pathnames except:
     * - _next/* internals
     * - api routes
     * - files with an extension (og.png, robots.txt, etc.)
     */
    "/((?!_next/|api/|.*\\..*).*)",
  ],
};
