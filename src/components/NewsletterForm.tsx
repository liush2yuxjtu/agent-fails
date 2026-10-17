"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";
import { NEWSLETTER_FORM_ACTION, REPO_URL, type Lang } from "@/lib/site";

/**
 * "翻车 of the week" signup.
 *
 * Configure with NEXT_PUBLIC_NEWSLETTER_FORM_ACTION (a public embed/subscribe URL, e.g.
 * https://buttondown.com/api/emails/embed-subscribe/<your-newsletter>). It is read at build time.
 * The form posts natively with a field named "email", which Buttondown, Loops and most providers accept.
 * When unset, the form is a graceful stub: nothing is stored or sent anywhere.
 */
export function NewsletterForm({ lang }: { lang: Lang }) {
  const d = t(lang);
  const [stubDone, setStubDone] = useState(false);
  const live = NEWSLETTER_FORM_ACTION.length > 0;

  return (
    <section id="newsletter" className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight">{d.nlTitle}</h2>
      <p className="mt-1 text-zinc-600">{d.nlSub}</p>
      {stubDone ? (
        <p className="mt-4 rounded-lg bg-white p-3 text-sm text-zinc-700 ring-1 ring-zinc-200" role="status">
          {d.nlStubDone}{" "}
          <a href={REPO_URL} className="font-medium text-orange-700 underline">{d.nlWatch}</a>
        </p>
      ) : (
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          {...(live
            ? { action: NEWSLETTER_FORM_ACTION, method: "post", target: "_blank" }
            : {
                onSubmit: (e: React.FormEvent) => {
                  e.preventDefault();
                  setStubDone(true);
                },
              })}
        >
          <label htmlFor={`nl-email-${lang}`} className="sr-only">Email</label>
          <input
            id={`nl-email-${lang}`}
            name="email"
            type="email"
            required
            placeholder={d.nlPlaceholder}
            className="w-full flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
          {live && <input type="hidden" name="tag" value={lang} />}
          <button type="submit" className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">
            {d.nlButton}
          </button>
        </form>
      )}
    </section>
  );
}
