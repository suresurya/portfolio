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
	| "iqac"
	| "sure-prompt"
	| "heatmap-view"
	| "checkstyle"
	| "registrar";

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
	status?: "Completed" | "Active" | "Archived" | "Early Access";
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
		status: "Active",
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
		status: "Completed",
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
		status: "Completed",
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
		status: "Active",
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
		status: "Active",
	},
	{
		key: "sure-prompt",
		title: "SurePrompt Platform",
		route: "/projects/sure-prompt",
		summary: "A professional prompt-sharing platform for high-quality LLM prompts with versioning and community features.",
		tech: "Spring Boot, Java 21, React, Flyway, PostgreSQL",
		category: "full-stack",
		tags: ["Spring Boot", "React", "Flyway", "PostgreSQL", "Java"],
		highlight: "Enterprise-ready full-stack platform with secure authentication and database migrations.",
		impact: [
			"Implemented clean migrations using Flyway to eliminate schema drift",
			"Reduced startup friction by decoupling security and core services",
			"Designed a responsive MD3 interface using Material Web 3 components",
		],
		status: "Active",
	},
	{
		key: "heatmap-view",
		title: "Heatmap React Library",
		route: "/projects/heatmap-view",
		summary: "A high-performance LeetCode-style contribution graph for React with customizable themes and tooltip support.",
		tech: "React, SVG, CSS Grid, Vitest",
		category: "frontend",
		tags: ["React", "SVG", "Custom Hooks", "OSS"],
		highlight: "Pixel-perfect contribution graph with sub-pixel alignment and dynamic month labeling.",
		impact: [
			"Optimized SVG coordinate calculations for seamless 4x2 widget rendering",
			"Implemented automated streak retrieval and widget state updates",
			"Achieved 100% visual parity with top-tier platform contribution graphs",
		],
		status: "Completed",
	},
	{
		key: "checkstyle",
		title: "Checkstyle GSoC Core",
		route: "/projects/checkstyle",
		summary: "Contributions to the Checkstyle project during GSoC 2026, focusing on LaTeX formatting and technical rigour.",
		tech: "Java, Checkstyle Core, LaTeX, JUnit",
		category: "algorithms",
		tags: ["Open Source", "GSoC 2026", "Java Core", "Quality Assurance"],
		highlight: "Deep technical contribution to enterprise-grade static analysis tools.",
		impact: [
			"Refined GSoC proposal into peer-reviewed LaTeX standards for mentor readiness",
			"Eliminated prohibited symbolic overhead in Checkstyle technical documentation",
			"Participated in rigorous open-source code reviews and technical audits",
		],
		status: "Completed",
	},
	{
		key: "registrar",
		title: "Registrar Management System",
		route: "/projects/registrar",
		summary: "An enterprise-grade institutional workflow system for automating letter chains, leaves, and approvals.",
		tech: "Java, Spring Boot, MySQL, Thymeleaf",
		category: "backend",
		tags: ["Enterprise", "Java Boot", "Workflow Automation", "RDBMS"],
		highlight: "Complex institutional approval system with role-based letter chains and stock approvals.",
		impact: [
			"Automated multi-step approval workflow for letter chains and institutional leaves",
			"Designed a robust RDBMS schema to ensure perfect data integrity for registrar workflows",
			"Integrated payroll and stock approval modules into a centralized backend dashboard",
		],
		status: "Completed",
	},
];

export const getProjectByKey = (key: ProjectKey) =>
	PROJECTS.find((project) => project.key === key);
