import { GitHubCalendar } from "react-github-calendar";
import ErrorBoundary from "../ErrorBoundary";

type GithubActivityProps = {
  username: string;
};

const GithubActivity = ({ username }: GithubActivityProps) => {
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
            <GitHubCalendar username={username} colorScheme="dark" />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
