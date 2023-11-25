// Utilities
import { defineStore, acceptHMRUpdate } from "pinia";
import type { localeState } from "@/types/types";

export const useLocaleStore = defineStore("localeStore", {
  state: () => ({
    locale: localStorage.getItem("locale") as localeState,
  }),

  actions: {
    setLocale(locale: localeState) {
      this.locale = locale;
      localStorage.setItem("locale", locale);
    },
  },
});

// make sure to pass the right store definition
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot));
}
