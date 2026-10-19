import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENT_LABEL, CATEGORY_META, t } from "@/lib/i18n";
import { getPattern, getPatterns } from "@/lib/patterns";
import { absolute, href, ISSUE_URL, REPO_URL, SITE_NAME, type Lang } from "@/lib/site";
import { CopyBlock } from "@/components/CopyBlock";
import { CategoryBadge } from "@/components/Badges";
import { NewsletterForm } from "@/components/NewsletterForm";

const KIND_LABEL: Record<string, { en: string; zh: string }> = {
  rules: { en: "Rules", zh: "规则" },
  cursor: { en: "Cursor rule", zh: "Cursor 规则" },
  hook: { en: "Hook", zh: "钩子" },
  skill: { en: "Skill", zh: "技能" },
  settings: { en: "Settings", zh: "配置" },
  ci: { en: "CI / script", zh: "CI / 脚本" },
  spec: { en: "Template", zh: "模板" },
};

export function PatternView({ slug, lang }: { slug: string; lang: Lang }) {
  const p = getPattern(slug);
  if (!p) notFound();
  const d = t(lang);
  const related = getPatterns().filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const path = `/patterns/${p.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: p.title[lang],
    description: p.summary[lang],
    inLanguage: lang === "zh" ? "zh-CN" : "en",
    url: absolute(href(lang, path)),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absolute("/") },
    citation: p.sources.map((s) => s.url),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="text-sm text-zinc-500">
        <Link href={href(lang, "/")} className="hover:text-zinc-800">← {d.backToAll}</Link>
        <span className="mx-2">/</span>
        <Link href={`${href(lang, "/")}?cat=${p.category}#patterns`} className="hover:text-zinc-800">{CATEGORY_META[p.category][lang]}</Link>
      </nav>

      <header className="mt-4">
        <CategoryBadge category={p.category} lang={lang} />
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{p.title[lang]}</h1>
        <p className="mt-1 text-zinc-400">{p.title[lang === "en" ? "zh" : "en"]}</p>
        <p className="mt-4 text-lg text-zinc-700">{p.summary[lang]}</p>
        <p className="mt-3 text-sm text-zinc-500">
          {d.appliesTo}: {p.agents.map((a) => AGENT_LABEL[a]).join(" · ")}
        </p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{d.symptom}</h2>
          <p className="mt-2 text-zinc-800">{p.symptom[lang]}</p>
        </section>
        <section className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{d.why}</h2>
          <p className="mt-2 text-zinc-800">{p.why[lang]}</p>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.example}</h2>
        {p.example.caption && <p className="mt-1 text-sm text-zinc-500">{p.example.caption[lang]}</p>}
        <div className="mt-3">
          <CopyBlock code={p.example.code} label={p.example.lang} lang={lang} />
        </div>
      </section>

      <section className="mt-10" id="fixes">
        <h2 className="text-xl font-semibold">{d.fixes}</h2>
        <p className="mt-1 text-sm text-zinc-500">{d.fixesSub}</p>
        <div className="mt-4 space-y-6">
          {p.fixes.map((f, i) => (
            <div key={i}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-orange-800">
                  {KIND_LABEL[f.kind]?.[lang] ?? f.kind}
                </span>
                <h3 className="font-medium text-zinc-900">{f.title[lang]}</h3>
              </div>
              {f.note && <p className="mb-2 text-sm text-zinc-600">{f.note[lang]}</p>}
              <CopyBlock code={f.code} file={f.file} lang={lang} patternSlug={p.slug} fixType={f.kind} />
            </div>
          ))}
        </div>
      </section>

      <aside className="mt-10 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600">
        <span className="mr-2 rounded bg-zinc-200 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">Sponsor</span>
        {d.sponsorSlot}{" "}
        <Link href={href(lang, "/sponsor")} className="font-medium text-orange-700 underline">{d.sponsorSlotCta}</Link>
      </aside>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">{d.sources}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {p.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} className="text-blue-700 underline-offset-2 hover:underline" rel="noopener">{s.title}</a>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href={`${REPO_URL}/edit/main/content/patterns/${p.slug}.yaml`} className="text-zinc-600 underline hover:text-zinc-900">{d.editOnGitHub}</a>
          <a href={`${ISSUE_URL}&title=${encodeURIComponent(`[Fix report] ${p.slug}`)}`} className="text-zinc-600 underline hover:text-zinc-900">{d.report}</a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">{d.related}</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={href(lang, `/patterns/${r.slug}`)} className="block h-full rounded-lg border border-zinc-200 bg-white p-3 text-sm font-medium hover:border-zinc-400">
                  {r.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12">
        <NewsletterForm lang={lang} />
      </div>
    </article>
  );
}
