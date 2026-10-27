"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { t } from "@/lib/i18n";
import { NEWSLETTER_FORM_ACTION, REPO_URL, type Lang } from "@/lib/site";

export function NewsletterForm({ lang }: { lang: Lang }) {
  const d = t(lang);
  const [stubDone, setStubDone] = useState(false);
  const live = NEWSLETTER_FORM_ACTION.length > 0;

  return (
    <section id="newsletter" className="af-nl">
      <h2>{d.nlTitle}</h2>
      <p>{d.nlSub}</p>
      {stubDone ? (
        <p className="af-muted" role="status">
          {d.nlStubDone}{" "}
          <a className="af-link" href={REPO_URL}>
            {d.nlWatch}
          </a>
        </p>
      ) : (
        <form
          className="af-nl-form"
          onSubmit={(e) => {
            track("newsletter_submit");
            if (!live) {
              e.preventDefault();
              setStubDone(true);
            }
          }}
          {...(live ? { action: NEWSLETTER_FORM_ACTION, method: "post" as const, target: "_blank" } : {})}
        >
          <label htmlFor={`nl-email-${lang}`} className="sr-only">
            Email
          </label>
          <input
            id={`nl-email-${lang}`}
            name="email"
            type="email"
            required
            placeholder={d.nlPlaceholder}
          />
          {live && <input type="hidden" name="tag" value={lang} />}
          <button type="submit">{d.nlButton}</button>
        </form>
      )}
    </section>
  );
}
