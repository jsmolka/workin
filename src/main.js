import { useBluetooth } from '@vueuse/core';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './main.scss';
import { router } from './router';
import { useAthleteStore } from './stores/athlete';
import { useSettingsStore } from './stores/settings';
import { useWorkoutsStore } from './stores/workouts';
import NoBluetooth from './views/NoBluetooth.vue';

async function main() {
  const { isSupported } = useBluetooth();
  const app = createApp(isSupported.value ? App : NoBluetooth);
  app.use(createPinia());
  app.use(router);

  const athleteStore = useAthleteStore();
  await athleteStore.hydrate();

  const settingsStore = useSettingsStore();
  await settingsStore.hydrate();

  const workoutsStore = useWorkoutsStore();
  await workoutsStore.hydrate();

  app.mount('#app');
}

main();
