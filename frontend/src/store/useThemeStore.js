import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Chatify-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("Chatify-theme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
