import Link from "next/link";
import { CATEGORY_META } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/types";
import { href, OWNER_POSTS, OWNER_X_HANDLE, OWNER_X_URL, REPO_URL, type Lang } from "@/lib/site";
import { CAT_CODE, CAT_RAIL } from "@/components/Badges";

const CREDITS = [
  { name: "ralfyishere/agent-failure-modes (AFM index, CC BY 4.0)", url: "https://github.com/ralfyishere/agent-failure-modes" },
  { name: "vnmoorthy/agent-review: TAXONOMY.md (35 agent bug patterns)", url: "https://github.com/vnmoorthy/agent-review/blob/main/TAXONOMY.md" },
  { name: "developertoolkit.ai: A failure taxonomy for agent-written changes", url: "https://developertoolkit.ai/en/workflows/operate/failure-taxonomy/" },
  { name: "Agentic SDLC handbook, ch. 20: Anti-patterns and failure modes", url: "https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch20-anti-patterns-and-failure-modes.html" },
  { name: "Kaplira: When an AI agent changes unrelated files", url: "https://kaplira.com/guides/ai-agent-changes-unrelated-files/" },
  { name: "Night Forge: Stop your AI agent editing the wrong files", url: "https://night-forge.com/blog/stop-ai-agent-editing-wrong-files" },
  { name: "dev.to (yureki_lab): scope creep and the diff budget", url: "https://dev.to/yureki_lab/how-i-stopped-my-ai-coding-agents-scope-creep-with-a-diff-budget-47lj" },
  { name: "claudecodeguides.com: Stop Claude Code modifying unrelated files", url: "https://claudecodeguides.com/claude-code-stop-modifying-unrelated-files/" },
  { name: "Anthropic: Solving code review at Anthropic", url: "https://claude.dev/blog/solving-code-review-at-anthropic/" },
];

type Copy = {
  h1: string;
  lead: string;
  viewH: string;
  viewP1: string;
  viewP2: string;
  explain: Record<string, string>;
  howH: string;
  how: string[];
  agentsNote: string;
  creditsH: string;
  creditsP: string;
  who: string;
  who2: string;
  who3: string;
  submit: string;
};

const C: Record<Lang, Copy> = {
  en: {
    h1: "About AgentFails",
    lead: "AgentFails (智能体翻车库) collects the ways AI coding agents go wrong and pairs each one with a fix you can paste into your repo today. It is free, open source, and built from community submissions.",
    viewH: "The three-part view",
    viewP1: "Checking an agent's work comes down to three questions. The framing comes from ",
    viewP2: "'s X thread on reviewing agent output. Every pattern here belongs to exactly one:",
    explain: {
      "wrong-feature": "It built something other than what you intended. Reviewing the PR is too late. Have teammates annotate the spec, mockup or artifact before code, and write acceptance checks that rule out the wrong reading.",
      bug: "The feature is right but buggy. Catch it with a review pass (a /code-review style skill or a fresh-context reviewer), real tests the agent cannot weaken, and evidence instead of claims.",
      overreach: "It works and has no bugs, but it isn't how you wanted it. Example: you asked for a small frontend tweak and the agent changed backend logic. Fix it with a shared /verify skill, scope rules, diff budgets and hooks kept in the repo, so the whole team runs the same guardrails.",
    },
    howH: "How a pattern is built",
    how: [
      "A name and a type (wrong feature, bug or overreach).",
      "The symptom you see, why agents do it, and a minimal example.",
      "Copy-paste fixes: rules for CLAUDE.md, AGENTS.md and .cursor/rules, plus a Claude Code hook, skill or CI check where one helps.",
      "Sources. Rules in a context file are advice; hooks, permissions and CI checks are enforcement. We say which is which.",
    ],
    agentsNote: "Agent tags show which agents a pattern's fixes cover. Most patterns are reported across agents, so most entries carry all four.",
    creditsH: "Credits",
    creditsP: "The seed patterns are adapted from these public taxonomies and guides. Each pattern page links its specific sources. Go read the originals.",
    who: "Maintained by ",
    who2: ". Content lives in ",
    who3: "; changes are pull requests.",
    submit: "Submit a failure",
  },
  zh: {
    h1: "关于智能体翻车库",
    lead: "智能体翻车库（AgentFails）收集 AI 编程智能体的各种翻车方式，并为每一种配上今天就能粘贴进仓库的修复。它免费、开源，内容来自社区投稿。",
    viewH: "三分法",
    viewP1: "检查智能体的产出，归根结底是三个问题。这个分法来自 ",
    viewP2: " 关于审查智能体产出的 X 帖子。这里的每条模式都只属于其中一类：",
    explain: {
      "wrong-feature": "它做的东西不是你想要的。到审 PR 时已经太晚了。应该让队友在写代码之前就在需求文档、设计稿或产物上批注，并写出能排除错误理解的验收标准。",
      bug: "功能是对的，但有 bug。用审查环节来抓（/code-review 类技能或上下文干净的审查者）、用智能体改不了的真实测试、用证据代替口头声明。",
      overreach: "能用、也没 bug，但不是你想要的做法。例如：你只让改个前端小地方，智能体却动了后端逻辑。修复方式是把共享的 /verify 技能、范围规则、diff 预算和钩子放进仓库，让整个团队用同一套护栏。",
    },
    howH: "一条模式包含什么",
    how: [
      "名称和类型（做错功能、有 bug 或越界）。",
      "你看到的症状、智能体为什么会这样、一个最小示例。",
      "复制即用的修复：CLAUDE.md、AGENTS.md、.cursor/rules 的规则，必要时再加 Claude Code 钩子、技能或 CI 检查。",
      "来源。写在上下文文件里的规则是建议；钩子、权限和 CI 检查才是强制。我们会说明哪个是哪个。",
    ],
    agentsNote: "智能体标签表示这条模式的修复覆盖了哪些智能体。大多数模式在各家智能体上都有报告，所以多数条目四个标签都有。",
    creditsH: "致谢",
    creditsP: "首批条目改编自以下公开的分类和指南。每个条目页面都链接了具体来源，建议去读原文。",
    who: "维护者：",
    who2: "。内容存放在 ",
    who3: "，修改都通过 Pull Request 进行。",
    submit: "投稿翻车案例",
  },
  pt: {
    h1: "Sobre o AgentFails",
    lead: "O AgentFails (智能体翻车库) reúne as formas como agentes de código com IA erram e associa cada uma a um conserto que você pode colar no repositório hoje. É grátis, open source e feito com envios da comunidade.",
    viewH: "A visão em três partes",
    viewP1: "Checar o trabalho de um agente resume-se a três perguntas. O enquadramento vem do fio de X de ",
    viewP2: " sobre revisar saída de agentes. Cada padrão aqui pertence a exatamente um:",
    explain: {
      "wrong-feature": "Construiu algo diferente do que você pretendia. Revisar o PR já é tarde. Peça anotações no spec/mock antes do código e checagens de aceite que excluam a leitura errada.",
      bug: "A funcionalidade é certa, mas com bugs. Pegue com uma passagem de review (skill /code-review ou revisor com contexto limpo), testes reais que o agente não pode enfraquecer, e evidência em vez de alegações.",
      overreach: "Funciona e sem bugs, mas não é como você queria. Ex.: pediu um ajuste pequeno de frontend e o agente mudou lógica de backend. Conserte com skill /verify compartilhada, regras de escopo, orçamento de diff e hooks no repo.",
    },
    howH: "Como um padrão é montado",
    how: [
      "Um nome e um tipo (funcionalidade errada, bug ou excesso de escopo).",
      "O sintoma que você vê, por que agentes fazem isso, e um exemplo mínimo.",
      "Consertos copy-paste: regras para CLAUDE.md, AGENTS.md e .cursor/rules, mais hook, skill ou CI quando ajuda.",
      "Fontes. Regras em arquivo de contexto são conselho; hooks, permissões e CI são enforcement. Dizemos qual é qual.",
    ],
    agentsNote: "Tags de agente mostram quais agentes os consertos cobrem. A maioria dos padrões aparece em vários agentes, então a maioria das entradas tem os quatro.",
    creditsH: "Créditos",
    creditsP: "Os padrões iniciais são adaptados destas taxonomias e guias públicos. Cada página liga suas fontes. Leia os originais.",
    who: "Mantido por ",
    who2: ". O conteúdo fica em ",
    who3: "; mudanças são pull requests.",
    submit: "Enviar uma falha",
  },
  ko: {
    h1: "AgentFails 소개",
    lead: "AgentFails(智能体翻车库)는 AI 코딩 에이전트가 잘못되는 방식을 모으고, 각각에 오늘 저장소에 붙일 수 있는 수정을 붙입니다. 무료·오픈소스이며 커뮤니티 제보로 만들어집니다.",
    viewH: "세 갈래 관점",
    viewP1: "에이전트 결과 점검은 결국 세 질문입니다. 이 틀은 ",
    viewP2: "의 에이전트 출력 리뷰 X 스레드에서 왔습니다. 여기 패턴은 정확히 하나에 속합니다:",
    explain: {
      "wrong-feature": "의도한 것과 다른 것을 만들었습니다. PR 리뷰는 늦습니다. 코드 전에 스펙·목업에 주석을 달고, 잘못된 해석을 막는 수락 기준을 쓰세요.",
      bug: "기능은 맞지만 버그가 있습니다. 리뷰 패스(/code-review 스킬 등), 에이전트가 약화할 수 없는 실제 테스트, 주장 대신 근거로 잡으세요.",
      overreach: "동작하고 버그도 없지만 원하는 방식이 아닙니다. 예: 작은 프론트 수정을 시켰는데 백엔드 로직을 바꿈. 공유 /verify 스킬·범위 규칙·diff 예산·훅을 저장소에 두세요.",
    },
    howH: "패턴이 담는 것",
    how: [
      "이름과 유형(잘못된 기능, 버그, 범위 초과).",
      "보이는 증상, 에이전트가 그렇게 하는 이유, 최소 예시.",
      "복사·붙여넣기 수정: CLAUDE.md, AGENTS.md, .cursor/rules 규칙, 필요 시 훅·스킬·CI.",
      "출처. 컨텍스트 파일 규칙은 조언이고, 훅·권한·CI는 강제입니다. 구분해 둡니다.",
    ],
    agentsNote: "에이전트 태그는 수정의 적용 대상입니다. 대부분 패턴은 여러 에이전트에서 보고되어 네 태그를 모두 다는 경우가 많습니다.",
    creditsH: "크레딧",
    creditsP: "시드 패턴은 아래 공개 분류·가이드에서 옮겼습니다. 각 패턴 페이지에 구체 출처가 있습니다. 원문을 읽어 보세요.",
    who: "유지보수: ",
    who2: ". 콘텐츠는 ",
    who3: "에 있으며 변경은 PR로 합니다.",
    submit: "실패 사례 제보",
  },
  vi: {
    h1: "Giới thiệu AgentFails",
    lead: "AgentFails (智能体翻车库) thu thập cách agent lập trình AI sai và gắn mỗi cái với bản sửa bạn có thể dán vào repo hôm nay. Miễn phí, mã mở, xây từ đóng góp cộng đồng.",
    viewH: "Góc nhìn ba phần",
    viewP1: "Kiểm tra việc của agent quy về ba câu hỏi. Khung này đến từ chuỗi X của ",
    viewP2: " về review output agent. Mỗi mẫu ở đây thuộc đúng một:",
    explain: {
      "wrong-feature": "Nó làm thứ khác ý bạn. Review PR đã muộn. Hãy để đồng đội ghi chú trên spec/mock trước khi code, và viết tiêu chí chấp nhận loại trừ cách hiểu sai.",
      bug: "Tính năng đúng nhưng có bug. Bắt bằng vòng review (skill /code-review hoặc reviewer ngữ cảnh sạch), test thật agent không làm yếu được, và bằng chứng thay vì lời khẳng định.",
      overreach: "Chạy được, không bug, nhưng không phải cách bạn muốn. Ví dụ: chỉ nhờ chỉnh frontend nhỏ mà agent đổi logic backend. Sửa bằng skill /verify dùng chung, quy tắc phạm vi, ngân sách diff và hook trong repo.",
    },
    howH: "Một mẫu gồm gì",
    how: [
      "Tên và loại (sai tính năng, bug hoặc vượt phạm vi).",
      "Triệu chứng bạn thấy, vì sao agent làm vậy, ví dụ tối thiểu.",
      "Bản sửa copy-paste: quy tắc CLAUDE.md, AGENTS.md, .cursor/rules, thêm hook/skill/CI khi cần.",
      "Nguồn. Quy tắc trong file ngữ cảnh là lời khuyên; hook, quyền và CI là cưỡng chế. Chúng tôi nói rõ cái nào.",
    ],
    agentsNote: "Thẻ agent cho biết bản sửa phủ agent nào. Hầu hết mẫu được báo trên nhiều agent nên thường có đủ bốn thẻ.",
    creditsH: "Ghi công",
    creditsP: "Các mẫu hạt giống chuyển từ các phân loại và hướng dẫn công khai sau. Mỗi trang mẫu có nguồn cụ thể. Hãy đọc bản gốc.",
    who: "Duy trì bởi ",
    who2: ". Nội dung nằm trong ",
    who3: "; thay đổi qua pull request.",
    submit: "Gửi một lỗi",
  },
  de: {
    h1: "Über AgentFails",
    lead: "AgentFails (智能体翻车库) sammelt Wege, wie KI-Coding-Agenten scheitern, und paart jeden mit einem Fix, den Sie heute ins Repo kleben können. Kostenlos, Open Source, aus Community-Einreichungen.",
    viewH: "Die Dreiteilung",
    viewP1: "Agentenarbeit prüfen heißt drei Fragen. Der Rahmen kommt aus dem X-Thread von ",
    viewP2: " zum Review von Agent-Output. Jedes Muster hier gehört genau zu einem:",
    explain: {
      "wrong-feature": "Es hat etwas anderes gebaut als beabsichtigt. PR-Review ist zu spät. Annotieren Sie Spec/Mock vor dem Code und schreiben Sie Abnahmekriterien, die die falsche Lesart ausschließen.",
      bug: "Das Feature stimmt, ist aber buggy. Fangen Sie es mit Review-Pass (/code-review-Skill oder Reviewer mit frischem Kontext), echten Tests, die der Agent nicht aufweichen kann, und Belegen statt Behauptungen.",
      overreach: "Es läuft und ist bugfrei, aber nicht wie gewollt. Beispiel: kleine Frontend-Änderung, Agent ändert Backend-Logik. Fix: geteiltes /verify-Skill, Scope-Regeln, Diff-Budgets und Hooks im Repo.",
    },
    howH: "Was ein Muster enthält",
    how: [
      "Name und Typ (falsches Feature, Bug oder Übergriff).",
      "Symptom, warum Agenten es tun, und ein Minimalbeispiel.",
      "Copy-Paste-Fixes: Regeln für CLAUDE.md, AGENTS.md und .cursor/rules, plus Hook, Skill oder CI wo sinnvoll.",
      "Quellen. Regeln in Kontextdateien sind Rat; Hooks, Rechte und CI sind Enforcement. Wir sagen, was was ist.",
    ],
    agentsNote: "Agent-Tags zeigen, welche Agenten die Fixes abdecken. Die meisten Muster werden über Agenten hinweg gemeldet, daher tragen die meisten Einträge alle vier.",
    creditsH: "Credits",
    creditsP: "Die Seed-Muster stammen aus diesen öffentlichen Taxonomien und Guides. Jede Musterseite verlinkt ihre Quellen. Lesen Sie die Originale.",
    who: "Gepflegt von ",
    who2: ". Inhalte liegen in ",
    who3: "; Änderungen sind Pull Requests.",
    submit: "Fehler melden",
  },
};

/** Render localized category explanations, filtered catalog links, and source credits. */
export function AboutView({ lang }: { lang: Lang }) {
  const c = C[lang];
  return (
    <div className="af-page">
      <h1 className="af-h1">{c.h1}</h1>
      <p className="af-lead">{c.lead}</p>

      <section className="af-section">
        <h2 className="af-h2">{c.viewH}</h2>
        <p className="af-muted" style={{ marginTop: 10, color: "var(--ink-soft)" }}>
          {c.viewP1}
          <a href={OWNER_POSTS[0]} style={{ color: "var(--amber-hot)" }}>
            {OWNER_X_HANDLE}
          </a>
          {c.viewP2}
        </p>
        <div className="af-about-cats">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="af-about-cat">
              <span className={`af-rail ${CAT_RAIL[cat]}`} aria-hidden />
              <h3 className="af-h2" style={{ fontSize: "1.05rem" }}>
                <span className="mono" style={{ color: "var(--amber-hot)", marginRight: 8 }}>
                  {CAT_CODE[cat]}
                </span>
                {CATEGORY_META[cat][lang]}: {CATEGORY_META[cat].q[lang]}
              </h3>
              <p className="af-muted" style={{ marginTop: 10, color: "var(--ink-soft)" }}>
                {c.explain[cat]}
              </p>
              <Link
                href={`${href(lang, "/")}?cat=${cat}#patterns`}
                style={{ display: "inline-block", marginTop: 10, color: "var(--amber-hot)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em" }}
              >
                {CATEGORY_META[cat][lang]} →
              </Link>
            </div>
          ))}
        </div>
        <p className="af-meta" style={{ marginTop: 14 }}>
          X:{" "}
          {OWNER_POSTS.map((u, i) => (
            <a key={u} href={u} style={{ marginRight: 12, color: "var(--amber-hot)" }}>
              {`post ${i + 1}`}
            </a>
          ))}
        </p>
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.howH}</h2>
        <ul className="af-list">
          {c.how.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p className="af-muted">{c.agentsNote}</p>
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.creditsH}</h2>
        <p className="af-muted" style={{ color: "var(--ink-soft)" }}>
          {c.creditsP}
        </p>
        <ul className="af-sources">
          {CREDITS.map((x) => (
            <li key={x.url}>
              <a href={x.url} rel="noopener">
                {x.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="af-muted" style={{ marginTop: 24, color: "var(--ink-soft)" }}>
          {c.who}
          <a href={OWNER_X_URL} style={{ color: "var(--amber-hot)" }}>
            {OWNER_X_HANDLE}
          </a>
          {c.who2}
          <a href={REPO_URL} style={{ color: "var(--amber-hot)" }}>
            GitHub
          </a>
          {c.who3}
        </p>
        <Link href={href(lang, "/submit")} className="af-btn" style={{ marginTop: 16 }}>
          {c.submit}
        </Link>
      </section>
    </div>
  );
}
