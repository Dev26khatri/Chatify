import toast from "react-hot-toast";
import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Chatify-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("Chatify-theme", theme);
    set({ theme });
    toast.success(`Theme Changed to ${theme}`, { duration: 1000 });
  },
}));

export default useThemeStore;
