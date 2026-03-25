import { ProjectBackLink } from "./ProjectPageExtras";

const SamuraiGame = () => {
  return (
    <div className="mt-10 space-y-5">
      <ProjectBackLink />
      <h1 className="text-2xl font-bold tracking-tight">Samurai Duel Saga</h1>

      <p className="text-[color:var(--color-text-subtle)] max-w-2xl">
        Samurai Duel Saga is a 2D pixel-art fighting game built in Python
        with Pygame. Two samurai battle across dynamic platforms with
        swords, projectiles, special attacks, and power-ups in both local
        PvP and PvC modes.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
          <h2 className="mb-2 text-sm font-semibold text-[color:var(--color-text-main)]">
            Tech & Gameplay
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
            <li>Python 3 + Pygame engine</li>
            <li>Custom pixel art animations for both samurai</li>
            <li>PvP and PvC modes with AI difficulty levels</li>
            <li>Platform types: ice, lava, and stone terrain</li>
          </ul>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-[color:var(--color-text-main)]">
              Core Features
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
              <li>Combo-based combat with projectiles and specials</li>
              <li>Health, shield, speed, and special power-ups</li>
              <li>Background music and sound effects with CLI toggles</li>
              <li>Local multiplayer-ready control scheme</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-muted)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">
            GitHub Repository
          </h2>
          <p className="text-xs text-[color:var(--color-text-subtle)]">
            github.com/luffynokaizoku/pixel-samurai
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://github.com/luffynokaizoku/pixel-samurai"
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

export default SamuraiGame;
