"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/site";

export function CopyBlock({
  code,
  file,
  lang,
  label,
  patternSlug,
  fixType,
}: {
  code: string;
  file?: string;
  lang: Lang;
  label?: string;
  patternSlug?: string;
  fixType?: string;
}) {
  const d = t(lang);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    if (patternSlug && fixType) track("copy_fix", { slug: patternSlug, fixType });
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 px-3 py-1.5">
        <code className="truncate text-xs text-zinc-400">{file ?? label}</code>
        <button
          type="button"
          onClick={copy}
          aria-label={`${d.copy} ${file ?? ""}`}
          className="shrink-0 rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-100 hover:bg-zinc-700"
        >
          {copied ? `✓ ${d.copied}` : d.copy}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
