export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://agent-fails.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "AgentFails";
export const SITE_NAME_ZH = "智能体翻车库";
export const REPO = "liush2yuxjtu/agent-fails";
export const REPO_URL = `https://github.com/${REPO}`;
export const OWNER_X_HANDLE = "@liushiyumath";
export const OWNER_X_URL = "https://x.com/liushiyumath";
export const OWNER_POSTS = [
  "https://x.com/liushiyumath/status/2111201130277662883",
  "https://x.com/liushiyumath/status/2111233400346710364",
];
export const NEWSLETTER_FORM_ACTION = (process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION || "").trim();

export const ISSUE_URL = `${REPO_URL}/issues/new?template=failure-case.yml`;
export const SPONSOR_ISSUE_URL = `${REPO_URL}/issues/new?template=sponsor.yml`;

export type Lang = "en" | "zh";

export function href(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

export function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function alternates(path: string) {
  return {
    canonical: absolute(path),
    languages: {
      en: absolute(path),
      "zh-CN": absolute(href("zh", path)),
      "x-default": absolute(path),
    },
  };
}
