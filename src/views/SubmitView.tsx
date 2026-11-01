import Link from "next/link";
import { href, REPO_URL, type Lang } from "@/lib/site";
import { PR_URL } from "@/lib/submit";
import { SubmitForm } from "@/components/SubmitForm";
import { CopyBlock } from "@/components/CopyBlock";
import { PATTERN_TEMPLATE } from "@/lib/submit";

type Copy = {
  h1: string;
  lead: string;
  a: string;
  aBody: string;
  b: string;
  bBody: string;
  bBtn: string;
  rules: string;
  list: string[];
  template: string;
  contributing: string;
  about: string;
};

const C: Record<Lang, Copy> = {
  en: {
    h1: "Submit a failure",
    lead: "Got burned by an agent? Every accepted case is credited on the site and in the newsletter. Submissions are public GitHub issues and pull requests, so the whole history is open.",
    a: "1. Quick: open an issue",
    aBody: "Describe what you asked, what the agent did, and why it was wrong. Anonymize code. A maintainer turns good cases into patterns.",
    b: "2. Full: open a pull request",
    bBody: "Each pattern is one YAML file in content/patterns/. This button opens GitHub's editor with the template prefilled; GitHub will fork the repo for you.",
    bBtn: "Open prefilled pull request",
    rules: "What makes a good submission",
    list: [
      "A real case you saw, or a link to a public report. No invented numbers or quotes.",
      "Exactly one type: wrong feature, bug, or overreach (see About).",
      "A minimal example: the prompt, the diff, or a transcript excerpt.",
      "A fix you have tried, or one you think should work (we mark which is which).",
      "Credit: who reported it and where.",
    ],
    template: "Pattern file template",
    contributing: "Full guide: CONTRIBUTING.md",
    about: "How the three types work",
  },
  zh: {
    h1: "投稿翻车案例",
    lead: "被智能体坑过？每个被采纳的案例都会在网站和周报里署名致谢。投稿就是公开的 GitHub Issue 和 Pull Request，全部历史都公开可查。",
    a: "1. 快速：开一个 Issue",
    aBody: "写清楚你让它做什么、它做了什么、哪里不对。代码请脱敏。维护者会把好的案例整理成条目。",
    b: "2. 完整：提一个 Pull Request",
    bBody: "每个条目就是 content/patterns/ 下的一个 YAML 文件。点下面的按钮会打开 GitHub 编辑器并预填模板，GitHub 会自动帮你 fork。",
    bBtn: "打开预填好的 Pull Request",
    rules: "好的投稿是什么样的",
    list: [
      "你亲眼见过的真实案例，或公开报道的链接。不要编造数字或引语。",
      "只属于一种类型：做错功能、有 bug、或越界（见“关于”）。",
      "一个最小示例：提示词、diff 或对话片段。",
      "一个你试过的修复，或你认为有效的修复（我们会标明是哪种）。",
      "署名：谁报告的、在哪里报告的。",
    ],
    template: "条目文件模板",
    contributing: "完整指南：CONTRIBUTING.md",
    about: "三种类型怎么分",
  },
  pt: {
    h1: "Enviar uma falha",
    lead: "Já se queimou com um agente? Todo caso aceito é creditado no site e na newsletter. Envios são issues e PRs públicos no GitHub — o histórico fica aberto.",
    a: "1. Rápido: abrir uma issue",
    aBody: "Descreva o que pediu, o que o agente fez e por que estava errado. Anonimize código. Um mantenedor transforma bons casos em padrões.",
    b: "2. Completo: abrir um pull request",
    bBody: "Cada padrão é um YAML em content/patterns/. Este botão abre o editor do GitHub com o template; o GitHub faz o fork por você.",
    bBtn: "Abrir pull request pré-preenchido",
    rules: "O que faz um bom envio",
    list: [
      "Um caso real que você viu, ou link para relato público. Sem números ou citações inventadas.",
      "Exatamente um tipo: funcionalidade errada, bug ou excesso de escopo (veja Sobre).",
      "Um exemplo mínimo: o prompt, o diff ou um trecho de transcript.",
      "Um conserto que você tentou, ou que acha que deveria funcionar (marcamos qual é qual).",
      "Crédito: quem reportou e onde.",
    ],
    template: "Modelo de arquivo de padrão",
    contributing: "Guia completo: CONTRIBUTING.md",
    about: "Como os três tipos funcionam",
  },
  ko: {
    h1: "실패 사례 제보",
    lead: "에이전트에 데였나요? 채택된 사례는 사이트와 뉴스레터에 크레딧됩니다. 제보는 공개 GitHub 이슈·PR이라 이력이 열려 있습니다.",
    a: "1. 빠르게: 이슈 열기",
    aBody: "무엇을 시켰는지, 에이전트가 무엇을 했는지, 왜 틀렸는지 적으세요. 코드는 익명화. 유지보수자가 좋은 사례를 패턴으로 만듭니다.",
    b: "2. 완전하게: PR 열기",
    bBody: "각 패턴은 content/patterns/의 YAML 하나입니다. 이 버튼은 템플릿이 채워진 GitHub 편집기를 열고, GitHub가 fork를 해 줍니다.",
    bBtn: "미리 채운 PR 열기",
    rules: "좋은 제보의 조건",
    list: [
      "직접 본 실제 사례, 또는 공개 보고 링크. 숫자·인용 날조 금지.",
      "유형은 정확히 하나: 잘못된 기능, 버그, 범위 초과(소개 참고).",
      "최소 예시: 프롬프트, diff, 또는 대화 발췌.",
      "시도한 수정, 또는 될 것 같은 수정(구분해 표시).",
      "크레딧: 누가, 어디서 보고했는지.",
    ],
    template: "패턴 파일 템플릿",
    contributing: "전체 가이드: CONTRIBUTING.md",
    about: "세 유형이 어떻게 나뉘는지",
  },
  vi: {
    h1: "Gửi một lỗi",
    lead: "Bị agent làm khổ? Mọi ca được nhận sẽ ghi công trên site và newsletter. Bài gửi là issue và PR GitHub công khai nên toàn bộ lịch sử mở.",
    a: "1. Nhanh: mở issue",
    aBody: "Mô tả bạn hỏi gì, agent làm gì, vì sao sai. Ẩn danh code. Người duy trì biến ca tốt thành mẫu.",
    b: "2. Đầy đủ: mở pull request",
    bBody: "Mỗi mẫu là một YAML trong content/patterns/. Nút này mở trình sửa GitHub với mẫu đã điền; GitHub sẽ fork giúp bạn.",
    bBtn: "Mở pull request đã điền sẵn",
    rules: "Bài gửi tốt gồm gì",
    list: [
      "Ca thật bạn thấy, hoặc liên kết báo cáo công khai. Không bịa số liệu hay trích dẫn.",
      "Đúng một loại: sai tính năng, bug, hoặc vượt phạm vi (xem Giới thiệu).",
      "Ví dụ tối thiểu: prompt, diff, hoặc đoạn transcript.",
      "Bản sửa bạn đã thử, hoặc nghĩ sẽ được (chúng tôi ghi rõ loại nào).",
      "Ghi công: ai báo và ở đâu.",
    ],
    template: "Mẫu file pattern",
    contributing: "Hướng dẫn đầy đủ: CONTRIBUTING.md",
    about: "Ba loại hoạt động thế nào",
  },
  de: {
    h1: "Fehler melden",
    lead: "Von einem Agenten verbrannt? Jeder angenommene Fall wird auf der Site und im Newsletter credited. Einreichungen sind öffentliche GitHub-Issues und PRs — die Historie bleibt offen.",
    a: "1. Schnell: Issue öffnen",
    aBody: "Beschreiben Sie, was Sie wollten, was der Agent tat und warum es falsch war. Code anonymisieren. Ein Maintainer macht gute Fälle zu Mustern.",
    b: "2. Voll: Pull Request öffnen",
    bBody: "Jedes Muster ist eine YAML-Datei in content/patterns/. Dieser Button öffnet GitHubs Editor mit Vorlage; GitHub forkt das Repo für Sie.",
    bBtn: "Vorausgefüllten Pull Request öffnen",
    rules: "Was eine gute Einreichung ausmacht",
    list: [
      "Ein realer Fall oder Link zu einem öffentlichen Bericht. Keine erfundenen Zahlen oder Zitate.",
      "Genau ein Typ: falsches Feature, Bug oder Übergriff (siehe Über uns).",
      "Ein Minimalbeispiel: Prompt, Diff oder Transkript-Ausschnitt.",
      "Ein Fix, den Sie versucht haben, oder der funktionieren sollte (wir kennzeichnen welches).",
      "Credit: wer hat es wo gemeldet.",
    ],
    template: "Musterdatei-Vorlage",
    contributing: "Vollständiger Guide: CONTRIBUTING.md",
    about: "Wie die drei Typen funktionieren",
  },
};

/** Render localized submission guidance, GitHub contribution links, and a copyable YAML template. */
export function SubmitView({ lang }: { lang: Lang }) {
  const c = C[lang];
  return (
    <div className="af-page">
      <h1 className="af-h1">{c.h1}</h1>
      <p className="af-lead">{c.lead}</p>

      <section className="af-section">
        <h2 className="af-h2">{c.a}</h2>
        <p className="af-muted" style={{ marginBottom: 14 }}>
          {c.aBody}
        </p>
        <SubmitForm lang={lang} />
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.b}</h2>
        <p className="af-muted">{c.bBody}</p>
        <a href={PR_URL} target="_blank" rel="noopener" className="af-btn-ghost" style={{ marginTop: 14 }}>
          {c.bBtn} ↗
        </a>
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.rules}</h2>
        <ul className="af-list">
          {c.list.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div className="af-inline-links">
          <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}>{c.contributing}</a>
          <Link href={href(lang, "/about")}>{c.about}</Link>
        </div>
      </section>

      <section className="af-section">
        <h2 className="af-h2" style={{ marginBottom: 12 }}>
          {c.template}
        </h2>
        <CopyBlock code={PATTERN_TEMPLATE} file="content/patterns/your-pattern-slug.yaml" lang={lang} />
      </section>
    </div>
  );
}
