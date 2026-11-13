"""Gera as flores de primavera (SVG) e as espalha pelo fundo das seções do index.html."""
import re, sys

P = sys.argv[1]
s = open(P, encoding='utf-8').read()

L = ' pathLength="1"'
def petals(d, n, cx, cy, extra=''):
    return ''.join(f'<path{L} d="{d}" transform="rotate({i * 360 / n:.0f} {cx} {cy})"{extra}/>' for i in range(n))

SIMBOLOS = {
  # margarida: 10 pétalas, miolo, caule e folha
  'margarida': ('0 0 100 150', ''.join(
      f'<ellipse{L} cx="50" cy="21" rx="5.5" ry="15" transform="rotate({i*36} 50 40)"/>' for i in range(10))
      + f'<circle{L} cx="50" cy="40" r="7"/><path{L} d="M50 48C48 80 53 110 47 148"/>'
      + f'<path{L} d="M49 104C36 98 30 88 31 76C42 80 48 90 49 104Z"/><path{L} d="M49 104C42 96 37 88 31 76"/>'),
  # tulipa
  'tulipa': ('0 0 80 160',
      f'<path{L} d="M40 52C26 50 20 36 22 18C28 24 32 26 36 22L40 10L44 22C48 26 52 24 58 18C60 36 54 50 40 52Z"/>'
      f'<path{L} d="M40 52C38 40 38 28 40 16"/><path{L} d="M40 52C41 90 38 120 40 158"/>'
      f'<path{L} d="M40 122C26 112 20 94 24 76C34 88 40 102 40 122Z"/><path{L} d="M41 106C52 99 58 87 57 73C49 81 43 91 41 106Z"/>'),
  # ramo de folhas
  'ramo': ('0 0 120 160',
      f'<path{L} d="M60 158C58 120 64 80 56 40C52 24 58 12 66 4"/>'
      f'<path{L} d="M58 130C44 126 36 116 34 104C46 106 54 116 58 130Z"/>'
      f'<path{L} d="M60 110C74 104 82 94 84 82C72 84 64 94 60 110Z"/>'
      f'<path{L} d="M58 88C44 82 38 72 38 60C50 64 56 74 58 88Z"/>'
      f'<path{L} d="M58 66C70 58 76 48 76 36C66 40 60 50 58 66Z"/>'
      f'<circle{L} cx="66" cy="4" r="3"/>'),
  # flor de cerejeira (5 pétalas)
  'cerejeira': ('-30 -30 60 60',
      petals('M0 -4C-8 -10 -9 -22 -3 -26L0 -23L3 -26C9 -22 8 -10 0 -4Z', 5, 0, 0)
      + f'<circle{L} cx="0" cy="0" r="3"/>'
      + ''.join(f'<path{L} d="M0 0L0 -11" transform="rotate({a} 0 0)"/>' for a in (36, 108, 180, 252, 324))),
  # botão de flor
  'botao': ('0 0 60 140',
      f'<path{L} d="M30 138C34 100 22 70 30 40"/><path{L} d="M30 40C20 34 20 16 30 6C40 16 40 34 30 40Z"/>'
      f'<path{L} d="M30 40C24 40 20 44 18 50M30 40C36 40 40 44 42 50"/><path{L} d="M28 96C18 92 12 82 12 72C22 76 27 84 28 96Z"/>'),
  # borboleta
  'borboleta': ('-40 -30 80 60',
      f'<path{L} d="M0 0C-10 -24 -34 -26 -32 -8C-30 4 -14 6 0 0Z"/><path{L} d="M0 0C10 -24 34 -26 32 -8C30 4 14 6 0 0Z"/>'
      f'<path{L} d="M0 2C-8 14 -22 22 -24 12C-24 4 -10 2 0 2Z"/><path{L} d="M0 2C8 14 22 22 24 12C24 4 10 2 0 2Z"/>'
      f'<path{L} d="M0 -8L0 12M0 -8C-2 -16 -6 -20 -9 -22M0 -8C2 -16 6 -20 9 -22"/>'),
  # pétala solta (preenchida)
  'petala': ('-10 -14 20 28', '<path class="cheia" d="M0 -12C7 -6 7 6 0 12C-7 6 -7 -6 0 -12Z"/>'),
}

defs = '\n'.join(f'  <symbol id="f-{k}" viewBox="{vb}">{body}</symbol>' for k, (vb, body) in SIMBOLOS.items())
s = re.sub(r'\n  <!--FLORES-->.*?<!--/FLORES-->', '', s, flags=re.S)
s = s.replace('  <symbol id="i-seta"', '  <!--FLORES-->\n' + defs + '\n  <!--/FLORES-->\n  <symbol id="i-seta"', 1)

def flor(tipo, x, y, tam, rot=0, k=0.05, d=0.0, mob=True, cls=''):
    vb = SIMBOLOS[tipo][0]
    c = 'flor' + ('' if mob else ' flor--desk') + (f' {cls}' if cls else '') + (' flor--cheia' if tipo == 'petala' else '')
    return (f'<svg class="{c}" viewBox="{vb}" style="--x:{x};--y:{y};--s:{tam};--r:{rot}deg;--k:{k};--d:{d}s" '
            f'focusable="false"><use href="#f-{tipo}"/></svg>')

# (tipo, x, y, tamanho, rotação, parallax, atraso, aparece no mobile?)
JARDINS = {
  'inicio': [
      ('margarida', '3%', '6%', 'clamp(5rem,9vw,9rem)', -14, .10, 0, True),
      ('ramo', '88%', '4%', 'clamp(5rem,9vw,8.5rem)', 18, .07, .2, True),
      ('borboleta', '80%', '30%', 'clamp(2.5rem,4vw,4rem)', 12, .16, .4, False, 'flor--voa'),
      ('cerejeira', '14%', '34%', '2.4rem', 20, .12, .3, False),
      ('cerejeira', '92%', '40%', '1.6rem', -10, .08, .5, False),
      ('petala', '22%', '12%', '.9rem', 30, .2, 0, False),
      ('petala', '72%', '16%', '.7rem', -40, .25, 0, True),
      ('petala', '64%', '44%', '.8rem', 70, .18, 0, False),
      ('botao', '95%', '58%', 'clamp(3rem,5vw,5rem)', 14, .09, .6, False),
      ('tulipa', '1%', '60%', 'clamp(3.5rem,5vw,5rem)', -12, .08, .5, False),
  ],
  'colecao': [
      ('ramo', '-1%', '2%', 'clamp(4rem,7vw,7rem)', -24, .06, 0, True),
      ('cerejeira', '96%', '6%', '2rem', 14, .1, .2, False),
      ('petala', '50%', '1%', '.8rem', 20, .2, 0, False),
      ('botao', '97%', '58%', 'clamp(3rem,5vw,5rem)', -8, .08, .3, False),
      ('margarida', '-3%', '84%', 'clamp(6rem,10vw,10rem)', -20, .06, .2, True),
      ('cerejeira', '30%', '9%', '1.8rem', 12, .14, .4, False),
      ('borboleta', '62%', '6%', 'clamp(2rem,3vw,3rem)', -10, .18, .5, False, 'flor--voa'),
  ],
  'condicional': [
      ('margarida', '84%', '64%', 'clamp(8rem,14vw,14rem)', 12, .07, 0, True),
      ('ramo', '58%', '78%', 'clamp(4rem,6vw,6rem)', 30, .1, .4, False),
      ('botao', '2%', '58%', 'clamp(3rem,5vw,5rem)', -14, .1, .3, False),
      ('cerejeira', '68%', '10%', '2.2rem', -18, .14, .2, False),
      ('petala', '80%', '22%', '.9rem', 50, .2, 0, True),
      ('petala', '40%', '86%', '.7rem', -20, .16, 0, False),
  ],
  'marca': [
      ('tulipa', '95%', '6%', 'clamp(3.5rem,6vw,6rem)', 10, .08, 0, True),
      ('cerejeira', '2%', '36%', '2.4rem', -12, .12, .2, False),
      ('borboleta', '58%', '50%', 'clamp(2.2rem,3vw,3rem)', -16, .18, .4, False, 'flor--voa'),
      ('petala', '30%', '6%', '.8rem', 40, .2, 0, False),
      ('ramo', '56%', '36%', 'clamp(4rem,6vw,6rem)', -6, .1, .3, False),
      ('botao', '1%', '70%', 'clamp(3rem,5vw,5rem)', 10, .08, .5, True),
      ('cerejeira', '64%', '88%', '2.2rem', 24, .12, .6, False),
  ],
  'elas-usam': [
      ('tulipa', '-1%', '52%', 'clamp(4rem,7vw,7rem)', -10, .08, 0, False),
      ('ramo', '92%', '4%', 'clamp(4rem,6vw,6rem)', 22, .06, .2, True),
      ('cerejeira', '80%', '78%', '2rem', 8, .12, .3, False),
      ('petala', '60%', '10%', '.8rem', -30, .2, 0, True),
      ('cerejeira', '52%', '6%', '2.4rem', 18, .14, .3, False),
      ('botao', '96%', '62%', 'clamp(3rem,5vw,5rem)', -10, .08, .4, False),
  ],
  'showroom': [
      ('margarida', '-2%', '58%', 'clamp(5rem,9vw,9rem)', -18, .07, 0, True),
      ('botao', '94%', '20%', 'clamp(3rem,5vw,5rem)', 12, .1, .2, False),
      ('borboleta', '30%', '8%', 'clamp(2rem,3vw,3rem)', 10, .16, .4, False, 'flor--voa'),
      ('petala', '70%', '86%', '.8rem', 60, .18, 0, False),
      ('tulipa', '86%', '56%', 'clamp(4rem,6vw,6rem)', 8, .08, .3, True),
      ('cerejeira', '48%', '82%', '2rem', -16, .12, .5, False),
  ],
  'rodape': [
      ('margarida', '4%', '60%', 'clamp(4rem,7vw,7rem)', -10, .05, 0, True),
      ('tulipa', '90%', '52%', 'clamp(3.5rem,6vw,6rem)', 12, .06, .2, True),
      ('ramo', '74%', '66%', 'clamp(3.5rem,5vw,5rem)', -16, .05, .3, False),
      ('cerejeira', '22%', '82%', '2rem', 20, .08, .4, False),
      ('borboleta', '60%', '20%', '2.4rem', -8, .12, .5, False, 'flor--voa'),
      ('petala', '40%', '74%', '.8rem', 30, .1, 0, False),
  ],
}

s = re.sub(r'\n\s*<div class="jardim".*?</div><!--/jardim-->', '', s, flags=re.S)
for alvo, itens in JARDINS.items():
    svgs = ''.join(flor(*i) for i in itens)
    bloco = f'\n    <div class="jardim" aria-hidden="true" data-reveal="linha">{svgs}</div><!--/jardim-->'
    if alvo == 'rodape':
        m = re.search(r'<footer class="rodape">', s)
    else:
        m = re.search(rf'<section[^>]*id="{alvo}"[^>]*>', s)
    s = s[:m.end()] + bloco + s[m.end():]

open(P, 'w', encoding='utf-8', newline='\n').write(s)
print('ok', s.count('class="flor'))
