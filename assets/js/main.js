/* Flavia Nascimento — interações da landing (sem dependências) */
(() => {
  'use strict';

  /* WhatsApp da loja: 55 + DDD + número, só dígitos */
  const WHATSAPP = '5534998674008';
  const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* Cada link [data-wa] abre a conversa já com a mensagem certa */
  document.querySelectorAll('[data-wa]').forEach((a) => { a.href = wa(a.dataset.wa); });

  /* ------------------------------------------------------------------
     Tema claro / escuro
     Escolha salva no navegador; sem escolha, segue o sistema.
     A troca abre um círculo a partir do botão (onde o navegador suporta).
     ------------------------------------------------------------------ */
  const temaBtns = document.querySelectorAll('[data-tema-toggle]');
  const metaCor = document.querySelector('meta[name="theme-color"]');
  const salvo = () => { try { return localStorage.getItem('fn-tema'); } catch (e) { return null; } };
  const pintaTema = (t) => {
    root.dataset.tema = t;
    const proximo = t === 'escuro' ? 'claro' : 'escuro';
    temaBtns.forEach((b) => b.setAttribute('aria-label', `Ativar tema ${proximo}`));
    document.querySelectorAll('[data-tema-rotulo]').forEach((s) => { s.textContent = `Tema ${proximo}`; });
    if (metaCor) metaCor.content = t === 'escuro' ? '#151112' : '#fdfaf8';
  };
  /* View Transition com garantia: se o navegador adiar a atualização
     (aba em segundo plano, por exemplo), aplica a mudança mesmo assim */
  const comTransicao = (fn) => {
    let feito = false;
    const vt = document.startViewTransition(() => { if (!feito) { feito = true; fn(); } });
    setTimeout(() => { if (!feito) { feito = true; vt.skipTransition?.(); fn(); } }, 400);
    return vt;
  };
  const trocaTema = (t, origem) => {
    try { localStorage.setItem('fn-tema', t); } catch (e) { /* sem armazenamento */ }
    if (reduce || !document.startViewTransition || !origem || document.visibilityState !== 'visible') { pintaTema(t); return; }
    const r = origem.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const raio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    comTransicao(() => pintaTema(t)).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  };
  pintaTema(root.dataset.tema === 'escuro' ? 'escuro' : 'claro');
  temaBtns.forEach((b) => b.addEventListener('click', () => trocaTema(root.dataset.tema === 'escuro' ? 'claro' : 'escuro', b)));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (m) => {
    if (!salvo()) pintaTema(m.matches ? 'escuro' : 'claro');
  });

  /* Menu mobile */
  const burger = document.querySelector('[data-burger]');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    if (!burger || !menu) return;
    const topoEl = document.querySelector('[data-topo]');
    if (open && topoEl) menu.style.setProperty('--menu-top', `${Math.max(0, topoEl.getBoundingClientRect().bottom)}px`);
    burger.setAttribute('aria-expanded', String(open));
    burger.querySelector('.sr').textContent = open ? 'Fechar menu' : 'Abrir menu';
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-aberto', open);
    if (open && matchMedia('(max-width: 899px)').matches) setTimeout(() => menu.querySelector('a')?.focus({ preventScroll: true }), 350);
  };
  /* no menu aberto, o Tab circula entre o botão e os itens do menu */
  menu?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || burger?.getAttribute('aria-expanded') !== 'true') return;
    const focaveis = [...menu.querySelectorAll('a, button')];
    const ultimo = focaveis[focaveis.length - 1];
    if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); burger.focus(); }
  });

  /* Faixa de avisos: troca a mensagem a cada 4,5 s (pausa com o mouse em cima) */
  const avisos = [...document.querySelectorAll('.aviso__lista li')];
  if (avisos.length > 1 && !reduce) {
    let i = 0, pausa = false;
    const faixa = document.querySelector('[data-aviso]');
    faixa?.addEventListener('mouseenter', () => { pausa = true; });
    faixa?.addEventListener('mouseleave', () => { pausa = false; });
    faixa?.addEventListener('focusin', () => { pausa = true; });
    faixa?.addEventListener('focusout', () => { pausa = false; });
    setInterval(() => {
      if (pausa || document.hidden) return;
      const atual = avisos[i];
      i = (i + 1) % avisos.length;
      atual.classList.remove('is-on'); atual.classList.add('is-saindo');
      avisos[i].classList.remove('is-saindo'); avisos[i].classList.add('is-on');
      setTimeout(() => atual.classList.remove('is-saindo'), 650);
    }, 4500);
  }
  burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  });
  matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

  /* ------------------------------------------------------------------
     Rolagem: topo fixo que só fica mais compacto, barra de progresso,
     botão flutuante e um parallax leve nas fotos da abertura
     ------------------------------------------------------------------ */
  const topo = document.querySelector('[data-topo]');
  const abertura = document.querySelector('.abertura');
  const float = document.querySelector('.wa-float');
  const barra = document.querySelector('[data-progresso]');
  const fotosAbertura = [...document.querySelectorAll('.destaque__foto img')];
  const parallax = !reduce && matchMedia('(min-width: 700px)').matches;
  const jardins = [...document.querySelectorAll('.jardim')];
  const aoRolar = () => {
    const y = scrollY;
    topo.classList.toggle('is-stuck', y > 8);
    float?.classList.toggle('is-on', y > (abertura?.offsetHeight || 600) * 0.7);
    if (barra) {
      const max = document.documentElement.scrollHeight - innerHeight;
      barra.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    /* flores do fundo: cada uma se move numa velocidade (--k), criando profundidade */
    if (!reduce) {
      jardins.forEach((j) => {
        const r = j.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) return;
        const meio = (innerHeight / 2) - (r.top + r.height / 2);
        j.querySelectorAll('.flor').forEach((f) => {
          f.style.setProperty('--py', `${(meio * parseFloat(f.style.getPropertyValue('--k') || 0)).toFixed(1)}px`);
        });
      });
    }
    if (parallax && abertura) {
      const r = abertura.getBoundingClientRect();
      if (r.bottom > 0) {
        fotosAbertura.forEach((img, i) => {
          const k = [0.06, 0.1, 0.04][i] || 0.06;
          img.style.translate = `0 ${Math.min(40, y * k).toFixed(1)}px`;
        });
      }
    }
  };
  if (parallax) fotosAbertura.forEach((img) => { img.style.scale = '1.08'; });
  addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* Navegação: marca a seção visível */
  const links = [...document.querySelectorAll('.nav ul a')];
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => {
        if (a.hash === `#${e.target.id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = document.querySelector(a.hash); if (s) navIO.observe(s); });

  /* ------------------------------------------------------------------
     Revelação na rolagem, com atraso em cascata para itens irmãos
     ------------------------------------------------------------------ */
  const contaNumeros = (el) => {
    el.querySelectorAll('[data-conta]').forEach((dd) => {
      const fim = parseFloat(dd.dataset.conta);
      const casas = parseInt(dd.dataset.casas || '0', 10);
      const sufixo = dd.dataset.sufixo || '';
      const fmt = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) + sufixo;
      if (reduce) { dd.textContent = fmt(fim); return; }
      const t0 = performance.now(), dur = 1400;
      const passo = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        dd.textContent = fmt(fim * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    });
  };
  if (!('IntersectionObserver' in window)) document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  const revealIO = new IntersectionObserver((entries) => {
    const entrando = entries.filter((e) => e.isIntersecting).map((e) => e.target);
    entrando.forEach((el, i) => {
      el.style.setProperty('--atraso', `${Math.min(i, 5) * 0.09}s`);
      el.classList.add('is-in');
      if (el.querySelector('[data-conta]')) contaNumeros(el);
      revealIO.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealIO.observe(el));
  /* Rede de segurança: depois de qualquer rolagem (e no carregamento),
     o que estiver na tela e ainda escondido é revelado. Nada fica invisível. */
  let checaFila = 0;
  const revelaVisiveis = () => {
    checaFila = 0;
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.95 && r.bottom > 0) { el.classList.add('is-in'); if (el.querySelector('[data-conta]')) contaNumeros(el); }
    });
  };
  addEventListener('scroll', () => { clearTimeout(checaFila); checaFila = setTimeout(revelaVisiveis, 180); }, { passive: true });
  addEventListener('load', () => setTimeout(revelaVisiveis, 1200));

  /* Manifesto: as palavras acendem conforme a leitura avança */
  document.querySelectorAll('[data-palavras]').forEach((frase) => {
    const walker = document.createTreeWalker(frase, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(part); return; }
        const w = document.createElement('span');
        w.className = 'w'; w.textContent = part; frag.append(w);
      });
      node.replaceWith(frag);
    });
    const words = frase.querySelectorAll('.w');
    if (reduce) { words.forEach((w) => w.classList.add('is-on')); return; }
    let queued = false;
    const paint = () => {
      queued = false;
      const r = frase.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.8 - r.top) / (r.height + innerHeight * 0.25)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-on', i < n));
    };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(paint); } }, { passive: true });
    addEventListener('resize', paint);
    paint();
  });

  /* Looks com dois ângulos: toque/clique alterna a foto */
  document.querySelectorAll('button.produto__foto').forEach((b) => {
    b.addEventListener('click', () => {
      const on = b.classList.toggle('is-alt');
      b.setAttribute('aria-pressed', String(on));
    });
  });

  /* Coleção: filtros por tipo de peça; a grade desliza para a nova ordem */
  const filtros = document.querySelectorAll('[data-filtro]');
  const produtos = [...document.querySelectorAll('.produto[data-cat]')];
  const nota = document.querySelector('.produto--nota');
  const contagem = document.querySelector('[data-contagem]');
  /* nomes de transição só durante o filtro, para não interferir na troca de tema */
  const nomeia = (on) => {
    produtos.forEach((p, i) => { p.style.viewTransitionName = on ? `produto-${i}` : ''; });
    if (nota) nota.style.viewTransitionName = on ? 'produto-nota' : '';
  };
  const aplicaFiltro = (cat) => {
    let n = 0;
    produtos.forEach((p) => {
      const mostra = cat === 'todos' || p.dataset.cat === cat;
      p.hidden = !mostra;
      if (mostra) { n++; p.classList.add('is-in'); }
    });
    if (contagem) contagem.textContent = String(n);
  };
  filtros.forEach((f) => f.addEventListener('click', () => {
    filtros.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
    if (reduce || !document.startViewTransition) { aplicaFiltro(f.dataset.filtro); return; }
    nomeia(true);
    comTransicao(() => aplicaFiltro(f.dataset.filtro)).finished.finally(() => nomeia(false));
  }));

  /* Lista de novidades: abre o WhatsApp com o nome. Nada é guardado no site. */
  const lista = document.querySelector('[data-lista]');
  lista?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = lista.querySelector('input');
    const erro = lista.querySelector('.lista__erro');
    const nome = input.value.trim().replace(/\s+/g, ' ');
    if (!nome) {
      erro.hidden = false; input.setAttribute('aria-invalid', 'true'); input.focus();
      return;
    }
    erro.hidden = true; input.removeAttribute('aria-invalid');
    window.open(wa(`Olá! Sou ${nome} e quero entrar na lista de novidades da Flavia Nascimento.`), '_blank', 'noopener');
  });

  /* Guia de layout: tecla G (fora de campos de texto) ou ?guia na URL.
     Mostra o container de 1280 px, as margens e as colunas (4 / 8 / 12). */
  const guia = document.createElement('div');
  guia.className = 'guia'; guia.setAttribute('aria-hidden', 'true');
  guia.innerHTML = `<div class="guia__in">${'<i></i>'.repeat(12)}</div><span class="guia__info"></span>`;
  document.body.append(guia);
  const infoGuia = () => {
    const cs = getComputedStyle(root);
    const cols = cs.getPropertyValue('--cols').trim();
    const gap = parseFloat(cs.getPropertyValue('--gap')) * 16;
    const larg = Math.min(innerWidth - 2 * parseFloat(cs.getPropertyValue('--gutter')) * 16, 1280);
    guia.querySelector('.guia__info').textContent = `${cols} colunas · container ${Math.round(larg)} px · gap ${gap} px · tecla G fecha`;
  };
  const alternaGuia = (on) => { guia.classList.toggle('is-on', on); if (on) infoGuia(); };
  if (new URLSearchParams(location.search).has('guia')) alternaGuia(true);
  addEventListener('resize', () => { if (guia.classList.contains('is-on')) infoGuia(); });
  addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() !== 'g' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    alternaGuia(!guia.classList.contains('is-on'));
  });

  /* Aberto agora? Seg–sex 9h–18h, sáb 9h–13h (horário de Brasília) */
  const HOURS = { 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 13] };
  const DAYS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const updateStatus = () => {
    let parts;
    try {
      parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    } catch (err) { return; }
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    const now = parseInt(get('hour'), 10) + parseInt(get('minute'), 10) / 60;
    const today = HOURS[day];
    let open = false, text;
    if (today && now >= today[0] && now < today[1]) {
      open = true; text = `Aberto agora · fecha às ${today[1]}h`;
    } else if (today && now < today[0]) {
      text = `Fechado agora · abre hoje às ${today[0]}h`;
    } else {
      let d = day, n = 0;
      do { d = (d + 1) % 7; n++; } while (!HOURS[d]);
      text = `Fechado agora · abre ${n === 1 ? 'amanhã' : DAYS[d]} às ${HOURS[d][0]}h`;
    }
    document.querySelectorAll('[data-status]').forEach((el) => { el.textContent = text; el.classList.toggle('is-open', open); });
  };
  updateStatus();
  setInterval(updateStatus, 60000);
})();
