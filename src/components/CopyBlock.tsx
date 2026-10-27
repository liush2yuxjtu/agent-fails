"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/site";

/**
 * Render copyable code with a header that prefers file over label.
 * Clipboard API failures trigger a legacy copy fallback; exceptions from that
 * fallback reject the click handler's promise. A completed attempt shows copied
 * feedback for 1,600 ms and records copy_fix when both patternSlug and fixType
 * are provided, even if the fallback reports failure.
 */
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
    <div className="af-copy">
      <div className="af-copy-bar">
        <code>{file ?? label}</code>
        <button type="button" onClick={copy} aria-label={`${d.copy} ${file ?? ""}`} data-copied={copied ? "true" : "false"}>
          {copied ? d.copied : d.copy}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
