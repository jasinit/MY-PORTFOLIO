# Jasmine's Portfolio 2026

An interactive portfolio for Jasmine Ndodo — product designer. Built with React 18, Vite 6, Tailwind CSS 4, and Motion.

## Requirements

- Node.js 18 or newer (20+ recommended)

## Getting started

```sh
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173).

## Scripts

| Command               | What it does                          |
| --------------------- | ------------------------------------- |
| `npm run dev`         | Start the development server          |
| `npm run build`       | Production build into `dist/`         |
| `npm run preview`     | Serve the production build locally    |
| `npm run typecheck`   | Type-check with TypeScript            |
| `npm run lint`        | Lint with ESLint                      |
| `npm run format`      | Format code with Prettier             |

## Project structure

```
src/
  app/App.tsx        # All sections of the portfolio
  styles/            # Tailwind entry, theme tokens, fonts
  imports/           # Local images and documents
  main.tsx           # React entry point
```

## Design

Dark editorial theme with a lime accent. Colors and typography tokens live in `src/styles/theme.css`.

## Deployment

The site deploys automatically to GitHub Pages on every push to `master`:
https://jasinit.github.io/MY-PORTFOLIO/

