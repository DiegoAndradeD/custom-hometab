import { createContext, useContext, useEffect, useState } from "react";

export type TTheme =
  | "dark"
  | "light"
  | "system"
  | "catppuccin"
  | "dracula"
  | "nord"
  | "tokyo-night"
  | "gruvbox"
  | "one-dark"
  | "solarized"
  | "material"
  | "monokai";
export const themes: TTheme[] = [
  "light",
  "dark",
  "system",
  "catppuccin",
  "dracula",
  "nord",
  "tokyo-night",
  "gruvbox",
  "one-dark",
  "solarized",
  "material",
  "monokai",
];

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: TTheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<TTheme>(
    () => (localStorage.getItem(storageKey) as TTheme) || defaultTheme
  );

  const applyTheme = (theme: TTheme) => {
    const root = document.documentElement;

    themes.forEach((t) => root.classList.remove(t));

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: TTheme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
