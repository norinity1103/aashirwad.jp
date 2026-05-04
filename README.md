# AASHIRWAD website replacement

Lightweight Vite-based replacement site for AASHIRWAD, the Indian restaurant on Seseragi Street in Nagamachi, Kanazawa.

## Commands

```bash
npm install
npm run dev
npm run check
npm run build:pages
```

`npm run check` runs:

- `npm run validate`: local link, asset, metadata, JSON-LD, and required-copy checks
- `npm run validate:i18n`: Japanese/English translation key coverage checks
- `npm run build`: production Vite build
- `npm run build:pages`: production build plus path rewriting for GitHub Pages preview URLs
- `npm run smoke`: local HTTP route and content-type checks
- `npm run test:e2e`: Playwright desktop/mobile checks

Useful supporting command:

- `npm run extract:pdf`: extract text from local menu PDFs into `.artifacts/pdf-text/`

## Local development

```bash
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173/`.

## Source policy

Primary facts and assets come from the current official site:

- `http://aashirwad.jp/`
- `http://aashirwad.jp/menu/index.html`
- `http://aashirwad.jp/cooks/index.html`
- `http://aashirwad.jp/about/index.html`

Supporting references:

- `https://www.instagram.com/aashirwad.kanazawa/`
- `https://tabelog.com/ishikawa/A1701/A170101/17007601/`

Asset-level records are in `docs/asset-registry.md`.

LP heading and visual copy rules are in `docs/lp-visual-copy-guideline.md`.

Final UI shipment checks are in `docs/final-polish-checklist.md`.

## Content caution

The official site and Tabelog currently disagree on payment/card information, so the public UI avoids a definitive payment claim and asks visitors to confirm payment methods at the shop.
