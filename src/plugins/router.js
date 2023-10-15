import MainView from '../views/MainView.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Todo: route to error view if bluetooth is not supported
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainView,
    },
  ],
});

export default router;
