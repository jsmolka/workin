import { createRouter, createWebHistory } from "vue-router";
import NotFound from "./views/NotFound.vue";
import Activities from "./views/activities/Activities.vue";
import Settings from "./views/settings/Settings.vue";
import Train from "./views/train/Train.vue";
import Workouts from "./views/workouts/Workouts.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/train",
    },
    {
      path: "/train",
      component: Train,
    },
    {
      path: "/workouts",
      component: Workouts,
    },
    {
      path: "/activities",
      component: Activities,
    },
    {
      path: "/settings",
      component: Settings,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

export default router;
