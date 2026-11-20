// Datos globales del sitio. Todo dato de contacto sale de aquí (una sola fuente de verdad).
export const SITE = {
  name: 'ArKángel',
  legalName: 'Centro Estético ArKángel',
  brand: 'Micropigmentación ArKángel',
  url: 'https://micropigmentacionarkangel.com', // dominio de producción (canonical, sitemap)
  phone: '+57 310 525 9571',
  phoneTel: '+573105259571',
  wa: '573105259571',
  email: 'asesoria@micropigmentacionarkangel.com',
  address: {
    street: 'Calle 53 # 77E-12',
    zone: 'Los Colores',
    city: 'Medellín',
    region: 'Antioquia',
    country: 'Colombia',
  },
  geo: { lat: 6.26684, lng: -75.59526 },
  instagram: 'https://www.instagram.com/esteticaarkangel/',
  facebook: 'https://www.facebook.com/esteticaarkangel',
  // Si se define, el formulario envía JSON por POST a este endpoint (p. ej. Formspree / Cloudflare Worker).
  // Vacío = el formulario compone un mensaje de WhatsApp (funciona sin servidor).
  formEndpoint: '',
  otherCities: 'Ciudad de Panamá, Barranquilla y Bogotá',
  // Ver README: la cifra de años de experiencia está pendiente de validar (14 vs. desde 2011).
  experienceLabel: 'Más de una década',
};

export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Hombres', href: '/micropigmentacion-masculina/' },
  { label: 'Mujeres', href: '/micropigmentacion-femenina/' },
  { label: 'Paramédica', href: '/micropigmentacion-paramedica/' },
  { label: 'Resultados', href: '/resultados/' },
  { label: 'Jenny', href: '/jenny-munoz/' },
  { label: 'Art Pigmenta', href: '/formacion-art-pigmenta/' },
  { label: 'Contacto', href: '/contacto/' },
];

export const waLink = (msg) =>
  `https://wa.me/${SITE.wa}?text=${encodeURIComponent(msg)}`;

export const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9763719401335!2d-75.59525878523058!3d6.2668376954640586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44291443d75733%3A0xf1e38fa7925f007!2sCentro%20Estetico%20Arkangel%20micropigmentacion%20capilar!5e0!3m2!1ses!2sco!4v1603855591348!5m2!1ses!2sco';
export const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`;
