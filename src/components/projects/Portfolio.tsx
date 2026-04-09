import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const Portfolio = () => {
  const portfolioProject = getProjectByKey("portfolio");

  const infoCards = [
    {
      title: "Tech Stack",
      items: [
        "React + TypeScript",
        "Vite for fast builds and bundling",
        "Tailwind CSS with CSS variables theming",
        "React Router for navigation",
      ],
    },
    {
      title: "Highlights",
      items: [
        "Dark-first theme with light mode toggle",
        "Projects section with dedicated project pages",
        "Accessible cursor effects (disabled on reduced motion/touch)",
        "GitHub Pages deployment ready",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Problem",
      description:
        "Build a professional personal site that presents skills and projects clearly for recruiters.",
    },
    {
      label: "Approach",
      description:
        "Created a React + TypeScript architecture with route-based pages, consistent theming, and component reuse.",
    },
    {
      label: "Outcome",
      description:
        "The portfolio is faster to navigate, easier to scan, and ready for sharing with recruiters.",
    },
  ];

  const repository = portfolioProject?.repoUrl
    ? {
        text: portfolioProject.repoUrl.replace(/^https?:\/\//, ""),
        href: portfolioProject.repoUrl,
      }
    : undefined;

  return (
    <ProjectPageTemplate
      title={portfolioProject?.title ?? "Portfolio Website"}
      summary="A personal portfolio built with React, TypeScript, and Vite to showcase projects, skills, and contact details in a clean, recruiter-friendly layout. It includes theme support and smooth UI interactions."
      infoCards={infoCards}
      caseStudy={caseStudy}
      repository={repository}
    />
  );
};

export default Portfolio;
