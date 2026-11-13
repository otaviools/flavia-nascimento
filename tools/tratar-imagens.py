"""Tratamento uniforme das fotos da loja para a landing.

Lê os originais em assets/img/*.webp (não altera nada ali) e grava em
assets/img/web/ as versões tratadas em AVIF e WebP, no tamanho nativo.

Tratamento (leve, para não falsear a cor das peças):
  - curva de contraste suave e preto levemente "erguido" (aspecto de filme)
  - saturação -4% e um toque quente (+1.5% R, -1.5% B) para unificar a luz
  - nitidez fina (unsharp) para compensar a baixa resolução

Uso:  python tools/tratar-imagens.py
"""
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
ORIG = RAIZ / "assets" / "img"
DEST = ORIG / "web"
DEST.mkdir(exist_ok=True)

def curva(v: int) -> int:
    # preto em 10, branco em 248, S suave no meio
    x = v / 255
    s = x + 0.06 * (x - 0.5) * (1 - abs(2 * x - 1))  # contraste no meio-tom
    return round(10 + s * 238)

LUT = [curva(i) for i in range(256)]

def tratar(im: Image.Image) -> Image.Image:
    im = im.convert("RGB").point(LUT * 3)
    im = ImageEnhance.Color(im).enhance(0.96)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, round(v * 1.015)))
    b = b.point(lambda v: round(v * 0.985))
    im = Image.merge("RGB", (r, g, b))
    return im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=45, threshold=2))

for src in sorted(ORIG.glob("*.webp")):
    im = tratar(Image.open(src))
    base = DEST / src.stem
    im.save(base.with_suffix(".avif"), quality=62, speed=4)
    im.save(base.with_suffix(".webp"), quality=84, method=6)
    print(f"{src.name:24} {im.size[0]}x{im.size[1]}  "
          f"avif {base.with_suffix('.avif').stat().st_size//1024}KB  "
          f"webp {base.with_suffix('.webp').stat().st_size//1024}KB")
