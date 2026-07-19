"""
Vema Tuzla — bright daytime drone shot needs stronger grading to sit in the
dark navy/gold theme: tame the blown sky toward navy, warm grade, top+bottom fades.
"""
from PIL import Image, ImageEnhance, ImageDraw
import os

img = Image.open("images/vematuzla.JPG").convert("RGB")

TARGET_W = 1900
w, h = img.size
img = img.resize((TARGET_W, round(h * TARGET_W / w)), Image.LANCZOS)
w, h = img.size

# deepen exposure a touch + contrast + saturation
img = ImageEnhance.Brightness(img).enhance(0.94)
img = ImageEnhance.Contrast(img).enhance(1.1)
img = ImageEnhance.Color(img).enhance(1.12)

# brand-palette curve: gold highlights, navy shadows (stronger warm)
px = img.load()
lut = []
for v in range(256):
    t = v / 255.0
    r = v + int(16 * t)
    g = v + int(7 * t) - int(5 * (1 - t))
    b = v - int(14 * t) + int(16 * (1 - t))
    lut.append((max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))
for y in range(h):
    for x in range(w):
        r, g, b = px[x, y]
        px[x, y] = (lut[r][0], lut[g][1], lut[b][2])

navy = Image.new("RGB", (w, h), (5, 6, 26))

# top navy fade — tame the bright sky
top_mask = Image.new("L", (w, h), 0)
tmd = ImageDraw.Draw(top_mask)
top_end = int(h * 0.42)
for y in range(top_end):
    a = int((1 - y / top_end) ** 1.4 * 165)  # strongest at very top
    tmd.line([(0, y), (w, y)], fill=a)
img = Image.composite(navy, img, top_mask)

# bottom navy vignette — for title/tag legibility
bot_mask = Image.new("L", (w, h), 0)
bmd = ImageDraw.Draw(bot_mask)
grad_start = int(h * 0.5)
for y in range(grad_start, h):
    a = int(((y - grad_start) / (h - grad_start)) ** 1.5 * 175)
    bmd.line([(0, y), (w, y)], fill=a)
img = Image.composite(navy, img, bot_mask)

os.makedirs("public/work", exist_ok=True)
out = "public/work/vema.jpg"
img.save(out, "JPEG", quality=84, optimize=True, progressive=True)
print("saved", out, img.size, round(os.path.getsize(out) / 1024), "KB")
