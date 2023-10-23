import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/train',
    },
    {
      path: '/train',
      component: () => import('../views/train/Index.vue'),
    },
    {
      path: '/workouts',
      component: () => import('../views/workouts/Index.vue'),
    },
    {
      path: '/activities',
      component: () => import('../views/activities/Index.vue'),
    },
    {
      path: '/settings',
      component: () => import('../views/settings/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
});

export default router;
