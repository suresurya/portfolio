import { Link, Outlet } from "react-router";
import { PROJECTS } from "../data/constants";

const Projects = () => {
  return (
    <div className="mt-6 sm:mt-10 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((p) => (
          <Link
            to={p.route}
            key={p.key}
            className="block theme-card-glass rounded-xl p-4 sm:p-5 hover:translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg pr-2 font-medium">{p.title}</span>
              <span className="text-green-400">Open →</span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[color:var(--color-text-subtle)] leading-relaxed">
              {p.summary}
            </p>
            <p className="mt-2 text-[10px] sm:text-xs text-[color:var(--color-text-subtle)]/80">
              <span className="font-semibold">Tech:</span> {p.tech}
            </p>
            {p.repoUrl && (
              <p className="mt-2 text-[10px] sm:text-xs text-[color:var(--color-text-subtle)]">
                Repo: <span className="underline underline-offset-4">{p.repoUrl.replace("https://", "")}</span>
              </p>
            )}
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Projects;
