// Route factories so /en and locale-prefix pages share one implementation.
import type { Metadata } from "next";
import { t } from "./i18n";
import { HOME_SEO, pageMeta } from "./meta";
import { getPattern, getPatterns } from "./patterns";
import { lx, type Lang } from "./site";
import { SiteShell } from "@/components/SiteShell";
import { HomeView } from "@/views/HomeView";
import { PatternView } from "@/views/PatternView";
import { SubmitView } from "@/views/SubmitView";
import { AboutView } from "@/views/AboutView";
import { SponsorView } from "@/views/SponsorView";

type PageCopy = Record<Lang, string>;

const DESC: Record<"submit" | "about" | "sponsor", PageCopy> = {
  submit: {
    en: "Submit an AI coding agent failure case to AgentFails via a prefilled GitHub issue or pull request.",
    zh: "通过预填好的 GitHub Issue 或 Pull Request，向智能体翻车库投稿 AI 编程智能体的翻车案例。",
    pt: "Envie um caso de falha de agente de código com IA ao AgentFails via issue ou pull request pré-preenchidos no GitHub.",
    ko: "미리 채워진 GitHub 이슈 또는 PR로 AgentFails에 AI 코딩 에이전트 실패 사례를 제보하세요.",
    vi: "Gửi một ca lỗi agent lập trình AI tới AgentFails qua issue hoặc pull request GitHub đã điền sẵn.",
    de: "Reichen Sie einen KI-Coding-Agent-Fehler bei AgentFails über ein vorausgefülltes GitHub-Issue oder Pull Request ein.",
  },
  about: {
    en: "The three-part view of AI coding agent failures (wrong feature, bug, overreach) behind AgentFails, and credits to the public taxonomies it builds on.",
    zh: "智能体翻车库背后的三分法（做错功能、有 bug、越界），以及对所引用公开分类的致谢。",
    pt: "A visão em três partes das falhas de agentes de código com IA (funcionalidade errada, bug, excesso de escopo) por trás do AgentFails, e créditos às taxonomias públicas.",
    ko: "AgentFails 뒤의 AI 코딩 에이전트 실패 세 갈래(잘못된 기능, 버그, 범위 초과)와 공개 분류에 대한 크레딧.",
    vi: "Góc nhìn ba phần về lỗi agent lập trình AI (sai tính năng, bug, vượt phạm vi) của AgentFails, và ghi công các phân loại công khai.",
    de: "Die Dreiteilung von KI-Coding-Agent-Fehlern (falsches Feature, Bug, Übergriff) hinter AgentFails und Credits an die öffentlichen Taxonomien.",
  },
  sponsor: {
    en: "Sponsor slots on AgentFails: pattern pages, the weekly newsletter, and featured fixes. Founding rates from $29. Contact via GitHub issue.",
    zh: "智能体翻车库赞助位：条目页、每周周报、精选修复。创始价 $29 起。通过 GitHub Issue 联系。",
    pt: "Espaços de patrocínio no AgentFails: páginas de padrão, newsletter semanal e consertos em destaque. Preços de fundação a partir de $29. Contato via issue no GitHub.",
    ko: "AgentFails 스폰서 슬롯: 패턴 페이지, 주간 뉴스레터, 추천 수정. 창립 요금 $29부터. GitHub 이슈로 문의.",
    vi: "Ô tài trợ trên AgentFails: trang mẫu, newsletter tuần, bản sửa nổi bật. Giá sáng lập từ $29. Liên hệ qua issue GitHub.",
    de: "Sponsorenplätze auf AgentFails: Musterseiten, wöchentlicher Newsletter und Featured Fixes. Gründerpreise ab $29. Kontakt per GitHub-Issue.",
  },
};

const TITLES: Record<"submit" | "about" | "sponsor", PageCopy> = {
  submit: {
    en: "Submit a failure",
    zh: "投稿翻车案例",
    pt: "Enviar uma falha",
    ko: "실패 사례 제보",
    vi: "Gửi một lỗi",
    de: "Fehler melden",
  },
  about: {
    en: "About: the three-part view",
    zh: "关于：三分法",
    pt: "Sobre: a visão em três partes",
    ko: "소개: 세 갈래 관점",
    vi: "Giới thiệu: góc nhìn ba phần",
    de: "Über uns: die Dreiteilung",
  },
  sponsor: {
    en: "Sponsor",
    zh: "赞助",
    pt: "Patrocinar",
    ko: "스폰서",
    vi: "Tài trợ",
    de: "Sponsoring",
  },
};

export function homeRoute(lang: Lang) {
  return {
    metadata: pageMeta({ lang, path: "/", description: HOME_SEO[lang].description }),
    Page: () => <SiteShell lang={lang} path="/"><HomeView lang={lang} /></SiteShell>,
  };
}

export function staticRoute(lang: Lang, key: "submit" | "about" | "sponsor") {
  const View = { submit: SubmitView, about: AboutView, sponsor: SponsorView }[key];
  return {
    metadata: pageMeta({ lang, path: `/${key}`, title: TITLES[key][lang], description: DESC[key][lang] }),
    Page: () => <SiteShell lang={lang} path={`/${key}`}><View lang={lang} /></SiteShell>,
  };
}

type SlugProps = { params: Promise<{ slug: string }> };

export function patternRoute(lang: Lang) {
  return {
    generateStaticParams: () => getPatterns().map((p) => ({ slug: p.slug })),
    generateMetadata: async ({ params }: SlugProps): Promise<Metadata> => {
      const { slug } = await params;
      const p = getPattern(slug);
      if (!p) return { title: t(lang).noResults };
      return pageMeta({
        lang,
        path: `/patterns/${slug}`,
        title: lx(p.title, lang),
        description: lx(p.summary, lang),
        type: "article",
      });
    },
    Page: async ({ params }: SlugProps) => {
      const { slug } = await params;
      return <SiteShell lang={lang} path={`/patterns/${slug}`}><PatternView slug={slug} lang={lang} /></SiteShell>;
    },
  };
}
