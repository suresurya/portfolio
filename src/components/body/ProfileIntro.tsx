import Profile from "../../assets/pfp.webp";
import { IoDocumentLockSharp } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";

type ProfileIntroProps = {
  onResumeClick: () => void;
  onContactClick: () => void;
  onProjectsClick: () => void;
};

const ProfileIntro = ({ onResumeClick, onContactClick, onProjectsClick }: ProfileIntroProps) => {
  return (
    <section>
      <div className="mb-5 w-fit relative p-0">
        <img
          src={Profile}
          alt="Sure Surya profile photo"
          className="rounded-full size-20 sm:size-24 object-cover"
          height={96}
          width={96}
          loading="lazy"
          decoding="async"
        />
        <span
          className="absolute bottom-0 right-0 inline-flex h-5 w-5 items-center justify-center"
          role="status"
          aria-label="Currently available for opportunities"
        >
          <span
            className="absolute inline-flex h-4 w-4 rounded-full bg-green-400/60 animate-ping"
            aria-hidden="true"
          />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[color:var(--color-bg)]" />
        </span>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-5 gap-y-2">
        <h1 className="text-2xl sm:text-3xl leading-tight">
          Hi, I am {" "}
          <span className="hover:underline cursor-pointer underline-offset-8 transition-all duration-300">
            <span className="hidden sm:inline">S.Sri Venkat Rama Surya</span>
            <span className="sm:hidden">S. Surya</span>
          </span>
        </h1>
        <span className="hidden sm:inline text-2xl font-medium"> -- </span>
        <h3 className="text-[color:var(--color-text-subtle)] text-xl sm:text-2xl">Java Backend Developer</h3>
      </div>

      <p className="mt-3 inline-flex items-center gap-2 rounded-full border theme-border-subtle px-3 py-1 text-xs sm:text-sm text-[color:var(--color-text-subtle)]">
        <FiBriefcase aria-hidden="true" />
        Open to internships and entry-level backend roles
      </p>

      <div className="mt-6 text-sm sm:text-base leading-relaxed text-[color:var(--color-text-main)]">
        <p>
          I build reliable Java backend applications with Spring Boot, REST APIs, and SQL-backed services. My focus is writing maintainable code, designing clean APIs, and shipping projects that solve real workflow problems for users and teams.
        </p>
      </div>

      <div className="mt-3 text-sm text-[color:var(--color-text-subtle)]">
        Core stack: Java, Spring Boot, Hibernate, MySQL, and REST API architecture.
      </div>

      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-[color:var(--color-text-subtle)]">
        <p className="font-semibold text-[color:var(--color-text-main)]">Additional Information</p>
        <p className="mt-1">
          Hobbies: Anime, learning new technologies, and building automation systems.
        </p>
        <p className="mt-1">
          Outside of tech, I enjoy 60+ WPM touch typing practice, swimming, drawing, Taekwondo (up to yellow belt), and solving various Rubik&apos;s cubes (3x3, 2x2, mirror cube, Pyraminx, Megaminx).
        </p>
      </div>

      <div className="text-sm flex flex-wrap items-center mt-6 gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Navigate to projects page"
          className="flex items-center gap-2 rounded-xl border-2 border-dashed theme-border-subtle bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
          onClick={onProjectsClick}
        >
          View Projects
        </button>

        <button
          type="button"
          aria-label="Navigate to resume page"
          className="flex items-center gap-2 rounded-xl border-2 border-dashed theme-border-subtle bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
          onClick={onResumeClick}
        >
          Download Resume <IoDocumentLockSharp />
        </button>

        <button
          type="button"
          aria-label="Navigate to contact page"
          onClick={onContactClick}
          className="flex items-center gap-2 rounded-xl border-2 border-dashed theme-border-subtle bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
        >
          Contact Me <FaRegPaperPlane />
        </button>
      </div>
    </section>
  );
};

export default ProfileIntro;
