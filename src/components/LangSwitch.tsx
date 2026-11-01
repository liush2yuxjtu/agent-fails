"use client";

import Link from "next/link";
import { rememberLang } from "@/lib/lang-cookie";
import { href, LANG_HREFLANG, LANG_LABEL, LANGS, type Lang } from "@/lib/site";

/**
 * Multi-locale switcher that stamps `af_lang` before navigating so proxy
 * follows the visitor's explicit choice instead of bouncing them back.
 */
export function LangSwitch({ current, path }: { current: Lang; path: string }) {
  return (
    <nav className="af-lang-switch" aria-label="Language">
      {LANGS.map((lang) => {
        const active = lang === current;
        if (active) {
          return (
            <span key={lang} className="af-lang af-lang-active" aria-current="true">
              {LANG_LABEL[lang]}
            </span>
          );
        }
        return (
          <Link
            key={lang}
            href={href(lang, path)}
            hrefLang={LANG_HREFLANG[lang]}
            className="af-lang"
            onClick={() => rememberLang(lang)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") rememberLang(lang);
            }}
          >
            {LANG_LABEL[lang]}
          </Link>
        );
      })}
    </nav>
  );
}
