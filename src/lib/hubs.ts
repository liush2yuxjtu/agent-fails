import "server-only";
import fs from "node:fs";
import path from "node:path";
import { load as yamlLoad } from "js-yaml";
import type { Lang } from "./site";

export type HubL10n = Record<Lang, string>;

export type HubSection = {
  id: string;
  heading: HubL10n;
  body: HubL10n;
};

export type Hub = {
  slug: string;
  path: string;
  title: HubL10n;
  description: HubL10n;
  sections: HubSection[];
  related_patterns: string[];
  cta: HubL10n;
};

const DIR = path.join(process.cwd(), "content", "hubs");
let cache: Hub[] | null = null;

function fail(file: string, msg: string): never {
  throw new Error(`[hubs] ${file}: ${msg}`);
}

export function getHubs(): Hub[] {
  if (cache) return cache;
  if (!fs.existsSync(DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  const hubs = files.map((file): Hub => {
    const raw = yamlLoad(fs.readFileSync(path.join(DIR, file), "utf8")) as Hub;
    for (const key of ["slug", "path", "title", "description", "sections", "related_patterns", "cta"] as const) {
      if (!raw?.[key]) fail(file, `missing "${key}"`);
    }
    if (`${raw.slug}.yaml` !== file && `${raw.slug}.yml` !== file) fail(file, `slug must match file name`);
    if (!raw.path.startsWith("/")) fail(file, "path must start with /");
    if (!raw.title.en || !raw.description.en) fail(file, "title/description need en");
    if (!raw.sections.length) fail(file, "needs at least one section");
    return raw;
  });
  hubs.sort((a, b) => a.slug.localeCompare(b.slug));
  cache = hubs;
  return hubs;
}

export function getHub(slug: string): Hub | undefined {
  return getHubs().find((h) => h.slug === slug);
}

export function getHubByPath(pathName: string): Hub | undefined {
  return getHubs().find((h) => h.path === pathName);
}

export const HUB_SLUGS = [
  "why-ai-agents-dont-work-yet",
  "agent-failure-taxonomy",
  "examples-of-ai-failure",
] as const;
