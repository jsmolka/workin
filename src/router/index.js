import { createRouter, createWebHistory } from 'vue-router';
import { useActivitiesStore } from '../stores/activities';
import { useWorkoutsStore } from '../stores/workouts';

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/train',
      component: () => import('../views/train/Index.vue'),
    },
    {
      path: '/workouts',
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
      component: () => import('../views/settings/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ],
});
