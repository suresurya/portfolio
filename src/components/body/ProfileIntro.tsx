import Profile from "../../assets/pfp.webp";
import { GoDotFill, GoDot } from "react-icons/go";
import { IoDocumentLockSharp } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";

type ProfileIntroProps = {
  online: boolean;
  onResumeClick: () => void;
  onContactClick: () => void;
};

const ProfileIntro = ({ online, onResumeClick, onContactClick }: ProfileIntroProps) => {
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
        {online ? (
          <span className="text-2xl text-green-500 absolute bottom-0 right-0">
            <GoDotFill />
          </span>
        ) : (
          <span className="text-2xl text-green-500 bottom-0 right-0 absolute">
            <GoDot />
          </span>
        )}
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
        <h3 className="text-[color:var(--color-text-subtle)] text-2xl sm:text-3xl">A Java Dev.</h3>
      </div>

      <div className="mt-6 text-sm sm:text-base leading-relaxed text-[color:var(--color-text-main)]">
        <p>
          I am Sure Sri Venkat Rama Surya, a 3rd-year B.Tech CSE student at Vignan Foundation for Science and Technology. I am a Java developer with strong fundamentals in Core Java and hands-on experience in Spring Boot, REST APIs, MySQL, JDBC, and Hibernate. I have built multiple database-driven Java applications and am currently seeking internship opportunities to gain real-world industry experience.
        </p>
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
          aria-label="Navigate to resume page"
          className="flex items-center gap-2 rounded-xl border-2 border-dashed theme-border-subtle bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
          onClick={onResumeClick}
        >
          My Resume <IoDocumentLockSharp />
        </button>

        <button
          type="button"
          aria-label="Navigate to contact page"
          onClick={onContactClick}
          className="flex items-center gap-2 rounded-xl border-2 border-dashed theme-border-subtle bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
        >
          Contact ME <FaRegPaperPlane />
        </button>
      </div>
    </section>
  );
};

export default ProfileIntro;
