# Bluethumb Technologies Landing Website

Premium single-page React landing site for Bluethumb Technologies.

## Stack

- React + Vite + TypeScript
- Site copy and links in [`config.json`](config.json)
- Source images in [`asset/`](asset/); served images in [`public/images/`](public/images/)
- Reusable `MediaFrame` / `.shot` window chrome for product screenshots (full image, no crop)
- Google Analytics (`G-V221KK2B6V`) via the official snippet in [`index.html`](index.html), plus event helpers in `src/scripts/gtag.ts`

## Local development

**Linux / macOS / WSL**

```bash
./install_dependencies.sh
./run.sh
```

**Windows**

```bat
run.bat
```

Both scripts install dependencies if needed, build the site, and serve a local preview at `http://localhost:9000` (same port as Docker).

Dev server (hot reload): `npm run dev`

## Configuration

Edit [`config.json`](config.json) for brand copy, product content, gallery captions, Blueprint network mockup, AI trade review steps, and links (including LinkedIn and contact email).

Trading screenshots live under `public/images/trading-*.png` (sourced from `asset/images/picks/`). The Review Buy trio (`trading-review-1..3`) is one grouped section, not separate gallery cards.

## Docker (optional)

```bash
docker compose up --build
```

Serves the built site at `http://localhost:9000`.

## Cloudflare Pages

1. Build output directory: `dist`
2. Build command: `npm run build`
3. Install command: `npm install`

Or upload the contents of `dist/` after a local build:

```bash
./install_dependencies.sh
npm run build
```

`public/_redirects` is included so client routes resolve to `index.html`.

## Scripts

| Script | Purpose |
|--------|---------|
| `./install_dependencies.sh` | Install npm dependencies |
| `./run.sh` | Build + preview (Unix) |
| `run.bat` | Build + preview (Windows) |
| `npm run build` | Output static site to `dist/` |
| `npm run dev` | Vite development server |

## Links

- Trading Intelligence PWA: https://bluethumb-trading-app.pages.dev/
- LinkedIn: https://www.linkedin.com/company/bluethumb-technologies
- Contact: emran.billah@gmail.com
