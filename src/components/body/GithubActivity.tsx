import { ActivityCalendar, type Activity } from "react-activity-calendar";
import ErrorBoundary from "../ErrorBoundary";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import React, { useEffect, useState } from "react";

type GithubActivityProps = {
  username: string;
};

type DenoContribution = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

type DenoContributionResponse = {
  contributions: DenoContribution[][];
};

type VercelContribution = {
  date: string;
  count: number;
  intensity: number | string;
};

type VercelContributionResponse = {
  contributions: VercelContribution[];
};

const CONTRIBUTION_LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const normalizeLevel = (level: number) => Math.max(0, Math.min(4, level));

const GITHUB_GREEN_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const finalizeActivities = (activities: Activity[]): Activity[] => {
  const perDate = new Map<string, Activity>();

  for (const activity of activities) {
    if (typeof activity.date !== "string") continue;
    perDate.set(activity.date, {
      date: activity.date,
      count: Math.max(0, activity.count),
      level: normalizeLevel(activity.level),
    });
  }

  return Array.from(perDate.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-366);
};

const parseDenoContributions = (payload: unknown): Activity[] => {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const contributions = (payload as DenoContributionResponse).contributions;
  if (!Array.isArray(contributions)) {
    return [];
  }

  const flattened = contributions.flatMap((week) => Array.isArray(week) ? week : []);

  const normalized = flattened
    .filter((day) => day && typeof day.date === "string")
    .map((day) => {
      const count = typeof day.contributionCount === "number" ? day.contributionCount : 0;
      const mappedLevel = CONTRIBUTION_LEVEL_MAP[day.contributionLevel];
      const level = typeof mappedLevel === "number"
        ? mappedLevel
        : (count > 0 ? 1 : 0);

      return {
        date: day.date,
        count,
        level,
      } satisfies Activity;
    });

  return finalizeActivities(normalized);
};

const parseVercelContributions = (payload: unknown): Activity[] => {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const contributions = (payload as VercelContributionResponse).contributions;
  if (!Array.isArray(contributions)) {
    return [];
  }

  const normalized = contributions
    .filter((day) => day && typeof day.date === "string")
    .map((day) => {
      const count = typeof day.count === "number" ? day.count : 0;
      const levelFromIntensity = Number(day.intensity);
      const level = Number.isFinite(levelFromIntensity)
        ? levelFromIntensity
        : (count > 0 ? 1 : 0);

      return {
        date: day.date,
        count,
        level,
      } satisfies Activity;
    });

  return finalizeActivities(normalized);
};

const fetchContributionData = async (username: string, signal: AbortSignal): Promise<Activity[]> => {
  const encodedUsername = encodeURIComponent(username.trim());
  const endpoints = [
    `https://github-contributions-api.deno.dev/${encodedUsername}.json`,
    `https://github-contributions.vercel.app/api/v1/${encodedUsername}`,
  ];

  const errors: string[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { signal, headers: { Accept: "application/json" } });
      if (!response.ok) {
        errors.push(`${endpoint} (${response.status})`);
        continue;
      }

      const payload = await response.json();
      const activities = parseDenoContributions(payload);
      if (activities.length > 0) {
        return activities;
      }

      const fallbackActivities = parseVercelContributions(payload);
      if (fallbackActivities.length > 0) {
        return fallbackActivities;
      }

      errors.push(`${endpoint} (empty payload)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown fetch error";
      errors.push(`${endpoint} (${message})`);
    }
  }

  throw new Error(errors.join("; "));
};

const GithubActivity = ({ username }: GithubActivityProps) => {
  const [calendarData, setCalendarData] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();
    setIsLoading(true);
    setHasLoadError(false);

    fetchContributionData(username, abortController.signal)
      .then((activities) => {
        if (isActive) {
          setCalendarData(activities);
        }
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setHasLoadError(true);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [username]);

  return (
    <section>
      <p className="text-xl font-bold hover:underline cursor-pointer underline-offset-8 transition-all duration-300">
        My Github Contributions :
      </p>
      <div className="overflow-x-auto pb-2 mt-4">
        <div className="min-w-[680px] sm:min-w-0 w-fit mx-auto">
          <ErrorBoundary
            fallback={
              <div className="rounded-2xl border border-[color:var(--color-border-subtle)] p-4 text-sm text-[color:var(--color-text-subtle)]">
                GitHub activity is unavailable right now.
              </div>
            }
          >
            <ActivityCalendar
                data={calendarData}
                loading={isLoading}
                colorScheme="dark"
                theme={GITHUB_GREEN_THEME}
                labels={{ totalCount: "{{count}} contributions in the last year" }}
                renderBlock={(block, activity) => (
                  React.cloneElement(block, {
                    "data-tooltip-id": "react-gh-tooltip",
                    "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                  })
                )}
            />
            <ReactTooltip id="react-gh-tooltip" />
            {hasLoadError && (
              <div className="mt-3 text-xs text-[color:var(--color-text-subtle)]">
                Live contribution data source is temporarily unavailable.
              </div>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
