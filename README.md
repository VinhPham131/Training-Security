# Security English Training Game (Static Web)

A lightweight, deployable **frontend-only** English training game for hotel security staff.

## Tech

- React + Vite
- Vanilla CSS (no UI framework)
- LocalStorage for progress, score, badges, leaderboard

## Features

- **Topics**: choose a scenario topic and play mini-quiz questions
- **Rules**: clear scoring/combo/time bonus & penalties
- **Leaderboard**: fake ranking stored locally
- **Badges**: locked/unlocked collection based on achievements

## Local run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (Static)

Build output is in `dist/`.

- **Netlify**: build command `npm run build`, publish directory `dist`
- **Vercel**: framework preset Vite, output `dist`
- **GitHub Pages**: build and deploy `dist` (use any GH Pages action)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
