import { createRouter, createWebHistory } from 'vue-router';
import App from '../layouts/app/Index.vue';
import { useWorkoutsStore } from '../stores/workouts';
import Activities from '../views/activities/Index.vue';
import Settings from '../views/settings/Index.vue';
import Train from '../views/train/Index.vue';
import Workouts from '../views/workouts/Index.vue';
import Workout from '../views/workouts/index/Index.vue';

const meta = {
  layout: App,
};

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
          path: ':index(\\d+)',
          name: 'workout',
          component: Workout,
          props: true,
          beforeEnter: ({ params }) => {
            params.index = parseInt(params.index) || 0;

            const { workouts } = useWorkoutsStore();
            if (params.index >= workouts.length) {
              return { name: 'workouts' };
            }
          },
        },
      ],
    },
    {
      path: '/activities',
      name: 'activities',
      meta,
      component: Activities,
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
