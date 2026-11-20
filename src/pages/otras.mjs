import { SITE, waLink, MAP_DIRECTIONS } from '../config.mjs';
import { CASES, WORKS, CATS, PROGRAMS } from '../data.mjs';
import {
  img, icon, btn, waBtn, eyebrow, sectionHead, pageHero, ctaBand, faq, faqLd, compare, contactForm, mapFacade,
  breadcrumbLd, businessLd, imgUrl,
} from '../components.mjs';

/* ───────── Resultados ───────── */
export const resultados = {
  path: '/resultados/',
  title: 'Galería de resultados: antes y después de micropigmentación — ArKángel',
  description: 'Mira resultados reales de micropigmentación capilar, cejas, barba y camuflaje paramédico en ArKángel, Medellín. Compara el antes y el después con nuestro deslizador.',
  waMsg: 'Hola ArKángel, vi su galería de resultados y quiero agendar una valoración.',
  ld: () => [businessLd(), breadcrumbLd([{ label: 'Inicio', href: '/' }, { label: 'Resultados', href: '/resultados/' }])],
  body: () => {
    const casesCats = new Set(CASES.map((c) => c.cat));
    const chips = CATS.map((c, i) => `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`).join('');
    return `
${pageHero({
  eyebrow: 'Galería de resultados', title: 'Resultados <em>que hablan por sí solos.</em>',
  lead: 'Fotografías de trabajos realizados en ArKángel. Cada caso es distinto y los resultados varían según la persona.',
  crumbs: [{ label: 'Inicio', href: '/' }, { label: 'Resultados', href: '/resultados/' }],
  ctas: waBtn('Hola ArKángel, vi su galería de resultados y quiero agendar una valoración.', 'Agenda tu valoración'),
})}
<section class="sec sec--ink gallery-sec" data-theme="dark" aria-labelledby="gal-title">
  <div class="wrap">
    <h2 class="sr-only" id="gal-title">Galería</h2>
    <div class="filters" role="group" aria-label="Filtrar por categoría" data-filters>${chips}</div>
    <div data-filter-region>
      <h3 class="gal-h" data-gal-h="cmp">Compara el antes y el después</h3>
      <div class="cmp-grid cmp-grid--gallery" data-gallery>
        ${CASES.map((c) => `<div class="cmp-item" data-cat="${c.cat}">${compare(c, { size: '(min-width:1000px) 520px, 92vw' })}</div>`).join('')}
      </div>
      <h3 class="gal-h" data-gal-h="works">Más trabajos</h3>
      <div class="masonry" data-gallery>
        ${WORKS.map((w) => `<button class="work" type="button" data-cat="${w.cat}" data-lightbox data-src="${imgUrl(w.img)}" data-alt="${w.alt}" data-cap="${w.cap}">${img(w.img, w.alt, { max: w.w, sizes: '(min-width:900px) 30vw, 46vw' })}<span class="work__cap">${w.cap}</span></button>`).join('')}
      </div>
      <p class="gal-empty" data-empty hidden>Aún no hay fotografías en esta categoría. Escríbenos y te mostramos más trabajos.</p>
    </div>
    <p class="gal-note">Los resultados varían según cada persona y se evalúan en la valoración previa.</p>
  </div>
</section>
${ctaBand({ title: '¿Quieres un resultado <em>como estos?</em>', text: 'Agenda una valoración y diseñemos el tuyo.', msg: 'Hola ArKángel, vi su galería de resultados y quiero agendar una valoración.' })}`;
  },
};

/* ───────── Jenny Muñoz ───────── */
export const jenny = {
  path: '/jenny-munoz/',
  title: 'Jenny Muñoz — Master en dermopigmentación en Medellín | ArKángel',
  description: 'Conoce a Jenny Muñoz, especialista en micropigmentación capilar y paramédica en Medellín: su formación, su filosofía de trabajo y su enfoque integral.',
  waMsg: 'Hola Jenny, quisiera agendar una valoración en ArKángel.',
  ogImage: imgUrl('jenny-portrait'),
  ld: () => [
    businessLd(),
    breadcrumbLd([{ label: 'Inicio', href: '/' }, { label: 'Jenny Muñoz', href: '/jenny-munoz/' }]),
    { '@context': 'https://schema.org', '@type': 'Person', name: 'Jenny Muñoz', jobTitle: 'Master en dermopigmentación',
      worksFor: { '@id': SITE.url + '/#negocio' }, image: SITE.url + imgUrl('jenny-portrait'), url: SITE.url + '/jenny-munoz/' },
  ],
  body: () => `
${pageHero({
  eyebrow: 'Conoce a la especialista', title: 'Jenny Muñoz',
  lead: 'Master en dermopigmentación y arquitecta de estética facial. Detrás de cada trazo, una mirada que busca realzar tu esencia.',
  crumbs: [{ label: 'Inicio', href: '/' }, { label: 'Jenny Muñoz', href: '/jenny-munoz/' }],
  image: 'jenny-portrait', imageAlt: 'Jenny Muñoz en su consultorio de ArKángel', imageMax: 974,
  ctas: waBtn('Hola Jenny, quisiera agendar una valoración en ArKángel.', 'Agenda tu valoración con Jenny'),
})}
<section class="sec sec--paper" aria-labelledby="hist-title">
  <div class="wrap split split--story">
    <div class="split__a">
      ${sectionHead({ eyebrow: 'Su historia', title: 'Del diseño y la imagen <em>a la dermopigmentación.</em>', id: 'hist-title' })}
      <p class="body-lg" data-reveal>Jenny inició su formación superior en Cosmetología Capilar y Asesoría de Imagen en 2011, en la academia Pivot Point. Desde el principio destacó en el arte del diseño y el maquillaje, y complementó sus conocimientos con la dermopigmentación, especializándose en micropigmentación capilar y paramédica en Guadalajara, México.</p>
      <p class="body-lg" data-reveal style="--d:.06s">En los años siguientes sumó estudios superiores como coach ontológico, lo que le permite ofrecer un servicio integral: acompañar a cada persona para activar su esencia y reflejarla en su imagen, aportando amor propio, seguridad y belleza.</p>
      <p class="body-lg" data-reveal style="--d:.12s">Hoy, su experiencia la avala como una de las mejores en su sector profesional.</p>
    </div>
    <aside class="split__b" data-reveal style="--d:.1s">
      <div class="timeline">
        <h3 class="facts__h">Trayectoria</h3>
        <ol>
          <li><b>2011</b><span>Cosmetología Capilar y Asesoría de Imagen — academia Pivot Point.</span></li>
          <li><b>Formación</b><span>Dermopigmentación: especialización en micropigmentación capilar y paramédica — Guadalajara, México.</span></li>
          <li><b>Después</b><span>Estudios superiores como coach ontológico.</span></li>
          <li><b>Hoy</b><span>Master en dermopigmentación: atiende en ArKángel y lidera la formación de Art Pigmenta.</span></li>
        </ol>
      </div>
    </aside>
  </div>
</section>
<section class="sec sec--ink philosophy" data-theme="dark" aria-labelledby="phil-title">
  <div class="wrap wrap--narrow philosophy__in">
    <div data-reveal>${eyebrow('Filosofía de trabajo', true)}</div>
    <h2 class="sr-only" id="phil-title">Filosofía de trabajo</h2>
    <blockquote class="quote quote--big" data-reveal style="--d:.08s">
      <p>«Siempre he creído que la transformación inicia desde el ser. Por eso me enfoco no solo en armonizar rostros o miradas, sino en transformar enfoques de vida, aportando mis habilidades en la micropigmentación y mi aprendizaje como coach. Cada persona es un universo infinito por descubrir; yo solo soy una artista que ve su esencia y la realza.»</p>
      <footer>Jenny Muñoz</footer>
    </blockquote>
  </div>
</section>
<section class="sec sec--champagne" aria-labelledby="spec-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Especialidades', title: 'En qué <em>trabaja Jenny.</em>', id: 'spec-title' })}
    <div class="tech">
      <article class="tech__item" data-reveal><span class="tech__n">01</span><h3 class="h4">Micropigmentación capilar</h3><p>Técnicas de simulación folicular para alopecia, entradas y densificación.</p></article>
      <article class="tech__item" data-reveal style="--d:.07s"><span class="tech__n">02</span><h3 class="h4">Camuflaje paramédico</h3><p>Camuflaje estético de cicatrices, estrías, ojeras y otras marcas.</p></article>
      <article class="tech__item" data-reveal style="--d:.14s"><span class="tech__n">03</span><h3 class="h4">Cejas, labios y ojos</h3><p>Diseño de cejas 6D, labios y delineado con enfoque natural.</p></article>
      <article class="tech__item" data-reveal style="--d:.21s"><span class="tech__n">04</span><h3 class="h4">Visagismo y asesoría de imagen</h3><p>Estudio del rostro para diseñar a la medida de cada persona.</p></article>
    </div>
  </div>
</section>
<section class="sec sec--ivory" aria-labelledby="mom-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Momentos', title: 'Formación, trabajo <em>y equipo.</em>', id: 'mom-title' })}
    <div class="moments" data-gallery>
      <button class="work" type="button" data-lightbox data-src="${imgUrl('visagismo')}" data-alt="Valoración de visagismo en el consultorio" data-cap="Valoración y visagismo" data-reveal>${img('visagismo', 'Valoración de visagismo en el consultorio', { max: 960, sizes: '(min-width:900px) 28vw, 46vw' })}<span class="work__cap">Valoración y visagismo</span></button>
      <button class="work" type="button" data-lightbox data-src="${imgUrl('jenny-diploma')}" data-alt="Jenny Muñoz con un reconocimiento en un evento académico de micropigmentación" data-cap="Evento académico de micropigmentación" data-reveal style="--d:.07s">${img('jenny-diploma', 'Jenny Muñoz con un reconocimiento en un evento académico de micropigmentación', { sizes: '(min-width:900px) 28vw, 46vw' })}<span class="work__cap">Evento académico</span></button>
      <button class="work" type="button" data-lightbox data-src="${imgUrl('jenny-trabajo')}" data-alt="Procedimiento de micropigmentación de cejas en el consultorio" data-cap="En el consultorio" data-reveal style="--d:.14s">${img('jenny-trabajo', 'Procedimiento de micropigmentación de cejas en el consultorio', { sizes: '(min-width:900px) 28vw, 46vw' })}<span class="work__cap">En el consultorio</span></button>
      <button class="work" type="button" data-lightbox data-src="${imgUrl('equipo')}" data-alt="Grupo de personas en un encuentro de ArKángel" data-cap="Un encuentro ArKángel" data-reveal style="--d:.21s">${img('equipo', 'Grupo de personas en un encuentro de ArKángel', { sizes: '(min-width:900px) 28vw, 46vw' })}<span class="work__cap">Un encuentro ArKángel</span></button>
    </div>
    <p class="muted muted--center">Diplomas y certificaciones: disponibles para consulta en el consultorio.</p>
  </div>
</section>
${ctaBand({ title: 'Conversemos <em>sobre ti.</em>', text: 'Agenda una valoración con Jenny y descubre qué tratamiento realza mejor tu esencia.', msg: 'Hola Jenny, quisiera agendar una valoración en ArKángel.' })}`,
};

/* ───────── Formación Art Pigmenta ───────── */
const AP_FAQ = [
  { q: '¿Dónde estudiar micropigmentación en Medellín?', a: 'Art Pigmenta, división de formación de Centro Estético ArKángel, ofrece programas especializados en micropigmentación de cejas, labios, barba y cuero cabelludo en Medellín.' },
  { q: '¿Necesito experiencia para estudiar micropigmentación?', a: 'Depende del programa. Algunas formaciones están dirigidas a principiantes y otras a profesionales que desean perfeccionar sus técnicas. Consulta los requisitos de cada curso.' },
  { q: '¿Qué puedo aprender en un curso de micropigmentación?', a: 'Fundamentos de dermopigmentación, diseño, selección de pigmentos, técnicas de aplicación, protocolos de trabajo y criterios de seguridad, según el programa.' },
  { q: '¿Art Pigmenta ofrece formación en micropigmentación capilar?', a: 'Sí. Scalp Master 3D está orientado al aprendizaje de técnicas de simulación folicular y densidad visual capilar.' },
  { q: '¿Dónde está ubicada Art Pigmenta?', a: 'Art Pigmenta desarrolla sus formaciones en Medellín, Colombia, como división de Centro Estético ArKángel.' },
];

export const formacion = {
  path: '/formacion-art-pigmenta/',
  title: 'Art Pigmenta: cursos de micropigmentación en Medellín — ArKángel',
  description: 'Art Pigmenta, la formación profesional de ArKángel en Medellín: cursos de micropigmentación de cejas, labios, barba y capilar, teórico-prácticos y en grupos de máximo 4 alumnos.',
  waMsg: 'Hola Art Pigmenta, quiero información sobre los cursos de micropigmentación.',
  ogImage: imgUrl('curso-capilar', 1200),
  ld: () => [
    businessLd(), faqLd(AP_FAQ),
    breadcrumbLd([{ label: 'Inicio', href: '/' }, { label: 'Art Pigmenta', href: '/formacion-art-pigmenta/' }]),
    ...PROGRAMS.map((p) => ({ '@context': 'https://schema.org', '@type': 'Course', name: `${p.name} – ${p.sub}`, description: p.desc,
      provider: { '@type': 'Organization', name: 'Art Pigmenta by Centro Estético ArKángel', sameAs: SITE.url } })),
  ],
  body: () => `
<section class="page-hero ap-hero" data-theme="dark">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="wrap page-hero__grid">
    <div class="page-hero__copy">
      <nav class="crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Art Pigmenta</span></li></ol></nav>
      <p class="ap-hero__word rise" style="--i:1"><span>Art</span><span>Pigmenta</span></p>
      <p class="ap__eyebrow rise" style="--i:2">By Centro Estético ArKángel · Formación profesional</p>
      <h1 class="h1 rise" style="--i:3">Transforma tu talento en <em>una habilidad profesional.</em></h1>
      <p class="lead lead--light rise" style="--i:4">Formamos profesionales en micropigmentación y dermopigmentación con entrenamiento práctico y técnicas enfocadas en resultados naturales, precisión y excelencia artística.</p>
      <div class="btn-row rise" style="--i:5">
        ${waBtn('Hola Art Pigmenta, quiero separar mi cupo en un curso.', 'Separa tu cupo')}
        ${btn({ href: '#programas', label: 'Ver los cursos', variant: 'ghost' })}
      </div>
    </div>
    <div class="page-hero__media rise" style="--i:3"><div class="arch" data-parallax-wrap>${img('curso-capilar', 'Clase práctica de micropigmentación capilar en Art Pigmenta', { eager: true, max: 1200, sizes: '(min-width:900px) 34vw, 80vw', attrs: 'data-parallax="0.06"' })}</div></div>
  </div>
</section>
<section class="sec sec--ink ap" data-theme="dark" aria-labelledby="ap-intro">
  <div class="wrap ap-intro">
    <div>
      <div data-reveal><p class="ap__eyebrow">Aprende técnicas que marcan la diferencia</p></div>
      <h2 class="h2" id="ap-intro" data-reveal style="--d:.06s">Para quienes empiezan y para quienes <em>quieren perfeccionarse.</em></h2>
    </div>
    <div>
      <p class="lead lead--light" data-reveal style="--d:.1s">Nuestros programas están diseñados para personas que desean iniciar su camino en la micropigmentación y para profesionales que buscan actualizar sus conocimientos, perfeccionar su técnica y ampliar su portafolio de servicios.</p>
      <p class="lead lead--light" data-reveal style="--d:.16s">Formaciones teórico-prácticas, personalizadas o en grupos de máximo 4 alumnos.</p>
    </div>
  </div>
</section>
<section class="sec sec--ink ap ap--cards" data-theme="dark" id="programas" aria-labelledby="prog-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Nuestras formaciones especializadas', title: 'Cuatro programas, <em>un mismo estándar.</em>', light: true, id: 'prog-title' })}
    <div class="prog-grid">
      ${PROGRAMS.map((p, i) => `
      <article class="prog" data-reveal style="--d:${(i % 2) * 0.08}s">
        <span class="prog__n">0${i + 1}</span>
        <h3 class="prog__t">${p.name}</h3>
        <p class="prog__s">${p.sub}</p>
        <p class="prog__d">${p.desc}</p>
        <div class="prog__act">
          <a class="link-arrow link-arrow--gold" href="${waLink(`Hola Art Pigmenta, quiero consultar los contenidos del programa ${p.name} – ${p.sub}.`)}" target="_blank" rel="noopener noreferrer" data-wa data-track="whatsapp">Consultar contenidos ${icon('arrow')}</a>
          <a class="wa-chip wa-chip--gold" href="${waLink(`Hola Art Pigmenta, quiero separar mi cupo en el programa ${p.name} – ${p.sub}.`)}" target="_blank" rel="noopener noreferrer" data-wa data-track="whatsapp">${icon('wa')}<span>Separar cupo</span></a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section class="sec sec--ink ap" data-theme="dark" aria-labelledby="why-title">
  <div class="wrap ap-why">
    <div>
      ${sectionHead({ eyebrow: '¿Por qué Art Pigmenta?', title: 'Una formación <em>respaldada por la práctica.</em>', light: true, id: 'why-title' })}
    </div>
    <ul class="ticks ticks--light">
      ${['Entrenamiento orientado a la práctica.', 'Enseñanza personalizada y acompañamiento.', 'Conocimientos técnicos y artísticos.', 'Enfoque en resultados naturales y armónicos.', 'Formación respaldada por la experiencia de Centro Estético ArKángel.', 'Desarrollo de habilidades para ampliar tus oportunidades profesionales.']
        .map((t, i) => `<li data-reveal style="--d:${i * 0.05}s">${icon('check')}<span>${t}</span></li>`).join('')}
    </ul>
  </div>
</section>
<section class="sec sec--champagne" aria-labelledby="master-title">
  <div class="wrap master">
    <div class="master__media" data-reveal="mask">${img('jenny-diploma', 'Jenny Muñoz, master en dermopigmentación', { sizes: '(min-width:900px) 26vw, 70vw' })}</div>
    <div>
      <div data-reveal>${eyebrow('Tu instructora')}</div>
      <h2 class="h2" id="master-title" data-reveal style="--d:.06s">Aprende con <em>Jenny Muñoz.</em></h2>
      <p data-reveal style="--d:.12s">Master en dermopigmentación, con formación superior en Cosmetología Capilar y Asesoría de Imagen y especialización en micropigmentación capilar y paramédica. Una mirada artística y un enfoque humano para formar profesionales.</p>
      <div class="btn-row" data-reveal style="--d:.18s">${btn({ href: '/jenny-munoz/', label: 'Conoce a Jenny', variant: 'ink' })}</div>
    </div>
  </div>
</section>
<section class="sec sec--ivory" aria-labelledby="faq-title">
  <div class="wrap wrap--narrow">
    ${sectionHead({ eyebrow: 'Preguntas frecuentes', title: 'Sobre nuestras <em>formaciones.</em>', id: 'faq-title' })}
    ${faq(AP_FAQ)}
  </div>
</section>
<section class="sec sec--ink ap" data-theme="dark" id="cupo" aria-labelledby="cupo-title">
  <div class="wrap contact contact--ap">
    <div>
      ${sectionHead({ eyebrow: 'Separa tu cupo', title: 'El futuro de la belleza <em>está en tus manos.</em>', lead: 'Aprende, especialízate y convierte tu talento en oportunidades para transformar imágenes y fortalecer la confianza.', light: true, id: 'cupo-title' })}
    </div>
    <div class="card-form card-form--dark" data-reveal>
      ${contactForm({ id: 'ap', kind: 'formacion', light: false, options: PROGRAMS.map((p) => `${p.name} – ${p.sub}`).concat(['Aún no lo sé, quiero asesoría']), msgPlaceholder: '¿Tienes experiencia previa? Cuéntanos (opcional)', submit: 'Separar mi cupo' })}
    </div>
  </div>
</section>`,
};

/* ───────── Contacto ───────── */
export const contacto = {
  path: '/contacto/',
  title: 'Contacto y ubicación en Medellín — ArKángel Micropigmentación',
  description: 'Agenda tu valoración en ArKángel: Calle 53 # 77E-12, Los Colores, Medellín. WhatsApp +57 310 525 9571, correo, mapa y formulario de contacto.',
  waMsg: 'Hola ArKángel, quiero agendar una valoración.',
  ld: () => [businessLd(), breadcrumbLd([{ label: 'Inicio', href: '/' }, { label: 'Contacto', href: '/contacto/' }])],
  body: () => `
${pageHero({
  eyebrow: 'Contacto', title: 'Agenda tu <em>valoración.</em>',
  lead: 'Cuéntanos qué quieres mejorar. Te responderemos por WhatsApp para coordinar tu cita.',
  crumbs: [{ label: 'Inicio', href: '/' }, { label: 'Contacto', href: '/contacto/' }],
  ctas: waBtn('Hola ArKángel, quiero agendar una valoración.', 'Escríbenos por WhatsApp') + btn({ href: `tel:${SITE.phoneTel}`, label: 'Llamar', variant: 'ghost', icon: 'phone', attrs: 'data-track="call"' }),
})}
<section class="sec sec--ivory" aria-labelledby="loc-title">
  <div class="wrap contact">
    <div class="contact__info">
      <h2 class="h2" id="loc-title" data-reveal>Visítanos en <em>Medellín.</em></h2>
      <ul class="contact__list" data-reveal style="--d:.1s">
        <li>${icon('pin')}<div><b>${SITE.address.street}</b><span>${SITE.address.zone}, ${SITE.address.city}, ${SITE.address.country}</span><span>Sector Estadio – Los Colores</span><a class="link-arrow" href="${MAP_DIRECTIONS}" target="_blank" rel="noopener noreferrer">Cómo llegar ${icon('arrow')}</a></div></li>
        <li>${icon('phone')}<div><b><a href="tel:${SITE.phoneTel}" data-track="call">${SITE.phone}</a></b><span>Llamadas y WhatsApp</span></div></li>
        <li>${icon('mail')}<div><b><a href="mailto:${SITE.email}">${SITE.email}</a></b><span>Correo electrónico</span></div></li>
        <li>${icon('ig')}<div><b><a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer">@esteticaarkangel</a></b><span>Instagram y Facebook</span></div></li>
      </ul>
      <div data-reveal style="--d:.16s">${mapFacade()}</div>
      <p class="muted" data-reveal>También atendemos en ${SITE.otherCities}.</p>
    </div>
    <div class="contact__form" data-reveal style="--d:.15s">
      <div class="card-form">
        <h3 class="h3">Solicita tu valoración</h3>
        <p class="muted">Déjanos tus datos y tu consulta; continúas la conversación por WhatsApp.</p>
        ${contactForm({ id: 'ct', options: ['Micropigmentación capilar', 'Micropigmentación de barba', 'Cejas masculinas', 'Cejas pelo a pelo (mujeres)', 'Labios', 'Delineado de ojos', 'Camuflaje de cicatrices / ojeras', 'Formación Art Pigmenta', 'Otro / no estoy segura(o)'] })}
      </div>
    </div>
  </div>
</section>`,
};

/* ───────── Gracias ───────── */
export const gracias = {
  path: '/gracias/', noindex: true,
  title: 'Gracias por contactar a ArKángel',
  description: 'Gracias por contactar a ArKángel. Te responderemos muy pronto.',
  waMsg: 'Hola ArKángel, acabo de dejar mis datos en la página.',
  ld: () => [],
  body: () => `
<section class="page-hero page-hero--thanks" data-theme="dark">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="wrap thanks">
    <div class="rise" style="--i:1">${eyebrow('Gracias por contactar a ArKángel', true)}</div>
    <h1 class="h1 rise" style="--i:2">Recibimos <em>tu mensaje.</em></h1>
    <p class="lead lead--light rise" style="--i:3">Si no se abrió WhatsApp, escríbenos directamente y coordinamos tu valoración.</p>
    <div class="btn-row btn-row--center rise" style="--i:4">
      ${waBtn('Hola ArKángel, acabo de dejar mis datos en la página.', 'Abrir WhatsApp')}
      ${btn({ href: '/', label: 'Volver al inicio', variant: 'ghost' })}
    </div>
  </div>
</section>`,
};

/* ───────── Política de privacidad ───────── */
export const privacidad = {
  path: '/politica-de-privacidad/',
  title: 'Política de privacidad — ArKángel Micropigmentación',
  description: 'Política de privacidad y tratamiento de datos personales de Centro Estético ArKángel.',
  waMsg: 'Hola ArKángel, quisiera más información.',
  ld: () => [],
  body: () => `
${pageHero({ eyebrow: 'Legal', title: 'Política de <em>privacidad.</em>', crumbs: [{ label: 'Inicio', href: '/' }, { label: 'Política de privacidad', href: '/politica-de-privacidad/' }] })}
<section class="sec sec--paper">
  <div class="wrap wrap--narrow prose">
    <p class="muted"><strong>Borrador pendiente de revisión legal.</strong> Este texto sustituye la política genérica del sitio anterior; debe ser validado por ArKángel y su asesor jurídico antes de publicarse.</p>
    <h2>Responsable del tratamiento</h2>
    <p>${SITE.legalName}, ${SITE.address.street}, ${SITE.address.zone}, ${SITE.address.city}, ${SITE.address.country}. Correo: <a href="mailto:${SITE.email}">${SITE.email}</a>. Teléfono: ${SITE.phone}.</p>
    <h2>Datos que recogemos</h2>
    <p>Cuando completas nuestros formularios podemos recibir tu nombre, teléfono, correo electrónico (opcional), el tratamiento de tu interés y el mensaje que escribas. Si te contactas por WhatsApp, llamada o correo, recibiremos los datos que tú nos compartas.</p>
    <h2>Finalidad</h2>
    <p>Usamos tus datos únicamente para responder tu consulta, coordinar valoraciones y citas, y brindarte información sobre nuestros servicios y formaciones. Podrás pedir que dejemos de contactarte en cualquier momento.</p>
    <h2>Tus derechos</h2>
    <p>De acuerdo con la Ley 1581 de 2012 y sus normas reglamentarias, puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, así como revocar la autorización otorgada, escribiendo a <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    <h2>Fotografías de resultados</h2>
    <p>Las imágenes de antes y después se publican con la autorización de las personas que aparecen en ellas.</p>
    <h2>Cookies y servicios de terceros</h2>
    <p>Este sitio no utiliza cookies de seguimiento propias. Al cargar el mapa interactivo se utilizan servicios de Google Maps, sujetos a sus propias políticas; el mapa solo se carga si lo activas. Los enlaces a WhatsApp, Instagram y Facebook te llevan a sitios de terceros.</p>
    <h2>Cambios</h2>
    <p>Podemos actualizar esta política; la versión vigente estará siempre en esta página.</p>
  </div>
</section>`,
};

/* ───────── 404 ───────── */
export const notFound = {
  path: '/404.html', file: '404.html', noindex: true,
  title: 'Página no encontrada — ArKángel',
  description: 'La página que buscas no existe.',
  waMsg: 'Hola ArKángel, quisiera más información.',
  ld: () => [],
  body: () => `
<section class="page-hero page-hero--thanks" data-theme="dark">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="wrap thanks">
    <div class="rise" style="--i:1">${eyebrow('Error 404', true)}</div>
    <h1 class="h1 rise" style="--i:2">Esta página <em>no existe.</em></h1>
    <p class="lead lead--light rise" style="--i:3">Quizá el enlace cambió. Vuelve al inicio o explora nuestros tratamientos.</p>
    <div class="btn-row btn-row--center rise" style="--i:4">
      ${btn({ href: '/', label: 'Volver al inicio', variant: 'gold' })}
      ${btn({ href: '/micropigmentacion-masculina/', label: 'Ver tratamientos', variant: 'ghost' })}
    </div>
  </div>
</section>`,
};
