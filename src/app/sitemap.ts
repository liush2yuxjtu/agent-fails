import type { MetadataRoute } from "next";
import { getPatterns } from "@/lib/patterns";
import { absolute, href } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/submit", "/about", "/sponsor", ...getPatterns().map((p) => `/patterns/${p.slug}`)];
  return paths.flatMap((path) =>
    (["en", "zh"] as const).map((lang) => ({
      url: absolute(href(lang, path)),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : path.startsWith("/patterns") ? 0.8 : 0.5,
      alternates: { languages: { en: absolute(path), "zh-CN": absolute(href("zh", path)) } },
    })),
  );
}
