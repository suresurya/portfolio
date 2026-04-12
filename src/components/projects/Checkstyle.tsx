import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const Checkstyle = () => {
  const project = getProjectByKey("checkstyle");

  const infoCards = [
    {
      title: "Core Contributions",
      items: [
        "Internal code quality auditing",
        "Technical documentation in LaTeX",
        "JUnit test suite development",
        "Static analysis rule configuration",
      ],
    },
    {
      title: "GSoC Standards",
      items: [
        "Peer-reviewed proposal architecture",
        "High-rigor documentation standards",
        "Community engagement and PR reviews",
        "Open-source workflow best practices",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Mission",
      description:
        "Contribute to the enterprise-grade Checkstyle project by refining its core documentation and ensuring technical excellence in the GSoC 2026 cycle.",
    },
    {
      label: "Strategy",
      description:
        "Adopted LaTeX for formal proposal preparation and strictly adhered to Checkstyle's aggressive quality standards.",
    },
    {
      label: "Outcome",
      description:
        "Successfully submitted a mentor-ready proposal and contributed to the project's long-term technical documentation health.",
    },
  ];

  const engineeringNotes = [
    "Used Checkstyle's own rules to audit the contribution code, ensuring 100% compliance with community standards.",
    "Drafted technical documents using Overleaf and LaTeX to ensure professional mathematical and symbolic representation.",
  ];

  return (
    <ProjectPageTemplate
      title={project?.title ?? "Checkstyle GSoC Core"}
      summary={
        project?.summary ??
        "Contributions to the Checkstyle project during GSoC 2026, focusing on LaTeX formatting and technical rigour."
      }
      infoCards={infoCards}
      caseStudy={caseStudy}
      impact={project?.impact}
      engineeringNotes={engineeringNotes}
      status={project?.status}
    />
  );
};

export default Checkstyle;
