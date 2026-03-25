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
    </div>
  );
};

export default RestaurantLanding;
