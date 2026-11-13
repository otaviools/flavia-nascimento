# Redesign da landing Flavia Nascimento — identidade 2026

Posicionamento: moda feminina, minimalista, com linguagem de loja ("shopping").
Público: mulheres de 25 anos.

Versões guardadas para comparação:
- `_versao-anterior/` — site original (flores em aquarela, preto e dourado)
- `_redesign-preto-dourado/` — primeira proposta, que mantinha o selo FN e o preto e dourado

---

## 1. O que mudou nesta versão

Tipografia, cores e estrutura foram trocadas. **A logo (selo FN) foi mantida como é.**

| | Antes | Agora |
|---|---|---|
| Logo | Selo FN dourado sobre preto (PNG 246 px) | **O mesmo selo FN**, ao lado do nome "Flavia *Nascimento*" em Instrument Serif |
| Fontes | Bodoni Moda + Jost | Instrument Serif (títulos) + Instrument Sans (interface e texto) |
| Cores | Preto, dourado e areia | Porcelana, blush e rosé, com preto suave só no texto e nos botões |
| Linguagem | Editorial, com capítulos | Loja: barra de aviso, filtros, grade de produtos e botões em pílula |

| Tema | Só claro | Claro e escuro, com botão no topo e no rodapé |
| Movimento | Quase nenhum | Animações de entrada, de rolagem e de componentes (seção 4) |

**Sobre a logo:** o selo FN foi redesenhado em vetor (`assets/img/fn-selo.svg`) a partir do PNG original, com as mesmas medidas, cores (dourado `#9d7533`, preto `#050303`) e proporção. Em sobreposição pixel a pixel, 97,6% coincidem com o original; a diferença está só no serrilhado das bordas do PNG. O SVG é usado no topo, no rodapé e como favicon. O `fn-selo.png` original continua no projeto como favicon alternativo.

---

## 2. Referências do Mobbin (categoria shopping)

| # | Referência | O que foi aproveitado |
|---|---|---|
| 1 | [SSENSE — "Shop Womenswear"](https://mobbin.com/sites/sections/4ff94654-4570-46c2-beaf-77b5ccaf97ce) | Título enorme e centralizado sobre fundo claro, com as fotos logo abaixo em colunas iguais |
| 2 | [SSENSE — editorial](https://mobbin.com/sites/sections/4de98a06-dbff-4e54-83c6-a301c519bba0) | Mistura de serif e sans no mesmo bloco para criar hierarquia sem usar cor |
| 3 | [SSENSE — vitrine de produtos](https://mobbin.com/sites/sections/c409ea6f-1834-4801-8c38-2cc2f0761c69) | Legenda de produto pequena, em 2 linhas (nome e tipo), sem card nem sombra |
| 4 | [Shopify Supply — grade](https://mobbin.com/sites/sections/a178e55f-0be8-4811-8c85-b94b0caec5bd) | Nome do produto alinhado à esquerda, logo abaixo da foto; a foto ocupa o card inteiro |
| 5 | [Telepathic Instruments — Shop All](https://mobbin.com/sites/sections/09a7408a-137f-46a5-806c-42ab67a0ba5a) | Título da coleção à esquerda e filtros em pílula à direita, na mesma linha |
| 6 | [In Common With — hero](https://mobbin.com/sites/sections/a87f2a50-8a78-4193-b491-5589059041fa) | Navegação mínima em texto pequeno, com o nome da marca centralizado |
| 7 | [Webflow Merch — rodapé](https://mobbin.com/sites/sections/d9a2f9c5-3efd-4947-97de-1b54821a9975) | Cadastro de novidades em linha (campo + botão preenchido) separado por fio fino |
| 8 | [Freshman — Adidas & Farm Rio](https://mobbin.com/sites/sections/12391065-5e36-4dd6-9033-e6f1b47b5dd7) | Fundo creme quente e serif fina em tamanho grande, dando um tom feminino e leve |

---

## 3. Guia visual

### Logo e assinatura
- **Selo FN em SVG** à esquerda do nome, com 40 px de altura no topo (34 px ao rolar, 32 px no mobile). No hover, gira levemente.
- **Nome:** "Flavia" em Instrument Serif regular + "*Nascimento*" em itálico. No rodapé, o nome aparece em tamanho gigante, ao lado do selo.

### Cores
| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#fdfaf8` | Fundo principal (porcelana) |
| `--blush` | `#f6ece8` | Barra de aviso, Condicional, cartão "Tem mais no showroom", rodapé |
| `--tile` | `#efe6e2` | Fundo das fotos enquanto carregam |
| `--ink` | `#1c1819` | Texto e botão principal |
| `--mute` | `#6b6164` | Texto secundário (5,8:1) |
| `--rose` | `#d8a9a0` | Sublinhados decorativos |
| `--rosewood` | `#9a4a42` | Única cor de acento: itálicos dos títulos, links "Quero provar", hover, botão flutuante (6,4:1) |

### Tipografia
| Nível | Fonte | Tamanho |
|---|---|---|
| H1 | Instrument Serif 400, itálico em rosé | 60 → 160 px, entrelinha .88 |
| H2 | Instrument Serif 400 | 40 → 72 px |
| Manifesto / frases | Instrument Serif 400 | 26 → 56 px |
| Nome de produto | Instrument Sans 500 | 15 px |
| Corpo | Instrument Sans 400 | 16–17 px, entrelinha 1.6 |
| Botões, filtros, nav | Instrument Sans 500 | 14 px, sem caixa-alta |
| Rótulos (kicker) | Instrument Sans 500 | 12 px, caixa-alta, tracking 14% |

Fontes hospedadas no próprio site (`assets/fonts/`). Assim não há chamada ao Google Fonts, o que é melhor para desempenho e privacidade.

### Componentes
- Botões e filtros em pílula (raio total): botão principal preto (hover rosé) e secundário com contorno
- Fotos sem borda, sem sombra e sem canto arredondado
- Fios de 1 px separam as seções, sem caixas
- Grid: 4 colunas no desktop e 2 no mobile; abertura em carrossel com rolagem lateral no mobile

### Guia de layout e container fixo
O conteúdo de todas as seções (inclusive o topo e o rodapé) fica dentro de um **container fixo de 1280 px**, centralizado. Fundos e fotos em tela cheia podem passar dessa largura, mas o texto e as grades não.

| Faixa de largura | Colunas | Gap (entre colunas) | Margem lateral | Largura útil |
|---|---|---|---|---|
| Mobile (< 700 px) | 4 | 16 px | 16 px | tela − 32 px |
| Tablet (700–999 px) | 8 | 20 px | 32 px | tela − 64 px |
| Desktop (≥ 1000 px) | 12 | 24 px | 40 px | até 1280 px |

Tokens no CSS: `--container`, `--cols`, `--gap`, `--gutter` e `--max` (container + margens).

**Como as seções usam o grid (desktop, 12 colunas)**
| Seção | Distribuição |
|---|---|
| Topo | Navegação · logo no centro · ações, alinhados às bordas do container |
| Abertura | 3 fotos de 4 colunas cada |
| Coleção | 4 cards de 3 colunas cada |
| Condicional / Showroom | 3 blocos de 4 colunas cada |
| A marca | Rótulo nas colunas 1–3 · manifesto nas colunas 4–12; foto grande nas colunas 1–7 · coluna lateral (número, detalhe, texto) nas colunas 9–12; faixa de 3 números de 4 colunas cada |
| Do espelho para a vida | 2 fotos de 3 colunas · texto nas colunas 7–12 |
| Rodapé | Texto nas colunas 1–6 · formulário nas colunas 7–12 |

**Para ver o guia na página:** aperte **G** (fora de campos de texto) ou abra o site com `?guia` no endereço, por exemplo `http://localhost:8080/?guia`. Aparecem as colunas em rosé, a borda tracejada do container e uma etiqueta embaixo com o número de colunas, a largura do container e o gap atuais. Aperte **G** de novo para fechar.

### Espaçamento
Base 8 px, container de 1440 px, margem lateral de 16 a 40 px e seções com 72 a 136 px de respiro.

### Tema escuro
| Token | Claro | Escuro |
|---|---|---|
| `--paper` | `#fdfaf8` | `#151112` (cacau profundo) |
| `--blush` | `#f6ece8` | `#1f191a` |
| `--tile` | `#efe6e2` | `#2a2223` |
| `--ink` | `#1c1819` | `#f3ebe7` |
| `--mute` | `#6b6164` | `#b3a6a6` (7,9:1) |
| `--rosewood` | `#9a4a42` | `#e3a196` (8,6:1) |

O selo dourado funciona nos dois fundos sem precisar mudar nada.

---

## 4. Tema claro/escuro e animações

### Referências do Mobbin
| Referência | O que foi aproveitado |
|---|---|
| [Lovable — portfólio com toggle](https://mobbin.com/screens/e885c2d1-6d5f-4f3c-8fea-2a0c1cad20e6) | Ícone de sol/lua discreto no topo, ao lado das ações principais |
| [Hashnode — header](https://mobbin.com/screens/6e5f4cb4-55de-4f70-bb57-e0f40a12be8c) | Botão só com ícone, sem rótulo, entre os itens da direita |
| [Midday — rodapé](https://mobbin.com/sites/sections/503872ca-2331-4a6f-8cc6-66889b8586f8) | Pílula "Dark mode" com ícone e texto no rodapé, fácil de achar no mobile |
| [Quartz — menu](https://mobbin.com/screens/37bbc0d2-2e59-441e-bf12-d47239564eb9) | O texto do botão diz para onde vai ("Tema escuro"), não onde está |
| [Postman — troca de tema](https://mobbin.com/flows/75ce89eb-4ebd-4556-b02d-01d23f9e7f74) | Seguir o sistema por padrão e lembrar a escolha manual |
| [ZARA — home](https://mobbin.com/flows/257d3a3f-7076-4260-91d3-2000b1588f93) | Título gigante entrando sobre a foto, ritmo de uma seção por vez |
| [H&M — home](https://mobbin.com/flows/3ef18c9e-b187-44aa-af2f-c869082e25ba) | Fotos de categoria em pares que aparecem conforme a rolagem; topo fino |
| [Midday — rodapé](https://mobbin.com/sites/sections/503872ca-2331-4a6f-8cc6-66889b8586f8) / [BAGGU](https://mobbin.com/sites/sections/ddfad441-10db-4949-9baa-299e7e0edeee) | Nome da marca gigante fechando a página |

O Mobbin mostra telas estáticas. Por isso, as animações foram definidas a partir dos padrões de layout dessas referências, e não copiadas de um movimento específico.

### Botão de tema
- **Onde fica:** ícone de lua/sol no topo, nas versões desktop e mobile, e pílula "Tema escuro / Tema claro" no rodapé
- **Escolha inicial:** se a pessoa não escolheu nada, segue o tema do sistema. A escolha manual fica salva no navegador (`localStorage`). Se o armazenamento estiver bloqueado, o site continua funcionando.
- **Sem piscar:** o tema é aplicado antes do primeiro desenho da página, por um script curto no `<head>`
- **Transição:** um círculo se expande a partir do botão clicado (View Transitions API). Em navegadores sem suporte, as cores mudam com um fade suave.
- **Detalhes:** o ícone gira ao trocar, o `aria-label` informa a ação ("Ativar tema escuro") e a cor da barra do navegador no celular (`theme-color`) acompanha o tema

### Animações
| Onde | O que acontece |
|---|---|
| Abertura | O título sobe de dentro de uma máscara, linha por linha, seguido do texto e dos botões |
| Fotos (abertura, coleção, marca, clientes) | Cortina que abre de baixo para cima + zoom de 12% que assenta; a legenda entra depois |
| Grade da coleção | Os itens entram em cascata (0,09 s entre eles) |
| Textos e blocos | Sobem 24 px e aparecem ao entrar na tela |
| Manifesto | As palavras acendem conforme a leitura avança |
| Números | 10+ e 17,7 mil contam do zero até o valor |
| Filtros | A grade desliza para a nova posição ao trocar o filtro (View Transitions) |
| Topo | Fica fixo no alto da tela e fica mais compacto ao rolar |
| Barra de progresso | Linha rosé de 2 px no alto mostra quanto da página já foi lida |
| Abertura (desktop) | Parallax leve: as 3 fotos descem em velocidades diferentes |
| Rodapé | O selo gira para o lugar e o nome gigante sobe por linhas |
| Botões | Brilho que atravessa no hover; leve encolhida ao clicar |
| Links | O sublinhado sai por uma ponta e volta pela outra |
| Selo no topo | Gira levemente no hover |

**Correção — fotos que não apareciam:** a cortina das fotos usava `clip-path` para esconder a imagem até ela entrar na tela. O Chrome não baixa imagens `loading="lazy"` que estejam 100% recortadas, então algumas fotos (A marca, "Elas usam" e a faixa em tela cheia) nunca carregavam. Agora a cortina é uma camada por cima da foto (`::after`), que se recolhe sem impedir o download. Também há uma rede de segurança: depois de cada rolagem, qualquer bloco que esteja na tela e ainda escondido é revelado.

**Acessibilidade e desempenho:**
- Com "reduzir movimento" ligado no sistema, todas as animações são desligadas e o conteúdo aparece direto.
- Sem JavaScript, nada fica escondido: os estados iniciais só valem quando o JS carrega.
- As animações usam apenas `transform`, `opacity` e `clip-path`, que não forçam recálculo de layout.
- Uma rede de segurança revela qualquer bloco que tenha ficado preso fora da tela.

---

## 5. Header e fotos editoriais

### Header
| | Desktop | Mobile |
|---|---|---|
| Faixa de avisos | Fundo escuro, 3 mensagens que trocam a cada 4,5 s (condicional, WhatsApp, status do showroom); pausa com o mouse em cima ou com o foco | Igual |
| Linha principal | Navegação em caixa-alta à esquerda (ponto rosé na seção atual), selo + nome no centro e, à direita, tema, Instagram e botão "Fale com a gente" | Menu, selo + nome no centro, tema e WhatsApp à direita |
| Ao rolar | O topo fica fixo no alto da tela, só fica mais baixo (72 → 60 px) e o selo diminui | Igual |
| Menu | — | Tela cheia que abre como cortina, links grandes numerados (01–04) entrando em cascata, botão de WhatsApp, Instagram, tema e endereço com status "aberto agora" |
| Acessibilidade | Foco visível em todos os itens | Ao abrir, o foco vai para o primeiro link; o Esc fecha; o Tab volta ao botão do menu |

Também corrigi um problema do menu mobile anterior: o efeito de vidro do topo prendia o menu dentro do header. Agora esse efeito fica numa camada separada.

### Fotos editoriais em Full HD
Fotos de banco gratuito (Unsplash, licença de uso comercial livre), tratadas com o mesmo ajuste de cor das fotos da loja e exportadas em AVIF/WebP em 2 tamanhos (`srcset`):

| Onde | Arquivo | Tamanho | Autor |
|---|---|---|---|
| Abertura 1 | `ed-chapeu-linho` | 1280×1920 | byhome work |
| Abertura 2 | `ed-arco-bege` | 1280×1600 | Liubov Novikova |
| Abertura 3 | `ed-campo-branco` | 1280×1920 | Tania Lyahnovich |
| A marca (foto grande) | `ed-arara-showroom` | 1280×1920 | QingYu |
| A marca (detalhe) | `ed-linho-detalhe` | 1280×1917 | Kateryna Hliznitsova |
| Faixa em tela cheia (nova) | `ed-margaridas` | 1920×1280 | Fanny Gustafsson |

Os originais ficam em `assets/img/editorial/original/` e são processados por `python tools/tratar-editorial.py`. Os créditos aparecem no rodapé.

**Looks da coleção (trocados a pedido):** as 7 fotos da grade agora são de uma única série de estúdio (engin akyurt, Unsplash): fundo branco, mesma luz e mesmo enquadramento, em 1280×1920.

| Look | Arquivo | Filtro |
|---|---|---|
| 01 Chemise terracota com faixa (+ foto de costas) | `lk-chemise-terracota`, `lk-chemise-terracota-costas` | Vestidos |
| 02 Linho branco com cinto de corda | `lk-linho-branco` | Vestidos |
| 03 Midi de alças verde-sálvia | `lk-alcas-salvia` | Vestidos |
| 04 Chemise mostarda midi | `lk-chemise-mostarda` | Vestidos |
| 05 Pantalona de folhagens e regata | `lk-pantalona-folhagens` | Conjuntos |
| 06 Pantalona floral verde e blusa | `lk-pantalona-floral` | Conjuntos |
| 07 Macacão pantalona verde-oliva | `lk-macacao-oliva` | Macacão |

Como essas peças não são necessariamente vendidas pela loja, fiz três ajustes para a página não prometer o que não existe:
- O botão mudou de "Quero provar" para "Quero um look assim". A mensagem do WhatsApp agora diz "Vi no site o look X e quero ver peças parecidas na loja".
- Abaixo do título da coleção aparece o aviso "Fotos ilustrativas de inspiração. Consulte cores, tamanhos e peças disponíveis".
- Os créditos no rodapé citam o fotógrafo.

"Elas usam" virou **"Do espelho para a vida"**, com duas fotos em Full HD (Laura Chouette, 1280×1794, e Ali Aziz, 1280×2274, Unsplash), legendadas como inspiração. Como as fotos não são de clientes, o título deixou de dizer "Elas usam", e o link aponta para "Clientes reais no @flavianascimentofn". As fotos antigas das clientes (`elas-01`, `elas-02`) continuam na pasta.

As fotos antigas dos looks continuam em `assets/img/` e `assets/img/web/look-*`. Quando a loja fotografar as peças de verdade, vale voltar o botão para "Quero provar" e tirar o aviso.

---

### Seção "A marca" (refeita)
Referências do Mobbin:
- [Frontify — Our story](https://mobbin.com/sites/sections/2bae281e-1150-4542-b8f3-77c3bc236855): rótulo pequeno à esquerda e frase grande ocupando o resto da linha
- [Face Formula — sobre a marca](https://mobbin.com/sites/sections/6e51a359-2c03-47d8-870f-651c621e9a39): foto grande de um lado e, do outro, uma coluna leve com número, foto pequena de detalhe e texto curto com link
- [Farfetch — números](https://mobbin.com/sites/sections/a4f410a8-697b-4dfe-a966-bf48f3d4ea32): números grandes lado a lado, separados por fios verticais

Estrutura:
1. **Abertura:** ponto rosé + "A marca / desde a primeira arara" à esquerda; manifesto em serif grande à direita, com as palavras acendendo na rolagem.
2. **Bloco principal:** foto da arara de um ateliê (4:5) com legenda "Curadoria" e, ao lado, "10+" grande contando do zero, detalhe do linho e o texto sobre qualidade, com link para o showroom.
3. **Faixa de números:** 17,7 mil no Instagram · atendimento 1 a 1 · Condicional.

No mobile, tudo fica em uma coluna e os números viram linhas separadas por fios.

**Alinhamento (desktop):**
- A coluna lateral tem exatamente a altura da foto. O topo do "10+" alinha com o topo da foto, e a base do texto e do link alinha com a base da foto.
- A legenda da foto fica fora desse cálculo.
- O rótulo e o manifesto começam na mesma linha.

**Correção — seção fora do container:** a seção "A marca" e o logo do header usavam a mesma classe `.marca`. As regras do logo (`display: inline-flex`, posição no grid do header) também eram aplicadas à seção, que perdia a centralização e grudava na esquerda da tela. O logo passou a usar `.logo`, `.logo__selo` e `.logo__nome`. Uma auditoria em 390, 800, 1100 e 1900 px confirmou que todo o conteúdo fica dentro do container. O título e os botões da abertura também passaram a respeitar o container.

---

### Detalhes de fundo e divisores de seção
Referências do Mobbin:
| Referência | O que foi aproveitado |
|---|---|
| [Kinfolk — Studio visit](https://mobbin.com/sites/sections/1557474b-af5b-48e0-b8d3-541af616713b) | Fio forte no topo de cada bloco editorial |
| [AI in Design Report 2026 — capítulo](https://mobbin.com/sites/sections/bde9e82a-b11e-446f-9858-76c20256b468) | Número de capítulo grande à esquerda do fio |
| [OFF+BRAND — hero](https://mobbin.com/sites/sections/bc474f52-81ee-4be1-a75b-f9f5658155c3) | Círculos pontilhados finos e um brilho suave atrás do título |
| [Grain](https://mobbin.com/sites/sections/04c4e043-4609-495e-9240-b34e69307843) e [Cosmos](https://mobbin.com/sites/sections/eab202a7-4893-4cf9-a2ef-024d9bf504fc) | Degradês muito suaves no fundo das seções |
| [Oatly — sobre](https://mobbin.com/sites/sections/cac3b53a-8f30-4dfa-9627-7285c9cba0d6) | Textura de grão no fundo |
| [Readymag — texto corrido](https://mobbin.com/sites/sections/0b354b7f-7a2d-4754-baf9-78693a26790b) | Letreiro de texto que corre na horizontal como divisor |

**Fundo**
- **Grão de papel:** textura de ruído fixa sobre a página toda, com 6% de opacidade no tema claro e 7% no escuro. Fica por cima de tudo, sem bloquear cliques.
- **Abertura:** três órbitas (duas pontilhadas e uma contínua) em rosé, girando bem devagar (140 s por volta), e um brilho rosé desfocado que "respira" atrás do título.
- **Degradês:** brilho rosé no canto superior direito do Condicional e do rodapé, e no canto inferior esquerdo do Showroom.

**Divisores**
- **Capítulos:** cada seção começa com um fio de 1 px na cor do texto, o número do capítulo em itálico rosé (01–05), o nome e uma descrição à direita. No desktop, o fio segue o grid: o número nas colunas 1–3, o nome nas colunas 4–8 e a descrição nas colunas 9–12. Assim, o nome alinha com o manifesto de "A marca". O fio se desenha da esquerda para a direita quando entra na tela.
- **Capítulos atuais:** 01 Coleção · 02 Condicional · 03 A marca · 04 Inspiração · 05 Showroom. Os subtítulos que repetiam essa informação foram removidos.
- **Letreiro:** entre "Inspiração" e "Showroom", a faixa "Linho · *Renda* · Laise · *Condicional* · Uberlândia · *Desde a primeira arara*" corre devagar e pausa com o mouse em cima.
- Com "reduzir movimento" ligado, as órbitas, o letreiro e o fio ficam parados.

---

### Jardim de primavera (flores no fundo)
Referências do Mobbin:
- [Opennote — rodapé](https://mobbin.com/sites/sections/3dbc7c17-d1c9-4490-a394-33c61e52f471): desenhos de traço fino espalhados pelo fundo, em baixa opacidade
- [Lassie — hero](https://mobbin.com/sites/sections/eec3dcb7-4cde-4336-977c-2e8e53eafa84): flor simples de cinco pétalas usada como sinal gráfico
- [Air — hero](https://mobbin.com/sites/sections/bd3440c8-c982-485c-a62b-83147b07442d): borboletas pequenas soltas pela cena
- [Graza — artigos](https://mobbin.com/sites/sections/25fa618b-3dba-4cac-9b8c-0dba5d80237a): ilustração de traço de uma cor só

**Biblioteca de flores:** SVG desenhado à mão em traço fino, na cor rosé (`--flor`):
- **Margarida:** 10 pétalas, com caule e folha
- **Tulipa:** com duas folhas
- **Ramo de folhas**
- **Flor de cerejeira:** 5 pétalas e estames
- **Botão de flor**
- **Borboleta**
- **Pétala solta:** preenchida

**Distribuição:** 48 flores espalhadas pela abertura, Coleção, Condicional, A marca, Inspiração, Showroom e rodapé.
- Ficam sempre atrás do conteúdo, de preferência nas bordas e nos espaços vazios, e não recebem cliques.
- No mobile, só aparecem as principais, com 62% do tamanho.
- As posições ficam em `tools/jardim.py`. Para mudar, edite a lista `JARDINS` e rode `python tools/jardim.py index.html`.

**Movimento:**
- As flores se desenham traço a traço quando a seção entra na tela.
- Balançam como ao vento (7 s).
- As borboletas "voam" em um percurso curto, e as pétalas soltas flutuam.
- Cada flor tem um parallax próprio na rolagem (`--k`), o que cria profundidade.
- Com "reduzir movimento" ligado, tudo fica parado.

---

## 6. Estrutura da página

1. **Barra de aviso:** "Prove em casa com o condicional"
2. **Topo:** navegação à esquerda, logotipo central, Instagram e WhatsApp à direita
3. **Abertura:** "Leveza *que fica.*" + 3 looks em destaque (carrossel no mobile)
4. **Coleção Primavera:** 7 looks com filtros (Todos, Vestidos, Conjuntos, Macacão), contador e troca de ângulo por toque ou hover. Os filtros vêm das peças reais: 3 vestidos, 3 conjuntos e 1 macacão.
5. **Condicional:** 3 passos numerados em itálico rosé
6. **A marca:** manifesto com palavras que acendem na rolagem + números (10+ anos, 17,7 mil, atendimento 1 a 1)
7. **Elas usam:** fotos reais de clientes + frase
8. **Showroom:** endereço, horário com status "aberto agora" e contato, em 3 colunas
9. **Rodapé:** lista de novidades pelo WhatsApp, links e logotipo gigante

**Lista de novidades e LGPD:** pede só o primeiro nome e abre o WhatsApp com a mensagem pronta. O site não armazena nenhum dado.

---

## 7. Tratamento das imagens

Sem mudanças em relação à proposta anterior: `tools/tratar-imagens.py` gera AVIF e WebP em `assets/img/web/`, com ajuste leve de contraste e temperatura. Os originais ficam intactos. As 12 fotos somam ~324 KB em AVIF.

---

## 8. Imagens que precisam de nova produção ou resolução maior

**Todas as 12 fotos estão em baixa resolução** (429 a 631 px de largura). O ideal é ter no mínimo 1200 px nos looks.

| Imagem | Tamanho atual | Prioridade | Recomendação |
|---|---|---|---|
| `fn-selo.png` (logo) | 246×294 | Resolvido | Recriado em vetor: `fn-selo.svg`. Se existir o arquivo original da marca (AI/PDF), vale conferir se a curva do escudo bate. |
| `look-01-frente`, `look-02-frente`, `look-07` (abertura) | ~450 px | **Alta** | Buscar os originais da sessão. São as fotos mais visíveis do site. |
| `look-03-frente`, `look-03-costas`, `look-04`, `look-06` | ~430–480 px, 14–20 KB | **Alta** | Compressão forte, com artefatos visíveis em fundos lisos |
| `look-01-costas`, `look-05`, `look-02-detalhe` | 467–631 px | Média | Buscar os originais |
| `elas-01`, `elas-02` | ~450 px | Baixa | Selfies de clientes; confirmar a autorização de uso de imagem |

**Produção nova sugerida:**
- Fotos de produto com fundo e luz padronizados (parede clara, como nos looks 03 e 04). Com isso, a grade da loja fica uniforme.
- Foto da fachada e do interior do showroom, para a seção 8
- Uma foto horizontal de campanha, se quiserem uma abertura em tela cheia no futuro

Quando chegarem os arquivos novos, coloque-os em `assets/img/` com o mesmo nome e rode `python tools/tratar-imagens.py`.
