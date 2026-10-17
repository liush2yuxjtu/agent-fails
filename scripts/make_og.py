"""Generate public/og.png (1200x630). Run: python3 scripts/make_og.py (needs Pillow + a CJK font)."""
from PIL import Image, ImageDraw, ImageFont
import glob

W, H = 1200, 630
img = Image.new("RGB", (W, H), "#0b0b0f")
d = ImageDraw.Draw(img)

def font(size, bold=True):
    cands = glob.glob("/usr/share/fonts/**/NotoSansCJK-Bold.ttc", recursive=True) + \
            glob.glob("/usr/share/fonts/**/NotoSerifCJK-Bold.ttc", recursive=True)
    return ImageFont.truetype(cands[0], size, index=2 if "Sans" in cands[0] else 0)

d.rectangle([0, 0, 18, H], fill="#f97316")
d.text((80, 90), "AgentFails", font=font(110), fill="#ffffff")
d.text((80, 230), "智能体翻车库", font=font(64), fill="#f97316")
d.text((80, 340), "How AI coding agents go wrong,", font=font(44), fill="#e4e4e7")
d.text((80, 400), "each with a copy-paste fix.", font=font(44), fill="#e4e4e7")
x = 80
for label, color in [("Wrong feature", "#60a5fa"), ("Bug", "#f87171"), ("Overreach", "#fbbf24")]:
    f = font(30)
    w = d.textlength(label, font=f)
    d.rounded_rectangle([x, 505, x + w + 44, 557], radius=26, outline=color, width=3)
    d.text((x + 22, 512), label, font=f, fill=color)
    x += w + 70
d.text((80, 585), "CLAUDE.md · AGENTS.md · .cursor/rules · Claude Code hooks · /verify", font=font(24), fill="#a1a1aa")
img.save("public/og.png", optimize=True)
print("ok")
