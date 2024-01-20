import { createPinia } from 'pinia';
import { createApp } from 'vue';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import App from './App.vue';
import { percent } from './directives/percent';
import './main.scss';
import { router } from './router';
import { createRouterScroller } from './router/scroller';
import { useActivitiesStore } from './stores/activities';
import { useActivityStore } from './stores/activity';
import { useAthleteStore } from './stores/athlete';
import { useSettingsStore } from './stores/settings';
import { useWorkoutsStore } from './stores/workouts';

async function main() {
  const app = createApp(App);
  app.directive('percent', percent);
  app.use(createPinia());

  const stores = [
    useActivityStore(),
    useActivitiesStore(),
    useAthleteStore(),
    useSettingsStore(),
    useWorkoutsStore(),
  ];
  for (const store of stores) {
    await store.hydrate();
  }

  app.use(router);
  app.use(createRouterScroller(['.scroller']));
  app.mount('#app');
}

main();
