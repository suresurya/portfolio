import ProjectPageTemplate from "./ProjectPageTemplate";
import { getProjectByKey } from "../../data/constants";

const SamuraiGame = () => {
  const samuraiProject = getProjectByKey("samurai-game");

  const infoCards = [
    {
      title: "Tech & Gameplay",
      items: [
        "Python 3 + Pygame engine",
        "Custom pixel art animations for both samurai",
        "PvP and PvC modes with AI difficulty levels",
        "Platform types: ice, lava, and stone terrain",
      ],
    },
    {
      title: "Core Features",
      items: [
        "Combo-based combat with projectiles and specials",
        "Health, shield, speed, and special power-ups",
        "Background music and sound effects with CLI toggles",
        "Local multiplayer-ready control scheme",
      ],
    },
  ];

  const caseStudy = [
    {
      label: "Problem",
      description:
        "Create an engaging 2D fighting game with multiple play modes and responsive controls.",
    },
    {
      label: "Approach",
      description:
        "Implemented character state logic, map variation, and game mechanics using Python and Pygame.",
    },
    {
      label: "Outcome",
      description:
        "Delivered a playable pixel-art combat experience with replay value and feature depth.",
    },
  ];

  const repository = samuraiProject?.repoUrl
    ? {
        text: samuraiProject.repoUrl.replace(/^https?:\/\//, ""),
        href: samuraiProject.repoUrl,
      }
    : undefined;

  const engineeringNotes = [
    "Implemented game-state transitions for PvP and PvC while keeping input handling predictable.",
    "Designed modular combat mechanics so power-ups and specials can be extended easily.",
  ];

  return (
    <ProjectPageTemplate
      title={samuraiProject?.title ?? "Samurai Duel Saga"}
      summary={
        samuraiProject?.summary ??
        "Samurai Duel Saga is a 2D pixel-art fighting game built in Python with Pygame."
      }
      infoCards={infoCards}
      caseStudy={caseStudy}
      impact={samuraiProject?.impact}
      engineeringNotes={engineeringNotes}
      repository={repository}
    />
  );
};

export default SamuraiGame;
