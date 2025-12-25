import { setupLayouts } from '@/layouts';
import { useActivitiesStore } from '@/stores/activities';
import { useActivityStore } from '@/stores/activity';
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
      children: [
        {
          path: '',
          component: () => import('@/views/train/Index.vue'),
          beforeEnter: () => {
            const { activity } = useActivityStore();
            if (activity == null) {
              return '/train/workout';
            }
          },
        },
        {
          path: 'workout',
          component: () => import('@/views/train/workout/Index.vue'),
          beforeEnter: () => {
            const { activity } = useActivityStore();
            if (activity != null) {
              return '/train';
            }
          },
        },
      ],
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
                    const workouts = useWorkoutsStore();
                    const { type, index } = parseIndex(params);
                    if (type === 'standard') {
                      if (Number.isInteger(index) && index < workouts[type].length) {
                        return `/workouts/${type}/${index}`;
                      } else {
                        return `/workouts/${type}`;
                      }
                    }
                  },
                },
              ],
              beforeEnter: ({ params }) => {
                const workouts = useWorkoutsStore();
                const { type, index } = parseIndex(params);
                if (!(Number.isInteger(index) && index < workouts[type].length)) {
                  return `/workouts/${type}`;
                }
              },
            },
          ],
        },
        {
          path: 'new',
          component: () => import('@/views/workouts/new/Index.vue'),
          props: ({ query }) => {
            const workouts = useWorkoutsStore();
            const { type, index } = parseIndex(query);
            if (['standard', 'custom'].includes(type)) {
              return { workout: workouts[type][index] ?? null };
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
            const { activities } = useActivitiesStore();
            const { index } = parseIndex(params);
            if (!(Number.isInteger(index) && index < activities.length)) {
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
