import type { MetadataRoute } from "next";
import { getPatterns } from "@/lib/patterns";
import { getHubs } from "@/lib/hubs";
import { absolute, href, languageAlternates, LANGS } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/submit", "/about", "/sponsor", ...getHubs().map((h) => h.path), ...getPatterns().map((p) => `/patterns/${p.slug}`)];
  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: absolute(href(lang, path)),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : path.startsWith("/patterns") || path.startsWith("/why-") || path.startsWith("/agent-") || path.startsWith("/examples-") ? 0.85 : 0.5,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
