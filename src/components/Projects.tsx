import { Link, Outlet } from "react-router";

const Projects = () => {
  const projects = [
    { title: "PORTIFILO", path: "/projects/portfolio" },
    { title: "SAMUURAI GAME", path: "/projects/samurai-game" },
    { title: "RESTAURANT LANDING PAGE", path: "/projects/restaurant-landing" },
    { title: "DSA", path: "/projects/dsa" },
  ];

  return (
    <div className="mt-6 sm:mt-10 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <Link
            to={p.path}
            key={i}
            className="block theme-card-glass rounded-xl p-4 sm:p-5 hover:translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg pr-2">{p.title}</span>
              <span className="text-green-400">Open →</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Projects;
