import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { ThemeContext, type Theme } from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
}

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem("theme") as Theme | null;
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  // Default theme should be dark unless the user explicitly chose otherwise.
  return "dark";
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [waveTheme, setWaveTheme] = useState<Theme | null>(null);
  const [waveActive, setWaveActive] = useState(false);

  // Keep DOM theme and persisted theme in sync with state.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const runWave = (next: Theme, x: number, y: number) => {
    const root = document.documentElement;
    root.style.setProperty("--wave-x", `${x}px`);
    root.style.setProperty("--wave-y", `${y}px`);

    setWaveTheme(next);

    // Kick off the wave on next frame so CSS sees state change
    requestAnimationFrame(() => {
      setWaveActive(true);
    });

    const duration = 700; // keep in sync with --theme-transition-duration

    window.setTimeout(() => {
      setTheme(next);
      setWaveActive(false);

      // small delay before clearing to avoid popping
      window.setTimeout(() => {
        setWaveTheme(null);
      }, 200);
    }, duration);
  };

  const toggleThemeFromClick = (event: MouseEvent<HTMLElement>) => {
    const rect = document.documentElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const next: Theme = theme === "dark" ? "light" : "dark";

    runWave(next, x, y);
  };

  const toggleThemeFromShortcut = () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const next: Theme = theme === "dark" ? "light" : "dark";

    runWave(next, x, y);
  };

  const overlayClass = `theme-wave ${waveActive ? "theme-wave--animate" : ""}`;

  const overlayStyle =
    waveTheme === "dark"
      ? { backgroundColor: "var(--color-bg-dark)" }
      : waveTheme === "light"
        ? { backgroundColor: "var(--color-bg-light)" }
        : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleThemeFromClick, toggleThemeFromShortcut }}>
      {children}
      {waveTheme && <div className={overlayClass} style={overlayStyle} />}
    </ThemeContext.Provider>
  );
};
