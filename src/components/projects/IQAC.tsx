import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const IQAC = () => {
  const iqacProject = getProjectByKey("iqac");

  const infoCards = [
    {
      title: "Tech Stack",
      items: [
        "MongoDB, Express.js, React, Node.js (MERN)",
        "TailwindCSS dashboards with charts and analytics",
        "JWT auth with role-based access (Admin, HOD, Faculty, Student)",
        "LLM integration for AI-driven academic and accreditation insights",
      ],
    },
    {
      title: "Key Features",
      items: [
        "Student and department monitoring (CGPA, attendance, backlogs)",
        "Accreditation evidence tracking for NAAC/NBA/AUDIT",
        "Automated PDF/Excel reports for multiple stakeholders",
        "AI-based risk prediction and narrative analysis",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Problem",
      description:
        "Institutions need continuous visibility into academic outcomes and accreditation readiness.",
    },
    {
      label: "Approach",
      description:
        "Built a MERN platform with role-based dashboards, analytics workflows, and AI-assisted insights.",
    },
    {
      label: "Outcome",
      description:
        "Enabled faster evidence tracking, clearer reporting, and better decision support for stakeholders.",
    },
  ];

  const repository = iqacProject?.repoUrl
    ? {
        text: iqacProject.repoUrl.replace(/^https?:\/\//, ""),
        href: iqacProject.repoUrl,
      }
    : undefined;

  return (
    <ProjectPageTemplate
      title={iqacProject?.title ?? "AI-Powered IQAC Academic Intelligence System"}
      summary="A full-stack MERN application designed for institutional quality assurance. It helps IQAC, HODs, faculty, and students monitor academic performance, accreditation readiness, and department-level analytics with AI-assisted insights."
      infoCards={infoCards}
      caseStudy={caseStudy}
      repository={repository}
    />
  );
};

export default IQAC;
