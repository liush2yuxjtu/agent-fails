import Link from "next/link";
import { t } from "@/lib/i18n";
import { href, REPO_URL, SITE_NAME, SITE_NAME_ZH, OWNER_X_URL, OWNER_X_HANDLE, type Lang } from "@/lib/site";

/**
 * Render localized navigation and a footer around page content.
 * path is the route without a language prefix; it determines the active navigation
 * item and the destination of the language switch.
 */
export function SiteShell({ lang, path, children }: { lang: Lang; path: string; children: React.ReactNode }) {
  const d = t(lang);
  const other: Lang = lang === "en" ? "zh" : "en";
  const nav = [
    { to: "/", label: d.nav.patterns },
    { to: "/submit", label: d.nav.submit },
    { to: "/about", label: d.nav.about },
    { to: "/sponsor", label: d.nav.sponsor },
  ];

  const onCase = path.startsWith("/patterns/");

  return (
    <div className="af-shell">
      <header className="af-bezel">
        {!onCase && (
          <Link href={href(lang, "/")} className="af-bezel-id" aria-label="AgentFails">
            <span className="af-lamp" aria-hidden />
            <span className="af-rec-word">REC</span>
          </Link>
        )}
        <Link href={href(lang, "/")} className="af-bezel-brand">
          Agent<span>Fails</span>
        </Link>
        <nav className="af-bezel-nav" aria-label="Site">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={href(lang, n.to)}
              aria-current={path === n.to || (n.to !== "/" && path.startsWith(n.to)) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href={href(other, path)}
          hrefLang={other === "zh" ? "zh-CN" : "en"}
          className="af-lang"
        >
          {d.langSwitch}
        </Link>
      </header>
      <main className="af-main">{children}</main>
      <footer className="af-foot">
        <p>
          <strong>{lang === "zh" ? SITE_NAME_ZH : SITE_NAME}</strong>
          {" · "}
          {d.footer}
        </p>
        <div className="af-foot-links">
          <a href={REPO_URL}>{d.footerSource}</a>
          <a href={OWNER_X_URL}>{OWNER_X_HANDLE}</a>
        </div>
      </footer>
    </div>
  );
}
