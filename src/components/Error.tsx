import { useNavigate, useRouteError } from "react-router";

type RouteError = {
	status?: number;
	statusText?: string;
	message?: string;
};

const ErrorPage = () => {
	const navigate = useNavigate();
	const error = useRouteError() as RouteError | undefined;

	const status = error?.status ?? 404;
	const title = status === 404 ? "Page not found" : "Something went wrong";
	const description =
		error?.message || error?.statusText ||
		"The page you are looking for doesn’t exist or an unexpected error occurred.";

	return (
		<section className="mt-6 sm:mt-12 font-jetMono text-[color:var(--color-text-main)]">
			<div className="theme-card-glass rounded-2xl px-5 sm:px-8 py-8 sm:py-10 space-y-6 text-center">
				<p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[color:var(--color-text-subtle)]">
					Error
				</p>

				<div className="space-y-3 sm:space-y-4">
					<h1 className="text-4xl sm:text-5xl font-semibold">
						{status}
						<span className="text-[color:var(--color-accent)]"> — </span>
						{title}
					</h1>
					<p className="max-w-xl mx-auto text-sm sm:text-base text-[color:var(--color-text-subtle)] leading-relaxed">
						{description}
					</p>
				</div>

				<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="inline-flex items-center justify-center gap-2 rounded-xl border theme-border-subtle px-4 py-2 text-sm sm:text-base hover:bg-[color:var(--color-accent-soft)] transition-colors cursor-pointer"
					>
						Go back home
					</button>
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed theme-border-subtle px-4 py-2 text-sm sm:text-base hover:bg-[color:var(--color-accent-soft)]/60 transition-colors cursor-pointer"
					>
						Try previous page
					</button>
				</div>
			</div>
		</section>
	);
};

export default ErrorPage;

