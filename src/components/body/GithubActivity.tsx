import { GitHubCalendar } from "react-github-calendar";
import ErrorBoundary from "../ErrorBoundary";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import React, { useEffect, useState } from "react";
import { useTheme } from "../theme-context";

type GithubActivityProps = {
  username: string;
};

const GithubActivity = ({ username }: GithubActivityProps) => {
  const { theme } = useTheme();
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches
  );
  const [isTouchPointer, setIsTouchPointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const compactQuery = window.matchMedia("(max-width: 640px)");
    const touchQuery = window.matchMedia("(pointer: coarse)");

    const onCompactChange = (event: MediaQueryListEvent) => {
      setIsCompact(event.matches);
    };

    const onTouchChange = (event: MediaQueryListEvent) => {
      setIsTouchPointer(event.matches);
    };

    compactQuery.addEventListener("change", onCompactChange);
    touchQuery.addEventListener("change", onTouchChange);

    return () => {
      compactQuery.removeEventListener("change", onCompactChange);
      touchQuery.removeEventListener("change", onTouchChange);
    };
  }, []);

  return (
    <section>
      <p className="text-xl font-bold hover:underline cursor-pointer underline-offset-8 transition-all duration-300">
        My Github Contributions :
      </p>
      <div className="mt-4 -mx-2 px-2 overflow-x-auto pb-2">
        <div className="min-w-[520px] sm:min-w-0 w-fit mx-auto rounded-2xl border theme-border-subtle p-2 sm:p-3">
          <ErrorBoundary
            fallback={
              <div className="rounded-2xl border border-[color:var(--color-border-subtle)] p-4 text-sm text-[color:var(--color-text-subtle)]">
                GitHub activity is unavailable right now.
              </div>
            }
          >
            <GitHubCalendar 
              username={username} 
              colorScheme={theme}
              blockSize={isCompact ? 7 : 12}
              blockMargin={isCompact ? 2 : 4}
              fontSize={isCompact ? 10 : 13}
              showWeekdayLabels={!isCompact}
              renderBlock={(block, activity) => (
                React.cloneElement(block, {
                  ...(isTouchPointer
                    ? {}
                    : {
                        "data-tooltip-id": "react-gh-tooltip",
                        "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                      }),
                })
              )}
            />
            {!isTouchPointer && <ReactTooltip id="react-gh-tooltip" />}
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
