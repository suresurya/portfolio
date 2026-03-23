## Surya Portfolio

This repository contains **Surya's personal developer portfolio** – a single-page React application built with **TypeScript**, **Vite**, and **Tailwind CSS**. It showcases projects, skills, and experience with a modern, animated UI.

The site is optimized for desktop and mobile, includes a theme toggle (light/dark), smooth transitions, and integrates a GitHub contribution calendar.

---

## Features

- Clean, responsive layout focused on readability
- Dark and light themes with smooth animated transitions
- Custom mouse tracking and subtle motion effects
- Projects section highlighting multiple real-world projects
- GitHub activity calendar using `react-github-calendar`
- Resume and contact sections so people can reach out easily

---

## Tech Stack

- **Framework:** React 19 + React DOM
- **Language:** TypeScript
- **Bundler/Dev Server:** Vite
- **Styling:** Tailwind CSS 4, custom CSS variables, Google Fonts
- **Routing:** React Router
- **UI Helpers:** `react-icons`, `clsx`, `tailwind-merge`
- **Tooling:** ESLint, TypeScript

---

## Getting Started

### Prerequisites

- Node.js (recommended: 18 or later)
- npm (comes with Node)

### Installation

```bash
git clone https://github.com/suresurya/portfolio.git
cd portfolio
npm install
```

### Run in development

```bash
npm run dev
```

The app will start on the URL shown in the terminal (by default `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Available Scripts

- `npm run dev` – start the Vite development server
- `npm run build` – type-check and build the app for production
- `npm run preview` – preview the built app locally
- `npm run lint` – run ESLint on the project

---

## Project Structure

```text
suryaPortfolio/
├─ public/              # Static assets
├─ src/
│  ├─ components/       # Page sections (Body, NavBar, Projects, Contact, etc.)
│  ├─ components/projects/  # Individual project components
│  ├─ assets/           # Images and icons used across the site
│  ├─ utils/            # Shared helpers
│  ├─ App.tsx           # Root application component
│  └─ main.tsx          # React/Vite entry point
├─ index.html
├─ package.json
└─ vite.config.ts
```

---

## Deployment

This app is configured to use **Vite** and includes the `gh-pages` package so it can be deployed to **GitHub Pages**.

Typical deployment flow:

1. Build the site: `npm run build`
2. Deploy the contents of `dist/` to GitHub Pages (for example using a `deploy` script with `gh-pages`)

> If you host this portfolio somewhere else (Vercel, Netlify, etc.), you can deploy the contents of `dist/` using that platform's instructions.

---

## Customization

- Update the content in `src/components` (intro text, skills, resume details, etc.)
- Add or edit project cards in `src/components/projects`
- Tweak global styles in `src/index.css`
- Replace or add images in `src/assets`

---

## Contact

You can customize this section in the UI, but typically it will include:

- Email address
- LinkedIn / GitHub profile links
- Any other social/contact options

This portfolio is maintained by **Surya (vathsav)**.

