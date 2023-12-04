import { createRouter, createWebHistory } from 'vue-router';
import { useActivitiesStore } from '../stores/activities';
import { useWorkoutsStore } from '../stores/workouts';
import Activities from '../views/activities/Index.vue';
import GetActivity from '../views/activities/get/Index.vue';
import Backup from '../views/backup/Index.vue';
import Settings from '../views/settings/Index.vue';
import Train from '../views/train/Index.vue';
import Workouts from '../views/workouts/Index.vue';
import GetWorkout from '../views/workouts/get/Index.vue';
import NewWorkout from '../views/workouts/new/Index.vue';

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/train',
      component: Train,
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
          component: Workouts,
          props: true,
        },
        {
          path: ':type(standard|custom)/:index([0-9]+)',
          component: GetWorkout,
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
          component: NewWorkout,
        },
      ],
    },
    {
      path: '/activities',
      children: [
        {
          path: '',
          component: Activities,
        },
        {
          path: ':index([0-9]+)',
          component: GetActivity,
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
      component: Settings,
    },
    {
      path: '/backup',
      component: Backup,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ],
});
