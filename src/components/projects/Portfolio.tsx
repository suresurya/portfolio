const Portfolio = () => {
  return (
    <div className="mt-10 space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Portfolio Website</h1>

      <p className="text-[color:var(--color-text-subtle)] max-w-2xl">
        A personal portfolio built with React, TypeScript, and Vite to showcase
        projects, skills, and contact details in a clean, recruiter-friendly layout.
        It includes theme support and smooth UI interactions.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
          <h2 className="mb-2 text-sm font-semibold text-[color:var(--color-text-main)]">
            Tech Stack
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
            <li>React + TypeScript</li>
            <li>Vite for fast builds and bundling</li>
            <li>Tailwind CSS with CSS variables theming</li>
            <li>React Router for navigation</li>
          </ul>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
          <h2 className="mb-2 text-sm font-semibold text-[color:var(--color-text-main)]">
            Highlights
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
            <li>Dark-first theme with light mode toggle</li>
            <li>Projects section with dedicated project pages</li>
            <li>Accessible cursor effects (disabled on reduced motion/touch)</li>
            <li>GitHub Pages deployment ready</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-muted)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">
            GitHub Repository
          </h2>
          <p className="text-xs text-[color:var(--color-text-subtle)]">
            github.com/suresurya/portfolio
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://github.com/suresurya/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)] px-4 py-1.5 text-sm font-medium text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent-strong)]"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
