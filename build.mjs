// Generador estático: compone páginas (src/pages) con componentes (src/components.mjs) y escribe dist/.
// Uso:  node build.mjs      →  dist/ listo para publicar (Cloudflare Pages/Workers, Netlify, cualquier hosting estático)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { SITE } from './src/config.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const rd = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

/* ── CSS y JS: concatenado + minificado ligero ── */
const cssFiles = ['tokens', 'base', 'components', 'sections', 'pages'];
const css = cssFiles.map((f) => rd(`src/css/${f}.css`)).join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>~])\s*/g, '$1')
  .replace(/;}/g, '}')
  .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')')
  .trim();
// Las media queries necesitan un espacio tras "and" y antes de "("; se restauran:
const cssFixed = css.replace(/\band\(/g, 'and (').replace(/\bnot\(/g, 'not (').replace(/\)and\b/g, ') and');
const jsSrc = rd('src/js/site.js');
const hash = crypto.createHash('md5').update(cssFixed + jsSrc).digest('hex').slice(0, 8);

fs.mkdirSync(path.join(DIST, 'assets/css'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets/js'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'assets/css/site.css'), cssFixed);
fs.writeFileSync(path.join(DIST, 'assets/js/site.js'), jsSrc);

/* ── Assets estáticos ── */
const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from)) {
    const s = path.join(from, f), d = path.join(to, f);
    fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
};
copyDir(path.join(ROOT, 'assets/img'), path.join(DIST, 'assets/img'));
copyDir(path.join(ROOT, 'assets/fonts'), path.join(DIST, 'assets/fonts'));

/* ── Páginas ── */
const { document_ } = await import('./src/components.mjs');
const modules = [
  (await import('./src/pages/index.mjs')).default,
  ...Object.values(await import('./src/pages/categorias.mjs')),
  ...Object.values(await import('./src/pages/tratamientos.mjs')),
  ...Object.values(await import('./src/pages/otras.mjs')),
];

const urls = [];
for (const p of modules) {
  const html = document_({
    title: p.title, description: p.description, path: p.path, body: p.body(), ld: p.ld ? p.ld() : [],
    noindex: !!p.noindex, ogImage: p.ogImage, preload: p.preload || '', waMsg: p.waMsg, assetsV: hash,
  });
  const out = p.file ? path.join(DIST, p.file) : path.join(DIST, p.path === '/' ? '' : p.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  if (!p.noindex) urls.push(p.path);
}

/* ── SEO y despliegue ── */
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /gracias/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

// Redirecciones 301 desde las URLs del sitio WordPress anterior (conservan el posicionamiento).
const redirects = [
  ['/micropigmentacioncejasparahombres', '/micropigmentacion-cejas-hombres/'],
  ['/mujeres', '/micropigmentacion-femenina/'],
  ['/academia-micropigmentacion', '/formacion-art-pigmenta/'],
  ['/blog-de-micropigmentacion-medellin', '/resultados/'],
  ['/gracias-capilar', '/gracias/'],
  ['/privacy-policy', '/politica-de-privacidad/'],
];
fs.writeFileSync(path.join(DIST, '_redirects'),
  redirects.flatMap(([a, b]) => [`${a}/ ${b} 301`, `${a} ${b} 301`]).join('\n') + '\n');

const connect = SITE.formEndpoint ? ` ${new URL(SITE.formEndpoint).origin}` : '';
fs.writeFileSync(path.join(DIST, '_headers'), `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-src https://www.google.com; connect-src 'self'${connect}; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'
/assets/*
  Cache-Control: public, max-age=31536000, immutable
`);

const size = (d) => fs.readdirSync(d, { recursive: true }).reduce((a, f) => { const p = path.join(d, f); return a + (fs.statSync(p).isFile() ? fs.statSync(p).size : 0); }, 0);
console.log(`✔ ${modules.length} páginas · css ${(cssFixed.length / 1024).toFixed(1)} KB · js ${(jsSrc.length / 1024).toFixed(1)} KB · dist ${(size(DIST) / 1048576).toFixed(2)} MB · v=${hash}`);
