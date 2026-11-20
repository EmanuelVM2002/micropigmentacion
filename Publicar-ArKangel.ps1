# Publica el rediseño de ArKángel (dirección de prueba en Cloudflare). Se ejecuta con Publicar-ArKangel.bat.
# NO toca el sitio actual (WordPress): publica en workers.dev. Se puede repetir cuando quieras.
Set-Location $PSScriptRoot
$Host.UI.RawUI.WindowTitle = "Publicar ArKangel (prueba)"

function Paso($n, $texto) { Write-Host ""; Write-Host "[$n/3] $texto" -ForegroundColor Cyan }
function Falla($texto) { Write-Host ""; Write-Host "X $texto" -ForegroundColor Red; Write-Host ""; exit 1 }

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Falla "No encuentro Node.js. Instalalo desde https://nodejs.org y vuelve a abrir este archivo." }

Paso 1 "Generar el sitio (carpeta dist)"
node build.mjs
if ($LASTEXITCODE -ne 0) { Falla "No se pudo generar el sitio. Copia el mensaje de arriba y pasaselo a Claude." }

Paso 2 "Iniciar sesion en Cloudflare"
npx --yes wrangler whoami 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  npx --yes wrangler login
  if ($LASTEXITCODE -ne 0) { Falla "No se pudo iniciar sesion. Si el error habla de certificados (red de GCO), avisale a Claude con el texto del error." }
}

Paso 3 "Publicar"
npx --yes wrangler deploy
if ($LASTEXITCODE -ne 0) { Falla "La publicacion fallo. Copia el mensaje de arriba y pasaselo a Claude." }

Write-Host ""
Write-Host "LISTO. Abre la direccion workers.dev que aparece arriba (si ves lo anterior, recarga con Ctrl+F5)." -ForegroundColor Green
Write-Host ""
