import { useNavigate } from "react-router";
import ProfileIntro from "./body/ProfileIntro";
import GithubActivity from "./body/GithubActivity";
import TechStack from "./body/TechStack";
import EmailContactForm from "./contact/EmailContactForm";


const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="font-jetMono mt-6 sm:mt-10">
      <ProfileIntro
        onProjectsClick={() => navigate("/projects")}
        onResumeClick={() => navigate("/resume")}
        onContactClick={() => navigate("/contact")}
      />

      <div className="mt-14 sm:mt-24 flex flex-col gap-8 sm:gap-10">
        <GithubActivity username="suresurya" />
        <TechStack />

        <section className="theme-card-glass rounded-2xl p-5 sm:p-7 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-subtle)]">
            Quick Contact
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold">Have an opportunity or project?</h2>
          <p className="text-sm text-[color:var(--color-text-subtle)] leading-relaxed">
            Send a message directly from the home page. I receive it in email and you get an automatic confirmation.
          </p>
          <EmailContactForm compact />
        </section>
      </div>
    </div>
  );
};

export default Body;
