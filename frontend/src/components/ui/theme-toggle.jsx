import React from "react";
import { useThemeStore } from "../../store/themeStore";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 px-3 py-2 rounded bg-input text-foreground"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
