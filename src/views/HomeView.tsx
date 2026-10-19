import Link from "next/link";
import { CATEGORY_META, t } from "@/lib/i18n";
import { getPatterns, toCards } from "@/lib/patterns";
import { CATEGORIES } from "@/lib/types";
import { HOME_SEO } from "@/lib/meta";
import { absolute, href, OWNER_POSTS, OWNER_X_HANDLE, SITE_NAME, SITE_NAME_ZH, type Lang } from "@/lib/site";
import { PatternExplorer } from "@/components/PatternExplorer";
import { NewsletterForm } from "@/components/NewsletterForm";
import { CAT_STYLES } from "@/components/Badges";

export function HomeView({ lang }: { lang: Lang }) {
  const d = t(lang);
  const patterns = getPatterns();
  const cards = toCards(lang);
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, patterns.filter((p) => p.category === c).length]));
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="border-b border-zinc-200 bg-gradient-to-b from-orange-50/60 to-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:pt-16">
          <p className="text-sm font-medium text-orange-700">
            AgentFails · 智能体翻车库 · {cards.length} {lang === "zh" ? "条翻车模式" : "patterns"}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">{d.heroTitle}</h1>
          <p className="mt-4 max-w-3xl text-lg text-zinc-600">{d.heroSub}</p>
          <div className="mt-8">
            <PatternExplorer cards={cards} lang={lang} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold tracking-tight">{d.threeQuestions}</h2>
        <p className="mt-1 text-zinc-600">
          {d.threeQuestionsSub}{" "}
          {lang === "zh" ? "分类方式来自 " : "Taxonomy from "}
          <a href={OWNER_POSTS[0]} className="underline">{OWNER_X_HANDLE}</a>
          {lang === "zh" ? " 的 X 帖子。" : "'s X thread."}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c}
              href={`${href(lang, "/")}?cat=${c}#patterns`}
              className={`rounded-xl border bg-white p-5 shadow-sm hover:shadow-md ${CAT_STYLES[c].ring}`}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                <span className={`h-2.5 w-2.5 rounded-full ${CAT_STYLES[c].dot}`} aria-hidden />
                {i + 1}. {CATEGORY_META[c][lang]} · {counts[c]}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{CATEGORY_META[c].q[lang]}</h3>
              <p className="mt-2 text-sm text-zinc-600">
                <span className="font-medium text-zinc-800">{d.fixWith}:</span> {CATEGORY_META[c].fix[lang]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <NewsletterForm lang={lang} />
      </section>
    </>
  );
}
