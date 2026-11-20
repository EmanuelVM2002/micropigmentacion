// Componentes reutilizables: cada función devuelve una cadena HTML.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, NAV, waLink, MAP_EMBED, MAP_DIRECTIONS } from './config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMG_DIR = path.join(ROOT, 'assets', 'img');

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ───────── Imágenes: manifiesto de anchos disponibles + dimensiones reales ───────── */
function webpSize(file) {
  const b = fs.readFileSync(file);
  const t = b.toString('ascii', 12, 16);
  if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (t === 'VP8L') {
    const v = b.readUInt32LE(21);
    return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)];
  }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]; // VP8
}
const manifest = {};
for (const f of fs.readdirSync(IMG_DIR)) {
  const m = f.match(/^(.+)-(\d+)\.webp$/);
  if (!m) continue;
  (manifest[m[1]] ||= []).push({ w: +m[2], file: f });
}
for (const k of Object.keys(manifest)) manifest[k].sort((a, b) => a.w - b.w);

const [EMB_W, EMB_H] = webpSize(path.join(IMG_DIR, 'logo-emblem.webp'));

export const imgUrl = (name, w) => {
  const list = manifest[name];
  if (!list) throw new Error(`Imagen no encontrada: ${name}`);
  const v = w ? list.find((x) => x.w >= w) || list[list.length - 1] : list[list.length - 1];
  return `/assets/img/${v.file}`;
};

export function img(name, alt, o = {}) {
  const list = manifest[name];
  if (!list) throw new Error(`Imagen no encontrada: ${name}`);
  const max = o.max ? list.filter((x) => x.w <= o.max) : list;
  const use = max.length ? max : [list[0]];
  const big = use[use.length - 1];
  const [w, h] = webpSize(path.join(IMG_DIR, big.file));
  const srcset = use.map((x) => `/assets/img/${x.file} ${x.w}w`).join(', ');
  const attrs = [
    `src="/assets/img/${big.file}"`,
    use.length > 1 ? `srcset="${srcset}"` : '',
    use.length > 1 ? `sizes="${o.sizes || '100vw'}"` : '',
    `alt="${esc(alt)}"`,
    `width="${w}" height="${h}"`,
    o.eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"',
    o.cls ? `class="${o.cls}"` : '',
    o.style ? `style="${o.style}"` : '',
    o.attrs || '',
  ];
  return `<img ${attrs.filter(Boolean).join(' ')}>`;
}

/* ───────── Iconos (sprite SVG) ───────── */
export const SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" hidden aria-hidden="true" style="display:none">
<symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M4 12h15M13 6l6 6-6 6"/></symbol>
<symbol id="i-chev-l" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></symbol>
<symbol id="i-chev-r" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M5 5l14 14M19 5L5 19"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M6.6 3.5h3l1.4 4-2 1.3a11 11 0 005.2 5.2l1.3-2 4 1.4v3a2 2 0 01-2.2 2A16 16 0 014.6 5.7a2 2 0 012-2.2z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M3.5 6h17v12h-17zM3.5 7l8.5 6.5L20.5 7"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0113 0c0 5.3-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.4"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></symbol>
<symbol id="i-fb" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M14 8.5h2.5V5H14a3.5 3.5 0 00-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V8.8c0-.2.1-.3.3-.3z"/></symbol>
<symbol id="i-expand" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></symbol>
<symbol id="i-drag" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></symbol>
<symbol id="i-spark" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M12 3l7 2.5v6c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5v-6z"/><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M8.8 12l2.2 2.2 4.2-4.4"/></symbol>
</svg>`;
export const icon = (id, cls = '') => `<svg class="i ${cls}" aria-hidden="true" focusable="false"><use href="#i-${id}"/></svg>`;

/* ───────── Piezas básicas ───────── */
export const btn = ({ href, label, variant = 'gold', icon: ic = 'arrow', external = false, cls = '', attrs = '' }) =>
  `<a class="btn btn--${variant} ${cls}" href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''} ${attrs}><span class="btn__label">${label}</span>${ic ? icon(ic, 'btn__ico') : ''}</a>`;

export const waBtn = (msg, label = 'Escríbenos por WhatsApp', variant = 'gold', cls = '') =>
  btn({ href: waLink(msg), label, variant, icon: 'wa', external: true, cls, attrs: `data-wa data-track="whatsapp"` });

export const eyebrow = (t, light = false) => `<p class="eyebrow${light ? ' eyebrow--light' : ''}"><span class="eyebrow__line"></span>${t}</p>`;

export const sectionHead = ({ eyebrow: e, title, lead, align = 'left', light = false, id = '' }) => `
<header class="sec-head sec-head--${align}${light ? ' is-light' : ''}">
  ${e ? `<div data-reveal>${eyebrow(e, light)}</div>` : ''}
  <h2 class="h2" ${id ? `id="${id}"` : ''} data-reveal style="--d:.08s">${title}</h2>
  ${lead ? `<p class="lead" data-reveal style="--d:.16s">${lead}</p>` : ''}
</header>`;

export const faq = (items, { light = false } = {}) => `
<div class="faq${light ? ' faq--light' : ''}">
${items.map((q, i) => `
  <details class="faq__item" data-reveal style="--d:${(i % 4) * 0.05}s">
    <summary><span>${q.q}</span><span class="faq__plus" aria-hidden="true"></span></summary>
    <div class="faq__a"><p>${q.a}</p></div>
  </details>`).join('')}
</div>`;

export const faqLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((q) => ({
    '@type': 'Question',
    name: q.q.replace(/<[^>]+>/g, ''),
    acceptedAnswer: { '@type': 'Answer', text: q.a.replace(/<[^>]+>/g, '') },
  })),
});

/* ───────── Tarjeta de servicio ───────── */
export function serviceCard(s) {
  const msg = `Hola ArKángel, me interesa ${s.name}. Quisiera agendar una valoración.`;
  return `
<article class="svc-card" data-group="${s.group}">
  <a class="svc-card__media" href="${s.href}" tabindex="-1" aria-hidden="true">
    ${img(s.img, s.alt, { max: s.imgW, sizes: '(min-width:1100px) 28vw, (min-width:700px) 44vw, 78vw' })}
  </a>
  <div class="svc-card__body">
    <h3 class="svc-card__title"><a href="${s.href}">${s.name}</a></h3>
    <p class="svc-card__desc">${s.desc}</p>
    <p class="svc-card__benefit">${icon('check')}<span>${s.benefit}</span></p>
    <div class="svc-card__actions">
      <a class="link-arrow" href="${s.href}">Conocer más ${icon('arrow')}</a>
      <a class="wa-chip" href="${waLink(msg)}" target="_blank" rel="noopener noreferrer" data-wa data-track="whatsapp" aria-label="Consultar ${esc(s.name)} por WhatsApp">${icon('wa')}<span>WhatsApp</span></a>
    </div>
  </div>
</article>`;
}

/* ───────── Comparador antes/después ───────── */
export function compare(c, { eager = false, size = '(min-width:1000px) 640px, 92vw' } = {}) {
  const opts = (name, max) => ({ max, sizes: size, cls: 'cmp__img', style: `object-position:${c.pos}`, eager });
  return `
<figure class="cmp" data-compare style="--pos:50%;--ratio:${c.ratio}" data-case="${c.id}"
  data-lb-before="${imgUrl(c.before)}" data-lb-after="${imgUrl(c.after)}" data-lb-ratio="${c.ratio}" data-lb-pos="${c.pos}" data-lb-cap="${esc(c.title)} · ${esc(c.tech)}" data-lb-alt="${esc(c.alt)}">
  <div class="cmp__stage">
    ${img(c.after, `Después — ${c.alt}`, opts(c.after, c.aw))}
    <div class="cmp__before">${img(c.before, `Antes — ${c.alt}`, opts(c.before, c.bw))}</div>
    <span class="cmp__tag cmp__tag--b">Antes</span>
    <span class="cmp__tag cmp__tag--a">Después</span>
    <span class="cmp__line" aria-hidden="true"><span class="cmp__knob">${icon('drag')}</span></span>
    <input class="cmp__range" type="range" min="0" max="100" value="50" step="0.5" aria-label="Deslizar para comparar antes y después: ${esc(c.title)}">
    <button class="cmp__zoom" type="button" aria-label="Ampliar comparación" data-lightbox-compare>${icon('expand')}</button>
  </div>
  <figcaption class="cmp__cap"><strong>${c.title}</strong><span>${c.tech}</span></figcaption>
</figure>`;
}

/* ───────── Hero de página interna ───────── */
export function pageHero({ eyebrow: e, title, lead, crumbs = [], ctas = '', image, imageAlt = '', imageMax, theme = '' }) {
  return `
<section class="page-hero ${theme}" data-theme="dark">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="wrap page-hero__grid">
    <div class="page-hero__copy">
      ${crumbs.length ? `<nav class="crumbs" aria-label="Migas de pan"><ol>${crumbs
        .map((c, i) => `<li>${c.href && i < crumbs.length - 1 ? `<a href="${c.href}">${c.label}</a>` : `<span aria-current="page">${c.label}</span>`}</li>`).join('')}</ol></nav>` : ''}
      ${e ? `<div class="rise" style="--i:1">${eyebrow(e, true)}</div>` : ''}
      <h1 class="h1 rise" style="--i:2">${title}</h1>
      ${lead ? `<p class="lead lead--light rise" style="--i:3">${lead}</p>` : ''}
      ${ctas ? `<div class="btn-row rise" style="--i:4">${ctas}</div>` : ''}
    </div>
    ${image ? `<div class="page-hero__media rise" style="--i:3"><div class="arch" data-parallax-wrap>${img(image, imageAlt, { eager: true, max: imageMax, sizes: '(min-width:900px) 34vw, 80vw', attrs: 'data-parallax="0.06"' })}</div></div>` : ''}
  </div>
</section>`;
}

export const ctaBand = ({ title, text, msg, label = 'Agenda tu valoración' }) => `
<section class="cta-band" data-theme="dark" aria-labelledby="cta-title">
  <div class="cta-band__bg" aria-hidden="true"></div>
  <div class="wrap cta-band__in">
    <div>
      <p class="eyebrow eyebrow--light" data-reveal><span class="eyebrow__line"></span>Valoración personalizada</p>
      <h2 class="h2" id="cta-title" data-reveal style="--d:.08s">${title}</h2>
      ${text ? `<p class="lead lead--light" data-reveal style="--d:.16s">${text}</p>` : ''}
    </div>
    <div class="btn-row" data-reveal style="--d:.24s">
      ${waBtn(msg, label)}
      ${btn({ href: `tel:${SITE.phoneTel}`, label: SITE.phone, variant: 'ghost', icon: 'phone', attrs: 'data-track="call"' })}
    </div>
  </div>
</section>`;

export const processSteps = (steps) => `
<ol class="process">
${steps.map((s, i) => `
  <li class="process__step" data-reveal style="--d:${i * 0.08}s">
    <span class="process__n">0${i + 1}</span>
    <h3 class="h4">${s.t}</h3>
    <p>${s.d}</p>
  </li>`).join('')}
</ol>`;

/* ───────── Formulario ───────── */
export function contactForm({ id = 'f', options = [], defaultTopic = '', msgPlaceholder = 'Cuéntanos qué te gustaría mejorar o consultar (opcional)', submit = 'Enviar por WhatsApp', light = true, kind = 'valoracion' } = {}) {
  return `
<form class="form${light ? '' : ' form--dark'}" data-form data-kind="${kind}" ${SITE.formEndpoint ? `data-endpoint="${esc(SITE.formEndpoint)}"` : ''} action="/gracias/" method="get" novalidate>
  <div class="form__grid">
    <div class="field">
      <label for="${id}-name">Nombre</label>
      <input id="${id}-name" name="nombre" type="text" autocomplete="name" required minlength="2" maxlength="80" placeholder="Tu nombre">
      <p class="field__err" data-err="nombre" role="alert"></p>
    </div>
    <div class="field">
      <label for="${id}-tel">Teléfono / WhatsApp</label>
      <input id="${id}-tel" name="telefono" type="tel" inputmode="tel" autocomplete="tel" required minlength="7" maxlength="20" pattern="[0-9+()\\-\\s]{7,20}" placeholder="+57 300 000 0000">
      <p class="field__err" data-err="telefono" role="alert"></p>
    </div>
    <div class="field field--full">
      <label for="${id}-email">Correo electrónico <span class="opt">(opcional)</span></label>
      <input id="${id}-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" placeholder="tu@correo.com">
      <p class="field__err" data-err="email" role="alert"></p>
    </div>
    <div class="field field--full">
      <label for="${id}-topic">${kind === 'formacion' ? 'Programa de interés' : 'Tratamiento de interés'}</label>
      <select id="${id}-topic" name="interes" required>
        <option value="" disabled ${defaultTopic ? '' : 'selected'}>Selecciona una opción</option>
        ${options.map((o) => `<option value="${esc(o)}"${o === defaultTopic ? ' selected' : ''}>${esc(o)}</option>`).join('')}
      </select>
      <p class="field__err" data-err="interes" role="alert"></p>
    </div>
    <div class="field field--full">
      <label for="${id}-msg">Mensaje</label>
      <textarea id="${id}-msg" name="mensaje" rows="4" maxlength="600" placeholder="${esc(msgPlaceholder)}"></textarea>
    </div>
    <div class="field field--hp" aria-hidden="true"><label>No llenar<input type="text" name="empresa" tabindex="-1" autocomplete="off"></label></div>
    <label class="check field--full">
      <input type="checkbox" name="acepto" required>
      <span>Acepto el tratamiento de mis datos según la <a href="/politica-de-privacidad/">política de privacidad</a>.</span>
    </label>
    <p class="field__err field--full" data-err="acepto" role="alert"></p>
  </div>
  <button class="btn btn--gold form__submit" type="submit"><span class="btn__label">${submit}</span>${icon('wa', 'btn__ico')}</button>
  <p class="form__status" role="status" aria-live="polite" data-status></p>
</form>`;
}

export const mapFacade = () => `
<div class="map" data-map data-src="${MAP_EMBED}">
  <button class="map__load" type="button" aria-label="Cargar mapa interactivo de Google Maps">
    <span class="map__pin">${icon('pin')}</span>
    <strong>${SITE.address.street}</strong>
    <span>${SITE.address.zone} · ${SITE.address.city}</span>
    <span class="map__cta">Ver mapa interactivo</span>
  </button>
</div>`;

/* ───────── Estructura global ───────── */
export function header(current = '/') {
  const isActive = (h) => (h === '/' ? current === '/' : current.startsWith(h));
  const links = NAV.map((n) => `<li><a href="${n.href}"${isActive(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
  return `
<a class="skip" href="#main">Saltar al contenido</a>
<div class="progress" aria-hidden="true"><span></span></div>
<header class="site-header" data-header>
  <div class="site-header__in">
    <a class="brand" href="/" aria-label="ArKángel — Micropigmentación, inicio">
      <img class="brand__mark" src="/assets/img/logo-emblem.webp" alt="" width="${EMB_W}" height="${EMB_H}">
      <span class="brand__word"><b>ArKángel</b><i>Micropigmentación</i></span>
    </a>
    <nav class="nav" aria-label="Principal"><ul>${links}</ul><span class="nav__ind" aria-hidden="true"></span></nav>
    <div class="site-header__cta">
      ${btn({ href: waLink('Hola ArKángel, quiero agendar una valoración.'), label: 'Agenda tu valoración', variant: 'gold', icon: null, external: true, cls: 'btn--sm', attrs: 'data-wa data-track="whatsapp"' })}
    </div>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><span></span><span></span></button>
  </div>
</header>
<div class="menu" id="menu" aria-hidden="true" inert>
  <div class="menu__in">
    <nav aria-label="Menú móvil"><ul>${NAV.map((n, i) => `<li style="--i:${i}"><a href="${n.href}"${isActive(n.href) ? ' aria-current="page"' : ''}><span class="menu__n">0${i + 1}</span>${n.label}</a></li>`).join('')}</ul></nav>
    <div class="menu__foot" style="--i:9">
      ${waBtn('Hola ArKángel, quiero agendar una valoración.', 'Agenda tu valoración', 'gold', 'btn--block')}
      <p class="menu__meta"><a href="tel:${SITE.phoneTel}">${SITE.phone}</a><br>${SITE.address.street}, ${SITE.address.city}</p>
    </div>
  </div>
</div>`;
}

export function footer() {
  const a = SITE.address;
  return `
<footer class="footer" data-theme="dark">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <img src="/assets/img/logo-full.webp" alt="Centro Estético ArKángel — Micropigmentación avanzada" width="200" height="231" loading="lazy" decoding="async">
      <p>Micropigmentación capilar, facial y paramédica en Medellín.<br><em>ArKángel: tu esencia, tu estilo.</em></p>
    </div>
    <nav class="footer__col" aria-label="Tratamientos">
      <h3 class="footer__h">Tratamientos</h3>
      <ul>
        <li><a href="/micropigmentacion-capilar-medellin/">Micropigmentación capilar</a></li>
        <li><a href="/micropigmentacion-de-barba/">Micropigmentación de barba</a></li>
        <li><a href="/micropigmentacion-cejas-hombres/">Cejas masculinas</a></li>
        <li><a href="/micropigmentacion-femenina/">Mujeres</a></li>
        <li><a href="/micropigmentacion-paramedica/">Paramédica</a></li>
      </ul>
    </nav>
    <nav class="footer__col" aria-label="ArKángel">
      <h3 class="footer__h">ArKángel</h3>
      <ul>
        <li><a href="/resultados/">Galería de resultados</a></li>
        <li><a href="/jenny-munoz/">Sobre Jenny Muñoz</a></li>
        <li><a href="/formacion-art-pigmenta/">Formación Art Pigmenta</a></li>
        <li><a href="/contacto/">Contacto</a></li>
        <li><a href="/politica-de-privacidad/">Política de privacidad</a></li>
      </ul>
    </nav>
    <div class="footer__col">
      <h3 class="footer__h">Visítanos</h3>
      <address>
        <p>${a.street}<br>${a.zone}, ${a.city}, ${a.country}</p>
        <p><a href="tel:${SITE.phoneTel}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </address>
      <p class="footer__cities">También atendemos en ${SITE.otherCities}.</p>
      <div class="footer__social">
        <a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram de ArKángel">${icon('ig')}</a>
        <a href="${SITE.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook de ArKángel">${icon('fb')}</a>
        <a href="${waLink('Hola ArKángel, quisiera más información.')}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de ArKángel" data-wa>${icon('wa')}</a>
      </div>
    </div>
  </div>
  <div class="wrap footer__legal">
    <p>© ${new Date().getFullYear()} Centro Estético ArKángel. Todos los derechos reservados.</p>
    <p>Los resultados varían según cada persona; se confirman en la valoración.</p>
  </div>
</footer>`;
}

export const waFloat = (msg) => `
<a class="wa-float" href="${waLink(msg)}" target="_blank" rel="noopener noreferrer" data-wa data-wa-float data-track="whatsapp" aria-label="Escríbenos por WhatsApp">
  ${icon('wa')}<span class="wa-float__txt">Escríbenos</span>
</a>`;

/* ───────── Documento ───────── */
export function document_({ title, description, path: p, body, ld = [], noindex = false, ogImage, preload = '', waMsg = 'Hola ArKángel, quisiera más información.', assetsV = '1' }) {
  const url = SITE.url + p;
  const og = ogImage ? SITE.url + ogImage : SITE.url + '/assets/img/jenny-portrait-974.webp';
  return `<!doctype html>
<html lang="es-CO">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#15120f">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="${esc(SITE.brand)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/logo-emblem.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/logo-emblem.png">
<link rel="preload" href="/assets/fonts/cormorant-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jost.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="/assets/css/site.css?v=${assetsV}">
<script src="/assets/js/site.js?v=${assetsV}" defer></script>
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body data-wa-msg="${esc(waMsg)}">
${SPRITE}
${header(p)}
<main id="main">
${body}
</main>
${footer()}
${waFloat(waMsg)}
</body>
</html>`;
}

export const businessLd = () => ({
  '@context': 'https://schema.org',
  '@type': ['BeautySalon', 'LocalBusiness'],
  '@id': SITE.url + '/#negocio',
  name: SITE.legalName,
  alternateName: SITE.brand,
  url: SITE.url,
  image: SITE.url + '/assets/img/jenny-portrait-974.webp',
  logo: SITE.url + '/assets/img/logo-full.webp',
  telephone: SITE.phoneTel,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: 'CO',
  },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  sameAs: [SITE.instagram, SITE.facebook],
  areaServed: 'Medellín',
});

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem', position: i + 1, name: it.label, item: SITE.url + it.href,
  })),
});
