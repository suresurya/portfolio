import Profile from "../assets/pfp.png";
import { GoDotFill, GoDot } from "react-icons/go";
import { IoDocumentLockSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useNavigate } from "react-router";
import { FaRegPaperPlane } from "react-icons/fa";
import Express from  "../assets/icons/express.svg"
import Hibernate from  "../assets/icons/hibernate.svg"
import Intellij from  "../assets/icons/intellin.svg"
import Java from  "../assets/icons/java.svg"
import Maven from  "../assets/icons/maven.svg"
import MongoDB from  "../assets/icons/mongodb.svg"
import Node from  "../assets/icons/node.svg"
import PyCharm from  "../assets/icons/pycharm.svg"
import React from  "../assets/icons/react.svg"
import Spring from  "../assets/icons/spring.svg"
import MySql from  "../assets/icons/sql.svg"
import HTML5 from  "../assets/icons/HTML5.svg"
import CSS3 from  "../assets/icons/CSS3.svg"
import ApacheTomcat from  "../assets/icons/Apache Tomcat.svg"
import Ollama from  "../assets/icons/ollama.svg"
import Python from  "../assets/icons/Python.svg"
import PostgresSQL from  "../assets/icons/PostgresSQL.svg"
import GitIcon from  "../assets/icons/Git.svg"
import GradleIcon from  "../assets/icons/Gradle.svg"
import GitHubIcon from "../assets/icons/github-icon.svg"


const Body = () => {
  const [online, setOnline] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const inter = setInterval(() => {
      setOnline((p) => !p);
    }, 1000);

    return () => clearInterval(inter);
  }, []);

  const navigate = useNavigate();

  const techCategories = [
    {
      title: "Backend",
      items: [
        { name: "Java", icon: Java },
        { name: "Spring", icon: Spring },
        { name: "Hibernate", icon: Hibernate },
        { name: "Maven", icon: Maven },
        { name: "Node.js", icon: Node },
        { name: "Express.js", icon: Express, className: "tech-icon-invert-light" },
        { name: "Python", icon: Python },
        { name: "Gradle", icon: GradleIcon },
      ],
    },
    {
      title: "Frontend",
      items: [
        { name: "HTML5", icon: HTML5 },
        { name: "CSS3", icon: CSS3 },
        { name: "React", icon: React },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "MySQL", icon: MySql },
        { name: "MongoDB", icon: MongoDB },
        { name: "PostgreSQL", icon: PostgresSQL },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "IntelliJ IDEA", icon: Intellij },
        { name: "PyCharm", icon: PyCharm },
        { name: "Git", icon: GitIcon },
        { name: "GitHub", icon: GitHubIcon, className: "tech-icon-invert-dark" },
      ],
    },
    {
      title: "Servers",
      items: [{ name: "Apache Tomcat", icon: ApacheTomcat }],
    },
    {
      title: "AI / LLM",
      items: [{ name: "Ollama", icon: Ollama, className: "tech-icon-invert-dark" }],
    },
  ];

  const allTechItems = techCategories.flatMap((category) => category.items);
  const visibleTechItems =
    activeCategory === "All"
      ? allTechItems
      : techCategories.find((category) => category.title === activeCategory)?.items ?? [];

  const categoryLabels = ["All", ...techCategories.map((category) => category.title)];
  return (
    <div className="font-jetMono mt-6 sm:mt-10">
      <div id="image" className="mb-5 w-fit relative p-0">
        <img
          src={Profile}
          alt="profile here"
          className="rounded-full size-20 sm:size-24 object-cover"
          height={96}
          width={96}
        />
        {online ? (
          <span className="text-2xl text-green-500 absolute bottom-0 right-0">
            <GoDotFill />
          </span>
        ) : (
          <span className="text-2xl text-green-500 bottom-0 right-0 absolute">
            {" "}
            <GoDot />
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-5 gap-y-2">
        <h1 className="text-2xl sm:text-3xl leading-tight">
          Hi, I am{' '}
          <span className="hover:underline cursor-pointer underline-offset-8 transition-all duration-300">
            <span className="hidden sm:inline">S.Sri Venkat Rama Surya</span>
            <span className="sm:hidden">S. Surya</span>
          </span>
        </h1>
        <span className="hidden sm:inline text-2xl font-medium"> -- </span>
        <h3 className="text-[color:var(--color-text-subtle)] text-2xl sm:text-3xl">A Java Dev.</h3>
      </div>

      <div id="desc" className="mt-6 text-sm sm:text-base leading-relaxed text-[color:var(--color-text-main)]">
        <p>
I am Sure Sri Venkat Rama Surya, a 3rd-year B.Tech CSE student at Vignan Foundation for Science and Technology. I am a Java developer with strong fundamentals in Core Java and hands-on experience in Spring Boot, REST APIs, MySQL, JDBC, and Hibernate. I have built multiple database-driven Java applications and am currently seeking internship opportunities to gain real-world industry experience.
        </p>
      </div>

      <div id="additional-info" className="mt-4 sm:mt-6 text-xs sm:text-sm text-[color:var(--color-text-subtle)]">
        <p className="font-semibold text-[color:var(--color-text-main)]">Additional Information</p>
        <p className="mt-1">
          Hobbies: fitness, anime, learning new technologies, and building automation systems.
        </p>
        <p className="mt-1">
          Outside of tech, I enjoy 60+ WPM touch typing practice, swimming, drawing, Taekwondo (up to yellow belt), and solving various Rubik&apos;s cubes (3×3, 2×2, mirror cube, Pyraminx, Megaminx).
        </p>
      </div>

      <div id="res-contact" className="text-sm flex flex-wrap items-center mt-6 gap-3 sm:gap-4">
        <button
          id="resume"
          type="button"
          className="flex items-center gap-2 rounded-xl border-2 border-dashed theme-border-subtle
         bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
          onClick={() => navigate("/resume")}
        >
          My Resume <IoDocumentLockSharp />
        </button>

        <button
          id="contact"
          type="button"
          onClick={() => navigate("/contact")}
          className="flex items-center gap-2 rounded-xl border-2 border-dashed theme-border-subtle bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
        >
          Contact ME <FaRegPaperPlane />
        </button>
      </div>


      
        
        
      <div id="tech" className="mt-14 sm:mt-24 flex flex-col gap-8 sm:gap-10">
        <p className="text-xl font-bold hover:underline cursor-pointer underline-offset-8 transition-all duration-300">My Github Contributions :</p>
        <div id="git" className="overflow-x-auto pb-2">
          <div className="min-w-[680px] sm:min-w-0 w-fit mx-auto">
            <GitHubCalendar username="suresurya" colorScheme="dark" />
          </div>
        </div>

        <div id="stack">
          <p className="text-xl font-bold underline-offset-8 hover:underline transition-all duration-300 cursor-pointer">
            My Tech Stack :
          </p>

          <div id="icons" className="mt-6 text-xl space-y-3">
            <div className="text-xs text-[color:var(--color-text-subtle)] flex flex-wrap items-center gap-x-2 gap-y-1">
              {categoryLabels.map((label, index) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <span
                    onClick={() => setActiveCategory(label)}
                    className={
                      "cursor-pointer transition-colors duration-200 " +
                      (activeCategory === label
                        ? "text-[color:var(--color-text-main)] font-semibold underline underline-offset-4"
                        : "hover:text-[color:var(--color-text-main)]")
                    }
                  >
                    {label}
                  </span>
                  {index < categoryLabels.length - 1 && <span aria-hidden="true">•</span>}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-5 border-gray-300/40 border p-4 sm:p-5 rounded-2xl text-[color:var(--color-text-main)] justify-items-center">
              {visibleTechItems.map((item) => (
                <div key={item.name} className="group relative flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.name}
                    title={item.name}
                    className={"h-[38px] w-[38px] object-contain transition-transform duration-200 group-hover:scale-105 " + (item.className ?? "")}
                    height={38}
                    width={38}
                  />
                  <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-300/40 bg-[color:var(--color-bg-surface)] px-2 py-0.5 text-[10px] text-[color:var(--color-text-main)] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      

        
    </div>
  );
};

export default Body;
