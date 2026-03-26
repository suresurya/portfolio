import { ProjectBackLink } from "./ProjectPageExtras";

const DSA = () => {
  return (
    <div className="mt-10 space-y-4">
      <ProjectBackLink />
      <h1 className="text-2xl font-bold tracking-tight">DSA</h1>
      <p className="text-[color:var(--color-text-subtle)] max-w-xl">
        A collection of data structures and algorithms implemented in Java.
        This repository focuses on clean, well-structured solutions and patterns
        that are useful for interviews and competitive programming.
      </p>

      <section className="mt-2 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-5 shadow-sm backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">Case Study</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Problem</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Build a reliable practice repository for interview-oriented DSA preparation.</p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Approach</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Organized Java implementations by concept and focused on readable code and repeatable patterns.</p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Outcome</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Created a practical reference set that improves speed and confidence in coding rounds.</p>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 px-5 py-4 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">
              GitHub Repository
            </h2>
            <p className="text-xs text-[color:var(--color-text-subtle)]">
              github.com/suresurya/DSA
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="https://github.com/suresurya/DSA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-muted)] px-4 py-1.5 text-sm font-medium text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent-strong)]"
            >
              View Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSA;
