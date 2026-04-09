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

  const engineeringNotes = [
    "Organized implementation modules by topic to accelerate revision and pattern recall.",
    "Used clear naming and consistent complexity-focused comments for interview prep speed.",
  ];

  return (
    <ProjectPageTemplate
      title={dsaProject?.title ?? "DSA"}
      summary={
        dsaProject?.summary ??
        "A collection of data structures and algorithms implemented in Java."
      }
      summaryClassName="max-w-xl"
      caseStudy={caseStudy}
      impact={dsaProject?.impact}
      engineeringNotes={engineeringNotes}
      repository={repository}
    />
  );
};

export default DSA;
