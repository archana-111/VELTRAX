# VELTRAX

Premium logistics and transportation template for Next.js. Version 1.0.1 — JAMstack static export for ThemeForest.

The site is a static export. After `npm run build`, upload the `out` folder. There is no production Node server, no database, and no live tracking or quote API.

Open `documentation/index.html` in a browser for installation, customization, deployment, and the ThemeForest submission notes.

## Quick start

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
# Set NEXT_PUBLIC_SITE_URL to your public origin (no trailing slash)
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Typecheck + static export into `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

Set `NEXT_PUBLIC_SITE_URL` before the production build. See `.env.example`.

`npm start` is not the hosting command for this project. `output: "export"` writes HTML into `out/`, and that folder is the site.

## Deploy

1. Set `NEXT_PUBLIC_SITE_URL` in `.env.local`
2. Run `npm run build`
3. Upload the contents of `out/` to Netlify, Cloudflare Pages, S3, GitHub Pages, or any static host
4. Point the host’s publish directory at `out` (or upload those files to the web root)

## Edit here first

- `src/data/site.ts` — name, contact, URL, version
- `src/data/navigation.ts` — header and footer links
- `src/data/services.ts`, `industries.ts`, `projects.ts`, `articles.ts`
- `src/data/company.ts` — team, careers, questions, testimonials
- `src/data/shipments.ts` — tracking demo
- `src/styles/theme.css` — color, type, spacing tokens
- `public/images` and `src/data/images.ts`

## Demo only

The quote form, the contact form, and the shipment tracker do not leave the browser. Sample tracking numbers are `VLX-24081-HAM`, `VLX-24092-SIN`, and `VLX-24105-ORD`.

Homepage variations:

- `/` global logistics
- `/home-freight/` freight and transportation
- `/home-warehousing/` warehousing and supply chain

Optional campaign page (no site chrome): `/black-friday/`
