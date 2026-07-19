import os, re
from collections import Counter
from PIL import Image

SRC = "marka logolar"
OUT = "public/clients"
os.makedirs(OUT, exist_ok=True)

CREAM = (245, 234, 211)
TARGET_H = 128
MAX_W = 420

TR = str.maketrans({"ş": "s", "Ş": "s", "ç": "c", "Ç": "c", "ı": "i", "İ": "i",
                    "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u", "ö": "o", "Ö": "o"})

def slug(name):
    n = os.path.splitext(name)[0].translate(TR).lower()
    n = re.sub(r"logo", "", n)
    n = re.sub(r"[^a-z0-9]", "", n)
    return n

def box_fill(img):
    """A solid box behind the mark has all four bbox corners the same opaque
    colour; a text/icon mark leaves those corners transparent. Return the fill
    colour when it's a box, else None."""
    bbox = img.getbbox()
    if not bbox:
        return None
    l, t, r, b = bbox
    px = img.load()
    ix = max(3, int((r - l) * 0.02))
    iy = max(3, int((b - t) * 0.02))
    pts = [(l + ix, t + iy), (r - 1 - ix, t + iy), (l + ix, b - 1 - iy), (r - 1 - ix, b - 1 - iy)]
    cols = [px[x, y] for x, y in pts]
    if any(c[3] < 200 for c in cols):
        return None  # a corner is transparent -> not a filled box
    avg = tuple(sum(c[i] for c in cols) // 4 for i in range(3))
    for c in cols:
        d = ((c[0] - avg[0]) ** 2 + (c[1] - avg[1]) ** 2 + (c[2] - avg[2]) ** 2) ** 0.5
        if d > 45:
            return None  # corners differ -> not a flat box
    return avg

def key_out(img, color, tol=78, feather=42):
    px = img.load()
    w, h = img.size
    r0, g0, b0 = color
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            d = ((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2) ** 0.5
            if d <= tol:
                px[x, y] = (r, g, b, 0)
            elif d <= tol + feather:
                px[x, y] = (r, g, b, min(a, int(255 * (d - tol) / feather)))

order = []
for f in sorted(os.listdir(SRC)):
    p = os.path.join(SRC, f)
    try:
        img = Image.open(p).convert("RGBA")
    except Exception as e:
        print("skip", f, e); continue

    # 1) opaque outer background (e.g. viavita maroon jpg)
    corner = img.getpixel((0, 0))
    if corner[3] > 200:
        key_out(img, corner[:3])

    # 2) solid box behind the mark (Berr: black ink on white box; Vartur: letters
    #    knocked out of a blue box). Inside the box, "ink" = anything contrasting
    #    with the fill: a differently-coloured opaque pixel OR a transparent hole.
    fill = box_fill(img)
    boxed = fill is not None
    if boxed:
        l, t, r, b = img.getbbox()
        # shrink inward so the box's anti-aliased outer edge isn't read as a hole
        ix = max(2, int((r - l) * 0.012))
        iy = max(2, int((b - t) * 0.012))
        l, t, r, b = l + ix, t + iy, r - ix, b - iy
        px = img.load()
        mark = Image.new("RGBA", img.size, CREAM + (0,))
        mpx = mark.load()
        fr, fg, fb = fill
        for y in range(t, b):
            for x in range(l, r):
                pr, pg, pb, pa = px[x, y]
                if pa < 60:
                    ink = 255                      # knocked-out hole
                else:
                    d = ((pr - fr) ** 2 + (pg - fg) ** 2 + (pb - fb) ** 2) ** 0.5
                    ink = 255 if d > 95 else 0     # contrasting opaque ink
                if ink:
                    mpx[x, y] = CREAM + (ink,)
        mono = mark
    else:
        # single-colour mark on transparent bg -> recolour by its own alpha
        alpha = img.getchannel("A")
        mono = Image.new("RGBA", img.size, CREAM + (0,))
        mono.putalpha(alpha)

    bbox = mono.getbbox()
    if not bbox:
        print("empty", f); continue
    mono = mono.crop(bbox)

    cw, ch = mono.size
    scale = TARGET_H / ch
    if cw * scale > MAX_W:
        scale = MAX_W / cw
    mono = mono.resize((max(1, int(cw * scale)), max(1, int(ch * scale))), Image.LANCZOS)

    s = slug(f)
    mono.save(os.path.join(OUT, s + ".png"))
    order.append((s, mono.size[0], mono.size[1], boxed))

print("COUNT", len(order))
for s, w, h, boxed in order:
    print(f'  "{s}",  // {w}x{h} boxed={boxed}')
