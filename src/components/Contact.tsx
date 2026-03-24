
import { useNavigate } from "react-router";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail, FiSend } from "react-icons/fi";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-6 sm:mt-10 space-y-6 sm:space-y-8 font-jetMono text-[color:var(--color-text-main)]">
      <div className="theme-card-glass rounded-2xl p-6 sm:p-8 space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--color-text-subtle)]">
          Contact
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
          Let&apos;s build something useful together.
        </h1>
        <p className="max-w-2xl text-[color:var(--color-text-subtle)] leading-relaxed">
          I am open to internships, collaboration, and Java backend opportunities.
          If you have a project idea or role that fits my profile, feel free to reach out.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="mailto:contact.surya.dev@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-xl border theme-border-subtle px-4 py-2 hover:bg-[color:var(--color-accent-soft)] transition-colors"
          >
            <FiMail />
            Send Email
          </a>
          <button
            type="button"
            onClick={() => navigate("/resume")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border theme-border-subtle px-4 py-2 hover:bg-[color:var(--color-accent-soft)] transition-colors cursor-pointer"
          >
            <FiSend />
            View Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://github.com/suresurya"
          target="_blank"
          rel="noopener noreferrer"
          className="theme-card-glass rounded-2xl p-5 border theme-border-subtle hover:-translate-y-0.5 transition-transform"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">GitHub</span>
            <FaGithub className="text-2xl" />
          </div>
          <p className="mt-2 text-sm text-[color:var(--color-text-subtle)]">
            Explore my source code, projects, and ongoing experiments.
          </p>
        </a>

        <a
          href="https://www.linkedin.com/in/sure-sri-veknat-rama-surya-b924a6332/"
          target="_blank"
          rel="noopener noreferrer"
          className="theme-card-glass rounded-2xl p-5 border theme-border-subtle hover:-translate-y-0.5 transition-transform"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">LinkedIn</span>
            <FaLinkedin className="text-2xl" />
          </div>
          <p className="mt-2 text-sm text-[color:var(--color-text-subtle)]">
            Connect with me professionally for opportunities and networking.
          </p>
        </a>
      </div>

      <div className="rounded-2xl border theme-border-subtle p-5 sm:p-6 bg-[color:var(--color-bg-surface)]">
        <p className="text-sm text-[color:var(--color-text-subtle)]">
          Preferred response time
        </p>
        <p className="mt-1 text-lg font-medium">Within 24 to 48 hours</p>
      </div>
    </section>
  );
};

export default Contact;