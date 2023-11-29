import { defineStore } from "pinia";
import type { themeState } from "@/types/types";

export const useThemeStore = defineStore("themeStore", {
  state: () => ({
    theme: localStorage.getItem("theme") as themeState || "dark",
  }),

  actions: {
    setTheme(theme: themeState) {
      this.theme = theme;
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    },
  },
});
