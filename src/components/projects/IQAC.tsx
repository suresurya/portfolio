import { ProjectBackLink } from "./ProjectPageExtras";

const IQAC = () => {
  return (
    <div className="mt-10 space-y-5">
      <ProjectBackLink />
      <h1 className="text-2xl font-bold tracking-tight">
        AI-Powered IQAC Academic Intelligence System
      </h1>

      <p className="text-[color:var(--color-text-subtle)] max-w-2xl">
        A full-stack MERN application designed for institutional quality
        assurance. It helps IQAC, HODs, faculty, and students monitor
        academic performance, accreditation readiness, and department-level
        analytics with AI-assisted insights.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
          <h2 className="text-sm font-semibold text-[color:var(--color-text-main)] mb-2">
            Tech Stack
          </h2>
          <ul className="list-disc pl-5 text-xs text-[color:var(--color-text-subtle)] space-y-1">
            <li>MongoDB, Express.js, React, Node.js (MERN)</li>
            <li>TailwindCSS dashboards with charts and analytics</li>
            <li>JWT auth with role-based access (Admin, HOD, Faculty, Student)</li>
            <li>LLM integration for AI-driven academic and accreditation insights</li>
          </ul>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[color:var(--color-text-main)] mb-2">
              Key Features
            </h2>
            <ul className="list-disc pl-5 text-xs text-[color:var(--color-text-subtle)] space-y-1">
              <li>Student and department monitoring (CGPA, attendance, backlogs)</li>
              <li>Accreditation evidence tracking for NAAC/NBA/AUDIT</li>
              <li>Automated PDF/Excel reports for multiple stakeholders</li>
              <li>AI-based risk prediction and narrative analysis</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-2 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-5 shadow-sm backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">Case Study</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Problem</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Institutions need continuous visibility into academic outcomes and accreditation readiness.</p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Approach</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Built a MERN platform with role-based dashboards, analytics workflows, and AI-assisted insights.</p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">Outcome</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-main)]">Enabled faster evidence tracking, clearer reporting, and better decision support for stakeholders.</p>
          </div>
        </div>
      </section>

      <div className="mt-4 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-muted)] px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">
            GitHub Repository
          </h2>
          <p className="text-xs text-[color:var(--color-text-subtle)]">
            github.com/suresurya/IQAC
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://github.com/suresurya/IQAC"
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

export default IQAC;
