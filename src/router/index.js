import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../layouts/app/Index.vue';
import { useActivitiesStore } from '../stores/activities';
import { useWorkoutsStore } from '../stores/workouts';

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/train',
      meta: { layout: AppLayout },
      component: () => import('../views/train/Index.vue'),
    },
    {
      path: '/workouts',
      meta: { layout: AppLayout },
      children: [
        {
          path: '',
          redirect: '/workouts/standard',
        },
        {
          path: ':type(standard|custom)',
          component: () => import('../views/workouts/Index.vue'),
          props: true,
        },
        {
          path: ':type(standard|custom)/:index([0-9]+)',
          component: () => import('../views/workouts/get/Index.vue'),
          props: true,
          beforeEnter: ({ params }) => {
            params.index = parseInt(params.index) || 0;

            const store = useWorkoutsStore();
            if (params.index >= store.workouts(params.type).length) {
              return '/workouts';
            }
          },
        },
        {
          path: 'new',
          component: () => import('../views/workouts/new/Index.vue'),
        },
      ],
    },
    {
      path: '/activities',
      meta: { layout: AppLayout },
      children: [
        {
          path: '',
          component: () => import('../views/activities/Index.vue'),
        },
        {
          path: ':index([0-9]+)',
          component: () => import('../views/activities/get/Index.vue'),
          props: true,
          beforeEnter: ({ params }) => {
            params.index = parseInt(params.index) || 0;

            const { activities } = useActivitiesStore();
            if (params.index >= activities.length) {
              return '/activities';
            }
          },
        },
      ],
    },
    {
      path: '/settings',
      meta: { layout: AppLayout },
      component: () => import('../views/settings/Index.vue'),
    },
    {
      path: '/backup',
      meta: { layout: AppLayout },
      component: () => import('../views/backup/Index.vue'),
    },
    {
      path: '/bluetooth',
      component: () => import('../views/bluetooth/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ],
});
