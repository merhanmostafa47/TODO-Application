import { createI18n } from "vue-i18n";
import { useLocaleStore } from "@/store/locale";

import pinia from "@/store";
const localeStore = useLocaleStore(pinia);
import type { localeState } from "@/types/types";
import arLocale from "@/locales/ar.json";
import enLocale from "@/locales/en.json";

const i18n = createI18n({
  legacy: false,
  locale: localeStore.locale as localeState, // set locale
  messages: {
    ar: arLocale,
    en: enLocale,
  },
});

export default i18n;
