import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const HeatmapView = () => {
  const project = getProjectByKey("heatmap-view");

  const infoCards = [
    {
      title: "Core Mechanics",
      items: [
        "React + SVG rendering engine",
        "CSS Grid for responsive cell layout",
        "Dynamic month and day labeling logic",
        "Thematic mapping for commit intensities",
      ],
    },
    {
      title: "Optimization",
      items: [
        "Sub-pixel SVG coordinate precision",
        "Memoized cell rendering for performance",
        "Hardware-accelerated tooltip positioning",
        "Lightweight dependency footprint",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Goal",
      description:
        "Develop a highly customizable, performant heatmap component that replicates the LeetCode contribution graph.",
    },
    {
      label: "Architecture",
      description:
        "Used a modular SVG approach with nested components for cells, labels, and legends.",
    },
    {
      label: "Success",
      description:
        "Created a stable, reusable library that handles real-time streak data and widget scenarios seamlessly.",
    },
  ];

  const engineeringNotes = [
    "Implemented automated unit tests via Vitest to ensure coordinate calculations are precise across all viewboxes.",
    "Integrated a 4x2 home-screen widget configuration that auto-updates streak data daily at 8:00 AM.",
  ];

  return (
    <ProjectPageTemplate
      title={project?.title ?? "Heatmap React Library"}
      summary={
        project?.summary ??
        "A high-performance LeetCode-style contribution graph for React with customizable themes and tooltip support."
      }
      infoCards={infoCards}
      caseStudy={caseStudy}
      impact={project?.impact}
      engineeringNotes={engineeringNotes}
      status={project?.status}
    />
  );
};

export default HeatmapView;
