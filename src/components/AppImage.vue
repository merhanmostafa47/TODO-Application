<template>
  <div class="bg">
    <img :src="`/src/assets/images/bg-${mediaSize}-${themeStore.theme === 'light' ? 'light' : 'dark'
      }.jpg`" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

let mediaSize = ref<string>("desktop");

let screenWidth = ref<number>(window.innerWidth);

const onResize = (): void => {
  screenWidth.value = window.innerWidth;
};

const checkScreenWidth = (): void => {
  if (screenWidth.value <= 1200) {
    mediaSize.value = "mobile";
  } else {
    mediaSize.value = "desktop";
  }
};

onMounted(() => {
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

watch(screenWidth, () => {
  checkScreenWidth();
});
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  @include size(100%, 100%);
  top: 0;
  inset-inline: 0;
  z-index: 0;

  img {
    object-fit: cover;
    inline-size: 100%;
    min-height: 20rem;
    max-height: 22rem;

    @include media(lg) {
      max-height: 24rem;
    }
  }
}
</style>