// Contenido del sitio. Todo proviene del sitio actual de ArKángel (reorganizado).
// Lo que NO aparece publicado en el sitio original no se incluye (ni cifras, ni certificaciones, ni reseñas nuevas).

export const GROUPS = {
  hombres: {
    id: 'hombres',
    label: 'Hombres',
    title: 'Micropigmentación masculina',
    href: '/micropigmentacion-masculina/',
    lead: 'Resultados naturales que realzan tu rostro sin perder tu esencia.',
    img: 'capilar-after-1',
    alt: 'Cabeza con micropigmentación capilar efecto rapado',
  },
  mujeres: {
    id: 'mujeres',
    label: 'Mujeres',
    title: 'Micropigmentación femenina',
    href: '/micropigmentacion-femenina/',
    lead: 'Mirada, labios y rasgos definidos, sin depender del maquillaje diario.',
    img: 'cejas-pelo',
    alt: 'Cejas diseñadas pelo a pelo',
  },
  paramedica: {
    id: 'paramedica',
    label: 'Paramédica',
    title: 'Micropigmentación paramédica',
    href: '/micropigmentacion-paramedica/',
    lead: 'Camuflaje estético de cicatrices y otras marcas de la piel.',
    img: 'cicatriz',
    alt: 'Camuflaje de cicatriz, antes y después',
  },
};

// Servicios. `page` = página propia; si no existe, enlaza a la página de la categoría con ancla.
export const SERVICES = [
  // — Hombres —
  {
    id: 'capilar', group: 'hombres', name: 'Micropigmentación capilar',
    desc: 'Simula folículos para lograr un efecto de cabeza rapada con densidad, o disimular entradas y zonas con poca cobertura.',
    benefit: 'Densidad visual inmediata, sin cirugía.',
    href: '/micropigmentacion-capilar-medellin/', img: 'capilar-after-1', imgW: 640,
    alt: 'Resultado de micropigmentación capilar en un paciente de ArKángel',
  },
  {
    id: 'barba', group: 'hombres', name: 'Micropigmentación de barba',
    desc: 'Rellena zonas con poco vello, define contornos y aporta volumen con un efecto de sombreado tridimensional.',
    benefit: 'Barba definida, simétrica y con cuerpo.',
    href: '/micropigmentacion-de-barba/', img: 'barba-sombra', imgW: 500,
    alt: 'Micropigmentación de barba con diseño de contorno',
  },
  {
    id: 'cejas-hombre', group: 'hombres', name: 'Cejas masculinas 6D',
    desc: 'Diseño pelo a pelo que respeta la dirección del vello y la fisonomía masculina, con un acabado hiperrealista.',
    benefit: 'Una mirada con carácter y aspecto natural.',
    href: '/micropigmentacion-cejas-hombres/', img: 'cejas-after', imgW: 640,
    alt: 'Cejas masculinas micropigmentadas efecto 6D',
  },
  // — Mujeres —
  {
    id: 'cejas-mujer', group: 'mujeres', name: 'Diseño de cejas pelo a pelo',
    desc: 'Cejas definidas, armónicas y de apariencia natural, diseñadas a la medida de tus facciones.',
    benefit: 'Miradas expresivas, sin maquillaje diario.',
    href: '/micropigmentacion-femenina/#cejas', img: 'cejas-pelo', imgW: 500,
    alt: 'Cejas pelo a pelo micropigmentadas',
  },
  {
    id: 'labios', group: 'mujeres', name: 'Micropigmentación de labios',
    desc: 'Realza el color y la definición de tus labios, con un volumen visual sutil.',
    benefit: 'Color y forma, incluso sin labial.',
    href: '/micropigmentacion-femenina/#labios', img: 'labios', imgW: 500,
    alt: 'Procedimiento de micropigmentación de labios',
  },
  {
    id: 'ojos', group: 'mujeres', name: 'Delineado de ojos',
    desc: 'Delineado permanente y densidad de pestañas para una mirada intensa y bien definida.',
    benefit: 'Ojos destacados desde que te despiertas.',
    href: '/micropigmentacion-femenina/#ojos', img: 'cejas-diseno-mujer', imgW: 500,
    alt: 'Delineado de ojos y diseño de cejas',
  },
  {
    id: 'pestanas', group: 'mujeres', name: 'Pestañas: extensiones y ondulado',
    desc: 'Extensiones pelo a pelo y ondulado de pestañas para una mirada expresiva y cautivadora.',
    benefit: 'Mirada abierta y luminosa.',
    href: '/micropigmentacion-femenina/#complementarios', img: 'pestanas', imgW: 500,
    alt: 'Ondulado de pestañas, antes y después',
  },
  {
    id: 'cejas-estetica', group: 'mujeres', name: 'Cejas: hilo, henna y laminado',
    desc: 'Depilación con hilo, sombreado con henna y laminado para dar estructura y armonía a tu rostro.',
    benefit: 'Definición y precisión sin maltratar la piel.',
    href: '/micropigmentacion-femenina/#complementarios', img: 'henna-cejas', imgW: 500,
    alt: 'Cejas con sombreado de henna',
  },
  // — Paramédica —
  {
    id: 'cicatrices', group: 'paramedica', name: 'Camuflaje de cicatrices',
    desc: 'Pigmentación con tonos acordes a tu piel para suavizar visualmente cicatrices, incluidas las de cirugías.',
    benefit: 'Menos protagonismo para las marcas que te incomodan.',
    href: '/micropigmentacion-paramedica/#cicatrices', img: 'cicatriz', imgW: 500,
    alt: 'Camuflaje de cicatriz, antes y después',
  },
  {
    id: 'ojeras', group: 'paramedica', name: 'Camuflaje de ojeras',
    desc: 'Técnica que unifica el tono de la zona con un color acorde a tu rostro, para una mirada más descansada.',
    benefit: 'Adiós a la mirada de cansancio.',
    href: '/micropigmentacion-paramedica/#ojeras', img: 'ojeras', imgW: 500,
    alt: 'Procedimiento de camuflaje de ojeras',
  },
  {
    id: 'cuero-cabelludo', group: 'paramedica', name: 'Camuflaje en cuero cabelludo',
    desc: 'Disimula cicatrices en el cuero cabelludo integrándolas con el resto de la zona rapada.',
    benefit: 'Un cuero cabelludo más uniforme a la vista.',
    href: '/micropigmentacion-paramedica/#cicatrices', img: 'cicatriz-capilar', imgW: 400,
    alt: 'Camuflaje de cicatriz en cuero cabelludo, antes y después',
  },
];

// Pares antes/después. Solo aparecen los que se pueden emparejar con certeza con el material publicado.
// `ratio` = proporción del marco; `pos` = object-position para encuadrar.
export const CASES = [
  {
    id: 'capilar-grado7', cat: 'capilar', title: 'Capilar · Grado 7',
    tech: 'Técnica rapado',
    before: 'capilar-before-1', after: 'capilar-after-1', bw: 804, aw: 960,
    ratio: '4 / 5', pos: '50% 32%',
    alt: 'Micropigmentación capilar efecto rapado: antes y después',
  },
  {
    id: 'capilar-grado6', cat: 'capilar', title: 'Capilar · Grado 6',
    tech: 'Técnica 3D',
    before: 'capilar-before-2', after: 'capilar-after-2', bw: 809, aw: 810,
    ratio: '1 / 1', pos: '50% 35%',
    alt: 'Micropigmentación capilar técnica 3D: antes y después',
  },
  {
    id: 'capilar-corona', cat: 'capilar', title: 'Capilar · Corona',
    tech: 'Densificación',
    before: 'capilar-before-3', after: 'capilar-after-3', bw: 916, aw: 576,
    ratio: '3 / 4', pos: '50% 30%',
    alt: 'Micropigmentación capilar de densificación en la corona: antes y después',
  },
  {
    id: 'cejas-3d', cat: 'cejas', title: 'Cejas masculinas',
    tech: 'Diseño 3D / 6D',
    before: 'cejas-before', after: 'cejas-after', bw: 1266, aw: 1415,
    ratio: '1 / 1', pos: '50% 50%',
    alt: 'Cejas masculinas micropigmentadas: antes y después',
  },
];

// Galería de trabajos (fotografías individuales, sin pretender comparación)
export const WORKS = [
  { cat: 'capilar', img: 'capilar-entradas', w: 1207, alt: 'Micropigmentación capilar: entradas y óvalo', cap: 'Capilar · Entradas y óvalo' },
  { cat: 'capilar', img: 'capilar-herradura', w: 810, alt: 'Micropigmentación capilar efecto rapado', cap: 'Capilar · Efecto rapado' },
  { cat: 'cejas', img: 'cejas-diseno', w: 1200, alt: 'Diseños de cejas masculinas pelo a pelo', cap: 'Cejas · Diseño pelo a pelo' },
  { cat: 'barba', img: 'barba-sombra', w: 500, alt: 'Micropigmentación de barba con diseño de contorno', cap: 'Barba · Contorno y sombreado' },
  { cat: 'barba', img: 'barba-proceso', w: 500, alt: 'Micropigmentación de barba en proceso', cap: 'Barba · En proceso' },
  { cat: 'paramedica', img: 'cicatriz', w: 500, alt: 'Camuflaje de cicatriz, antes y después', cap: 'Paramédica · Camuflaje de cicatriz' },
  { cat: 'paramedica', img: 'cicatriz-capilar', w: 400, alt: 'Camuflaje de cicatriz en cuero cabelludo', cap: 'Paramédica · Cuero cabelludo' },
  { cat: 'paramedica', img: 'ojeras', w: 500, alt: 'Camuflaje de ojeras en proceso', cap: 'Paramédica · Ojeras' },
  { cat: 'mujeres', img: 'cejas-pelo', w: 500, alt: 'Cejas pelo a pelo', cap: 'Mujeres · Cejas pelo a pelo' },
  { cat: 'mujeres', img: 'labios', w: 500, alt: 'Micropigmentación de labios en proceso', cap: 'Mujeres · Labios' },
  { cat: 'mujeres', img: 'cejas-diseno-mujer', w: 500, alt: 'Delineado de ojos y diseño de cejas', cap: 'Mujeres · Ojos y cejas' },
  { cat: 'mujeres', img: 'henna-cejas', w: 500, alt: 'Cejas con henna', cap: 'Mujeres · Henna' },
  { cat: 'mujeres', img: 'pestanas', w: 500, alt: 'Ondulado de pestañas', cap: 'Mujeres · Ondulado de pestañas' },
];

export const CATS = [
  { id: 'todos', label: 'Todos' },
  { id: 'capilar', label: 'Capilar' },
  { id: 'cejas', label: 'Cejas' },
  { id: 'barba', label: 'Barba' },
  { id: 'mujeres', label: 'Mujeres' },
  { id: 'paramedica', label: 'Paramédica' },
];

// Testimonios publicados en el sitio actual (ortografía y puntuación ajustadas; sin cambiar el sentido).
export const TESTIMONIALS = [
  {
    name: 'Jonathan',
    text: 'Cambió mi vida. La calidad en el servicio y sus procesos innovadores están a la vanguardia. Allí no solo recibí la asesoría para resolver mi problema, sino que encontré la calidez de su personal y su profesionalismo.',
  },
  {
    name: 'María',
    text: 'Me gusta que se interesan en la satisfacción de sus usuarios y en cumplir con sus expectativas. Más que una estética es un encuentro espiritual: me gusta el servicio, la organización y la aromaterapia.',
  },
];

// Art Pigmenta — programas publicados en el sitio actual.
export const PROGRAMS = [
  {
    id: 'cejas', name: 'Design Elite', sub: 'Cejas 3D',
    desc: 'Diseño y técnicas de micropigmentación de cejas con enfoque hiperrealista, armonía facial y naturalidad.',
  },
  {
    id: 'labios', name: 'Lip Pro Master', sub: 'Micropigmentación de labios',
    desc: 'Habilidades para trabajar la pigmentación, la definición y la armonización del color de los labios.',
  },
  {
    id: 'barba', name: 'Barber Ink Revolution', sub: 'Micropigmentación de barba',
    desc: 'Técnicas para recrear densidad y definición en la zona de la barba.',
  },
  {
    id: 'capilar', name: 'Scalp Master 3D', sub: 'Micropigmentación capilar',
    desc: 'Técnicas de simulación folicular para crear una apariencia de mayor densidad y trabajar diferentes patrones de alopecia.',
  },
];

export const BIOSEG = [
  { t: 'Entorno estéril en cada intervención', d: 'Material de precisión desechable de un solo uso en cada procedimiento.' },
  { t: 'Insumos de alta gama', d: 'Pigmentos certificados e insumos seleccionados para cada tratamiento.' },
  { t: 'Atención a puerta cerrada', d: 'Cada procedimiento se realiza en un espacio privado, sin interrupciones.' },
  { t: 'Bienestar durante la sesión', d: 'Aromaterapia, música relajante y anestesia tópica para tu comodidad.' },
];

export const PROCESS = [
  { t: 'Valoración', d: 'Conversamos, observamos tu rostro y tu caso, y definimos si el tratamiento es adecuado para ti.' },
  { t: 'Diseño personalizado', d: 'Definimos técnica, forma y tono según tus facciones, tu piel y lo que quieres expresar.' },
  { t: 'Sesión', d: 'Procedimiento en un entorno privado, con material desechable y anestesia tópica para tu comodidad.' },
  { t: 'Cuidados posteriores', d: 'Recibes indicaciones personalizadas para una buena cicatrización y un resultado estable.' },
];
