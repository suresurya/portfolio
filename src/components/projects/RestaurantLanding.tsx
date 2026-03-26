import { ProjectBackLink } from "./ProjectPageExtras";

const RestaurantLanding = () => {
  return (
    <div className="mt-10 space-y-5">
      <ProjectBackLink />
      <h1 className="text-2xl font-bold tracking-tight">Restaurant Landing Page</h1>

      <p className="text-[color:var(--color-text-subtle)] max-w-2xl">
        A modern, responsive single-page landing page for a restaurant.
        The focus is on clean sections, strong visuals, and clear calls-to-action
        for menu, reservations, and contact.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
          <h2 className="mb-2 text-sm font-semibold text-[color:var(--color-text-main)]">
            Tech Stack
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
            <li>HTML + CSS</li>
            <li>Responsive layout with mobile-first structure</li>
            <li>Reusable sections (hero, menu, reservation, contact)</li>
          </ul>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
          <h2 className="mb-2 text-sm font-semibold text-[color:var(--color-text-main)]">
            Highlights
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
            <li>Simple navigation with clear section flow</li>
            <li>CTA-focused layout to drive reservations</li>
            <li>Readable typography and spacing across breakpoints</li>
          </ul>
        </div>
      </div>

      <section className="mt-2 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-5 shadow-sm backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">Case Study</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Problem</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Design a conversion-focused restaurant landing page that remains clean across devices.</p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Approach</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Used a section-based layout, mobile-first spacing, and clear visual hierarchy for menu and reservations.</p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Outcome</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Resulted in a polished one-page experience with direct and readable call-to-action flow.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantLanding;
