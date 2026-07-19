"""
Prepare the Delmare render for the portfolio card.
- web-optimize (resize + JPG) so the page stays fast
- subtle warm/gold grade + gentle navy shadow lift so it sits in the site's palette
- soft bottom vignette so the overlaid title/tags stay legible
"""
from PIL import Image, ImageEnhance, ImageDraw
import os

SRC = "images/delmare2.png"
OUT_DIR = "public/work"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGB")

# resize to a sensible web width (keep aspect)
TARGET_W = 1800
w, h = img.size
if w > TARGET_W:
    img = img.resize((TARGET_W, round(h * TARGET_W / w)), Image.LANCZOS)
w, h = img.size

# --- subtle color grade toward the brand palette ---
# gentle contrast + saturation lift
img = ImageEnhance.Contrast(img).enhance(1.06)
img = ImageEnhance.Color(img).enhance(1.08)

# warm highlights (gold), cool-deepen shadows (navy) via per-pixel curve-ish blend
px = img.load()
# precompute lookup for speed
warm = []
for v in range(256):
    t = v / 255.0
    # highlights get a touch of gold, shadows a touch of navy-blue
    r = v + int(14 * t)                 # +red in brights
    g = v + int(6 * t) - int(4 * (1 - t))
    b = v - int(10 * t) + int(12 * (1 - t))  # -blue in brights, +blue in darks
    warm.append((max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))
for y in range(h):
    for x in range(w):
        r, g, b = px[x, y]
        px[x, y] = (warm[r][0], warm[g][1], warm[b][2])

# --- soft bottom vignette (navy) for text legibility ---
overlay = Image.new("RGB", (w, h))
od = ImageDraw.Draw(overlay)
grad_start = int(h * 0.55)
for y in range(h):
    if y < grad_start:
        a = 0.0
    else:
        a = (y - grad_start) / (h - grad_start)
        a = a ** 1.6 * 0.55  # ease, max 55% dark
    # navy tint (11,15,50)
    row = tuple(int(c * (1 - a) + n * a) for c, n in zip((0, 0, 0), (5, 6, 26)))
    od.line([(0, y), (w, y)], fill=row)
img = Image.blend(img, Image.composite(overlay, img, Image.new("L", (w, h), 255)), 0.0)

# apply darkening multiply for the bottom band only
dark = Image.new("RGB", (w, h), (5, 6, 26))
mask = Image.new("L", (w, h), 0)
md = ImageDraw.Draw(mask)
for y in range(h):
    if y < grad_start:
        a = 0
    else:
        t = (y - grad_start) / (h - grad_start)
        a = int((t ** 1.6) * 150)  # up to ~59%
    md.line([(0, y), (w, y)], fill=a)
img = Image.composite(dark, img, mask)

out = os.path.join(OUT_DIR, "delmare.jpg")
img.save(out, "JPEG", quality=84, optimize=True, progressive=True)
print("saved", out, img.size, round(os.path.getsize(out) / 1024), "KB")
