# Bluethumb Technologies Landing Website

Premium single-page React landing site for Bluethumb Technologies.

## Stack

- React + Vite + TypeScript
- Site copy and links in [`config.json`](config.json)
- Source images in [`asset/`](asset/); served images in [`public/images/`](public/images/)

## Local development

```bash
./install_dependencies.sh
./run.sh
```

- Local preview: `http://localhost:4173`
- Dev server: `npm run dev`

## Configuration

Edit [`config.json`](config.json) for brand copy, product content, gallery captions, and links (including LinkedIn and contact email).

## Docker (optional)

```bash
docker compose up --build
```

Serves the built site at `http://localhost:8080`.

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
| `./run.sh` | Production build + local preview |
| `npm run build` | Output static site to `dist/` |
| `npm run dev` | Vite development server |

## Links

- Trading Intelligence PWA: https://bluethumb-trading-app.pages.dev/
- LinkedIn: https://www.linkedin.com/company/bluethumb-technologies
- Contact: emran.billah@gmail.com
