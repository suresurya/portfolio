import { Link, useOutlet } from "react-router";
import { PROJECTS } from "../data/constants";
import { useMemo, useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Projects = () => {
  const outlet = useOutlet();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | (typeof PROJECTS)[number]["category"]>("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(PROJECTS.map((project) => project.category)))],
    []
  );

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchesCategory = activeCategory === "all" || project.category === activeCategory;
      const searchField = [project.title, project.summary, project.tech, project.tags.join(" ")]
        .join(" ")
        .toLowerCase();
      const matchesQuery = normalized.length === 0 || searchField.includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  if (outlet) return <>{outlet}</>;

  return (
    <div className="mt-6 sm:mt-10 space-y-6">
      <Helmet>
        <title>Projects | Sure Surya Portfolio</title>
        <meta name="description" content="Explore a collection of backend and full-stack projects built with Java, React, and Python, featuring case studies on API design and algorithmic challenges." />
      </Helmet>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
        <p className="text-sm text-[color:var(--color-text-subtle)]">
          Browse case studies by stack and focus area. Showing {filteredProjects.length} of {PROJECTS.length} projects.
        </p>
      </div>

      <div className="theme-card-glass rounded-xl p-4 sm:p-5 space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <label className="sr-only" htmlFor="project-search-input">
            Search projects
          </label>
          <input
            id="project-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, tech, or tags..."
            className="w-full rounded-xl border theme-border-subtle bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm text-[color:var(--color-text-main)] outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/60"
          />
          <span className="text-xs text-[color:var(--color-text-subtle)] uppercase tracking-[0.15em]">
            Filter
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category as typeof activeCategory)}
                className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm capitalize transition-colors ${
                  isActive
                    ? "theme-border-subtle bg-[color:var(--color-accent-soft)] text-[color:var(--color-text-main)]"
                    : "theme-border-subtle text-[color:var(--color-text-subtle)] hover:text-[color:var(--color-text-main)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProjects.map((project, index) => (
          <article
            key={project.key}
            className="theme-card-glass rounded-xl p-4 sm:p-5 hover:translate-y-0.5 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 reveal"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1 pr-2">
                  <h2 className="text-base sm:text-lg font-semibold">{project.title}</h2>
                  {project.status && (
                    <span className="w-fit rounded-md bg-[color:var(--color-accent)]/10 px-1.5 py-0.5 text-[10px] font-medium text-[color:var(--color-accent)] ring-1 ring-inset ring-[color:var(--color-accent)]/20">
                      {project.status}
                    </span>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-text-subtle)]">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-[color:var(--color-text-subtle)] leading-relaxed">{project.highlight}</p>
              <p className="text-xs text-[color:var(--color-text-subtle)] leading-relaxed">{project.summary}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={`${project.key}-${tag}`}
                  className="rounded-full border theme-border-subtle px-2 py-0.5 text-[11px] text-[color:var(--color-text-subtle)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
              <Link
                to={project.route}
                className="inline-flex items-center justify-center rounded-full border theme-border-subtle bg-[color:var(--color-surface-elevated)] px-3 py-1.5 text-sm font-medium text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)]"
              >
                View Case Study
              </Link>

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} repository`}
                  className="inline-flex items-center justify-center gap-1 rounded-full border theme-border-subtle px-3 py-1.5 text-sm text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)]"
                >
                  <FiGithub aria-hidden="true" />
                  GitHub
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo`}
                  className="inline-flex items-center justify-center gap-1 rounded-full border theme-border-subtle px-3 py-1.5 text-sm text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)]"
                >
                  <FiExternalLink aria-hidden="true" />
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="rounded-xl border theme-border-subtle p-5 text-sm text-[color:var(--color-text-subtle)] text-center">
          No projects matched your filters. Try another keyword or category.
        </div>
      )}
    </div>
  );
};

export default Projects;
