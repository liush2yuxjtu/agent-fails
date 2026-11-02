import Link from "next/link";
import { t } from "@/lib/i18n";
import { getPatterns, toCards } from "@/lib/patterns";
import { HOME_SEO } from "@/lib/meta";
import { absolute, href, LANG_HTML, lx, SITE_NAME, SITE_NAME_ZH, type Lang } from "@/lib/site";
import { PatternExplorer } from "@/components/PatternExplorer";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RecorderPlane } from "@/components/RecorderPlane";
import { CAT_RAIL, frameIndex } from "@/components/Badges";

/** Lead pattern of content/newsletter/2026-w44.md, the latest weekly batch in the repo. */
const WEEK_PIN_SLUG = "phantom-success";

/**
 * Render the localized catalog, featured recorder, this-week pin, search, and newsletter signup.
 * Include WebSite and ItemList structured data for the catalog. Errors reading,
 * parsing, or validating catalog content propagate. A missing week-pin slug throws.
 */
export function HomeView({ lang }: { lang: Lang }) {
  const d = t(lang);
  const patterns = getPatterns();
  const cards = toCards(lang);
  const frames = frameIndex(patterns);
  const spot = patterns.find((p) => p.slug === "unrelated-files-changed");
  const pin = patterns.find((p) => p.slug === WEEK_PIN_SLUG);
  if (!pin) throw new Error(`Missing homepage pin pattern: ${WEEK_PIN_SLUG}`);
  const pageUrl = absolute(href(lang, "/"));
  const copy = HOME_SEO[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        name: lang === "zh" ? SITE_NAME_ZH : SITE_NAME,
        alternateName: lang === "zh" ? SITE_NAME : SITE_NAME_ZH,
        url: pageUrl,
        description: copy.description,
        inLanguage: LANG_HTML[lang],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#patterns`,
        name: copy.title,
        description: copy.description,
        numberOfItems: patterns.length,
        inLanguage: LANG_HTML[lang],
        isPartOf: { "@id": `${pageUrl}#website` },
        itemListElement: patterns.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: lx(p.title, lang),
          url: absolute(href(lang, `/patterns/${p.slug}`)),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PatternExplorer
        cards={cards}
        lang={lang}
        featured={
          <section className="af-week" aria-labelledby="week-pin">
            <h2 id="week-pin">{d.weekPin}</h2>
            <Link href={href(lang, `/patterns/${pin.slug}`)} className="af-week-card">
              <span className={`af-rail ${CAT_RAIL[pin.category]}`} aria-hidden />
              <span className="af-week-id">{frames.get(pin.slug)}</span>
              <span className="af-week-copy">
                <span className="af-week-title">{lx(pin.title, lang)}</span>
                <span className="af-week-hook">{lx(pin.summary, lang)}</span>
              </span>
            </Link>
          </section>
        }
        hero={
          <>
            <div className="af-hero-copy">
              <p className="af-brand">
                Agent<span>Fails</span>
              </p>
              <p className="af-zh-name">{SITE_NAME_ZH}</p>
              <h1 className="af-headline">{d.heroTitle}</h1>
              <p className="af-sub">{d.heroSub}</p>
            </div>
            <RecorderPlane
              lang={lang}
              frameId={spot ? (frames.get(spot.slug) ?? "") : ""}
              title={spot ? lx(spot.title, lang) : ""}
              slug={spot?.slug}
            />
          </>
        }
      />
      <div className="af-page-wide">
        <NewsletterForm lang={lang} />
      </div>
    </>
  );
}
