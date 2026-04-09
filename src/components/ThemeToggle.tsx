import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { cn } from "../cn";
import { useTheme } from "./theme-context";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, toggleThemeFromClick, toggleThemeFromShortcut } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      const shouldToggle =
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "t";

      if (!shouldToggle) {
        return;
      }

      event.preventDefault();
      toggleThemeFromShortcut();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleThemeFromShortcut]);

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
      title="Toggle theme (Ctrl/Cmd + Shift + T)"
    >
      {theme === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  );
};
