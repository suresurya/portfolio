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


const Body = () => {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const inter = setInterval(() => {
      setOnline((p) => !p);
    }, 1000);

    return () => clearInterval(inter);
  }, []);

  const navigate = useNavigate();
   const techStack = [
  { name: "Java", icon: Java },
  { name: "Spring", icon: Spring },
  { name: "Hibernate", icon: Hibernate },
  { name: "Maven", icon: Maven },
  { name: "MySQL", icon: MySql },
  { name: "MongoDB", icon: MongoDB },
  { name: "Node.js", icon: Node },
  { name: "Express.js", icon: Express },
  { name: "React", icon: React },
  { name: "IntelliJ IDEA", icon: Intellij },
  { name: "PyCharm", icon: PyCharm },
];
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
            <span className="hidden sm:inline">S.S V R SURYA</span>
            <span className="sm:hidden">S. Surya</span>
          </span>
        </h1>
        <span className="hidden sm:inline text-2xl font-medium"> -- </span>
        <h3 className="text-gray-400 text-2xl sm:text-3xl">A Java Dev.</h3>
      </div>

      <div id="desc" className="mt-6 text-sm sm:text-base leading-relaxed text-[color:var(--color-text-main)]">
        <p>
I am Sure Sri Venak Rama Surya,a B.Tech CSE (3rd Year) student at Vignan Foundation for Science & Technology. I am a JAVA DEVELOPER(Fresher) with strong fundamentals in Core JAVA and hands-on experience in SPRING BOOT,REST API's,Mysql,JDBC,and Hibernate. I have build multiple Database-driven Java applicatoins and am seeking internship oppotrunities to gain real-world industry experience.        </p>
      </div>

      <div id="res-contact" className="text-sm flex flex-wrap items-center mt-6 gap-3 sm:gap-4">
        <button
          id="resume"
          type="button"
          className="flex items-center gap-2 rounded-xl border-2 border-dashed border-white/60
         bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
          onClick={() => navigate("/resume")}
        >
          My Resume <IoDocumentLockSharp />
        </button>

        <button
          id="contact"
          type="button"
          onClick={() => navigate("/contact")}
          className="flex items-center gap-2 rounded-xl border-2 border-dashed border-white/60 bg-gray-300/20 w-fit px-3 py-2 cursor-pointer hover:bg-gray-200/50"
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
          <p className="text-xl font-bold  underline-offset-8 hover:underline transition-all duration-300 cursor-pointer">My Tech Stack :</p>

          <div id="icons" className="mt-6 text-xl">
            <div id="tech" className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-5 border-gray-300/40 border p-4 sm:p-5 rounded-2xl text-white justify-items-center">
             {techStack.map(((item , index)=>(
                <img src={item.icon} alt={item.name} key={index} height={38} width={38} />
             )))}
              </div>
          </div>
        </div>
      </div>
      

        
    </div>
  );
};

export default Body;
