import { t } from "@/lib/i18n";
import { getPatterns, toCards } from "@/lib/patterns";
import { HOME_SEO } from "@/lib/meta";
import { absolute, href, SITE_NAME, SITE_NAME_ZH, type Lang } from "@/lib/site";
import { PatternExplorer } from "@/components/PatternExplorer";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RecorderPlane } from "@/components/RecorderPlane";
import { frameIndex } from "@/components/Badges";

/**
 * Render the localized catalog, featured recorder, search, and newsletter signup.
 * Include WebSite and ItemList structured data for the catalog. Errors reading,
 * parsing, or validating catalog content propagate.
 */
export function HomeView({ lang }: { lang: Lang }) {
  const d = t(lang);
  const patterns = getPatterns();
  const cards = toCards(lang);
  const frames = frameIndex(patterns);
  const spot = patterns.find((p) => p.slug === "unrelated-files-changed");
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
        inLanguage: lang === "zh" ? "zh-CN" : "en",
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#patterns`,
        name: copy.title,
        description: copy.description,
        numberOfItems: patterns.length,
        inLanguage: lang === "zh" ? "zh-CN" : "en",
        isPartOf: { "@id": `${pageUrl}#website` },
        itemListElement: patterns.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title[lang],
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
              title={spot ? spot.title[lang] : ""}
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
