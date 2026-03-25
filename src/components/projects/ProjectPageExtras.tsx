import { Link } from "react-router";
import { PROJECTS, type ProjectKey } from "../../data/constants";

type MoreProjectsProps = {
	currentKey: ProjectKey;
};

export const ProjectBackLink = () => {
	return (
		<div>
			<Link
				to="/projects"
				className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-muted)] px-4 py-1.5 text-sm font-medium text-[color:var(--color-text-main)] transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent-strong)]"
			>
				<span aria-hidden>←</span>
				<span>Back to Projects</span>
			</Link>
		</div>
	);
};

export const MoreProjects = ({ currentKey }: MoreProjectsProps) => {
	const otherProjects = PROJECTS.filter((p) => p.key !== currentKey);

	return (
		<section className="mt-10 pt-8 border-t border-[color:var(--color-border-subtle)]">
			<h2 className="text-lg font-semibold">More projects</h2>
			<p className="mt-1 text-xs text-[color:var(--color-text-subtle)]">
				Explore the rest of my work.
			</p>

			<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
				{otherProjects.map((p) => (
					<Link
						key={p.key}
						to={p.route}
						className="block theme-card-glass rounded-xl p-4 sm:p-5 hover:translate-y-0.5 hover:shadow-xl transition-all duration-300"
					>
						<div className="flex items-center justify-between">
							<span className="text-base sm:text-lg pr-2">{p.title}</span>
							<span className="text-[color:var(--color-accent-strong)]">
								Open →
							</span>
						</div>
						<p className="mt-2 text-xs text-[color:var(--color-text-subtle)] overflow-hidden text-ellipsis">
							{p.summary}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
};
