/* Flavia Nascimento — interações da landing (sem dependências) */
(() => {
  'use strict';

  /* WhatsApp da loja: 55 + DDD + número, só dígitos */
  const WHATSAPP = '5534998674008';
  const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cada link [data-wa] abre a conversa já com a mensagem certa */
  document.querySelectorAll('[data-wa]').forEach((a) => { a.href = wa(a.dataset.wa); });

  /* Menu mobile */
  const burger = document.querySelector('[data-burger]');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.querySelector('.sr').textContent = open ? 'Fechar menu' : 'Abrir menu';
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-aberto', open);
  };
  burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  });
  matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

  /* Topo com linha ao rolar + botão flutuante depois da abertura */
  const top = document.querySelector('[data-top]');
  const hero = document.querySelector('.hero');
  const float = document.querySelector('.wa-float');
  const onScroll = () => {
    top.classList.toggle('is-stuck', scrollY > 8);
    float?.classList.toggle('is-on', scrollY > (hero?.offsetHeight || 600) * 0.8);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  /* Revelação na rolagem */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      revealIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealIO.observe(el));

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
  document.querySelectorAll('button.look__foto').forEach((b) => {
    b.addEventListener('click', () => {
      const on = b.classList.toggle('is-alt');
      b.setAttribute('aria-pressed', String(on));
    });
  });

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
