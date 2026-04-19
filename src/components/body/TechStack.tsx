import { useMemo, useState } from "react";
import { TECH_CATEGORIES } from "../../data/techStack";
import LogoLoop, { type LogoItem } from "./LogoLoop";

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allTechItems = useMemo(
    () => TECH_CATEGORIES.flatMap((category) => category.items),
    []
  );

  const visibleTechItems =
    activeCategory === "All"
      ? allTechItems
      : TECH_CATEGORIES.find((category) => category.title === activeCategory)?.items ?? [];

  const allLogoItems = useMemo<LogoItem[]>(() => {
    return allTechItems.map((item) => ({
      node: (
        <span className="inline-flex items-center justify-center tech-icon-shell" title={item.name}>
          <img
            src={item.icon}
            alt={item.name}
            className={"h-[38px] w-[38px] object-contain tech-icon-image " + (item.className ?? "")}
            height={38}
            width={38}
            loading="lazy"
            decoding="async"
          />
        </span>
      ),
      title: item.name,
      ariaLabel: item.name,
    }));
  }, [allTechItems]);

  const categoryLabels = ["All", ...TECH_CATEGORIES.map((category) => category.title)];

  return (
    <section>
      <p className="text-xl font-bold underline-offset-8 hover:underline transition-all duration-300 cursor-pointer">
        My Tech Stack :
      </p>

      <div className="mt-6 text-xl space-y-3">
        <div className="text-xs text-[color:var(--color-text-subtle)] flex flex-wrap items-center gap-x-2 gap-y-1">
          {categoryLabels.map((label, index) => (
            <span key={label} className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory(label)}
                className={
                  "cursor-pointer transition-colors duration-200 " +
                  (activeCategory === label
                    ? "text-[color:var(--color-text-main)] font-semibold underline underline-offset-4"
                    : "hover:text-[color:var(--color-text-main)]")
                }
              >
                {label}
              </button>
              {index < categoryLabels.length - 1 && <span aria-hidden="true">•</span>}
            </span>
          ))}
        </div>

        {activeCategory === "All" ? (
          <div className="space-y-2 rounded-2xl border border-gray-300/40 bg-[color:var(--color-bg-surface)] p-4 sm:p-5 overflow-hidden">
            <p className="text-[11px] sm:text-xs text-[color:var(--color-text-subtle)]">
            </p>
            <LogoLoop
              logos={allLogoItems}
              speed={95}
              direction="left"
              logoHeight={46}
              gap={34}
              hoverSpeed={10}
              scaleOnHover
              ariaLabel="Technology logos loop"
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-5 border-gray-300/40 border p-4 sm:p-5 rounded-2xl text-[color:var(--color-text-main)] justify-items-center">
            {visibleTechItems.map((item) => (
              <div key={item.name} className="group relative flex items-center justify-center tech-icon-shell">
                <img
                  src={item.icon}
                  alt={item.name}
                  className={"h-[38px] w-[38px] object-contain tech-icon-image " + (item.className ?? "")}
                  height={38}
                  width={38}
                  loading="lazy"
                  decoding="async"
                />
                <span className="tech-icon-tooltip pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-300/40 bg-[color:var(--color-bg-surface)] px-2 py-0.5 text-[10px] text-[color:var(--color-text-main)] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStack;
