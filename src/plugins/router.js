import { createRouter, createWebHistory } from 'vue-router';
import SetupView from '../views/SetupView.vue';

// Todo: route to error view if bluetooth is not supported
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: SetupView,
    },
  ],
});

export default router;
