import { setupLayouts } from '@/layouts';
import { useActivitiesStore } from '@/stores/activities';
import { useWorkoutsStore } from '@/stores/workouts';
import { createRouter, createWebHistory } from 'vue-router';

function parseIndex(args) {
  return { ...args, index: parseInt(args.index) };
}

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
              component: () => import('@/views/workouts/[type]/Index.vue'),
              props: true,
            },
            {
              path: ':index([0-9]+)',
              children: [
                {
                  path: '',
                  component: () => import('@/views/workouts/[type]/[index]/Index.vue'),
                  props: ({ params }) => parseIndex(params),
                },
                {
                  path: 'edit',
                  component: () => import('@/views/workouts/[type]/[index]/edit/Index.vue'),
                  props: ({ params }) => parseIndex(params),
                  beforeEnter: ({ params }) => {
                    if (params.type === 'standard') {
                      const { index } = parseIndex(params);
                      if (
                        Number.isInteger(index) &&
                        index < useWorkoutsStore()[params.type].length
                      ) {
                        return `/workouts/${params.type}/${index}`;
                      } else {
                        return `/workouts/${params.type}`;
                      }
                    }
                  },
                },
              ],
              beforeEnter: ({ params }) => {
                const index = parseInt(params.index);
                if (!(Number.isInteger(index) && index < useWorkoutsStore()[params.type].length)) {
                  return `/workouts/${params.type}`;
                }
              },
            },
          ],
        },
        {
          path: 'new',
          component: () => import('@/views/workouts/new/Index.vue'),
          props: ({ query }) => {
            const { type, index } = parseIndex(query);
            if (['standard', 'custom'].includes(type)) {
              return { workout: useWorkoutsStore()[type][index] ?? null };
            }
          },
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
          component: () => import('@/views/activities/[index]/Index.vue'),
          props: ({ params }) => parseIndex(params),
          beforeEnter: ({ params }) => {
            const { index } = parseIndex(params);
            if (!(Number.isInteger(index) && index < useActivitiesStore().activities.length)) {
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
