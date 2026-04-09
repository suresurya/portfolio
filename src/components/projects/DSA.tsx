import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const DSA = () => {
  const dsaProject = getProjectByKey("dsa");

  const caseStudy = [
    {
      label: "Problem",
      description:
        "Build a reliable practice repository for interview-oriented DSA preparation.",
    },
    {
      label: "Approach",
      description:
        "Organized Java implementations by concept and focused on readable code and repeatable patterns.",
    },
    {
      label: "Outcome",
      description:
        "Created a practical reference set that improves speed and confidence in coding rounds.",
    },
  ];

  const repository = dsaProject?.repoUrl
    ? {
        text: dsaProject.repoUrl.replace(/^https?:\/\//, ""),
        href: dsaProject.repoUrl,
        actionLabel: "View Repository",
      }
    : undefined;

  return (
    <ProjectPageTemplate
      title={dsaProject?.title ?? "DSA"}
      summary="A collection of data structures and algorithms implemented in Java. This repository focuses on clean, well-structured solutions and patterns that are useful for interviews and competitive programming."
      summaryClassName="max-w-xl"
      caseStudy={caseStudy}
      repository={repository}
    />
  );
};

export default DSA;
