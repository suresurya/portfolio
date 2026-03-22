const DSA = () => {
  return (
    <div className="mt-10 space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">DSA</h1>
      <p className="text-[color:var(--color-text-subtle)] max-w-xl">
        A collection of data structures and algorithms implemented in Java.
        This repository focuses on clean, well-structured solutions and patterns
        that are useful for interviews and competitive programming.
      </p>

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
