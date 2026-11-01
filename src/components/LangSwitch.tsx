"use client";

import Link from "next/link";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE } from "@/lib/locale";
import { href, type Lang } from "@/lib/site";

/**
 * Language toggle that stamps `af_lang` before navigating so proxy
 * follows the visitor's explicit choice instead of bouncing them back.
 */
export function LangSwitch({
  current,
  path,
  label,
}: {
  current: Lang;
  path: string;
  label: string;
}) {
  const other: Lang = current === "en" ? "zh" : "en";

  function remember() {
    // path=/ so both / and /zh trees share the preference; SameSite=Lax for normal nav.
    document.cookie = `${LANG_COOKIE}=${other}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
  }

  return (
    <Link
      href={href(other, path)}
      hrefLang={other === "zh" ? "zh-CN" : "en"}
      className="af-lang"
      onClick={remember}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") remember();
      }}
    >
      {label}
    </Link>
  );
}
