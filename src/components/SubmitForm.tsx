"use client";

import { useState } from "react";
import { AGENT_LABEL, CATEGORY_META } from "@/lib/i18n";
import { AGENTS, CATEGORIES } from "@/lib/types";
import { issueUrl } from "@/lib/submit";
import type { Lang } from "@/lib/site";

const L = {
  en: {
    title: "One-line title",
    titlePh: "e.g. Asked to rename a button, Cursor rewrote the API client",
    agent: "Agent",
    category: "Type",
    unsure: "Not sure",
    what: "What happened? (you can add the diff on GitHub)",
    whatPh: "What you asked, what the agent did, why it was wrong…",
    open: "Open prefilled GitHub issue",
    hint: "Opens github.com in a new tab. Nothing is sent until you press Submit there.",
  },
  zh: {
    title: "一句话标题",
    titlePh: "例如：只让改按钮文字，Cursor 把 API 客户端重写了",
    agent: "智能体",
    category: "类型",
    unsure: "不确定",
    what: "发生了什么？（diff 可以在 GitHub 上补充）",
    whatPh: "你让它做什么、它做了什么、哪里不对……",
    open: "打开预填好的 GitHub Issue",
    hint: "会在新标签页打开 github.com。在那边点提交之前，不会发送任何内容。",
  },
};

/**
 * Render localized fields that build a prefilled GitHub issue link.
 * Users submit the issue on GitHub after opening the populated form in a new tab.
 */
export function SubmitForm({ lang }: { lang: Lang }) {
  const l = L[lang];
  const [title, setTitle] = useState("");
  const [agent, setAgent] = useState("");
  const [category, setCategory] = useState("");
  const [what, setWhat] = useState("");

  const url = issueUrl({
    title: `[Failure] ${title}`.trim(),
    agent: agent ? AGENT_LABEL[agent as keyof typeof AGENT_LABEL] : "",
    category: category ? CATEGORY_META[category as keyof typeof CATEGORY_META].en : "",
    what_happened: what,
  });

  return (
    <div className="af-form-panel">
      <label>
        {l.title}
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={l.titlePh} />
      </label>
      <div style={{ display: "grid", gap: 12, marginTop: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <label>
          {l.agent}
          <select value={agent} onChange={(e) => setAgent(e.target.value)}>
            <option value="">{l.unsure}</option>
            {AGENTS.map((a) => (
              <option key={a} value={a}>
                {AGENT_LABEL[a]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {l.category}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">{l.unsure}</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_META[c][lang]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label style={{ marginTop: 12 }}>
        {l.what}
        <textarea value={what} onChange={(e) => setWhat(e.target.value)} placeholder={l.whatPh} />
      </label>
      <a href={url} target="_blank" rel="noopener" className="af-btn" style={{ marginTop: 16 }}>
        {l.open} ↗
      </a>
      <p className="af-form-hint">{l.hint}</p>
    </div>
  );
}
