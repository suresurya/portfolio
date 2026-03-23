import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Main = () => {
  return (
    <div className="max-w-4xl mx-auto w-full font-jetMono min-h-screen px-4 sm:px-5 md:px-6 pb-6 relative text-[color:var(--color-text-main)] bg-[color:var(--color-bg)] transition-colors duration-[var(--theme-transition-duration)] overflow-x-clip">
      <NavBar />
      <div className="page-transition">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
