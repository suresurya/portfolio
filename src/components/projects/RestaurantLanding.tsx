import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const RestaurantLanding = () => {
  const restaurantProject = getProjectByKey("restaurant-landing");

  const infoCards = [
    {
      title: "Tech Stack",
      items: [
        "HTML + CSS",
        "Responsive layout with mobile-first structure",
        "Reusable sections (hero, menu, reservation, contact)",
      ],
    },
    {
      title: "Highlights",
      items: [
        "Simple navigation with clear section flow",
        "CTA-focused layout to drive reservations",
        "Readable typography and spacing across breakpoints",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Problem",
      description:
        "Design a conversion-focused restaurant landing page that remains clean across devices.",
    },
    {
      label: "Approach",
      description:
        "Used a section-based layout, mobile-first spacing, and clear visual hierarchy for menu and reservations.",
    },
    {
      label: "Outcome",
      description:
        "Resulted in a polished one-page experience with direct and readable call-to-action flow.",
    },
  ];

  const engineeringNotes = [
    "Prioritized semantic section structure and responsive spacing for readability.",
    "Kept implementation lightweight with static assets and minimal dependencies.",
  ];

  return (
    <ProjectPageTemplate
      title={restaurantProject?.title ?? "Restaurant Landing Page"}
      summary={
        restaurantProject?.summary ??
        "A modern, responsive single-page landing page for a restaurant."
      }
      infoCards={infoCards}
      caseStudy={caseStudy}
      impact={restaurantProject?.impact}
      engineeringNotes={engineeringNotes}
    />
  );
};

export default RestaurantLanding;
