"""
Prepare a project photo for a portfolio card.
- web-optimize (resize + progressive JPG) so the page stays fast
- optional warm/gold grade + navy shadow lift so it sits in the brand palette
- soft bottom vignette so the overlaid title/tags stay legible

Usage:
  python scripts/process_project_photo.py <src> <out_name> [warm_strength]
  warm_strength: 0.0-1.0 (default 1.0). Use lower for already-warm images.
"""
import sys, os
from PIL import Image, ImageEnhance, ImageDraw

src = sys.argv[1]
out_name = sys.argv[2]
warm = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0

OUT_DIR = "public/work"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(src).convert("RGB")

TARGET_W = 1800
w, h = img.size
if w > TARGET_W:
    img = img.resize((TARGET_W, round(h * TARGET_W / w)), Image.LANCZOS)
w, h = img.size

img = ImageEnhance.Contrast(img).enhance(1.0 + 0.06 * warm)
img = ImageEnhance.Color(img).enhance(1.0 + 0.08 * warm)

# subtle brand-palette curve: gold highlights, navy shadows
px = img.load()
lut = []
for v in range(256):
    t = v / 255.0
    r = v + int(14 * t * warm)
    g = v + int(6 * t * warm) - int(4 * (1 - t) * warm)
    b = v - int(10 * t * warm) + int(12 * (1 - t) * warm)
    lut.append((max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))
for y in range(h):
    for x in range(w):
        r, g, b = px[x, y]
        px[x, y] = (lut[r][0], lut[g][1], lut[b][2])

# navy bottom vignette for legibility
grad_start = int(h * 0.55)
dark = Image.new("RGB", (w, h), (5, 6, 26))
mask = Image.new("L", (w, h), 0)
md = ImageDraw.Draw(mask)
for y in range(h):
    a = 0 if y < grad_start else int(((y - grad_start) / (h - grad_start)) ** 1.6 * 150)
    md.line([(0, y), (w, y)], fill=a)
img = Image.composite(dark, img, mask)

out = os.path.join(OUT_DIR, out_name)
img.save(out, "JPEG", quality=84, optimize=True, progressive=True)
print("saved", out, img.size, round(os.path.getsize(out) / 1024), "KB")
