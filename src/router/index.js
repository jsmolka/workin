import { setupLayouts } from '@/layouts';
import { useActivitiesStore } from '@/stores/activities';
import { useWorkoutsStore } from '@/stores/workouts';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),

  routes: setupLayouts([
    {
      path: '/train',
      component: () => import('@/views/train/Index.vue'),
    },
    {
      path: '/workouts',
      redirect: '/workouts/standard',
      children: [
        {
          path: ':type(standard|custom)',
          children: [
            {
              path: '',
              component: () => import('@/views/workouts/Index.vue'),
              props: true,
            },
            {
              path: ':index([0-9]+)',
              component: () => import('@/views/workouts/index/Index.vue'),
              props: true,
              beforeEnter: ({ params }) => {
                params.index = parseInt(params.index) || 0;

                const { workouts } = useWorkoutsStore();
                if (params.index >= workouts(params.type).length) {
                  return '/workouts';
                }
              },
            },
          ],
        },
        {
          path: 'new',
          component: () => import('@/views/workouts/new/Index.vue'),
        },
      ],
    },
    {
      path: '/activities',
      children: [
        {
          path: '',
          component: () => import('@/views/activities/Index.vue'),
        },
        {
          path: ':index([0-9]+)',
          component: () => import('@/views/activities/index/Index.vue'),
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
      component: () => import('@/views/settings/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ]),
});
