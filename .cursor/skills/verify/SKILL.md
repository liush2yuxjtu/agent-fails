---
name: verify
description: Verify AgentFails before shipping. Run install, lint, and the production build, then confirm sponsor prices, example copy_fix analytics, and the homepage week pin.
---

# Verify

From the repository root:

```bash
npm ci && npm run lint && npm run build
```

`npm run build` also validates content.

After the build, confirm the prerendered HTML for `/sponsor` and `/zh/sponsor` each contains `$49`, `$99`, and `$29`:

```bash
set -euo pipefail
en=$(find .next -type f -name 'sponsor.html' ! -path '*/zh/*' | head -n 1)
zh=$(find .next -type f -path '*/zh/sponsor.html' | head -n 1)
test -n "$en" || { echo "missing built HTML for /sponsor"; exit 1; }
test -n "$zh" || { echo "missing built HTML for /zh/sponsor"; exit 1; }
for file in "$en" "$zh"; do
  for price in '$49' '$99' '$29'; do
    grep -q -F "$price" "$file" || { echo "missing $price in $file"; exit 1; }
  done
  echo "ok $file"
done
```

## Example copy analytics

`CopyBlock` calls `track("copy_fix", { slug: patternSlug, fixType })` from `@vercel/analytics` only when both props are set. Fix snippets pass the fix kind (`rules`, `cursor`, `hook`, and the rest). The example snippet on a pattern page must pass the same event with `fixType="example"` and that pattern's slug, so a weekly digest can count example copies beside fix copies.

```bash
set -euo pipefail
grep -F -q 'track("copy_fix", { slug: patternSlug, fixType })' src/components/CopyBlock.tsx
grep -F -q 'patternSlug={p.slug}' src/views/PatternView.tsx
grep -F -q 'fixType="example"' src/views/PatternView.tsx
page=$(find .next -type f -path '*/patterns/phantom-success.html' ! -path '*/zh/*' ! -path '*/pt/*' ! -path '*/ko/*' ! -path '*/vi/*' ! -path '*/de/*' | head -n 1)
test -n "$page" || { echo "missing built HTML for /patterns/phantom-success"; exit 1; }
grep -q -F 'patternSlug\":\"phantom-success\"' "$page" || { echo "missing example slug payload in $page"; exit 1; }
grep -q -F 'fixType\":\"example\"' "$page" || { echo "missing example fixType payload in $page"; exit 1; }
echo "ok copy_fix example wiring ($page)"
```

Clicking Copy on an example block (and on a fix block) still copies the snippet. In a browser, the click sends a `copy_fix` event whose `slug` is the pattern slug and whose `fixType` is `example` for the example block.

## Homepage week pin

The homepage pin is `guard-never-fired`, the lead item of `content/newsletter/2026-w45.md`. Each locale renders a real link (not an in-page scroll) to that pattern, with the locale label and the pattern title.

```bash
set -euo pipefail
check_pin() {
  local file="$1" href="$2" label="$3" title="$4"
  test -n "$file" || { echo "missing built HTML for $href"; exit 1; }
  grep -q -F "href=\"$href\"" "$file" || { echo "missing href $href in $file"; exit 1; }
  grep -q -F "$label" "$file" || { echo "missing label $label in $file"; exit 1; }
  grep -q -F "$title" "$file" || { echo "missing title in $file"; exit 1; }
  echo "ok $file"
}
en=$(find .next -type f -name 'index.html' ! -path '*/zh/*' ! -path '*/pt/*' ! -path '*/ko/*' ! -path '*/vi/*' ! -path '*/de/*' | head -n 1)
zh=$(find .next -type f -path '*/zh.html' -o -type f -path '*/zh/index.html' | head -n 1)
pt=$(find .next -type f -path '*/pt.html' -o -type f -path '*/pt/index.html' | head -n 1)
ko=$(find .next -type f -path '*/ko.html' -o -type f -path '*/ko/index.html' | head -n 1)
vi=$(find .next -type f -path '*/vi.html' -o -type f -path '*/vi/index.html' | head -n 1)
de=$(find .next -type f -path '*/de.html' -o -type f -path '*/de/index.html' | head -n 1)
check_pin "$en" "/patterns/guard-never-fired" "This week&#x27;s 翻车" "The guard was installed"
check_pin "$zh" "/zh/patterns/guard-never-fired" "本周翻车" "一次都没触发"
check_pin "$pt" "/pt/patterns/guard-never-fired" "Falha desta semana" "Nunca disparou"
check_pin "$ko" "/ko/patterns/guard-never-fired" "이번 주 실패" "한 번도 발동하지 않았다"
check_pin "$vi" "/vi/patterns/guard-never-fired" "Lỗi tuần này" "Nó chưa từng chặn"
check_pin "$de" "/de/patterns/guard-never-fired" "Fail dieser Woche" "Der Guard war installiert"
```
