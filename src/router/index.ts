// Composables
// Composables
import { RouterOptions, createRouter, createWebHistory } from "vue-router";
const routes: RouterOptions["routes"] = [];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
