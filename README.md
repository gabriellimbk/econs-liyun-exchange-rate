# Exchange Rate Regimes Explorer

This repository contains the Exchange Rate Regimes Explorer as a standalone Vite app.

## Run locally

Prerequisites:
- Node.js

Steps:
1. Open a terminal in the repository root
2. Install dependencies with `npm install`
3. Create `.env.local` if needed and set `GEMINI_API_KEY=your_key`
4. Start the dev server with `npm run dev`

The app runs on `http://localhost:3000`.

## GitHub Pages

`npm run build` outputs the production site to `docs/` with the correct base path for:

`https://gabriellimbk.github.io/econs-liyun-exchange-rate/`

In GitHub Pages settings, use:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`
