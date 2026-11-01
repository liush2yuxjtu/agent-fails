"use client";

import { useState } from "react";
import { AGENT_LABEL, CATEGORY_META } from "@/lib/i18n";
import { AGENTS, CATEGORIES } from "@/lib/types";
import { issueUrl } from "@/lib/submit";
import type { Lang } from "@/lib/site";

const L: Record<Lang, {
  title: string; titlePh: string; agent: string; category: string; unsure: string; what: string; whatPh: string; open: string; hint: string;
}> = {
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
  pt: {
    title: "Título em uma linha",
    titlePh: "ex.: Pedi para renomear um botão, o Cursor reescreveu o cliente da API",
    agent: "Agente",
    category: "Tipo",
    unsure: "Não sei",
    what: "O que aconteceu? (pode adicionar o diff no GitHub)",
    whatPh: "O que pediu, o que o agente fez, por que estava errado…",
    open: "Abrir issue pré-preenchida no GitHub",
    hint: "Abre github.com numa nova aba. Nada é enviado até você clicar em Submit lá.",
  },
  ko: {
    title: "한 줄 제목",
    titlePh: "예: 버튼 이름만 바꾸라 했더니 Cursor가 API 클라이언트를 다시 씀",
    agent: "에이전트",
    category: "유형",
    unsure: "잘 모르겠음",
    what: "무슨 일이었나요? (diff는 GitHub에서 추가 가능)",
    whatPh: "무엇을 시켰는지, 에이전트가 무엇을 했는지, 왜 틀렸는지…",
    open: "미리 채운 GitHub 이슈 열기",
    hint: "새 탭에서 github.com을 엽니다. 거기에서 Submit 누르기 전에는 아무것도 전송되지 않습니다.",
  },
  vi: {
    title: "Tiêu đề một dòng",
    titlePh: "vd: Chỉ nhờ đổi tên nút, Cursor viết lại API client",
    agent: "Agent",
    category: "Loại",
    unsure: "Không chắc",
    what: "Chuyện gì đã xảy ra? (có thể thêm diff trên GitHub)",
    whatPh: "Bạn hỏi gì, agent làm gì, vì sao sai…",
    open: "Mở issue GitHub đã điền sẵn",
    hint: "Mở github.com tab mới. Chưa gửi gì cho đến khi bạn bấm Submit ở đó.",
  },
  de: {
    title: "Einzeiliger Titel",
    titlePh: "z. B. Button umbenennen lassen, Cursor hat den API-Client neu geschrieben",
    agent: "Agent",
    category: "Typ",
    unsure: "Unsicher",
    what: "Was ist passiert? (Diff können Sie auf GitHub ergänzen)",
    whatPh: "Was Sie wollten, was der Agent tat, warum es falsch war…",
    open: "Vorausgefülltes GitHub-Issue öffnen",
    hint: "Öffnet github.com in einem neuen Tab. Nichts wird gesendet, bis Sie dort Submit drücken.",
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
