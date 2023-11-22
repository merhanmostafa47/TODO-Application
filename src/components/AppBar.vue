<template>
  <v-app-bar flat>
    <v-container>
      <v-row justify="space-between" align="center">
        <v-app-bar-title>
          <h1>title</h1>
        </v-app-bar-title>
        <ThemeSwitcher />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
</script>

<style lang="scss">
.v-toolbar {
  position: relative !important;
  background-color: transparent !important;
  z-index: 10 !important;

  &__content {
    position: relative;

    h1 {
      @include font(700, 2rem, var(--very_light_gray));
      letter-spacing: 2rem;
    }
  }

  .v-toolbar-title {
    line-height: normal;
    text-transform: uppercase;
  }
}
</style>
