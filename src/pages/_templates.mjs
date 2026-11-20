// Plantillas de página: una para categorías (hombres/mujeres/paramédica) y otra para tratamientos individuales.
import { SITE, waLink } from '../config.mjs';
import { CASES, PROCESS } from '../data.mjs';
import {
  img, icon, btn, waBtn, eyebrow, sectionHead, pageHero, ctaBand, processSteps, faq, faqLd, compare,
  breadcrumbLd, businessLd, imgUrl,
} from '../components.mjs';

const li = (arr) => arr.map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('');

/** Bloque editorial alternado: foto + texto. */
export function feature({ id, kicker, title, text, bullets = [], image, alt, imgMax, href, msg, flip = false, ctaLabel = 'Conocer más' }) {
  return `
<article class="feature${flip ? ' feature--flip' : ''}" ${id ? `id="${id}"` : ''}>
  <div class="feature__media" data-reveal="mask" data-parallax-wrap>
    ${img(image, alt, { max: imgMax, sizes: '(min-width:1000px) 44vw, 90vw', attrs: 'data-parallax="0.05"' })}
  </div>
  <div class="feature__copy">
    <div data-reveal>${eyebrow(kicker)}</div>
    <h3 class="h3" data-reveal style="--d:.06s">${title}</h3>
    ${text.map((p, i) => `<p data-reveal style="--d:${0.1 + i * 0.04}s">${p}</p>`).join('')}
    ${bullets.length ? `<ul class="ticks" data-reveal style="--d:.18s">${li(bullets)}</ul>` : ''}
    <div class="btn-row" data-reveal style="--d:.24s">
      ${href ? btn({ href, label: ctaLabel, variant: 'ink' }) : ''}
      ${waBtn(msg, 'Consultar por WhatsApp', href ? 'outline' : 'ink')}
    </div>
  </div>
</article>`;
}

/** Tarjetas pequeñas (servicios complementarios). */
export function miniCards(items) {
  return `
<div class="minis">
${items.map((s, i) => `
  <article class="mini" data-reveal style="--d:${(i % 3) * 0.07}s">
    ${s.image ? `<div class="mini__media">${img(s.image, s.alt || '', { max: 500, sizes: '(min-width:900px) 22vw, 44vw' })}</div>` : `<div class="mini__ico">${icon('spark')}</div>`}
    <div class="mini__body">
      <h3 class="h4">${s.name}</h3>
      <p>${s.desc}</p>
      <a class="wa-chip" href="${waLink(`Hola ArKángel, me interesa ${s.name}. Quisiera más información.`)}" target="_blank" rel="noopener noreferrer" data-wa data-track="whatsapp">${icon('wa')}<span>Consultar</span></a>
    </div>
  </article>`).join('')}
</div>`;
}

/** Página de categoría. */
export function categoryPage(cfg) {
  const crumbs = [{ label: 'Inicio', href: '/' }, { label: cfg.crumb, href: cfg.path }];
  const body = () => `
${pageHero({
  eyebrow: cfg.eyebrow, title: cfg.title, lead: cfg.lead, crumbs,
  image: cfg.heroImage, imageAlt: cfg.heroAlt, imageMax: cfg.heroMax,
  ctas: waBtn(cfg.msg, 'Agenda tu valoración') + btn({ href: '#servicios', label: 'Ver tratamientos', variant: 'ghost', icon: 'arrow' }),
})}
<section class="sec sec--paper sec--tight">
  <div class="wrap statement">
    <p class="statement__t" data-reveal>${cfg.statement}</p>
  </div>
</section>
<section class="sec sec--ivory" id="servicios" aria-labelledby="serv-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Tratamientos', title: cfg.servicesTitle, lead: cfg.servicesLead, id: 'serv-title' })}
    <div class="features">${cfg.features.map((f, i) => feature({ ...f, flip: i % 2 === 1 })).join('')}</div>
  </div>
</section>
${cfg.extra ? `<section class="sec sec--champagne" id="${cfg.extra.id}" aria-labelledby="extra-title"><div class="wrap">
  ${sectionHead({ eyebrow: cfg.extra.eyebrow, title: cfg.extra.title, lead: cfg.extra.lead, id: 'extra-title' })}
  ${miniCards(cfg.extra.items)}
</div></section>` : ''}
${cfg.cases ? `<section class="sec sec--ink" data-theme="dark" aria-labelledby="cases-title"><div class="wrap">
  ${sectionHead({ eyebrow: 'Resultados', title: 'Antes y <em>después.</em>', lead: 'Desliza para comparar.', light: true, id: 'cases-title' })}
  <div class="cmp-grid">${cfg.cases.map((c) => `<div data-reveal>${compare(c)}</div>`).join('')}</div>
  <div class="btn-row btn-row--center">${btn({ href: '/resultados/', label: 'Ver galería completa', variant: 'ghost-gold' })}</div>
</div></section>` : ''}
<section class="sec sec--paper" aria-labelledby="proc-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Cómo trabajamos', title: 'Un proceso <em>cuidado, paso a paso.</em>', id: 'proc-title' })}
    ${processSteps(PROCESS)}
  </div>
</section>
${cfg.note ? `<section class="sec sec--tight sec--ivory"><div class="wrap"><aside class="note" data-reveal>${icon('shield')}<p>${cfg.note}</p></aside></div></section>` : ''}
${cfg.faq ? `<section class="sec sec--ivory" aria-labelledby="faq-title"><div class="wrap wrap--narrow">
  ${sectionHead({ eyebrow: 'Preguntas frecuentes', title: 'Lo que más <em>nos preguntan.</em>', id: 'faq-title' })}
  ${faq(cfg.faq)}
</div></section>` : ''}
${ctaBand({ title: cfg.ctaTitle, text: cfg.ctaText, msg: cfg.msg })}`;
  return {
    path: cfg.path, title: cfg.metaTitle, description: cfg.metaDesc, waMsg: cfg.msg,
    ogImage: imgUrl(cfg.heroImage),
    ld: () => [businessLd(), breadcrumbLd(crumbs), ...(cfg.faq ? [faqLd(cfg.faq)] : [])],
    body,
  };
}

/** Página de tratamiento individual. */
export function treatmentPage(cfg) {
  const crumbs = [{ label: 'Inicio', href: '/' }, { label: cfg.groupLabel, href: cfg.groupHref }, { label: cfg.crumb, href: cfg.path }];
  const body = () => `
${pageHero({
  eyebrow: cfg.eyebrow, title: cfg.title, lead: cfg.lead, crumbs,
  image: cfg.heroImage, imageAlt: cfg.heroAlt, imageMax: cfg.heroMax,
  ctas: waBtn(cfg.msg, 'Agenda tu valoración') + btn({ href: '#preguntas', label: 'Preguntas frecuentes', variant: 'ghost', icon: 'arrow' }),
})}
<section class="sec sec--paper" aria-labelledby="what-title">
  <div class="wrap split">
    <div class="split__a">
      ${sectionHead({ eyebrow: cfg.whatEyebrow, title: cfg.whatTitle, id: 'what-title' })}
      ${cfg.what.map((p, i) => `<p class="body-lg" data-reveal style="--d:${0.1 + i * 0.05}s">${p}</p>`).join('')}
    </div>
    <aside class="split__b" data-reveal style="--d:.15s">
      <div class="facts">
        <h3 class="facts__h">${cfg.factsTitle}</h3>
        <dl>${cfg.facts.map((f) => `<div><dt>${f.k}</dt><dd>${f.v}</dd></div>`).join('')}</dl>
        <div class="btn-row">${waBtn(cfg.msg, 'Consultar por WhatsApp', 'gold')}</div>
      </div>
    </aside>
  </div>
</section>
<section class="sec sec--champagne" aria-labelledby="tech-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: cfg.techEyebrow, title: cfg.techTitle, lead: cfg.techLead, id: 'tech-title' })}
    <div class="tech">
      ${cfg.techs.map((t, i) => `<article class="tech__item" data-reveal style="--d:${i * 0.07}s"><span class="tech__n">0${i + 1}</span><h3 class="h4">${t.t}</h3><p>${t.d}</p></article>`).join('')}
    </div>
  </div>
</section>
${cfg.cases && cfg.cases.length ? `<section class="sec sec--ink" data-theme="dark" aria-labelledby="cases-title"><div class="wrap">
  ${sectionHead({ eyebrow: 'Resultados', title: 'Antes y <em>después.</em>', lead: 'Desliza para comparar. Los resultados varían según cada persona.', light: true, id: 'cases-title' })}
  <div class="cmp-grid">${cfg.cases.map((c) => `<div data-reveal>${compare(c)}</div>`).join('')}</div>
</div></section>` : ''}
${cfg.gallery ? `<section class="sec sec--ink" data-theme="dark" aria-labelledby="gal-title"><div class="wrap">
  ${sectionHead({ eyebrow: 'Trabajos', title: cfg.gallery.title, lead: cfg.gallery.lead, light: true, id: 'gal-title' })}
  <div class="gal" data-gallery>
    ${cfg.gallery.items.map((g) => `<button class="work" type="button" data-lightbox data-src="${imgUrl(g.img)}" data-alt="${g.alt}" data-cap="${g.cap}" data-reveal>${img(g.img, g.alt, { max: g.w, sizes: '(min-width:900px) 30vw, 46vw' })}<span class="work__cap">${g.cap}</span></button>`).join('')}
  </div>
</div></section>` : ''}
<section class="sec sec--paper" aria-labelledby="proc-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Cómo trabajamos', title: 'Tu valoración, <em>el primer paso.</em>', id: 'proc-title' })}
    ${processSteps(PROCESS)}
  </div>
</section>
<section class="sec sec--ivory" id="preguntas" aria-labelledby="faq-title">
  <div class="wrap wrap--narrow">
    ${sectionHead({ eyebrow: 'Preguntas frecuentes', title: 'Resolvemos <em>tus dudas.</em>', id: 'faq-title' })}
    ${faq(cfg.faq)}
  </div>
</section>
<section class="sec sec--tight sec--paper"><div class="wrap">
  <h2 class="h4 related__h" data-reveal>También te puede interesar</h2>
  <div class="related">${cfg.related.map((r) => `<a class="related__item" href="${r.href}" data-reveal><span>${r.label}</span>${icon('arrow')}</a>`).join('')}</div>
</div></section>
${ctaBand({ title: cfg.ctaTitle, text: cfg.ctaText, msg: cfg.msg })}`;
  return {
    path: cfg.path, title: cfg.metaTitle, description: cfg.metaDesc, waMsg: cfg.msg,
    ogImage: imgUrl(cfg.heroImage),
    ld: () => [
      businessLd(), breadcrumbLd(crumbs), faqLd(cfg.faq),
      { '@context': 'https://schema.org', '@type': 'Service', name: cfg.serviceName, serviceType: cfg.serviceName,
        provider: { '@id': SITE.url + '/#negocio' }, areaServed: 'Medellín', url: SITE.url + cfg.path },
    ],
    body,
  };
}

export { CASES };
