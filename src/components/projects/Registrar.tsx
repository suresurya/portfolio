import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const Registrar = () => {
  const project = getProjectByKey("registrar");

  const infoCards = [
    {
      title: "Core Modules",
      items: [
        "Letter Chain Automation",
        "Faculty Leave Management",
        "Stock Approval Engine",
        "Payroll Data Integration",
      ],
    },
    {
      title: "Technical Stack",
      items: [
        "Java Spring Boot (MVC)",
        "MySQL for persistent storage",
        "Thymeleaf for server-side layout",
        "Role-based Access Control (RBAC)",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Problem",
      description:
        "Institutional registrar tasks involve multi-layered manual signatures, leading to long approval delays.",
    },
    {
      label: "Solution",
      description:
        "Built a central backend that maps official institutional hierarchies into digital approval nodes.",
    },
    {
      label: "Value",
      description:
        "Drastically reduced turnaround times for leaves and stock approvals while maintaining a clear audit trail.",
    },
  ];

  const engineeringNotes = [
    "Implemented a recursive approval node logic in the database to handle arbitrary letter chain lengths.",
    "Integrated a daily automated reporting service that notifies stakeholders of pending registrar tasks.",
  ];

  return (
    <ProjectPageTemplate
      title={project?.title ?? "Registrar Management"}
      summary={
        project?.summary ??
        "An enterprise-grade institutional workflow system for automating letter chains, leaves, and approvals."
      }
      infoCards={infoCards}
      caseStudy={caseStudy}
      impact={project?.impact}
      engineeringNotes={engineeringNotes}
      status={project?.status}
    />
  );
};

export default Registrar;
