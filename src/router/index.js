import { createRouter, createWebHistory } from 'vue-router';
import App from '../layouts/app/Index.vue';

export const router = createRouter({
  history: createWebHistory(),

  linkActiveClass: 'active',
  linkExactActiveClass: 'active',

  routes: [
    {
      name: 'train',
      path: '/train',
      meta: { layout: App },
      component: () => import('../views/train/Index.vue'),
    },
    {
      name: 'workouts',
      path: '/workouts',
      meta: { layout: App },
      component: () => import('../views/workouts/Index.vue'),
    },
    {
      name: 'activities',
      path: '/activities',
      meta: { layout: App },
      component: () => import('../views/activities/Index.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      meta: { layout: App },
      component: () => import('../views/settings/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ],
});
