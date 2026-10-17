// Validates content/patterns/*.yaml without building the site. Run: npm run validate
import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

const root = path.resolve(import.meta.dirname, "..", "content");
const snippets = load(fs.readFileSync(path.join(root, "snippets.yaml"), "utf8"));
const CATS = ["wrong-feature", "bug", "overreach"];
const AGENTS = ["claude-code", "cursor", "codex", "copilot"];
const errors = [];
const slugs = new Set();

for (const file of fs.readdirSync(path.join(root, "patterns")).filter((f) => /\.ya?ml$/.test(f))) {
  const err = (m) => errors.push(`${file}: ${m}`);
  let p;
  try { p = load(fs.readFileSync(path.join(root, "patterns", file), "utf8")); } catch (e) { err(e.message); continue; }
  for (const k of ["slug", "category", "agents", "title", "summary", "symptom", "why", "example", "rule", "sources"]) if (!p?.[k]) err(`missing ${k}`);
  if (!p) continue;
  if (file.replace(/\.ya?ml$/, "") !== p.slug) err("slug must match file name");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug ?? "")) err("slug must be kebab-case");
  if (slugs.has(p.slug)) err("duplicate slug"); slugs.add(p.slug);
  if (!CATS.includes(p.category)) err(`category must be one of ${CATS.join(", ")}`);
  for (const a of p.agents ?? []) if (!AGENTS.includes(a)) err(`unknown agent ${a}`);
  for (const k of ["title", "summary", "symptom", "why"]) if (!p[k]?.en || !p[k]?.zh) err(`${k} needs en and zh`);
  if (!p.example?.code) err("example.code required");
  for (const s of p.sources ?? []) if (!/^https?:\/\//.test(s.url ?? "")) err(`bad source url ${s.url}`);
  for (const x of p.extras ?? []) {
    if (x.ref && !snippets[x.ref]) err(`unknown snippet ref ${x.ref}`);
    if (!x.ref && (!x.title?.en || !x.file || !x.code)) err("inline extra needs title.en, file, code");
  }
}

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`OK: ${slugs.size} patterns valid`);
