<template>
  <v-app-bar flat>
    <v-container>
      <v-row justify="space-between" align="center">
        <v-app-bar-title>
          <h1>{{ $t("appName") }}</h1>
        </v-app-bar-title>
        <localeSwitcher />
        <ThemeSwitcher />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import localeSwitcher from "@/components/LocaleSwitcher.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
</script>

<style lang="scss">
.v-toolbar {
  position: relative !important;
  background-color: transparent !important;

  &__content {
    position: relative;

    h1 {
      @include font(700, 2.25rem, var(--very_light_gray));
      letter-spacing: 1.5rem;

      @include media(md) {
        font-size: 1.8rem;
      }
    }
  }

  .v-toolbar-title {
    line-height: normal;
    text-transform: uppercase;
  }
}

html:lang(ar) {
  .v-toolbar__content {
    h1 {
      letter-spacing: 0;
    }
  }
}
</style>
