import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"), // Убедитесь в правильности пути
  },
  {
    path: "/coctail/:id",
    component: () => import("../views/CoctailSingle.vue"), // Убедитесь в правильности пути
  },
  {
    path: "/random",
    component: () => import("../views/CoctailsRandom.vue"), // Убедитесь в правильности пути
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
