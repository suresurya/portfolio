import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const WeatherFlow = () => {
  const project = getProjectByKey("weather-flow");

  const infoCards = [
    {
      title: "Feature Set",
      items: [
        "Real-time weather tracking",
        "Geocoding and timezone support",
        "Dynamic background theme engine",
        "Hourly and 7-day forecasts",
      ],
    },
    {
      title: "Visualization",
      items: [
        "Chart.js for trend analysis",
        "Lucide React for weather iconography",
        "Tailwind CSS for responsive layouts",
        "Data-driven color gradients",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Concept",
      description:
        "Build a weather app that prioritizes high-fidelity visualization of environmental trends over just displaying static numbers.",
    },
    {
      label: "Architecture",
      description:
        "Implemented a custom hook-based state management that fetches and normalize data from multiple REST endpoints.",
    },
    {
      label: "Outcome",
      description:
        "A fast, responsive dashboard that provides actionable environmental insights through clear, professional charts.",
    },
  ];

  const engineeringNotes = [
    "Optimized API polling with stale-while-revalidate logic to reduce network overhead.",
    "Engineered a dynamic backdrop system that changes based on the weather description (e.g., Rain, Clear, Clouds).",
  ];

  return (
    <ProjectPageTemplate
      title={project?.title ?? "WeatherFlow Dashboard"}
      summary={
        project?.summary ??
        "A personal weather monitoring dashboard that tracks local and global conditions with historical data visualization."
      }
      infoCards={infoCards}
      caseStudy={caseStudy}
      impact={project?.impact}
      engineeringNotes={engineeringNotes}
      status={project?.status}
    />
  );
};

export default WeatherFlow;
