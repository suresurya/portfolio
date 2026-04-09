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

type ProjectPageTemplateProps = {
  title: string;
  summary: string;
  summaryClassName?: string;
  infoCards?: ProjectInfoCard[];
  caseStudy: ProjectCaseStudyPoint[];
  repository?: ProjectRepository;
};

const surfaceCardClassName =
  "rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)]/70 p-4 shadow-sm backdrop-blur-sm";

const ProjectPageTemplate = ({
  title,
  summary,
  summaryClassName,
  infoCards,
  caseStudy,
  repository,
}: ProjectPageTemplateProps) => {
  return (
    <div className="mt-10 space-y-5">
      <ProjectBackLink />
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPageTemplate;
