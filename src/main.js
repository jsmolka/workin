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

  const activityStore = useActivityStore();
  await activityStore.hydrate();

  const activitiesStore = useActivitiesStore();
  await activitiesStore.hydrate();

  const athleteStore = useAthleteStore();
  await athleteStore.hydrate();

  const settingsStore = useSettingsStore();
  await settingsStore.hydrate();

  const workoutsStore = useWorkoutsStore();
  await workoutsStore.hydrate();

  app.use(router);
  app.mount('#app');
}

main();
