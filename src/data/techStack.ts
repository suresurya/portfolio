import Express from "../assets/icons/express.svg";
import Hibernate from "../assets/icons/hibernate.svg";
import Intellij from "../assets/icons/intellin.svg";
import Java from "../assets/icons/java.svg";
import Maven from "../assets/icons/maven.svg";
import MongoDB from "../assets/icons/mongodb.svg";
import Node from "../assets/icons/Node.js.svg";
import PyCharm from "../assets/icons/pycharm.svg";
import ReactIcon from "../assets/icons/react.svg";
import Spring from "../assets/icons/spring.svg";
import MySql from "../assets/icons/sql.svg";
import HTML5 from "../assets/icons/HTML5.svg";
import CSS3 from "../assets/icons/CSS3.svg";
import JavaScriptIcon from "../assets/icons/JavaScript.svg";
import ApacheTomcat from "../assets/icons/Apache Tomcat.svg";
import Ollama from "../assets/icons/ollama.svg";
import Python from "../assets/icons/Python.svg";
import PostgresSQL from "../assets/icons/PostgresSQL.svg";
import GitIcon from "../assets/icons/Git.svg";
import GradleIcon from "../assets/icons/Gradle.svg";
import GitHubIcon from "../assets/icons/github-icon.svg";
import DockerIcon from "../assets/icons/Docker.svg";
import PodmanIcon from "../assets/icons/Podman.svg";
import SpringAiIcon from "../assets/icons/spring-ai.svg";
import ThymeleafIcon from "../assets/icons/thymeleaf_logo_icon_249398.svg";

export type TechItem = {
  name: string;
  icon: string;
  className?: string;
};

export type TechCategory = {
  title: string;
  items: TechItem[];
};

export const TECH_CATEGORIES: TechCategory[] = [
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
      { name: "Spring AI", icon: SpringAiIcon },
      {
        name: "Thymeleaf",
        icon: ThymeleafIcon,
        className: "rounded-md bg-white p-1",
      },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "HTML5", icon: HTML5 },
      { name: "CSS3", icon: CSS3 },
      { name: "JavaScript", icon: JavaScriptIcon },
      { name: "React", icon: ReactIcon },
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
      { name: "Docker", icon: DockerIcon },
      { name: "Podman", icon: PodmanIcon },
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
