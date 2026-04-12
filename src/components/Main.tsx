import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Main = () => {
  return (
    <div className="max-w-4xl mx-auto w-full font-jetMono min-h-screen px-4 sm:px-5 md:px-6 pb-6 relative text-[color:var(--color-text-main)] bg-[color:var(--color-bg)] transition-colors duration-[var(--theme-transition-duration)] overflow-x-clip">
      <Helmet>
        <title>Sure Surya | Java Backend Developer</title>
        <meta name="description" content="Portfolio of Sure Surya, a Java Backend Developer specializing in Spring Boot, REST APIs, and scalable backend architecture." />
      </Helmet>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[120] rounded-lg border theme-border-subtle bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm text-[color:var(--color-text-main)]"
      >
        Skip to content
      </a>
      <NavBar />
      <main id="main-content" tabIndex={-1} className="page-transition">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
