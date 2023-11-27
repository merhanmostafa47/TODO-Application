<template>
  <v-app>
    <Home />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import Home from "@/views/Home.vue";
</script>

<style lang="scss" scoped>
.v-application {
  background: var(--v-theme-background);
}
</style>