import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'train',
      path: '/train',
      component: () => import('../views/train/Index.vue'),
    },
    {
      name: 'workouts',
      path: '/workouts',
      component: () => import('../views/workouts/Index.vue'),
    },
    {
      name: 'activities',
      path: '/activities',
      component: () => import('../views/activities/Index.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('../views/settings/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ],
});

export default router;
