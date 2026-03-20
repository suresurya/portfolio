import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import GreenCursor from "./GreenCursor";

const Main = () => {
  return (
    <div className="max-w-3xl mx-auto font-jetMono min-h-screen p-1 relative cursor-none text-[color:var(--color-text-main)] bg-[color:var(--color-bg)] transition-colors duration-[var(--theme-transition-duration)]">
      <NavBar />
      <div className="page-transition">
        <Outlet />
      </div>
      <Footer />
      <GreenCursor />
    </div>
  );
};

export default Main;
