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

  const activity = useActivityStore();
  await activity.hydrate();

  const activities = useActivitiesStore();
  await activities.hydrate();

  const athlete = useAthleteStore();
  await athlete.hydrate();

  const settings = useSettingsStore();
  await settings.hydrate();

  const workouts = useWorkoutsStore();
  await workouts.hydrate();

  app.use(router);
  app.mount('#app');
}

main();
