import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENT_LABEL, CATEGORY_META, t } from "@/lib/i18n";
import { getPattern, getPatterns } from "@/lib/patterns";
import { absolute, hasLx, href, ISSUE_URL, LANG_HTML, lx, REPO_URL, SITE_NAME, type Lang } from "@/lib/site";
import { CopyBlock } from "@/components/CopyBlock";
import { CategoryBadge, CAT_CODE, CAT_RAIL, frameIndex } from "@/components/Badges";
import { NewsletterForm } from "@/components/NewsletterForm";

const KIND_LABEL: Record<string, { en: string; zh: string; pt: string; ko: string; vi: string; de: string }> = {
  rules: { en: "Rules", zh: "规则", pt: "Regras", ko: "규칙", vi: "Quy tắc", de: "Regeln" },
  cursor: { en: "Cursor rule", zh: "Cursor 规则", pt: "Regra Cursor", ko: "Cursor 규칙", vi: "Quy tắc Cursor", de: "Cursor-Regel" },
  hook: { en: "Hook", zh: "钩子", pt: "Hook", ko: "훅", vi: "Hook", de: "Hook" },
  skill: { en: "Skill", zh: "技能", pt: "Skill", ko: "스킬", vi: "Skill", de: "Skill" },
  settings: { en: "Settings", zh: "配置", pt: "Configurações", ko: "설정", vi: "Cấu hình", de: "Einstellungen" },
  ci: { en: "CI / script", zh: "CI / 脚本", pt: "CI / script", ko: "CI / 스크립트", vi: "CI / script", de: "CI / Skript" },
  spec: { en: "Template", zh: "模板", pt: "Modelo", ko: "템플릿", vi: "Mẫu", de: "Vorlage" },
};

/**
 * Render localized pattern details, copyable fixes, sources, and up to three
 * related patterns from the same category.
 * Throw the Next.js not-found error for an unknown slug. Errors reading, parsing,
 * or validating catalog content propagate.
 */
export function PatternView({ slug, lang }: { slug: string; lang: Lang }) {
  const p = getPattern(slug);
  if (!p) notFound();
  const d = t(lang);
  const all = getPatterns();
  const related = all.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const frames = frameIndex(all);
  const rec = frames.get(p.slug) ?? CAT_CODE[p.category];
  const path = `/patterns/${p.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: lx(p.title, lang),
    description: lx(p.summary, lang),
    inLanguage: LANG_HTML[lang],
    url: absolute(href(lang, path)),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absolute("/") },
    citation: p.sources.map((s) => s.url),
  };

  return (
    <>
      <span className={`af-case-rail ${CAT_RAIL[p.category]}`} aria-hidden />
      <article className="af-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />

        <nav className="af-crumb">
          <Link href={href(lang, "/")}>{d.backToAll}</Link>
          <span aria-hidden> / </span>
          <Link href={`${href(lang, "/")}?cat=${p.category}#patterns`}>{CATEGORY_META[p.category][lang]}</Link>
        </nav>

        <header>
          <p className="af-rec-id">
            {rec}
            <span className="af-rec-slug">{p.slug}</span>
          </p>
          <div className="af-badge-row">
            <CategoryBadge category={p.category} lang={lang} />
          </div>
          <h1 className="af-h1">{lx(p.title, lang)}</h1>
          <p className="af-alt">{lang === "en" ? p.title.zh : p.title.en}</p>
          {!hasLx(p.title, lang) && lang !== "en" && (
            <p className="af-meta" role="note">{d.contentFallback}</p>
          )}
          <p className="af-lead">{lx(p.summary, lang)}</p>
          <p className="af-meta">
            {d.appliesTo}: {p.agents.map((a) => AGENT_LABEL[a]).join(" · ")}
          </p>
        </header>

        <section className="af-dump" id="symptom">
          <h2>{d.symptom}</h2>
          <p>{lx(p.symptom, lang)}</p>
        </section>

        <section className="af-dump">
          <h2>{d.why}</h2>
          <p>{lx(p.why, lang)}</p>
        </section>

        <section className="af-dump">
          <h2>{d.example}</h2>
          <div>
            {p.example.caption && <p className="af-muted">{lx(p.example.caption, lang)}</p>}
            <div className={p.example.caption ? "af-fix" : undefined}>
              <CopyBlock code={p.example.code} label={p.example.lang} lang={lang} />
            </div>
          </div>
        </section>

        <section className="af-dump" id="fixes">
          <h2>{d.fixes}</h2>
          <div>
            <p className="af-muted">{d.fixesSub}</p>
            {p.fixes.map((f, i) => (
              <div key={i} className="af-fix">
                <div className="af-fix-head">
                  <span className="af-kind">{KIND_LABEL[f.kind] ? lx(KIND_LABEL[f.kind], lang) : f.kind}</span>
                  <h3 className="af-fix-title">{lx(f.title, lang)}</h3>
                </div>
                {f.note && <p className="af-muted">{lx(f.note, lang)}</p>}
                <CopyBlock code={f.code} file={f.file} lang={lang} patternSlug={p.slug} fixType={f.kind} />
              </div>
            ))}
          </div>
        </section>

        <aside className="af-sponsor">
          <span className="af-kind">{d.nav.sponsor}</span>{" "}
          {d.sponsorSlot} <Link href={href(lang, "/sponsor")}>{d.sponsorSlotCta}</Link>
        </aside>

        <section className="af-dump">
          <h2>{d.sources}</h2>
          <div>
            <ol className="af-sources">
              {p.sources.map((s, i) => (
                <li key={s.url}>
                  <span className="af-src-n">{String(i + 1).padStart(2, "0")}</span>{" "}
                  <a href={s.url} rel="noopener">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <div className="af-inline-links">
              <a href={`${REPO_URL}/edit/main/content/patterns/${p.slug}.yaml`}>{d.editOnGitHub}</a>
              <a href={`${ISSUE_URL}&title=${encodeURIComponent(`[Fix report] ${p.slug}`)}`}>{d.report}</a>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="af-dump">
            <h2>{d.related}</h2>
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

        <NewsletterForm lang={lang} />
      </article>
    </>
  );
}
