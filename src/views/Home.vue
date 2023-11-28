<template>
  <v-main>
    <AppImage />
    <default-bar />
    <todo-list />
  </v-main>
</template>

<script lang="ts" setup>
import DefaultBar from "@/components/AppBar.vue";
import AppImage from "@/components/AppImage.vue";
import TodoList from "@/components/TodoList.vue";
</script>

<style lang="scss" scoped>
.v-main {
  padding-block-start: 5rem;
  inline-size: 50%;
  margin-inline: auto;

  @include media(md) {
    inline-size: 70%;
    padding-block-start: 7rem;
  }

  @include media(sm) {
    inline-size: 90%;
    padding-block-start: 5rem;
  }
}
</style>