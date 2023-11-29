<template>
  <div class="locale_switcher_wrapper">
    <button @click="changeLocale('en')" v-if="localeStore.locale == 'ar'" aria-labelledby="Select English locale">
      EN
    </button>

    <button @click="changeLocale('ar')" v-if="localeStore.locale == 'en'" aria-labelledby="Select Arabic locale">
      AR
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLocaleStore } from "@/store/locale";
const localeStore = useLocaleStore();
import i18n from "@/plugins/i18n";
import type { localeState } from "@/types/types"

import { useLocale } from "vuetify";
import { onMounted } from "vue";
const { current } = useLocale();

function changeLocale(locale: localeState): void {
  localeStore.setLocale(locale as localeState);
  i18n.global.locale.value = localeStore.locale as localeState;
  document.documentElement.setAttribute("lang", localStorage.getItem("locale") as localeState);
  current.value = localeStore.locale as localeState;
}

onMounted(() => {
  document.documentElement.setAttribute("lang", localStorage.getItem("locale") as localeState || "en");
});
</script>
