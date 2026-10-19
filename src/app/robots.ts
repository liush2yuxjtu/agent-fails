import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";

export const dynamic = "force-static";

const ALLOWED_AGENTS = [
  "*",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOWED_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    sitemap: absolute("/sitemap.xml"),
  };
}
