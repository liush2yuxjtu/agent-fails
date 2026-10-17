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

  const input = "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <label className="block text-sm font-medium">
        {l.title}
        <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={l.titlePh} />
      </label>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {l.agent}
          <select className={input} value={agent} onChange={(e) => setAgent(e.target.value)}>
            <option value="">{l.unsure}</option>
            {AGENTS.map((a) => <option key={a} value={a}>{AGENT_LABEL[a]}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium">
          {l.category}
          <select className={input} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">{l.unsure}</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_META[c][lang]}</option>)}
          </select>
        </label>
      </div>
      <label className="mt-3 block text-sm font-medium">
        {l.what}
        <textarea className={`${input} min-h-28`} value={what} onChange={(e) => setWhat(e.target.value)} placeholder={l.whatPh} />
      </label>
      <a href={url} target="_blank" rel="noopener" className="mt-4 inline-block rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">
        {l.open} ↗
      </a>
      <p className="mt-2 text-xs text-zinc-500">{l.hint}</p>
    </div>
  );
}
