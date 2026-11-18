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

The homepage pin is `spent-your-api-key`, the lead item of `content/newsletter/2026-w47.md`. Each locale renders a real link (not an in-page scroll) to that pattern, with the locale label and the pattern title.

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
check_pin "$en" "/patterns/spent-your-api-key" "This week&#x27;s 翻车" "Then it spent the key"
check_pin "$zh" "/zh/patterns/spent-your-api-key" "本周翻车" "花掉了项目的密钥"
check_pin "$pt" "/pt/patterns/spent-your-api-key" "Falha desta semana" "Depois gastou a chave"
check_pin "$ko" "/ko/patterns/spent-your-api-key" "이번 주 실패" "프로젝트 키를 썼다"
check_pin "$vi" "/vi/patterns/spent-your-api-key" "Lỗi tuần này" "tiêu key của dự án"
check_pin "$de" "/de/patterns/spent-your-api-key" "Fail dieser Woche" "verbrauchte es den Schlüssel"
```

## Week 2026-W46 pages

The two new patterns and the delete-path update are in the built English HTML.

```bash
set -euo pipefail
page() {
  find .next -type f -path "*/patterns/$1.html" ! -path '*/zh/*' ! -path '*/pt/*' ! -path '*/ko/*' ! -path '*/vi/*' ! -path '*/de/*' | head -n 1
}
rev=$(page reverted-your-fix)
prune=$(page prune-took-the-neighbors-volume)
del=$(page delete-hit-the-wrong-path)
test -n "$rev" || { echo "missing built HTML for /patterns/reverted-your-fix"; exit 1; }
test -n "$prune" || { echo "missing built HTML for /patterns/prune-took-the-neighbors-volume"; exit 1; }
test -n "$del" || { echo "missing built HTML for /patterns/delete-hit-the-wrong-path"; exit 1; }
grep -q -F '107475' "$rev" || { echo "missing 107475 in $rev"; exit 1; }
grep -q -F '107643' "$rev" || { echo "missing 107643 in $rev"; exit 1; }
grep -q -F '107655' "$prune" || { echo "missing 107655 in $prune"; exit 1; }
grep -q -F 'com.docker.compose.project' "$prune" || { echo "missing compose project label in $prune"; exit 1; }
grep -q -F '107271' "$del" || { echo "missing 107271 in $del"; exit 1; }
grep -q -F 'D:?' "$del" || { echo "missing quoted rm guard in $del"; exit 1; }
echo "ok week 2026-W46 pages"
```

## Week 2026-W47 pages

The two new patterns and the delete-path update are in the built English HTML.

```bash
set -euo pipefail
page() {
  find .next -type f -path "*/patterns/$1.html" ! -path '*/zh/*' ! -path '*/pt/*' ! -path '*/ko/*' ! -path '*/vi/*' ! -path '*/de/*' | head -n 1
}
spend=$(page spent-your-api-key)
shot=$(page obeyed-the-screenshot)
del=$(page delete-hit-the-wrong-path)
test -n "$spend" || { echo "missing built HTML for /patterns/spent-your-api-key"; exit 1; }
test -n "$shot" || { echo "missing built HTML for /patterns/obeyed-the-screenshot"; exit 1; }
test -n "$del" || { echo "missing built HTML for /patterns/delete-hit-the-wrong-path"; exit 1; }
grep -q -F '110556' "$spend" || { echo "missing 110556 in $spend"; exit 1; }
grep -q -F '109364' "$spend" || { echo "missing 109364 in $spend"; exit 1; }
grep -q -F '$5.94' "$spend" || { echo "missing \$5.94 in $spend"; exit 1; }
grep -q -F 'claude-fable-5-2' "$spend" || { echo "missing claude-fable-5-2 in $spend"; exit 1; }
grep -q -F 'ANTHROPIC_API_KEY' "$spend" || { echo "missing ANTHROPIC_API_KEY in $spend"; exit 1; }
grep -q -F 'Read(**/.env*)' "$spend" || { echo "missing Read deny glob in $spend"; exit 1; }
grep -q -F '109003' "$shot" || { echo "missing 109003 in $shot"; exit 1; }
grep -q -F '@playwright/test' "$shot" || { echo "missing @playwright/test in $shot"; exit 1; }
grep -q -F 'photographed slide' "$shot" || { echo "missing photographed slide in $shot"; exit 1; }
grep -q -F '109735' "$del" || { echo "missing 109735 in $del"; exit 1; }
grep -q -F 'R:?' "$del" || { echo "missing R:? guard in $del"; exit 1; }
grep -q -F 'rsync -a --delete' "$del" || { echo "missing rsync --delete in $del"; exit 1; }
echo "ok week 2026-W47 pages"
```
