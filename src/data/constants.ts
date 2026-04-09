export const SOCIAL = {
	github: "https://github.com/suresurya",
	linkedin: "https://www.linkedin.com/in/sure-sri-veknat-rama-surya-b924a6332/",
	medium: "https://medium.com/@suresrivenkatramasurya",
	udemy: "https://www.udemy.com/user/sure-sri-venkat-rama-surya/",
	email: "contact.surya.dev@gmail.com",
	discord: "sure_surya_007_",
} as const;

export type SocialPlatform = "github" | "linkedin" | "medium" | "udemy";

export type SocialLinkMeta = {
	key: SocialPlatform;
	label: string;
	href: string;
	ariaLabel: string;
	description?: string;
};

export const SOCIAL_LINKS: SocialLinkMeta[] = [
	{
		key: "github",
		label: "GitHub",
		href: SOCIAL.github,
		ariaLabel: "Visit Sure Surya on GitHub (opens in new tab)",
		description: "Explore my source code, projects, and ongoing experiments.",
	},
	{
		key: "linkedin",
		label: "LinkedIn",
		href: SOCIAL.linkedin,
		ariaLabel: "Visit Sure Surya on LinkedIn (opens in new tab)",
		description: "Connect with me professionally for opportunities and networking.",
	},
	{
		key: "medium",
		label: "Medium",
		href: SOCIAL.medium,
		ariaLabel: "Read Sure Surya's Medium articles (opens in new tab)",
	},
	{
		key: "udemy",
		label: "Udemy",
		href: SOCIAL.udemy,
		ariaLabel: "View Sure Surya's Udemy profile (opens in new tab)",
	},
];

export type ProjectKey =
	| "portfolio"
	| "samurai-game"
	| "restaurant-landing"
	| "dsa"
	| "iqac";

export type ProjectCategory =
	| "frontend"
	| "backend"
	| "full-stack"
	| "game-dev"
	| "algorithms";

export type ProjectMeta = {
	key: ProjectKey;
	title: string;
	route: string;
	summary: string;
	tech: string;
	category: ProjectCategory;
	tags: string[];
	highlight: string;
	impact: string[];
	repoUrl?: string;
	demoUrl?: string;
};

export const PROJECTS: ProjectMeta[] = [
	{
		key: "portfolio",
		title: "Portfolio Website",
		route: "/projects/portfolio",
		summary:
			"This site: a responsive portfolio with theme toggle, project pages, and GitHub activity.",
		tech: "React, TypeScript, Vite, Tailwind CSS",
		category: "frontend",
		tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
		highlight: "Modern recruiter-ready portfolio with reusable project templates.",
		impact: [
			"Improved maintainability by reusing a shared project-page template",
			"Added robust fallback states for resume preview and GitHub activity",
		],
		repoUrl: "https://github.com/suresurya/portfolio",
		demoUrl: "https://suresurya.github.io/portfolio/",
	},
	{
		key: "samurai-game",
		title: "Samurai Duel Saga",
		route: "/projects/samurai-game",
		summary:
			"A 2D pixel-art fighting game with PvP/PvC, power-ups, projectiles, and platform variety.",
		tech: "Python, Pygame",
		category: "game-dev",
		tags: ["Python", "Pygame", "2D Game", "Pixel Art"],
		highlight: "Feature-rich combat game with multiple modes and map types.",
		impact: [
			"Implemented PvP and PvC gameplay loops with AI difficulty",
			"Designed reusable combat systems for power-ups and specials",
		],
		repoUrl: "https://github.com/luffynokaizoku/pixel-samurai",
	},
	{
		key: "restaurant-landing",
		title: "Restaurant Landing Page",
		route: "/projects/restaurant-landing",
		summary:
			"A modern, responsive landing page focused on strong visuals and clear call-to-action sections.",
		tech: "HTML, CSS, Responsive UI",
		category: "frontend",
		tags: ["HTML", "CSS", "Responsive Design", "Landing Page"],
		highlight: "Conversion-focused one-page restaurant experience.",
		impact: [
			"Optimized layout for readability and CTA flow across breakpoints",
			"Maintained visual hierarchy with lightweight static stack",
		],
	},
	{
		key: "dsa",
		title: "DSA",
		route: "/projects/dsa",
		summary:
			"A Java-first repository of data structures and algorithms, written cleanly for interview prep.",
		tech: "Java",
		category: "algorithms",
		tags: ["Java", "Data Structures", "Algorithms", "Interview Prep"],
		highlight: "Structured algorithm practice repository for coding interviews.",
		impact: [
			"Built reusable pattern-based implementations for fast revision",
			"Improved interview readiness through organized concept modules",
		],
		repoUrl: "https://github.com/suresurya/DSA",
	},
	{
		key: "iqac",
		title: "IQAC Academic Intelligence System",
		route: "/projects/iqac",
		summary:
			"A full-stack MERN app for academic analytics and IQAC workflows with AI-assisted insights.",
		tech: "MongoDB, Express, React, Node, Tailwind",
		category: "full-stack",
		tags: ["MERN", "AI Insights", "Analytics", "Role Based Access"],
		highlight: "Full-stack analytics platform for institutional quality workflows.",
		impact: [
			"Enabled stakeholder-specific reporting for IQAC and faculty",
			"Automated insight workflows for performance and accreditation tracking",
		],
		repoUrl: "https://github.com/suresurya/IQAC",
	},
];

export const getProjectByKey = (key: ProjectKey) =>
	PROJECTS.find((project) => project.key === key);
