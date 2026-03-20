import { createContext, useContext, useEffect, useState, type ReactNode, type MouseEvent } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleThemeFromClick: (event: MouseEvent<HTMLElement>) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [waveTheme, setWaveTheme] = useState<Theme | null>(null);
  const [waveActive, setWaveActive] = useState(false);

  // Initialise theme from localStorage / system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    let initial: Theme = "dark";
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "dark" || stored === "light") {
      initial = stored;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      initial = "light";
    }

    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

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
      root.setAttribute("data-theme", next);
      window.localStorage.setItem("theme", next);
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

  const overlayClass =
    `theme-wave ${waveActive ? "theme-wave--animate" : ""} ` +
    (waveTheme === "dark" ? "bg-[#000000]" : waveTheme === "light" ? "bg-[#f9fafb]" : "");

  return (
    <ThemeContext.Provider value={{ theme, toggleThemeFromClick }}>
      {children}
      {waveTheme && <div className={overlayClass} />}
    </ThemeContext.Provider>
  );
};
