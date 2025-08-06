# Extracción de Términos Legales via Scraping Automatizado

## 🛠️ Herramientas Utilizadas

- **Playwright**: Para automatizar la navegación y descarga de HTML.
- **Python + BeautifulSoup**: Para convertir HTML a Markdown simple.

## 📁 Estructura del Proyecto Propuesto (GitHub)

legal-scraper/
├── README.md
├── package.json
├── playwright.config.ts
├── playwright-automation/
│   └── scrape-html.spec.ts
├── html-scrap/
│   └── [archivos HTML descargados]
├── markdown-files/
│   └── [archivos .md generados]
├── policies/
│   └── urls.json
│   └── html_index.json  ← lista temporal
├── scripts/
│   └── convert_html_to_markdown.py
└── .venv/ (opcional, ignorado por git)

## 📋 Instalación y Dependencias

### Node + Playwright
```bash
npm init playwright@latest
```
Durante la instalación, desmarcar la opción de reinstalar navegadores si ya existen.

### Python + BeautifulSoup
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install beautifulsoup4
```
---

## ✅ Resultado final

- HTMLs en `html-scrap/`
- Markdown limpio en `markdown-files/`
- Listado temporal en `policies/html_index.json`
- Configuración lista para correr con:
  - `npx playwright test tests/scrape-html.spec.ts`
  - `python3 scripts/convert_html_to_markdown.py`


