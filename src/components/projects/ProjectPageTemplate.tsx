import { cn } from "../../cn";
import { ProjectBackLink } from "./ProjectPageExtras";

export type ProjectInfoCard = {
  title: string;
  items: string[];
};

export type ProjectCaseStudyPoint = {
  label: string;
  description: string;
};

export type ProjectRepository = {
  text: string;
  href: string;
  actionLabel?: string;
};

export type ProjectActionLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type ProjectPageTemplateProps = {
  title: string;
  summary: string;
  category?: string;
  status?: string;
  duration?: string;
  summaryClassName?: string;
  infoCards?: ProjectInfoCard[];
  caseStudy: ProjectCaseStudyPoint[];
  impact?: string[];
  engineeringNotes?: string[];
  actions?: ProjectActionLink[];
  repository?: ProjectRepository;
};

const surfaceCardClassName =
  "rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm";

const ProjectPageTemplate = ({
  title,
  summary,
  category,
  status,
  duration,
  summaryClassName,
  infoCards,
  caseStudy,
  impact,
  engineeringNotes,
  actions,
  repository,
}: ProjectPageTemplateProps) => {
  return (
    <div className="mt-10 space-y-5">
      <ProjectBackLink />
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {status && (
            <span className="rounded-md bg-[color:var(--color-accent)]/10 px-2 py-0.5 text-[11px] font-medium text-[color:var(--color-accent)] ring-1 ring-inset ring-[color:var(--color-accent)]/20">
              {status}
            </span>
          )}
          {category && (
            <span className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-text-subtle)]">
              {category}
            </span>
          )}
          {duration && (
            <span className="text-[11px] font-medium text-[color:var(--color-accent)] border-l theme-border-subtle pl-3 ml-1">
              {duration}
            </span>
          )}
        </div>
      </div>

      <p
        className={cn(
          "text-[color:var(--color-text-subtle)] max-w-2xl",
          summaryClassName
        )}
      >
        {summary}
      </p>

      {infoCards && infoCards.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {infoCards.map((card) => (
            <div key={card.title} className={surfaceCardClassName}>
              <h2 className="mb-2 text-sm font-semibold text-[color:var(--color-text-main)]">
                {card.title}
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
                {card.items.map((item) => (
                  <li key={`${card.title}-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <section className="mt-2 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-5 shadow-sm backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">Case Study</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {caseStudy.map((point) => (
            <div
              key={point.label}
              className="rounded-lg border border-[color:var(--color-border-subtle)] p-3 bg-[color:var(--color-surface-muted)]/70"
            >
              <p className="text-xs uppercase tracking-wider text-[color:var(--color-text-subtle)]">
                {point.label}
              </p>
              <p className="mt-1 text-xs text-[color:var(--color-text-main)]">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {(impact && impact.length > 0) || (engineeringNotes && engineeringNotes.length > 0) ? (
        <section className="grid gap-4 sm:grid-cols-2">
          {impact && impact.length > 0 && (
            <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
              <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">Measurable Impact</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
                {impact.map((point) => (
                  <li key={`${title}-impact-${point}`}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {engineeringNotes && engineeringNotes.length > 0 && (
            <div className="rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm">
              <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">Engineering Decisions</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[color:var(--color-text-subtle)]">
                {engineeringNotes.map((point) => (
                  <li key={`${title}-eng-${point}`}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ) : null}

      {repository && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-muted)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[color:var(--color-text-main)]">
              GitHub Repository
            </h2>
            <p className="text-xs text-[color:var(--color-text-subtle)]">{repository.text}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={repository.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)] px-4 py-1.5 text-sm font-medium text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent-strong)]"
            >
              {repository.actionLabel ?? "View on GitHub"}
            </a>
            {actions?.map((action) => (
              <a
                key={`${title}-action-${action.label}`}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action.ariaLabel ?? `${action.label} for ${title}`}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)] px-4 py-1.5 text-sm font-medium text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent-strong)]"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {!repository && actions && actions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {actions.map((action) => (
            <a
              key={`${title}-only-action-${action.label}`}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={action.ariaLabel ?? `${action.label} for ${title}`}
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)] px-4 py-1.5 text-sm font-medium text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent-strong)]"
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPageTemplate;
