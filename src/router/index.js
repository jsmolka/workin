import { createRouter, createWebHistory } from 'vue-router';
import App from '../layouts/app/Index.vue';
import Activities from '../views/activities/Index.vue';
import Settings from '../views/settings/Index.vue';
import Train from '../views/train/Index.vue';
import Workouts from '../views/workouts/Index.vue';

export const router = createRouter({
  history: createWebHistory(),

  linkActiveClass: 'active',
  linkExactActiveClass: 'active',

  routes: [
    {
      name: 'train',
      path: '/train',
      meta: { layout: App },
      component: Train,
    },
    {
      name: 'workouts',
      path: '/workouts',
      meta: { layout: App },
      component: Workouts,
    },
    {
      name: 'activities',
      path: '/activities',
      meta: { layout: App },
      component: Activities,
    },
    {
      name: 'settings',
      path: '/settings',
      meta: { layout: App },
      component: Settings,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ],
});
