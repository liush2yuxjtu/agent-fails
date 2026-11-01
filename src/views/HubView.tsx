import Link from "next/link";
import { notFound } from "next/navigation";
import { getHub } from "@/lib/hubs";
import { getPattern, getPatterns } from "@/lib/patterns";
import { absolute, href, LANG_HTML, lx, SITE_NAME, type Lang } from "@/lib/site";
import { frameIndex } from "@/components/Badges";
import { t } from "@/lib/i18n";
import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function renderBody(body: string): ReactNode {
  const blocks = body.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trimEnd());
    const isList = lines.every((l) => /^(- |\d+\. )/.test(l) || l === "");
    if (isList) {
      const ordered = lines.some((l) => /^\d+\. /.test(l));
      const Tag = ordered ? "ol" : "ul";
      return (
        <Tag key={i} className="af-list">
          {lines
            .filter((l) => l.length > 0)
            .map((l, j) => (
              <li key={j}>{renderInline(l.replace(/^(- |\d+\. )/, ""))}</li>
            ))}
        </Tag>
      );
    }
    return (
      <p key={i} className="af-muted" style={{ color: "var(--ink-soft)" }}>
        {renderInline(block)}
      </p>
    );
  });
}

/** Render a localized SEO hub with sections and links into real pattern pages. */
export function HubView({ slug, lang }: { slug: string; lang: Lang }) {
  const hub = getHub(slug);
  if (!hub) notFound();
  const d = t(lang);
  const frames = frameIndex(getPatterns());
  const related = hub.related_patterns
    .map((s) => getPattern(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lx(hub.title, lang),
    description: lx(hub.description, lang),
    inLanguage: LANG_HTML[lang],
    url: absolute(href(lang, hub.path)),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absolute("/") },
  };

  return (
    <article className="af-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav className="af-crumb">
        <Link href={href(lang, "/")}>{d.backToAll}</Link>
        <span aria-hidden> / </span>
        <span>{lx(hub.title, lang)}</span>
      </nav>

      <header>
        <h1 className="af-h1">{lx(hub.title, lang)}</h1>
        <p className="af-alt">{lang === "en" ? hub.title.zh : hub.title.en}</p>
        <p className="af-lead">{lx(hub.description, lang)}</p>
      </header>

      {hub.sections.map((sec) => (
        <section key={sec.id} className="af-section" id={sec.id}>
          <h2 className="af-h2">{lx(sec.heading, lang)}</h2>
          <div style={{ marginTop: 12 }}>{renderBody(lx(sec.body, lang))}</div>
        </section>
      ))}

      {related.length > 0 && (
        <section className="af-section" id="patterns">
          <h2 className="af-h2">{d.related}</h2>
          <ul className="af-related">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={href(lang, `/patterns/${r.slug}`)}>
                  <span className="af-slug">{frames.get(r.slug)}</span>
                  {lx(r.title, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p style={{ marginTop: 28 }}>
        <Link href={href(lang, "/")} className="af-btn">
          {lx(hub.cta, lang)}
        </Link>
      </p>
    </article>
  );
}
