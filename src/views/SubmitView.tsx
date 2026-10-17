import Link from "next/link";
import { href, REPO_URL, type Lang } from "@/lib/site";
import { PR_URL } from "@/lib/submit";
import { SubmitForm } from "@/components/SubmitForm";
import { CopyBlock } from "@/components/CopyBlock";
import { PATTERN_TEMPLATE } from "@/lib/submit";

const C = {
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
};

export function SubmitView({ lang }: { lang: Lang }) {
  const c = C[lang];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{c.h1}</h1>
      <p className="mt-3 text-lg text-zinc-600">{c.lead}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{c.a}</h2>
        <p className="mt-1 mb-4 text-zinc-600">{c.aBody}</p>
        <SubmitForm lang={lang} />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">{c.b}</h2>
        <p className="mt-1 text-zinc-600">{c.bBody}</p>
        <a href={PR_URL} target="_blank" rel="noopener" className="mt-4 inline-block rounded-lg border border-zinc-900 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-900 hover:text-white">
          {c.bBtn} ↗
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">{c.rules}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
          {c.list.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <div className="mt-4 flex gap-4 text-sm">
          <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} className="underline">{c.contributing}</a>
          <Link href={href(lang, "/about")} className="underline">{c.about}</Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">{c.template}</h2>
        <CopyBlock code={PATTERN_TEMPLATE} file="content/patterns/your-pattern-slug.yaml" lang={lang} />
      </section>
    </div>
  );
}
