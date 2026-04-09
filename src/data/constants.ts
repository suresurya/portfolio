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

export type ProjectMeta = {
	key: ProjectKey;
	title: string;
	route: string;
	summary: string;
	tech: string;
	repoUrl?: string;
};

export const PROJECTS: ProjectMeta[] = [
	{
		key: "portfolio",
		title: "Portfolio Website",
		route: "/projects/portfolio",
		summary:
			"This site: a responsive portfolio with theme toggle, project pages, and GitHub activity.",
		tech: "React, TypeScript, Vite, Tailwind CSS",
		repoUrl: "https://github.com/suresurya/portfolio",
	},
	{
		key: "samurai-game",
		title: "Samurai Duel Saga",
		route: "/projects/samurai-game",
		summary:
			"A 2D pixel-art fighting game with PvP/PvC, power-ups, projectiles, and platform variety.",
		tech: "Python, Pygame",
		repoUrl: "https://github.com/luffynokaizoku/pixel-samurai",
	},
	{
		key: "restaurant-landing",
		title: "Restaurant Landing Page",
		route: "/projects/restaurant-landing",
		summary:
			"A modern, responsive landing page focused on strong visuals and clear call-to-action sections.",
		tech: "HTML, CSS, Responsive UI",
	},
	{
		key: "dsa",
		title: "DSA",
		route: "/projects/dsa",
		summary:
			"A Java-first repository of data structures and algorithms, written cleanly for interview prep.",
		tech: "Java",
		repoUrl: "https://github.com/suresurya/DSA",
	},
	{
		key: "iqac",
		title: "IQAC Academic Intelligence System",
		route: "/projects/iqac",
		summary:
			"A full-stack MERN app for academic analytics and IQAC workflows with AI-assisted insights.",
		tech: "MongoDB, Express, React, Node, Tailwind",
		repoUrl: "https://github.com/suresurya/IQAC",
	},
];

export const getProjectByKey = (key: ProjectKey) =>
	PROJECTS.find((project) => project.key === key);
