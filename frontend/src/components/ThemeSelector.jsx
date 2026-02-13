import { Palette } from "lucide-react";
import React from "react";
import { THEMES } from "../constant";
import useThemeStore from "../store/useThemeStore";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <Palette className="size-5" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-xl w-56 border border-base-content/10 max-h-80 overflow-auto"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors duration-300 ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => setTheme(themeOption.name)}
            >
              <Palette className="size-4" />
              <span className="text-sm forn-medium">{themeOption.label}</span>
              {themeOption.colors.map((color, i) => (
                //It will make a color balls
                <span
                  key={i}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
