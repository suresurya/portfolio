import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const SurePrompt = () => {
  const project = getProjectByKey("sure-prompt");

  const infoCards = [
    {
      title: "Backend Engine",
      items: [
        "Spring Boot + Java 21",
        "Spring Security (OAuth2 / Custom)",
        "Flyway Database Migrations",
        "PostgreSQL for structured persistence",
      ],
    },
    {
      title: "Frontend & UI",
      items: [
        "React for dynamic SPA behavior",
        "Material Web 3 (MD3) components",
        "Global theming and asset organization",
        "Framer Motion transitions",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Challenge",
      description:
        "Building a scalable platform for LLM prompts that handles complex authentication and schema versioning.",
    },
    {
      label: "Strategy",
      description:
        "Decoupled security configurations to resolve circular dependencies and implemented strict Flyway migration strategies.",
    },
    {
      label: "Result",
      description:
        "A highly stable full-stack platform ready for multi-user collaboration and community prompt sharing.",
    },
  ];

  const engineeringNotes = [
    "Resolved critical Spring Boot startup failures by fixing Flyway clean strategy mismatches.",
    "Centralized all branding and logo assets into a dedicated shared directory for web and android parity.",
  ];

  return (
    <ProjectPageTemplate
      title={project?.title ?? "SurePrompt Platform"}
      summary={
        project?.summary ??
        "A professional prompt-sharing platform for high-quality LLM prompts with versioning and community features."
      }
      infoCards={infoCards}
      caseStudy={caseStudy}
      impact={project?.impact}
      engineeringNotes={engineeringNotes}
      status={project?.status}
      duration={project?.duration}
    />
  );
};

export default SurePrompt;
