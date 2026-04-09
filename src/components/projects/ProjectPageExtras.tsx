import { Link } from "react-router";

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