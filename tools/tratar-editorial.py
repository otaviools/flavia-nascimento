"""Fotos editoriais em Full HD (banco Unsplash, licença de uso livre).

Lê assets/img/editorial/original/*.jpg e grava em assets/img/web/ versões
AVIF e WebP em dois tamanhos (srcset): metade e inteira.
Aplica o mesmo tratamento leve das fotos da loja, para tudo parecer
da mesma campanha.

Uso:  python tools/tratar-editorial.py            (todas)
      python tools/tratar-editorial.py ed-linho    (só as que começam com o nome)
"""
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
ORIG = RAIZ / "assets" / "img" / "editorial" / "original"
DEST = RAIZ / "assets" / "img" / "web"
DEST.mkdir(parents=True, exist_ok=True)


def curva(v: int) -> int:
    x = v / 255
    s = x + 0.05 * (x - 0.5) * (1 - abs(2 * x - 1))
    return round(8 + s * 241)


LUT = [curva(i) for i in range(256)]


def tratar(im: Image.Image) -> Image.Image:
    im = im.convert("RGB").point(LUT * 3)
    im = ImageEnhance.Color(im).enhance(0.95)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, round(v * 1.012)))
    b = b.point(lambda v: round(v * 0.988))
    return Image.merge("RGB", (r, g, b))


filtro = sys.argv[1:]
for src in sorted(ORIG.glob("*.jpg")):
    if filtro and not any(src.stem.startswith(f) for f in filtro):
        continue
    base = tratar(Image.open(src))
    w, h = base.size
    for largura in (w // 2, w):
        im = base if largura == w else base.resize((largura, round(h * largura / w)), Image.LANCZOS)
        if largura != w:
            im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=30, threshold=2))
        nome = DEST / f"{src.stem}-{largura}"
        im.save(nome.with_suffix(".avif"), quality=58, speed=4)
        im.save(nome.with_suffix(".webp"), quality=80, method=6)
        print(f"{nome.name:28} {im.size[0]}x{im.size[1]}  "
              f"avif {nome.with_suffix('.avif').stat().st_size // 1024}KB  "
              f"webp {nome.with_suffix('.webp').stat().st_size // 1024}KB")
