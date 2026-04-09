import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ProfileIntro from "./body/ProfileIntro";
import GithubActivity from "./body/GithubActivity";
import TechStack from "./body/TechStack";


const Body = () => {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const inter = setInterval(() => {
      setOnline((p) => !p);
    }, 1000);

    return () => clearInterval(inter);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="font-jetMono mt-6 sm:mt-10">
      <ProfileIntro
        online={online}
        onProjectsClick={() => navigate("/projects")}
        onResumeClick={() => navigate("/resume")}
        onContactClick={() => navigate("/contact")}
      />

      <div className="mt-14 sm:mt-24 flex flex-col gap-8 sm:gap-10">
        <GithubActivity username="suresurya" />
        <TechStack />
      </div>
    </div>
  );
};

export default Body;
