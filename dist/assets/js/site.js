/* ArKángel — interacciones del sitio (JS vanilla, sin dependencias). Cada módulo es independiente y tolerante a fallos. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover)');
  const ICON = (id) => `<svg class="i" aria-hidden="true" focusable="false"><use href="#i-${id}"/></svg>`;
  const raf = (fn) => requestAnimationFrame(fn);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* Medición opcional: se activa solo si el sitio añade luego un píxel/analítica con consentimiento. */
  const track = (name, data = {}) => {
    try { window.fbq && window.fbq('trackCustom', name, data); window.gtag && window.gtag('event', name, data); } catch {}
  };
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-track]');
    if (t) track(t.dataset.track, { page: location.pathname });
  });

  /* ───────── Cabecera, progreso y indicador del menú ───────── */
  function header() {
    const h = $('[data-header]'); if (!h) return;
    const bar = $('.progress span');
    let ticking = false;
    const update = () => {
      const y = scrollY;
      h.classList.toggle('is-scrolled', y > 24);
      if (bar) {
        const max = root.scrollHeight - innerHeight;
        bar.parentElement.style.setProperty('--p', max > 0 ? clamp(y / max, 0, 1) : 0);
        bar.style.setProperty('--p', max > 0 ? clamp(y / max, 0, 1) : 0);
      }
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(update); } }, { passive: true });
    update();

    const nav = $('.nav'); if (!nav) return;
    const ind = $('.nav__ind', nav);
    const links = $$('a', nav);
    const place = (a) => {
      if (!a) { ind.style.setProperty('--o', 0); return; }
      const nr = nav.getBoundingClientRect(), r = a.getBoundingClientRect();
      ind.style.setProperty('--x', `${r.left - nr.left}px`);
      ind.style.setProperty('--w', `${r.width}px`);
      ind.style.setProperty('--o', 1);
    };
    const current = () => links.find((a) => a.getAttribute('aria-current') === 'page');
    links.forEach((a) => {
      a.addEventListener('mouseenter', () => place(a));
      a.addEventListener('focus', () => place(a));
    });
    nav.addEventListener('mouseleave', () => place(current()));
    nav.addEventListener('focusout', () => place(current()));
    const init = () => place(current());
    init(); addEventListener('resize', init);
    document.fonts && document.fonts.ready.then(init);
  }

  /* ───────── Menú móvil ───────── */
  function menu() {
    const btn = $('.burger'), m = $('#menu'); if (!btn || !m) return;
    const set = (open) => {
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      m.classList.toggle('is-open', open);
      m.setAttribute('aria-hidden', !open);
      m.inert = !open;
      root.classList.toggle('is-locked', open);
      root.classList.toggle('menu-open', open);
      if (open) $('a', m).focus({ preventScroll: true });
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    m.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && m.classList.contains('is-open')) { set(false); btn.focus(); } });
    matchMedia('(min-width:1120px)').addEventListener('change', (e) => e.matches && set(false));
  }

  /* ───────── Aparición al hacer scroll ───────── */
  function reveal() {
    const els = $$('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    // Los elementos con máscara (clip-path) nunca “intersectan” desde el punto de vista del observador:
    // se observa su contenedor y se revela la máscara cuando este entra en pantalla.
    const targets = new Map();
    const watch = (el) => {
      const t = el.dataset.reveal === 'mask' ? el.parentElement : el;
      (targets.get(t) || targets.set(t, []).get(t)).push(el);
      return t;
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        (targets.get(en.target) || []).forEach((e) => e.classList.add('is-in'));
        io.unobserve(en.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(watch(e)));
    setTimeout(() => els.forEach((e) => { const r = (e.dataset.reveal === 'mask' ? e.parentElement : e).getBoundingClientRect(); if (r.top < innerHeight * 0.9 && r.bottom > 0) e.classList.add('is-in'); }), 2000);
  }

  /* ───────── Parallax sutil (solo transform, un único rAF) ───────── */
  function parallax() {
    if (reduce.matches) return;
    const items = $$('[data-parallax]').map((el) => ({ el, wrap: el.closest('[data-parallax-wrap]') || el.parentElement, k: parseFloat(el.dataset.parallax) || 0.05 }));
    if (!items.length) return;
    let ticking = false;
    const run = () => {
      const vh = innerHeight;
      for (const it of items) {
        const r = it.wrap.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const off = r.top + r.height / 2 - vh / 2;
        const max = r.height * 0.065;
        it.el.style.setProperty('--py', `${clamp(-off * it.k, -max, max).toFixed(1)}px`);
      }
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(run); } }, { passive: true });
    addEventListener('resize', run);
    run();
  }

  /* ───────── Pestañas + carruseles ───────── */
  function carousels() {
    $$('[data-carousel]').forEach((c) => {
      const track = $('.carousel__track', c), prev = $('[data-prev]', c), next = $('[data-next]', c), bar = $('.carousel__bar span', c);
      const step = () => { const card = track.firstElementChild; return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 18) : 300; };
      const upd = () => {
        const max = track.scrollWidth - track.clientWidth;
        c.toggleAttribute('data-fit', max < 8);
        if (max < 8) return;
        const ratio = track.clientWidth / track.scrollWidth;
        const bw = clamp(ratio * 100, 12, 100);
        const sp = clamp(track.scrollLeft / max, 0, 1);
        bar.style.setProperty('--bw', `${bw}%`);
        bar.style.setProperty('--bx', `${sp * (100 / bw * 100 - 100)}%`);
        prev.disabled = track.scrollLeft < 8;
        next.disabled = track.scrollLeft > max - 8;
      };
      prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduce.matches ? 'auto' : 'smooth' }));
      next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduce.matches ? 'auto' : 'smooth' }));
      track.addEventListener('scroll', () => raf(upd), { passive: true });
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
      });
      addEventListener('resize', upd);
      c._upd = upd; upd();
    });
  }
  function tabs() {
    const list = $('[role=tablist]'); if (!list) return;
    const tabsEl = $$('[role=tab]', list);
    const show = (t, focus) => {
      tabsEl.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; const p = document.getElementById(x.getAttribute('aria-controls')); if (p) p.hidden = !on; });
      const p = document.getElementById(t.getAttribute('aria-controls'));
      const c = p && $('[data-carousel]', p); if (c && c._upd) raf(c._upd);
      if (focus) t.focus();
    };
    tabsEl.forEach((t, i) => {
      t.addEventListener('click', () => show(t));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return;
        e.preventDefault(); show(tabsEl[(i + k + tabsEl.length) % tabsEl.length], true);
      });
    });
  }

  /* ───────── Comparador antes/después ───────── */
  function initCompare(fig) {
    const range = $('.cmp__range', fig); if (!range || fig._init) return; fig._init = true;
    const set = (v) => fig.style.setProperty('--pos', `${v}%`);
    range.addEventListener('input', () => set(range.value));
    // Pista inicial: un pequeño vaivén cuando entra en pantalla (solo si se permite movimiento)
    if (!reduce.matches && 'IntersectionObserver' in window && !fig.closest('.lb')) {
      const io = new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) return; io.disconnect();
        const t0 = performance.now(), dur = 1500;
        const tick = (t) => {
          const p = clamp((t - t0) / dur, 0, 1);
          if (Number(range.value) !== 50 && p < 1 && fig._touched) return;
          const v = 50 + Math.sin(p * Math.PI * 2) * 14 * (1 - p);
          set(v); range.value = v;
          if (p < 1) raf(tick); else { set(50); range.value = 50; }
        };
        raf(tick);
      }, { threshold: 0.6 });
      io.observe(fig);
      range.addEventListener('pointerdown', () => { fig._touched = true; }, { once: true });
    }
  }
  const compares = () => $$('[data-compare]').forEach(initCompare);

  /* Casos (inicio): selector de pares */
  function cases() {
    const list = $('[data-case-list]'); if (!list) return;
    const btns = $$('[data-case-btn]', list);
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((x) => x.setAttribute('aria-pressed', x === b));
      $$('.case').forEach((c) => { c.hidden = c.dataset.case !== b.dataset.caseBtn; });
    }));
  }

  /* Filtros de galería (resultados) */
  function filters() {
    const wrap = $('[data-filters]'); if (!wrap) return;
    const region = $('[data-filter-region]');
    const chips = $$('[data-filter]', wrap);
    const apply = (cat) => {
      chips.forEach((c) => c.setAttribute('aria-pressed', c.dataset.filter === cat));
      let shown = 0;
      $$('[data-cat]', region).forEach((el) => {
        const ok = cat === 'todos' || el.dataset.cat === cat || (cat === 'cejas' && el.dataset.cat === 'cejas');
        el.classList.toggle('is-filtered-out', !ok); if (ok) shown++;
      });
      const hasCmp = $$('.cmp-item', region).some((e) => !e.classList.contains('is-filtered-out'));
      const hasWorks = $$('.work', region).some((e) => !e.classList.contains('is-filtered-out'));
      $('[data-gal-h=cmp]', region).hidden = !hasCmp;
      $('[data-gal-h=works]', region).hidden = !hasWorks;
      $$('[data-gallery]', region).forEach((g) => { g.hidden = !$$('[data-cat]', g).some((e) => !e.classList.contains('is-filtered-out')); });
      $('[data-empty]', region).hidden = shown > 0;
      history.replaceState(null, '', cat === 'todos' ? location.pathname : `#${cat}`);
    };
    chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter)));
    const h = location.hash.slice(1); if (chips.some((c) => c.dataset.filter === h)) apply(h);
  }

  /* ───────── Lightbox ───────── */
  function lightbox() {
    const triggers = $$('[data-lightbox], [data-lightbox-compare]');
    if (!triggers.length) return;
    const dlg = document.createElement('dialog');
    dlg.className = 'lb'; dlg.setAttribute('aria-label', 'Galería ampliada');
    dlg.innerHTML = `<div class="lb__top"><span class="lb__count" aria-live="polite"></span><button class="lb__x" type="button" aria-label="Cerrar">${ICON('close')}</button></div>
      <div class="lb__stage"><button class="lb__nav lb__nav--p" type="button" aria-label="Anterior">${ICON('chev-l')}</button><div class="lb__fig"></div><button class="lb__nav lb__nav--n" type="button" aria-label="Siguiente">${ICON('chev-r')}</button></div>
      <p class="lb__cap"></p>`;
    document.body.appendChild(dlg);
    const fig = $('.lb__fig', dlg), cap = $('.lb__cap', dlg), count = $('.lb__count', dlg);
    let items = [], idx = 0, opener = null;

    const describe = (el) => el.matches('[data-lightbox]')
      ? { kind: 'img', src: el.dataset.src, alt: el.dataset.alt, cap: el.dataset.cap, el }
      : { kind: 'cmp', el, before: el.dataset.lbBefore, after: el.dataset.lbAfter, ratio: el.dataset.lbRatio, pos: el.dataset.lbPos, alt: el.dataset.lbAlt, cap: el.dataset.lbCap };
    const groupOf = (el) => {
      const g = el.closest('[data-gallery]');
      const src = g ? $$('[data-lightbox], [data-lightbox-compare]', g) : [el];
      return src.filter((x) => !x.closest('.is-filtered-out')).map((x) => x.matches('[data-lightbox-compare]') ? x.closest('.cmp') : x);
    };
    const render = () => {
      const it = items[idx];
      fig.innerHTML = '';
      if (it.kind === 'img') {
        const im = new Image(); im.src = it.src; im.alt = it.alt || ''; im.decoding = 'async'; fig.appendChild(im);
      } else {
        const [w, h] = it.ratio.split('/').map(Number);
        fig.innerHTML = `<figure class="cmp" data-compare style="--pos:50%;--ratio:${it.ratio};--rn:${(w / h).toFixed(3)}"><div class="cmp__stage">
          <img src="${it.after}" alt="Después — ${it.alt}" style="object-position:${it.pos}">
          <div class="cmp__before"><img src="${it.before}" alt="Antes — ${it.alt}" style="object-position:${it.pos}"></div>
          <span class="cmp__tag cmp__tag--b">Antes</span><span class="cmp__tag cmp__tag--a">Después</span>
          <span class="cmp__line" aria-hidden="true"><span class="cmp__knob">${ICON('drag')}</span></span>
          <input class="cmp__range" type="range" min="0" max="100" value="50" step="0.5" aria-label="Deslizar para comparar antes y después"></div></figure>`;
        initCompare($('.cmp', fig));
      }
      cap.textContent = it.cap || '';
      count.textContent = items.length > 1 ? `${idx + 1} / ${items.length}` : '';
      $('.lb__nav--p', dlg).hidden = $('.lb__nav--n', dlg).hidden = items.length < 2;
    };
    const go = (d) => { idx = (idx + d + items.length) % items.length; render(); };
    const open = (el) => {
      opener = el;
      const target = el.matches('[data-lightbox-compare]') ? el.closest('.cmp') : el;
      items = groupOf(target).map(describe);
      idx = Math.max(0, items.findIndex((i) => i.el === target));
      render();
      dlg.showModal(); root.classList.add('is-locked');
      raf(() => dlg.classList.add('is-open'));
    };
    const close = () => {
      dlg.classList.remove('is-open');
      setTimeout(() => { dlg.close(); root.classList.remove('is-locked'); opener && opener.focus({ preventScroll: true }); }, reduce.matches ? 0 : 380);
    };
    triggers.forEach((t) => t.addEventListener('click', () => open(t)));
    $('.lb__x', dlg).addEventListener('click', close);
    $('.lb__nav--p', dlg).addEventListener('click', () => go(-1));
    $('.lb__nav--n', dlg).addEventListener('click', () => go(1));
    dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lb__stage')) close(); });
    dlg.addEventListener('keydown', (e) => {
      if (e.target.matches('input[type=range]')) return;
      if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1);
    });
    // deslizar con el dedo (solo imágenes)
    let sx = null;
    fig.addEventListener('pointerdown', (e) => { if (items[idx] && items[idx].kind === 'img') sx = e.clientX; });
    fig.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1); });
  }

  /* ───────── Testimonios ───────── */
  function testimonials() {
    const c = $('[data-testimonials]'); if (!c) return;
    const items = $$('.testi__item', c), cur = $('[data-cur]', c);
    let i = 0, timer;
    const show = (n) => {
      i = (n + items.length) % items.length;
      items.forEach((it, k) => { it.toggleAttribute('data-active', k === i); it.setAttribute('aria-hidden', k !== i); });
      cur.textContent = i + 1;
    };
    const reset = () => { clearInterval(timer); if (!reduce.matches && items.length > 1) timer = setInterval(() => show(i + 1), 9000); };
    $('[data-prev]', c).addEventListener('click', () => { show(i - 1); reset(); });
    $('[data-next]', c).addEventListener('click', () => { show(i + 1); reset(); });
    c.addEventListener('pointerenter', () => clearInterval(timer));
    c.addEventListener('pointerleave', reset);
    reset();
  }

  /* ───────── Mapa bajo demanda (evita cargar Google hasta que el usuario lo pida) ───────── */
  function maps() {
    $$('[data-map]').forEach((m) => {
      const b = $('.map__load', m);
      b.addEventListener('click', () => {
        const f = document.createElement('iframe');
        f.src = m.dataset.src; f.title = 'Mapa de ubicación de ArKángel en Medellín'; f.loading = 'lazy';
        f.referrerPolicy = 'no-referrer-when-downgrade'; f.setAttribute('allowfullscreen', '');
        m.replaceChildren(f);
      });
    });
  }

  /* ───────── Formularios: validación + envío por WhatsApp (o endpoint opcional) ───────── */
  function forms() {
    const num = ((($('a[data-wa-float]') || {}).href || '').match(/wa\.me\/(\d+)/) || [])[1] || '';
    $$('[data-form]').forEach((form) => {
      const status = $('[data-status]', form);
      const err = (name, msg) => {
        const p = $(`[data-err="${name}"]`, form); if (p) p.textContent = msg || '';
        const f = form.elements[name]; const box = f && f.closest('.field'); if (box) box.classList.toggle('is-invalid', !!msg);
        if (f) f.setAttribute('aria-invalid', !!msg);
      };
      const rules = {
        nombre: (v) => (v.trim().length < 2 ? 'Escribe tu nombre.' : ''),
        telefono: (v) => (v.replace(/\D/g, '').length < 7 || !/^[0-9+()\-\s]{7,20}$/.test(v) ? 'Escribe un teléfono válido (solo números).' : ''),
        email: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Revisa tu correo electrónico.' : ''),
        interes: (v) => (!v ? 'Selecciona una opción.' : ''),
        acepto: () => (form.elements.acepto.checked ? '' : 'Debes aceptar la política de privacidad.'),
      };
      const check = (n) => { const m = rules[n](form.elements[n].value || ''); err(n, m); return !m; };
      Object.keys(rules).forEach((n) => {
        const el = form.elements[n];
        el.addEventListener('blur', () => { if (el.value || el.checked || el.dataset.touched) check(n); });
        el.addEventListener('input', () => { el.dataset.touched = 1; if (el.closest('.field.is-invalid')) check(n); });
        el.addEventListener('change', () => check(n));
      });
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bad = Object.keys(rules).filter((n) => !check(n));
        if (bad.length) { status.textContent = 'Revisa los campos marcados.'; form.elements[bad[0]].focus(); return; }
        if (form.elements.empresa.value) { status.textContent = 'Gracias.'; return; } // honeypot
        const d = Object.fromEntries(new FormData(form));
        const isAp = form.dataset.kind === 'formacion';
        const lines = [
          isAp ? 'Hola Art Pigmenta, quiero separar mi cupo.' : 'Hola ArKángel, quiero agendar una valoración.',
          `Nombre: ${d.nombre.trim()}`, `${isAp ? 'Programa' : 'Interés'}: ${d.interes}`,
          d.mensaje && d.mensaje.trim() ? `Mensaje: ${d.mensaje.trim()}` : '', `Teléfono: ${d.telefono.trim()}`, d.email ? `Correo: ${d.email.trim()}` : '',
        ].filter(Boolean).join('\n');
        const wa = `https://wa.me/${num}?text=${encodeURIComponent(lines)}`;
        const btn = $('.form__submit', form); btn.disabled = true; setTimeout(() => { btn.disabled = false; }, 4000);
        const endpoint = form.dataset.endpoint;
        if (endpoint) {
          try {
            const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, empresa: undefined, pagina: location.pathname }) });
            if (r.ok) { track('lead', { kind: form.dataset.kind }); location.href = '/gracias/'; return; }
          } catch {}
        }
        track('lead', { kind: form.dataset.kind });
        const w = window.open(wa, '_blank', 'noopener');
        status.innerHTML = w ? 'Abrimos WhatsApp con tu mensaje listo para enviar. ✨' : `Continúa en WhatsApp: <a href="${wa}" target="_blank" rel="noopener">enviar mi mensaje</a>.`;
        form.reset(); $$('.field', form).forEach((f) => f.classList.remove('is-invalid'));
      });
    });
  }

  /* ───────── Indicadores de sección (inicio, escritorio) ───────── */
  function dots() {
    const secs = $$('[data-section]'); if (secs.length < 4 || !('IntersectionObserver' in window)) return;
    const nav = document.createElement('nav'); nav.className = 'dots'; nav.setAttribute('aria-label', 'Secciones de la página');
    nav.innerHTML = secs.map((s) => `<a href="#${s.id}" aria-label="${s.dataset.section}"><span>${s.dataset.section}</span></a>`).join('');
    document.body.appendChild(nav);
    const links = $$('a', nav);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const k = secs.indexOf(en.target);
        links.forEach((a, j) => a.setAttribute('aria-current', j === k));
        nav.classList.toggle('on-dark', en.target.dataset.theme === 'dark');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => io.observe(s));
  }

  const boot = () => {
    [header, menu, reveal, parallax, carousels, tabs, compares, cases, filters, lightbox, testimonials, maps, forms, dots].forEach((fn) => { try { fn(); } catch (e) { console.error(fn.name, e); } });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
