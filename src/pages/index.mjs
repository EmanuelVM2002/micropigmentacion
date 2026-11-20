import { SITE, waLink, MAP_DIRECTIONS } from '../config.mjs';
import { GROUPS, SERVICES, CASES, TESTIMONIALS, PROGRAMS, BIOSEG } from '../data.mjs';
import {
  img, icon, btn, waBtn, eyebrow, sectionHead, serviceCard, compare, contactForm, mapFacade, businessLd, imgUrl,
} from '../components.mjs';

const MSG = 'Hola ArKángel, quiero agendar una valoración.';

const hero = () => `
<section class="hero" id="inicio" data-theme="dark" data-section="Inicio" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true"><span class="hero__glow"></span><img class="hero__mark" src="/assets/img/logo-emblem.webp" alt="" width="343" height="260"></div>
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <div class="rise" style="--i:1">${eyebrow('Micropigmentación · Medellín', true)}</div>
      <h1 class="h1 hero__title" id="hero-title">
        <span class="line"><span class="line__in" style="--i:2">Belleza natural,</span></span>
        <span class="line"><span class="line__in" style="--i:3">trazada con</span></span>
        <span class="line"><span class="line__in" style="--i:4"><em>precisión.</em></span></span>
      </h1>
      <p class="lead lead--light hero__lead rise" style="--i:5">Micropigmentación capilar, facial y paramédica, con valoración previa y atención privada. Un trabajo pensado para que te veas como tú, en tu mejor versión.</p>
      <div class="btn-row rise" style="--i:6">
        ${waBtn(MSG, 'Agenda tu valoración')}
        ${btn({ href: '#tratamientos', label: 'Descubre nuestros tratamientos', variant: 'ghost', icon: 'arrow' })}
      </div>
      <ul class="hero__facts rise" style="--i:7">
        <li>${icon('shield')}<span>Valoración previa personalizada</span></li>
        <li>${icon('shield')}<span>Sin cirugía</span></li>
        <li>${icon('shield')}<span>Material de un solo uso</span></li>
      </ul>
    </div>
    <div class="hero__visual">
      <div class="hero__arch rise" style="--i:3" data-parallax-wrap>
        ${img('jenny-portrait', 'Jenny Muñoz, especialista en dermopigmentación de ArKángel, en su consultorio', { eager: true, max: 974, sizes: '(min-width:1000px) 38vw, 80vw', attrs: 'data-parallax="0.05"' })}
      </div>
      <div class="hero__orb rise" style="--i:5" data-parallax-wrap>
        ${img('cejas-diseno', 'Diseños de cejas pelo a pelo', { eager: true, max: 640, sizes: '180px', attrs: 'data-parallax="-0.04"' })}
      </div>
      <div class="hero__badge rise" style="--i:6"><b>Jenny Muñoz</b><span>Master en dermopigmentación</span></div>
    </div>
  </div>
  <a class="hero__scroll" href="#experiencia" aria-label="Desplazarse a la siguiente sección"><span></span></a>
</section>`;

const ticker = () => {
  const items = ['Micropigmentación capilar', 'Cejas pelo a pelo', 'Labios', 'Barba', 'Delineado de ojos', 'Camuflaje de cicatrices', 'Formación profesional', 'Medellín'];
  const row = items.map((t) => `<li>${t}</li>`).join('');
  return `
<div class="ticker" data-theme="dark" aria-hidden="true">
  <div class="ticker__track"><ul>${row}</ul><ul>${row}</ul></div>
</div>`;
};

const authority = () => `
<section class="sec sec--paper" id="experiencia" data-section="Experiencia" aria-labelledby="exp-title">
  <div class="wrap authority">
    <div class="authority__lead">
      <div data-reveal>${eyebrow('Trayectoria y especialización')}</div>
      <p class="authority__big" data-reveal style="--d:.06s"><em>${SITE.experienceLabel}</em></p>
      <h2 class="h2" id="exp-title" data-reveal style="--d:.12s">afinando la mirada, el pulso y el criterio.</h2>
      <p class="lead" data-reveal style="--d:.2s">En ArKángel cada diseño parte de tu rostro, tu piel y lo que quieres expresar. Combinamos técnica, sensibilidad estética y un trato cercano para que el resultado se vea natural.</p>
    </div>
    <ol class="pillars">
      <li class="pillar" data-reveal><span class="pillar__n">01</span><div><h3 class="h4">Valoración previa</h3><p>Definimos la técnica y el diseño más adecuados para cada caso antes de empezar.</p></div></li>
      <li class="pillar" data-reveal style="--d:.08s"><span class="pillar__n">02</span><div><h3 class="h4">Técnica especializada</h3><p>Micropigmentación capilar con técnicas europeas, cejas 6D y camuflaje paramédico.</p></div></li>
      <li class="pillar" data-reveal style="--d:.16s"><span class="pillar__n">03</span><div><h3 class="h4">Atención personalizada</h3><p>Un espacio privado y tranquilo, con aromaterapia y música relajante.</p></div></li>
      <li class="pillar" data-reveal style="--d:.24s"><span class="pillar__n">04</span><div><h3 class="h4">Formación continua</h3><p>Una trayectoria respaldada por diplomas y certificaciones, y educación permanente.</p></div></li>
    </ol>
  </div>
</section>`;

const services = () => {
  const groups = Object.values(GROUPS);
  const tabs = groups.map((g, i) => `<button class="tab" role="tab" id="tab-${g.id}" aria-controls="panel-${g.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${g.label}</button>`).join('');
  const panels = groups.map((g, i) => {
    const items = SERVICES.filter((s) => s.group === g.id);
    return `
    <div class="panel" role="tabpanel" id="panel-${g.id}" aria-labelledby="tab-${g.id}" ${i ? 'hidden' : ''}>
      <div class="panel__head">
        <p class="panel__lead">${g.lead}</p>
        <a class="link-arrow" href="${g.href}">Ver ${g.title.toLowerCase()} ${icon('arrow')}</a>
      </div>
      <div class="carousel" data-carousel>
        <div class="carousel__track" tabindex="0" role="group" aria-label="${g.title}: deslizar para ver más">
          ${items.map(serviceCard).join('')}
        </div>
        <div class="carousel__nav">
          <button class="round" type="button" data-prev aria-label="Anterior">${icon('chev-l')}</button>
          <span class="carousel__bar" aria-hidden="true"><span></span></span>
          <button class="round" type="button" data-next aria-label="Siguiente">${icon('chev-r')}</button>
        </div>
      </div>
    </div>`;
  }).join('');
  return `
<section class="sec sec--ivory" id="tratamientos" data-section="Tratamientos" aria-labelledby="svc-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Tratamientos', title: 'Una especialidad <em>para cada rostro.</em>', lead: 'Elige una categoría para conocer los tratamientos. Todos parten de una valoración personalizada.', id: 'svc-title' })}
    <div class="tabs" role="tablist" aria-label="Categorías de tratamientos" data-reveal style="--d:.2s">${tabs}</div>
    <div data-tabpanels>${panels}</div>
  </div>
</section>`;
};

const results = () => {
  const thumbs = CASES.map((c, i) => `
    <button class="case-btn" type="button" data-case-btn="${c.id}" aria-pressed="${i === 0}">
      <span class="case-btn__n">0${i + 1}</span>
      <span class="case-btn__t"><b>${c.title}</b><small>${c.tech}</small></span>
      <span class="case-btn__thumb">${img(c.after, '', { max: 640, sizes: '64px', style: `object-position:${c.pos}` })}</span>
    </button>`).join('');
  return `
<section class="sec sec--ink" id="resultados" data-theme="dark" data-section="Resultados" aria-labelledby="res-title">
  <div class="wrap results">
    <div class="results__intro">
      ${sectionHead({ eyebrow: 'Antes y después', title: 'Resultados <em>reales.</em>', lead: 'Desliza para comparar. Cada caso se diseña de forma individual y los resultados varían según la persona.', light: true, id: 'res-title' })}
      <div class="case-list" data-case-list data-reveal style="--d:.2s">${thumbs}</div>
      <div class="btn-row" data-reveal style="--d:.3s">
        ${btn({ href: '/resultados/', label: 'Ver galería completa', variant: 'ghost-gold' })}
      </div>
    </div>
    <div class="results__stage" data-reveal="mask">
      ${CASES.map((c, i) => `<div class="case" data-case="${c.id}" ${i ? 'hidden' : ''}>${compare(c)}</div>`).join('')}
      <p class="results__hint">${icon('drag')} Arrastra para comparar</p>
    </div>
  </div>
</section>`;
};

const jenny = () => `
<section class="sec sec--champagne" id="jenny" data-section="Jenny Muñoz" aria-labelledby="jenny-title">
  <div class="wrap jenny">
    <div class="jenny__media">
      <div class="jenny__main" data-reveal="mask" data-parallax-wrap>${img('jenny-diploma', 'Jenny Muñoz con un reconocimiento en un evento académico de micropigmentación', { sizes: '(min-width:1000px) 36vw, 84vw', attrs: 'data-parallax="0.05"' })}</div>
      <div class="jenny__small" data-reveal style="--d:.2s">${img('visagismo', 'Valoración de visagismo: diseño marcado sobre el rostro de un paciente', { max: 520, sizes: '(min-width:1000px) 16vw, 40vw' })}</div>
    </div>
    <div class="jenny__copy">
      <div data-reveal>${eyebrow('Conoce a Jenny Muñoz')}</div>
      <h2 class="h2" id="jenny-title" data-reveal style="--d:.08s">Una artista que ve tu esencia <em>y la realza.</em></h2>
      <p data-reveal style="--d:.14s">Jenny inició su formación superior en Cosmetología Capilar y Asesoría de Imagen en 2011, en la academia Pivot Point. Destacó desde el principio en el diseño y el maquillaje, y se especializó en dermopigmentación —capilar y paramédica— en Guadalajara, México. Más adelante se formó como coach ontológico para acompañar a cada persona de forma integral.</p>
      <blockquote class="quote" data-reveal style="--d:.2s">
        <p>«Siempre he creído que la transformación inicia desde el ser. Cada persona es un universo infinito por descubrir; yo solo soy una artista que ve su esencia y la realza.»</p>
        <footer>Jenny Muñoz</footer>
      </blockquote>
      <ul class="chips" data-reveal style="--d:.26s">
        <li>Micropigmentación capilar</li><li>Camuflaje paramédico</li><li>Cejas 6D</li><li>Visagismo</li><li>Coaching ontológico</li>
      </ul>
      <div class="btn-row" data-reveal style="--d:.32s">${btn({ href: '/jenny-munoz/', label: 'Conoce su historia', variant: 'ink' })}</div>
    </div>
  </div>
</section>`;

const facilities = () => `
<section class="sec sec--ivory" id="instalaciones" data-section="Instalaciones" aria-labelledby="inst-title">
  <div class="wrap facilities">
    <div class="facilities__copy">
      ${sectionHead({ eyebrow: 'Instalaciones y bioseguridad', title: 'Un espacio privado, <em>pensado para tu tranquilidad.</em>', lead: `Nuestro consultorio está en una zona segura y de fácil acceso en el sector Estadio – ${SITE.address.zone}. Cada procedimiento se realiza a puerta cerrada, con atención 100 % personalizada.`, id: 'inst-title' })}
      <ul class="checks">
        ${BIOSEG.map((b, i) => `<li data-reveal style="--d:${i * 0.07}s">${icon('check')}<div><h3 class="h4">${b.t}</h3><p>${b.d}</p></div></li>`).join('')}
      </ul>
    </div>
    <div class="facilities__media">
      <div class="facilities__a" data-reveal="mask" data-parallax-wrap>${img('consultorio', 'Consultorio de ArKángel con camilla, aro de luz y ambiente de tonos aguamarina', { sizes: '(min-width:1000px) 38vw, 88vw', attrs: 'data-parallax="0.05"' })}</div>
      <div class="facilities__b" data-reveal="mask" style="--d:.15s">${img('bioseguridad', 'Jenny Muñoz con protección facial en el consultorio', { sizes: '(min-width:1000px) 18vw, 44vw' })}</div>
    </div>
  </div>
</section>`;

const testimonials = () => `
<section class="sec sec--paper sec--tight" id="testimonios" data-section="Testimonios" aria-labelledby="test-title">
  <div class="wrap testi" data-testimonials>
    <div data-reveal>${eyebrow('Testimonios')}</div>
    <h2 class="h2 sr-only" id="test-title">Lo que opinan nuestros clientes</h2>
    <div class="testi__stage">
      <span class="testi__mark" aria-hidden="true">“</span>
      ${TESTIMONIALS.map((t, i) => `
      <figure class="testi__item" ${i ? '' : 'data-active'} aria-hidden="${i ? 'true' : 'false'}">
        <blockquote><p>${t.text}</p></blockquote>
        <figcaption><span class="testi__line"></span>${t.name}</figcaption>
      </figure>`).join('')}
    </div>
    <div class="testi__nav">
      <button class="round" type="button" data-prev aria-label="Testimonio anterior">${icon('chev-l')}</button>
      <span class="testi__count" aria-live="polite"><b data-cur>1</b> / ${TESTIMONIALS.length}</span>
      <button class="round" type="button" data-next aria-label="Testimonio siguiente">${icon('chev-r')}</button>
    </div>
  </div>
</section>`;

const academy = () => `
<section class="sec sec--ink ap" id="formacion" data-theme="dark" data-section="Art Pigmenta" aria-labelledby="ap-title">
  <div class="ap__bg" aria-hidden="true"></div>
  <div class="wrap ap__grid">
    <div class="ap__media" data-reveal="mask" data-parallax-wrap>
      ${img('curso-capilar', 'Clase práctica de micropigmentación capilar en Art Pigmenta', { max: 1200, sizes: '(min-width:1000px) 40vw, 88vw', attrs: 'data-parallax="0.05"' })}
      <span class="ap__stamp" aria-hidden="true"><b>Art</b><b>Pigmenta</b></span>
    </div>
    <div class="ap__copy">
      <div data-reveal><p class="ap__eyebrow">By Centro Estético ArKángel</p></div>
      <h2 class="h2" id="ap-title" data-reveal style="--d:.08s">Convierte tu talento en <em>una profesión.</em></h2>
      <p class="lead lead--light" data-reveal style="--d:.14s">Formación en micropigmentación y dermopigmentación, teórico-práctica y personalizada, o en grupos de máximo 4 alumnos.</p>
      <ul class="programs">
        ${PROGRAMS.map((p, i) => `
        <li class="program" data-reveal style="--d:${0.18 + i * 0.06}s">
          <span class="program__n">0${i + 1}</span>
          <div><h3 class="program__t">${p.name}</h3><p class="program__s">${p.sub}</p></div>
          <a class="program__go" href="${waLink(`Hola Art Pigmenta, quiero información del programa ${p.name} – ${p.sub}.`)}" target="_blank" rel="noopener noreferrer" data-wa data-track="whatsapp" aria-label="Consultar el programa ${p.name} por WhatsApp">${icon('arrow')}</a>
        </li>`).join('')}
      </ul>
      <div class="btn-row" data-reveal style="--d:.46s">
        ${btn({ href: '/formacion-art-pigmenta/', label: 'Conocer los cursos', variant: 'gold' })}
        ${waBtn('Hola Art Pigmenta, quiero separar mi cupo en un curso.', 'Separa tu cupo', 'ghost')}
      </div>
    </div>
  </div>
</section>`;

const contact = () => `
<section class="sec sec--ivory" id="contacto" data-section="Contacto" aria-labelledby="con-title">
  <div class="wrap contact">
    <div class="contact__info">
      ${sectionHead({ eyebrow: 'Ubicación y contacto', title: 'Agenda tu <em>valoración.</em>', lead: 'Cuéntanos qué quieres mejorar y te orientamos. La valoración nos permite definir la técnica y el diseño ideales para ti.', id: 'con-title' })}
      <ul class="contact__list" data-reveal style="--d:.2s">
        <li>${icon('pin')}<div><b>${SITE.address.street}</b><span>${SITE.address.zone}, ${SITE.address.city}, ${SITE.address.country}</span><a class="link-arrow" href="${MAP_DIRECTIONS}" target="_blank" rel="noopener noreferrer">Cómo llegar ${icon('arrow')}</a></div></li>
        <li>${icon('phone')}<div><b><a href="tel:${SITE.phoneTel}" data-track="call">${SITE.phone}</a></b><span>Llamadas y WhatsApp</span></div></li>
        <li>${icon('mail')}<div><b><a href="mailto:${SITE.email}">${SITE.email}</a></b><span>Escríbenos cuando quieras</span></div></li>
      </ul>
      <div data-reveal style="--d:.26s">${mapFacade()}</div>
    </div>
    <div class="contact__form" data-reveal style="--d:.15s">
      <div class="card-form">
        <h3 class="h3">Solicita tu valoración</h3>
        <p class="muted">Te responderemos por WhatsApp para coordinar tu cita.</p>
        ${contactForm({ id: 'home', options: ['Micropigmentación capilar', 'Micropigmentación de barba', 'Cejas masculinas', 'Cejas pelo a pelo (mujeres)', 'Labios', 'Delineado de ojos', 'Camuflaje de cicatrices / ojeras', 'Formación Art Pigmenta', 'Otro / no estoy segura(o)'] })}
      </div>
    </div>
  </div>
</section>`;

export default {
  path: '/',
  title: 'Micropigmentación en Medellín | Capilar, cejas, labios y barba — ArKángel',
  description: 'Centro estético ArKángel en Medellín: micropigmentación capilar, de barba, cejas, labios y camuflaje de cicatrices, con valoración personalizada y atención privada. Agenda tu cita por WhatsApp.',
  waMsg: MSG,
  preload: `<link rel="preload" as="image" href="${imgUrl('jenny-portrait')}" imagesrcset="${imgUrl('jenny-portrait', 520)} 520w, ${imgUrl('jenny-portrait')} 974w" imagesizes="(min-width:1000px) 38vw, 80vw" fetchpriority="high">`,
  ld: () => [
    businessLd(),
    { '@context': 'https://schema.org', '@type': 'WebSite', url: SITE.url, name: SITE.brand, inLanguage: 'es-CO' },
  ],
  body: () => [hero(), ticker(), authority(), services(), results(), jenny(), facilities(), testimonials(), academy(), contact()].join('\n'),
};
