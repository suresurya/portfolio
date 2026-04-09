import ProjectPageTemplate from "./ProjectPageTemplate";

const RestaurantLanding = () => {
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

  return (
    <ProjectPageTemplate
      title="Restaurant Landing Page"
      summary="A modern, responsive single-page landing page for a restaurant. The focus is on clean sections, strong visuals, and clear calls-to-action for menu, reservations, and contact."
      infoCards={infoCards}
      caseStudy={caseStudy}
    />
  );
};

export default RestaurantLanding;
