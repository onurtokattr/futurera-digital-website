import sys
from PIL import Image

src, dst, hexcolor, tol = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])

img = Image.open(src).convert("RGBA")
r0 = int(hexcolor[0:2], 16)
g0 = int(hexcolor[2:4], 16)
b0 = int(hexcolor[4:6], 16)

px = img.load()
w, h = img.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        d = ((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2) ** 0.5
        if d <= tol:
            px[x, y] = (r, g, b, 0)
        elif d <= tol + 40:
            # feather the edge
            fade = int(255 * (d - tol) / 40)
            px[x, y] = (r, g, b, min(a, fade))

# crop to the non-transparent bounding box, with a little padding
bbox = img.getbbox()
if bbox:
    pad = 14
    l, t, rr, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    rr = min(w, rr + pad)
    b = min(h, b + pad)
    img = img.crop((l, t, rr, b))

img.save(dst)
print(f"saved {dst} size={img.size}")
