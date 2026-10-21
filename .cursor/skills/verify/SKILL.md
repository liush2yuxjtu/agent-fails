---
name: verify
description: Verify AgentFails before shipping. Run install, lint, and the production build, then confirm the built English and Chinese sponsor pages include founding rates $49, $99, and $29.
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
