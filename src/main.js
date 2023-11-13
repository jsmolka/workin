import { useBluetooth } from '@vueuse/core';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { percent } from './directives/percent';
import './main.scss';
import { router } from './router';
import { useActivitiesStore } from './stores/activities';
import { useActivityStore } from './stores/activity';
import { useAthleteStore } from './stores/athlete';
import { useSettingsStore } from './stores/settings';
import { useWorkoutsStore } from './stores/workouts';
import NoBluetooth from './views/NoBluetooth.vue';

async function main() {
  const { isSupported } = useBluetooth();
  const app = createApp(isSupported.value ? App : NoBluetooth);
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
  app.mount('#app');
}

main();
