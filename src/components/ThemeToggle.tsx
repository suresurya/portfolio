import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { cn } from "../cn";
import { useTheme } from "./theme-context";

export const ThemeToggle = () => {
  const { theme, toggleThemeFromClick } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => toggleThemeFromClick(e)}
      className={cn(
        "size-8 rounded-full flex items-center justify-center border theme-border-subtle",
        "bg-[color:var(--color-toggle-bg)] text-[color:var(--color-toggle-icon)]",
        "shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  );
};
