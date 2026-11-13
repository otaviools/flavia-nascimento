/* Flavia Nascimento — interações da landing (sem dependências) */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIGURAÇÃO
     Preencha o WhatsApp da loja só com números (55 + DDD + número),
     ex.: '5534999999999'. Com o número, cada botão abre a conversa já
     com a mensagem do look. Vazio, os botões usam o link da bio.
     ------------------------------------------------------------------ */
  const WHATSAPP = '5534998674008';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* WhatsApp com mensagem pronta */
  if (WHATSAPP) {
    document.querySelectorAll('[data-wa]').forEach((a) => {
      a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(a.dataset.wa)}`;
    });
  }

  /* Botão flutuante: balão de convite aparece depois de alguns segundos */
  const bolha = document.querySelector('.wa-float__bolha');
  const badge = document.querySelector('.wa-float__badge');
  const fechada = () => { try { return sessionStorage.getItem('fn-wa-bolha') === '1'; } catch (err) { return false; } };
  const fechar = () => {
    if (bolha) bolha.hidden = true;
    if (badge) badge.remove();
    try { sessionStorage.setItem('fn-wa-bolha', '1'); } catch (err) { /* sem armazenamento */ }
  };
  if (bolha && !fechada()) {
    setTimeout(() => { if (!fechada()) bolha.hidden = false; }, 6000);
    bolha.querySelector('.wa-float__x').addEventListener('click', fechar);
  } else if (badge) badge.remove();
  document.querySelector('.wa-float__btn')?.addEventListener('click', fechar);

  /* Manifesto: as palavras acendem conforme a leitura avança na rolagem */
  document.querySelectorAll('[data-palavras]').forEach((frase) => {
    const walker = document.createTreeWalker(frase, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(part);
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
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-on', i < n));
    };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(paint); } }, { passive: true });
    addEventListener('resize', paint);
    paint();
  });

  /* Flores grandes: profundidade na rolagem (cada flor tem a sua velocidade em --k) */
  if (!reduce) {
    const jardins = [...document.querySelectorAll('.jardim')];
    let jq = false;
    const mexe = () => {
      jq = false;
      jardins.forEach((j) => {
        const r = j.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        j.style.setProperty('--py', ((innerHeight / 2 - (r.top + r.height / 2)) * -1).toFixed(1) + 'px');
      });
    };
    addEventListener('scroll', () => { if (!jq) { jq = true; requestAnimationFrame(mexe); } }, { passive: true });
    mexe();
  }

  /* Cards: leve inclinação 3D e brilho que segue o cursor */
  if (fine && !reduce) {
    document.querySelectorAll('.look').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.classList.add('is-tilt');
        card.style.setProperty('--ry', ((px - 0.5) * 6).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 5).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-tilt');
        card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* Capítulos: o tom da página acompanha a seção que cruza o meio da tela */
  const tones = document.querySelectorAll('[data-tone]:not(body)');
  const toneIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) document.body.dataset.tone = e.target.dataset.tone; });
  }, { rootMargin: '-50% 0px -50% 0px' });
  tones.forEach((s) => toneIO.observe(s));

  /* Revelações na rolagem */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      (watched.get(e.target) || [e.target]).forEach((el) => el.classList.add('is-in'));
      revealIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  /* Fotos com máscara começam totalmente recortadas, então quem é observado é o elemento pai */
  const watched = new Map();
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el.dataset.reveal !== 'mask') return revealIO.observe(el);
    const host = el.parentElement;
    if (!watched.has(host)) { watched.set(host, []); revealIO.observe(host); }
    watched.get(host).push(el);
  });

  /* Topo com fundo ao rolar */
  const top = document.querySelector('.top');
  const stick = () => top.classList.toggle('is-stuck', scrollY > 24);
  addEventListener('scroll', stick, { passive: true });
  stick();

  /* Looks com dois ângulos: toque/clique alterna a foto */
  document.querySelectorAll('button.look__media').forEach((b) => {
    b.addEventListener('click', () => {
      const on = b.classList.toggle('is-alt');
      b.setAttribute('aria-pressed', String(on));
    });
  });

  /* Cursor contextual */
  const cursor = document.querySelector('.cursor');
  if (fine && !reduce && cursor) {
    let x = -200, y = -200, tx = x, ty = y, s = 0, ts = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2; s += (ts - s) * 0.18;
      cursor.style.setProperty('--x', x.toFixed(1) + 'px');
      cursor.style.setProperty('--y', y.toFixed(1) + 'px');
      cursor.style.setProperty('--s', s.toFixed(3));
      raf = (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(ts - s) > 0.02) ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      ts = e.target.closest && e.target.closest('[data-cursor]') ? 1 : 0;
      kick();
    }, { passive: true });
    addEventListener('scroll', () => { ts = 0; kick(); }, { passive: true });
  }

  /* Parallax leve na foto de abertura */
  const par = document.querySelector('[data-parallax]');
  if (par && !reduce && fine && innerWidth > 900) {
    const k = parseFloat(par.dataset.parallax);
    let queued = false;
    addEventListener('scroll', () => {
      if (queued || scrollY > innerHeight * 1.2) return;
      queued = true;
      requestAnimationFrame(() => { par.style.transform = `translate3d(0, ${(scrollY * k).toFixed(1)}px, 0)`; queued = false; });
    }, { passive: true });
  }

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
