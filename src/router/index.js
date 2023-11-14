import { createRouter, createWebHistory } from 'vue-router';
import App from '../layouts/app/Index.vue';
import { useActivitiesStore } from '../stores/activities';
import { useWorkoutsStore } from '../stores/workouts';
import Activities from '../views/activities/Index.vue';
import GetActivity from '../views/activities/get/Index.vue';
import Settings from '../views/settings/Index.vue';
import Train from '../views/train/Index.vue';
import Workouts from '../views/workouts/Index.vue';
import GetWorkout from '../views/workouts/get/Index.vue';
import NewWorkout from '../views/workouts/new/Index.vue';

const meta = { layout: App };

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/train',
      name: 'train',
      meta,
      component: Train,
    },
    {
      path: '/workouts',
      meta,
      children: [
        {
          path: '',
          name: 'workouts',
          component: Workouts,
        },
        {
          path: ':type(standard|custom)/:index(\\d+)',
          name: 'workout',
          component: GetWorkout,
          props: true,
          beforeEnter: ({ params }) => {
            params.index = parseInt(params.index) || 0;

            const store = useWorkoutsStore();
            if (params.index >= store.workouts(params.type).length) {
              return { name: 'workouts' };
            }
          },
        },
        {
          path: 'new',
          name: 'workout/new',
          component: NewWorkout,
        },
      ],
    },
    {
      path: '/activities',
      meta,
      children: [
        {
          path: '',
          name: 'activities',
          component: Activities,
        },
        {
          path: ':index(\\d+)',
          name: 'activity',
          component: GetActivity,
          props: true,
          beforeEnter: ({ params }) => {
            params.index = parseInt(params.index) || 0;

            const { activities } = useActivitiesStore();
            if (params.index >= activities.length) {
              return { name: 'activities' };
            }
          },
        },
      ],
    },
    {
      path: '/settings',
      name: 'settings',
      meta,
      component: Settings,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/train',
    },
  ],
});
