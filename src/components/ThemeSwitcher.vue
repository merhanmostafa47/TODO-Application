<template>
  <div class="theme_switcher_wrapper">
    <button @click="toggleTheme('dark')" v-if="themeStore.theme == 'light'">
      <IconMoon />
    </button>
    <button @click="toggleTheme('light')" v-if="themeStore.theme == 'dark'">
      <IconSun />
    </button>
    <!-- transition-style="in:circle:bottom-right" -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconSun from "@/components/icons/IconSun.vue";
import type {themeState} from "@/types/types";

import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

import { useTheme } from "vuetify";
const theme = useTheme();

function toggleTheme(appTheme:themeState) :void{
  themeStore.setTheme(appTheme as themeState);
  theme.global.name.value = themeStore.theme;
}

onMounted(() => {
  theme.global.name.value = themeStore.theme;
  document.documentElement.setAttribute("data-theme", themeStore.theme);
});
</script>

<style lang="scss" scoped>
button {
  margin-inline: 1rem;
}
</style>
