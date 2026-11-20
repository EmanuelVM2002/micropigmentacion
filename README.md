# ArKángel · Rediseño web premium

Sitio estático (HTML + CSS + JS sin dependencias) que reemplaza al WordPress/Divi actual de
<https://micropigmentacionarkangel.com/>. Contenido y fotos salen del sitio actual, reorganizados.
Lo que el sitio actual no publica **no se inventó** (ver «Pendiente de validar»).

## Cómo verlo y publicarlo

```powershell
node build.mjs        # genera dist/
node serve.mjs 8871   # http://localhost:8871/
```

- Vista previa dentro de Claude: servidor `arkangel` (puerto 8871) en `.claude/launch.json`.
- Publicar una dirección **de prueba** en Cloudflare: doble clic en `Publicar-ArKangel.bat`
  (genera `dist/` y hace `wrangler deploy` a `arkangel-rediseno.*.workers.dev`; no toca el sitio actual).
- Pasar al dominio real: conectar `micropigmentacionarkangel.com` al proyecto cuando el cliente apruebe.
  `dist/_redirects` ya contiene las 301 desde las URLs viejas (cejas hombres, mujeres, academia, blog, gracias, privacy-policy).

## Decisión técnica

No hay acceso al código del WordPress (solo al sitio público), así que no se «modificó» el original:
se construyó un sitio nuevo. Se eligió generador estático propio en vez de otro WordPress porque el
sitio actual pesa 263 KB solo de HTML en el inicio y carga Divi + varios plugins (Yoast, PixelYourSite,
Facebook Pixel, consentimiento de cookies…). Estático = Core Web Vitals por defecto, sin
mantenimiento de plugins y hosting casi gratuito. Contrapartida: el contenido se edita en
`src/data.mjs` y `src/pages/*.mjs` (no hay panel); si ArKángel necesita editar solo, hay que
añadir un CMS ligero (p. ej. Decap/Sanity) en una segunda fase.

## Estructura

```
build.mjs / serve.mjs        generador y servidor local
src/config.mjs               teléfono, dirección, redes, menú (única fuente de verdad)
src/data.mjs                 servicios, casos antes/después, testimonios, cursos
src/components.mjs           componentes: header, footer, tarjetas, comparador, formulario, FAQ, JSON-LD…
src/pages/*.mjs              inicio, categorías, tratamientos, resultados, Jenny, formación, contacto, legales
src/css/*.css · src/js/site.js   sistema de diseño e interacciones
assets/img · assets/fonts    WebP optimizado (srcset) y tipografías alojadas (Cormorant Garamond + Jost)
```

Arquitectura (menú): Inicio · Hombres · Mujeres · Paramédica · Resultados · Jenny · Art Pigmenta · Contacto,
más páginas comerciales propias: Micropigmentación capilar, de barba y cejas masculinas.

## Qué incluye

- Hero a pantalla completa con animaciones de entrada, parallax sutil, ticker de especialidades,
  indicadores de sección y barra de progreso, menú animado (escritorio) y menú de pantalla completa (móvil).
- Servicios por categoría (pestañas + carrusel táctil con scroll-snap): foto, nombre, descripción,
  beneficio, «Conocer más» y WhatsApp con mensaje del servicio consultado.
- Comparadores antes/después con deslizador (accesible por teclado), galería filtrable y lightbox con
  navegación (flechas, teclado, deslizar con el dedo).
- Jenny Muñoz, instalaciones/bioseguridad, testimonios, Art Pigmenta (identidad propia negro/dorado),
  ubicación con mapa que solo carga al pulsarlo (privacidad y velocidad), formularios validados.
- WhatsApp flotante y CTAs en todos los puntos; el formulario compone el mensaje y abre WhatsApp
  (funciona sin servidor). Para enviar también por correo: poner `formEndpoint` en `src/config.mjs`.
- SEO: títulos/descripciones únicos, canonical, Open Graph, sitemap, robots, JSON-LD
  (BeautySalon/LocalBusiness, Service, FAQPage, Course, Person, BreadcrumbList), una `h1` por página.
- Seguridad: cabeceras en `dist/_headers` (CSP estricta, sin scripts inline, X-Frame-Options, etc.), honeypot anti-spam.
- Accesibilidad: enlace «saltar al contenido», foco visible, ARIA en pestañas/menú/diálogos, contraste AA,
  `prefers-reduced-motion` respetado (sin animaciones, parallax ni autoplay).

## Pendiente de validar con ArKángel (inconsistencias del sitio actual)

| Tema | Qué dice el sitio actual | Qué hace el rediseño |
|---|---|---|
| Años de experiencia | «14 años», «desde 2011» (≈15 en 2026), «década y media», «más de una década» | Solo «Más de una década» (cierto en ambos casos). **Definir la cifra.** |
| «95 % de pacientes sin retoques en 12 meses» | «Estudio interno», con alcances distintos (capilar / «facial») y sin evidencia | **No se incluye.** Contradice además el retoque recomendado al mes (cejas). |
| Testimonios | Mismo texto firmado «Jonathan / Johathan / José»; otro firmado «María» (inicio) y «Mario» (otras páginas); citas de «Carlos» y «Andrés» que parecen texto SEO | Solo dos testimonios (Jonathan, María), con ortografía corregida. **Confirmar autoría y permiso.** |
| Duración de la barba | «1 a 3 años» y «2 a 4 años» | No se da cifra. |
| Pigmentos | «orgánicos» (capilar) vs «inorgánicos, hipoalergénicos, de base mineral» (cejas) | No se afirma composición. |
| Promoción 15 % (cejas hombres) | Sin vigencia | Omitida. |
| Precios capilares | Publicados (desde $390.000 COP) | Incluidos como «valores de referencia» en la FAQ; **confirmar vigencia.** |
| Formación de Jenny | «Pivont Point» | Corregido a «Pivot Point»; confirmar. |
| Certificaciones | «múltiples diplomas internacionales», sin detalle | Solo mención genérica; **enviar lista de diplomas** para mostrarlos. |
| Horarios | No publicados | No se muestran. |
| Otras ciudades | «Ciudad de Panamá, Barranquilla y Bogotá» | Incluido tal cual; confirmar. |
| Meta Pixel (606576730406279) | Activo en el sitio actual | **No migrado** (requiere consentimiento de cookies). Añadir con banner de consentimiento si se mantiene la pauta. |
| Política de privacidad | Plantilla genérica | Borrador nuevo (Ley 1581/2012), **requiere revisión legal**. |

## Fotografías: limitaciones reales

- Solo hay **4 pares antes/después** emparejables con certeza (3 capilares + cejas masculinas). El par
  «Grado 6 · técnica 3D» se emparejó por similitud visual (los dos archivos se llaman «antes»): validar.
- No hay pares de labios, barba, cejas femeninas ni paramédica. Hacen falta más con autorización escrita de cada persona.
- La mayoría de las fotos del sitio actual miden 400–1000 px. Varias llevan la marca de agua de ArKángel; otras
  parecen de banco de imágenes y **no se usaron**. Para un nivel «clínica internacional» se recomienda una sesión
  fotográfica profesional (retratos de Jenny, consultorio, detalle de procesos, resultados).
- Fotos identificadas como Jenny: retrato del hero, evento académico. Otras imágenes de procedimientos muestran a otras personas
  y se rotularon sin nombre.
- Tratamientos sin foto propia (se presentan sin imagen): efecto densidad de pestañas, piel porcelana, BB Glow,
  laminado de cejas, embellecimiento de areola, estrías.
- Art Pigmenta no tiene logo: se creó una marca tipográfica (sustituir si existe uno).

## Qué falta medir

Probado en navegador a 1440, 820 y 375 px, interacciones (pestañas, carrusel, comparador, lightbox, validación
y mensaje de WhatsApp). **No se midió** Lighthouse/Core Web Vitals en producción, ni lectores de pantalla,
ni dispositivos reales: hacerlo tras publicar la dirección de prueba.
