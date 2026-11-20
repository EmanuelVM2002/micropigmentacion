// Servidor local de desarrollo: sirve dist/ con URLs limpias (carpeta → index.html) y aplica _redirects.
//   node serve.mjs [puerto]      (por defecto 8871)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.argv[2] || process.env.PORT || 8871);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json',
};
const redirects = {};
try {
  for (const l of fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8').split('\n')) {
    const [a, b] = l.trim().split(/\s+/); if (a && b) redirects[a] = b;
  }
} catch {}

http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (redirects[u]) { res.writeHead(301, { Location: redirects[u] }); return res.end(); }
  let fp = path.join(ROOT, u);
  if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
    if (!u.endsWith('/')) { res.writeHead(301, { Location: u + '/' }); return res.end(); }
    fp = path.join(fp, 'index.html');
  }
  fs.readFile(fp, (e, d) => {
    if (e) {
      return fs.readFile(path.join(ROOT, '404.html'), (_, nf) => { res.writeHead(404, { 'Content-Type': TYPES['.html'] }); res.end(nf || '404'); });
    }
    const h = { 'Content-Type': TYPES[path.extname(fp)] || 'application/octet-stream', 'Cache-Control': 'no-cache' };
    res.writeHead(200, h); res.end(d);
  });
}).listen(PORT, () => console.log(`ArKángel → http://localhost:${PORT}/`));
