import Link from "next/link";
import { t } from "@/lib/i18n";
import { href, REPO_URL, SITE_NAME, SITE_NAME_ZH, OWNER_X_URL, OWNER_X_HANDLE, type Lang } from "@/lib/site";

export function SiteShell({ lang, path, children }: { lang: Lang; path: string; children: React.ReactNode }) {
  const d = t(lang);
  const other: Lang = lang === "en" ? "zh" : "en";
  const nav = [
    { to: "/", label: d.nav.patterns },
    { to: "/submit", label: d.nav.submit },
    { to: "/about", label: d.nav.about },
    { to: "/sponsor", label: d.nav.sponsor },
  ];
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href={href(lang, "/")} className="flex items-baseline gap-2 font-semibold tracking-tight">
            <span className="text-lg">
              Agent<span className="text-orange-600">Fails</span>
            </span>
            <span className="hidden text-sm text-zinc-500 sm:inline">{SITE_NAME_ZH}</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                href={href(lang, n.to)}
                className={`rounded-md px-2 py-1.5 hover:bg-zinc-100 sm:px-3 ${n.to === "/submit" ? "hidden sm:block" : ""}`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href={href(other, path)}
              hrefLang={other === "zh" ? "zh-CN" : "en"}
              className="ml-1 whitespace-nowrap rounded-md border border-zinc-200 px-2 py-1.5 text-zinc-700 hover:bg-zinc-100"
            >
              {d.langSwitch}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong className="text-zinc-800">{lang === "zh" ? SITE_NAME_ZH : SITE_NAME}</strong> · {d.footer}
          </p>
          <div className="flex gap-4">
            <a href={REPO_URL} className="hover:text-zinc-900">{d.footerSource}</a>
            <a href={OWNER_X_URL} className="hover:text-zinc-900">{OWNER_X_HANDLE}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
