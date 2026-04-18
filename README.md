## Surya Portfolio

This repository contains **Surya's personal developer portfolio** – a single-page React application built with **TypeScript**, **Vite**, and **Tailwind CSS**. It showcases projects, skills, and experience with a modern, animated UI.

The site is optimized for desktop and mobile, includes a theme toggle (light/dark), smooth transitions, and integrates a GitHub contribution calendar.

---

## About Me

Hi, I'm **Surya ** – a developer who enjoys building clean UIs, experimenting with animations, and solving problems through code. This portfolio is my place to highlight the projects, technologies, and ideas I'm currently exploring.

### Live Demo

Hosted on GitHub Pages:

https://suresurya.github.io/portfolio/

---

## Features

- Clean, responsive layout focused on readability
- Dark and light themes with smooth animated transitions (System sync enabled)
- Viewport scroll progress bar for visual reading depth
- Floating "Back to Top" animated button
- Custom mouse tracking and subtle motion effects (Delta-time corrected)
- **Staggered Scroll Reveal**: Smooth coordinate-based entrance effects for all content blocks
- **10 Featured Projects**: Comprehensive gallery with real-time status and duration badges
- **One-Tap Sharing**: Instant project link sharing to clipboard from the gallery
- GitHub activity calendar with interactive hover tooltips
- Resume section with integrated Fullscreen Preview mode
- Modern toast notifications for user interactions (Email, Copy, Share logic)
- Delightful "Celebration Confetti" on successful form submissions
- Contact sections with persistent draft caching for better UX

### Sections Overview

- **Hero / Intro:** brief introduction and highlight of who I am
- **Projects:** curated list of my favorite personal and academic projects
- **Resume:** quick view of experience, education, and skills
- **Contact:** ways to reach me for opportunities or collaboration

---

## Tech Stack

- **Framework:** React 19 + React DOM
- **Language:** TypeScript
- **Bundler/Dev Server:** Vite
- **Styling:** Tailwind CSS 4, custom CSS variables, Google Fonts
- **Routing:** React Router 7
- **SEO & Metadata:** `react-helmet-async`
- **Feedback & Interactions:** `sonner` (Toasts), `canvas-confetti`, `react-tooltip`
- **UI Helpers:** `lucide-react`, `react-icons`, `clsx`, `tailwind-merge`
- **Tooling:** Vitest (Testing), ESLint, TypeScript 5.9

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

### Configure EmailJS (required for contact form)

```bash
cp .env.example .env.local
```

Fill these values in `.env.local` from your EmailJS dashboard:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_OWNER_TEMPLATE_ID`

Optional values:

- `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID`
- `VITE_OWNER_RECEIVE_EMAIL`

After updating env values, restart the dev server.

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

You can explore more detailed UI behavior in:

- `src/components/Body.tsx` – main layout and sections
- `src/components/NavBar.tsx` – navigation bar and theme toggle entry
- `src/components/projects/*` – individual project cards and details

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

This portfolio is maintained by **Sure Surya (vathsav)**.

---

## Technical Log (Apr 2026 Sprint)

### Sprint 1: Foundation & Interactions
- Integrated `react-helmet-async` for global SEO.
- Implemented `sonner` toasts and `canvas-confetti` rewards.
- Added viewport scroll progress and floating "Back to Top" controls.

### Sprint 2: Content Expansion
- Added 5 new deep-dive case studies (SurePrompt, Heatmap-React, etc.).
- Implemented staggered scroll reveal animations for all content blocks.
- Added project sharing utility and detailed timeline metadata.

### Sprint 3: Micro-Motion & Polish
- Added dynamic browser title logic (tab blur effects).
- Integrated "System Status: Online" live indicator.
- Added email & discord one-tap copy utilities across the UI.
- Improved draft persistence transparency in the contact section.

