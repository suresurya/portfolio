
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiCopy, FiMail, FiSend } from "react-icons/fi";
import { SOCIAL } from "../data/constants";
import EmailContactForm from "./contact/EmailContactForm";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const Contact = () => {
  const navigate = useNavigate();
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");

  const copyWithExecCommand = (value: string) => {
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "true");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const didCopy = document.execCommand("copy");
    document.body.removeChild(helper);
    return didCopy;
  };

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SOCIAL.email);
        setCopyState("success");
        toast.success("Email copied to clipboard!");
      } else if (copyWithExecCommand(SOCIAL.email)) {
        setCopyState("success");
        toast.success("Email copied to clipboard!");
      } else {
        setCopyState("error");
        toast.error("Failed to copy email.");
      }
    } catch {
      setCopyState("error");
    }

    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  const copyButtonLabel =
    copyState === "success"
      ? "Email Copied"
      : copyState === "error"
        ? "Copy Failed"
        : "Copy Email";

  return (
    <section className="mt-6 sm:mt-10 space-y-6 sm:space-y-8 font-jetMono text-[color:var(--color-text-main)]">
      <Helmet>
        <title>Contact | Sure Surya Portfolio</title>
        <meta name="description" content="Get in touch with Sure Surya for collaborations, internships, or Java backend engineering opportunities." />
      </Helmet>
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
            href={`mailto:${SOCIAL.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border theme-border-subtle px-4 py-2 hover:bg-[color:var(--color-accent-soft)] transition-colors"
            aria-label="Send email to Sure Surya"
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
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center justify-center gap-2 rounded-xl border theme-border-subtle px-4 py-2 hover:bg-[color:var(--color-accent-soft)] transition-colors cursor-pointer"
            aria-label="Copy Sure Surya email address"
          >
            <FiCopy />
            {copyButtonLabel}
          </button>
        </div>

        {copyState === "error" && (
          <p className="text-sm text-red-500" aria-live="polite">
            Could not copy automatically. Email: {SOCIAL.email}
          </p>
        )}
      </div>

      <div className="theme-card-glass rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Send a direct message</h2>
        <p className="text-sm text-[color:var(--color-text-subtle)] leading-relaxed">
          Your message goes to my inbox and you also receive an automatic confirmation email.
        </p>
        <EmailContactForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="theme-card-glass rounded-2xl p-5 border theme-border-subtle hover:-translate-y-0.5 transition-transform"
          aria-label="Visit Sure Surya on GitHub (opens in new tab)"
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
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="theme-card-glass rounded-2xl p-5 border theme-border-subtle hover:-translate-y-0.5 transition-transform"
          aria-label="Visit Sure Surya on LinkedIn (opens in new tab)"
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