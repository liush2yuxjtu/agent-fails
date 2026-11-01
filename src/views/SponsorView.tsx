import { OutboundLink } from "@/components/OutboundLink";
import { SPONSOR_ISSUE_URL, type Lang } from "@/lib/site";
import { getPatterns } from "@/lib/patterns";

type Copy = {
  h1: string;
  lead: string;
  slotsH: string;
  slots: { t: string; price: string; d: string }[];
  rulesH: string;
  rules: string[];
  contactH: string;
  contact: string;
  btn: string;
  stat: (n: number) => string;
};

const C: Record<Lang, Copy> = {
  en: {
    h1: "Sponsor AgentFails",
    lead: "AgentFails is read by developers who just watched an agent go wrong and are looking for the fix. If your tool or skill solves one of these patterns, put it in front of them.",
    slotsH: "Sponsor slots",
    slots: [
      { t: "Pattern-page slot", price: "$99 per month", d: "One clearly labelled sponsor card on pattern pages, optionally limited to one type (for example review tools on Bug pages, scope-guard tools on Overreach pages)." },
      { t: "Newsletter sponsor", price: "$49 per issue", d: "One short sponsor block in the weekly \"翻车 of the week\" email (English and Chinese editions)." },
      { t: "Featured fix", price: "$29 one-time", d: "Your tool or skill listed as an extra fix on the patterns it actually addresses, marked as sponsored, after we have checked that it works for that pattern." },
    ],
    rulesH: "House rules",
    rules: [
      "Sponsored content is always labelled.",
      "Sponsorship never changes which fixes we recommend, their order, or what a pattern page says.",
      "We only feature a tool on patterns it really addresses.",
      "These are founding rates while traffic grows. Real traffic numbers are shared before payment.",
    ],
    contactH: "Contact",
    contact: "For now, open a GitHub issue using the sponsor template. Say what you'd like to sponsor and roughly when.",
    btn: "Open a sponsor inquiry on GitHub",
    stat: (n: number) => `${n} patterns live, in English and Chinese.`,
  },
  zh: {
    h1: "赞助智能体翻车库",
    lead: "来智能体翻车库的读者，都是刚看着智能体翻车、正在找修复办法的开发者。如果你的工具或技能能解决其中某种模式，这里就是展示给他们的地方。",
    slotsH: "赞助位",
    slots: [
      { t: "条目页赞助位", price: "$99/月", d: "在条目页上放一张明确标注“赞助”的卡片，可以只投放某一类（比如审查工具投放“有 Bug”类，范围守卫工具投放“越界”类）。" },
      { t: "周报赞助", price: "$49/期", d: "在每周的《每周翻车》邮件（中英文版）里放一段简短的赞助内容。" },
      { t: "精选修复", price: "$29/次，一次性", d: "经我们验证确实对某条模式有效后，你的工具或技能会作为额外修复列在对应条目上，并标注为赞助。" },
    ],
    rulesH: "规则",
    rules: [
      "赞助内容一律明确标注。",
      "赞助永远不影响我们推荐哪些修复、修复的顺序，或条目页的内容。",
      "只把工具放在它真正能解决的条目上。",
      "这些是流量增长期间的创始价。付款前会分享真实的流量数据。",
    ],
    contactH: "联系方式",
    contact: "目前请用赞助模板在 GitHub 上开一个 Issue，说明你想赞助什么、大概什么时候。",
    btn: "在 GitHub 上提交赞助咨询",
    stat: (n: number) => `已上线 ${n} 条翻车模式，中英双语。`,
  },
  pt: {
    h1: "Patrocinar o AgentFails",
    lead: "O AgentFails é lido por desenvolvedores que acabaram de ver um agente falhar e buscam o conserto. Se sua ferramenta ou skill resolve um desses padrões, coloque-a na frente deles.",
    slotsH: "Espaços de patrocínio",
    slots: [
      { t: "Espaço na página de padrão", price: "$99 por mês", d: "Um card de patrocínio claramente rotulado nas páginas de padrão, opcionalmente limitado a um tipo (por exemplo ferramentas de review em páginas de Bug)." },
      { t: "Patrocínio da newsletter", price: "$49 por edição", d: "Um bloco curto de patrocínio no e-mail semanal \"翻车 of the week\" (edições em inglês e chinês)." },
      { t: "Conserto em destaque", price: "$29 uma vez", d: "Sua ferramenta ou skill listada como conserto extra nos padrões que ela realmente cobre, marcada como patrocinada, depois que verificarmos que funciona." },
    ],
    rulesH: "Regras da casa",
    rules: [
      "Conteúdo patrocinado é sempre rotulado.",
      "Patrocínio nunca muda quais consertos recomendamos, a ordem, ou o texto da página.",
      "Só destacamos uma ferramenta nos padrões que ela realmente resolve.",
      "Estes são preços de fundação enquanto o tráfego cresce. Números reais de tráfego são compartilhados antes do pagamento.",
    ],
    contactH: "Contato",
    contact: "Por enquanto, abra uma issue no GitHub com o template de patrocínio. Diga o que quer patrocinar e aproximadamente quando.",
    btn: "Abrir consulta de patrocínio no GitHub",
    stat: (n: number) => `${n} padrões no ar, em inglês e chinês.`,
  },
  ko: {
    h1: "AgentFails 스폰서",
    lead: "AgentFails 독자는 방금 에이전트가 잘못되는 걸 보고 수정을 찾는 개발자입니다. 도구·스킬이 이 패턴 중 하나를 해결한다면 그들 앞에 두세요.",
    slotsH: "스폰서 슬롯",
    slots: [
      { t: "패턴 페이지 슬롯", price: "$99/월", d: "패턴 페이지에 명확히 표시된 스폰서 카드 하나. 유형별로 제한 가능(예: Bug 페이지의 리뷰 도구)." },
      { t: "뉴스레터 스폰서", price: "$49/회", d: "주간 \"翻车 of the week\" 메일(영·중)에 짧은 스폰서 블록 하나." },
      { t: "추천 수정", price: "$29 일회", d: "실제로 해당 패턴을 다루는 도구·스킬을 추가 수정으로 올리고 스폰서로 표시합니다. 효과 확인 후." },
    ],
    rulesH: "운영 규칙",
    rules: [
      "스폰서 콘텐츠는 항상 표시합니다.",
      "스폰서십은 추천 수정·순서·패턴 본문을 바꾸지 않습니다.",
      "실제로 해결하는 패턴에만 도구를 올립니다.",
      "트래픽 성장기 창립 요금입니다. 결제 전 실제 트래픽을 공유합니다.",
    ],
    contactH: "문의",
    contact: "지금은 스폰서 템플릿으로 GitHub 이슈를 열어 주세요. 무엇을, 대략 언제 스폰서할지 적어 주세요.",
    btn: "GitHub에서 스폰서 문의 열기",
    stat: (n: number) => `패턴 ${n}개 운영 중(영·중).`,
  },
  vi: {
    h1: "Tài trợ AgentFails",
    lead: "Độc giả AgentFails là lập trình viên vừa thấy agent sai và đang tìm cách sửa. Nếu công cụ/skill của bạn giải một trong các mẫu này, hãy đưa nó ra trước họ.",
    slotsH: "Ô tài trợ",
    slots: [
      { t: "Ô trên trang mẫu", price: "$99/tháng", d: "Một thẻ tài trợ gắn nhãn rõ trên trang mẫu, có thể giới hạn một loại (ví dụ công cụ review trên trang Bug)." },
      { t: "Tài trợ newsletter", price: "$49/kỳ", d: "Một khối tài trợ ngắn trong email tuần \"翻车 of the week\" (bản Anh và Trung)." },
      { t: "Bản sửa nổi bật", price: "$29 một lần", d: "Công cụ/skill của bạn được liệt kê thêm trên các mẫu nó thực sự giải, gắn nhãn tài trợ, sau khi chúng tôi kiểm tra." },
    ],
    rulesH: "Nội quy",
    rules: [
      "Nội dung tài trợ luôn được gắn nhãn.",
      "Tài trợ không đổi bản sửa chúng tôi đề xuất, thứ tự, hay nội dung trang mẫu.",
      "Chỉ gắn công cụ vào mẫu nó thật sự giải quyết.",
      "Đây là giá sáng lập khi traffic còn tăng. Số liệu traffic thật được chia trước khi thanh toán.",
    ],
    contactH: "Liên hệ",
    contact: "Hiện hãy mở issue GitHub bằng mẫu tài trợ. Nói bạn muốn tài trợ gì và khoảng khi nào.",
    btn: "Mở yêu cầu tài trợ trên GitHub",
    stat: (n: number) => `${n} mẫu đang chạy, tiếng Anh và Trung.`,
  },
  de: {
    h1: "AgentFails sponsern",
    lead: "AgentFails lesen Entwickler, die gerade einen Agenten scheitern sahen und den Fix suchen. Wenn Ihr Tool oder Skill eines dieser Muster löst, platzieren Sie es vor ihnen.",
    slotsH: "Sponsorenplätze",
    slots: [
      { t: "Musterseiten-Platz", price: "$99 pro Monat", d: "Eine klar gekennzeichnete Sponsorenkarte auf Musterseiten, optional auf einen Typ begrenzt (z. B. Review-Tools auf Bug-Seiten)." },
      { t: "Newsletter-Sponsor", price: "$49 pro Ausgabe", d: "Ein kurzer Sponsorenblock in der wöchentlichen \"翻车 of the week\"-Mail (englische und chinesische Ausgabe)." },
      { t: "Featured Fix", price: "$29 einmalig", d: "Ihr Tool oder Skill als Extra-Fix auf den Mustern, die es wirklich betrifft, als gesponsert markiert — nach unserer Prüfung." },
    ],
    rulesH: "Hausregeln",
    rules: [
      "Gesponserte Inhalte sind immer gekennzeichnet.",
      "Sponsoring ändert nie empfohlene Fixes, Reihenfolge oder Mustertext.",
      "Wir listen ein Tool nur auf Mustern, die es wirklich adressiert.",
      "Das sind Gründerpreise während das Traffic wächst. Echte Traffic-Zahlen werden vor der Zahlung geteilt.",
    ],
    contactH: "Kontakt",
    contact: "Öffnen Sie vorerst ein GitHub-Issue mit dem Sponsor-Template. Sagen Sie, was und ungefähr wann Sie sponsern möchten.",
    btn: "Sponsor-Anfrage auf GitHub öffnen",
    stat: (n: number) => `${n} Muster live, auf Englisch und Chinesisch.`,
  },
};

/**
 * Render localized sponsorship options, the catalog count, and an inquiry link.
 * Errors reading, parsing, or validating catalog content propagate.
 */
export function SponsorView({ lang }: { lang: Lang }) {
  const c = C[lang];
  return (
    <div className="af-page">
      <h1 className="af-h1">{c.h1}</h1>
      <p className="af-lead">{c.lead}</p>
      <p className="af-meta">{c.stat(getPatterns().length)}</p>

      <section className="af-section">
        <h2 className="af-h2">{c.slotsH}</h2>
        <div className="af-slots">
          {c.slots.map((s) => (
            <div key={s.t} className="af-slot">
              <h3>{s.t}</h3>
              <p className="af-price">{s.price}</p>
              <p className="af-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.rulesH}</h2>
        <ul className="af-list">
          {c.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="af-section">
        <h2 className="af-h2">{c.contactH}</h2>
        <p className="af-muted" style={{ color: "var(--ink-soft)" }}>
          {c.contact}
        </p>
        <OutboundLink href={SPONSOR_ISSUE_URL} target="_blank" rel="noopener" className="af-btn" style={{ marginTop: 16 }}>
          {c.btn} ↗
        </OutboundLink>
      </section>
    </div>
  );
}
