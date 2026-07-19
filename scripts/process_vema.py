"""
Vema Tuzla — bright daytime 4:3 drone shot that must show the WHOLE building
inside a wide card. Technique: 16:9 canvas, blurred+navy ambient fill behind,
the full sharp image contained (letterbox-free, no crop) centered on top.
"""
from PIL import Image, ImageEnhance, ImageDraw, ImageFilter
import os

src = Image.open("images/vematuzla.JPG").convert("RGB")

# --- brand grade on the source first ---
img = ImageEnhance.Brightness(src).enhance(0.95)
img = ImageEnhance.Contrast(img).enhance(1.09)
img = ImageEnhance.Color(img).enhance(1.12)

px = img.load()
w0, h0 = img.size
lut = []
for v in range(256):
    t = v / 255.0
    r = v + int(15 * t)
    g = v + int(6 * t) - int(4 * (1 - t))
    b = v - int(12 * t) + int(15 * (1 - t))
    lut.append((max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))
# apply via point LUT per-channel for speed
rlut = [c[0] for c in lut]
glut = [c[1] for c in lut]
blut = [c[2] for c in lut]
img = img.point(rlut + glut + blut)

# --- 16:9 canvas ---
CW, CH = 1920, 1080

# background: cover-scale + heavy blur + navy darken
bg = img.copy()
scale = max(CW / w0, CH / h0)
bg = bg.resize((round(w0 * scale), round(h0 * scale)), Image.LANCZOS)
bx = (bg.width - CW) // 2
by = (bg.height - CH) // 2
bg = bg.crop((bx, by, bx + CW, by + CH))
bg = bg.filter(ImageFilter.GaussianBlur(46))
bg = ImageEnhance.Brightness(bg).enhance(0.5)
bg = Image.blend(bg, Image.new("RGB", (CW, CH), (7, 9, 34)), 0.72)

# foreground: contain-scale (full image, no crop), centered
fscale = min(CW / w0, CH / h0)
fg = img.resize((round(w0 * fscale), round(h0 * fscale)), Image.LANCZOS)
fx = (CW - fg.width) // 2
fy = (CH - fg.height) // 2

canvas = bg.copy()
canvas.paste(fg, (fx, fy))

# top navy fade across the whole canvas — tame the bright sky in the sharp image too
top = Image.new("L", (CW, CH), 0)
td = ImageDraw.Draw(top)
te = int(CH * 0.34)
for y in range(te):
    a = int((1 - y / te) ** 1.5 * 150)
    td.line([(0, y), (CW, y)], fill=a)
canvas = Image.composite(Image.new("RGB", (CW, CH), (7, 9, 34)), canvas, top)

# soft shadow seam where sharp image meets blur (subtle inner edge)
seam = Image.new("L", (CW, CH), 0)
sd = ImageDraw.Draw(seam)
sd.rectangle([fx, fy, fx + fg.width - 1, fy + fg.height - 1], outline=255, width=3)
seam = seam.filter(ImageFilter.GaussianBlur(3))
shadow = Image.new("RGB", (CW, CH), (0, 0, 0))
canvas = Image.composite(shadow, canvas, seam.point(lambda a: int(a * 0.25)))

# bottom navy vignette for title/tag legibility
bot = Image.new("L", (CW, CH), 0)
bd = ImageDraw.Draw(bot)
gs = int(CH * 0.52)
for y in range(gs, CH):
    a = int(((y - gs) / (CH - gs)) ** 1.5 * 190)
    bd.line([(0, y), (CW, y)], fill=a)
canvas = Image.composite(Image.new("RGB", (CW, CH), (5, 6, 26)), canvas, bot)

os.makedirs("public/work", exist_ok=True)
out = "public/work/vema.jpg"
canvas.save(out, "JPEG", quality=85, optimize=True, progressive=True)
print("saved", out, canvas.size, round(os.path.getsize(out) / 1024), "KB")
