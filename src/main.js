import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { useBluetooth } from './composables/useBluetooth';
import './main.scss';
import { router } from './router';
import { useAthleteStore } from './stores/athlete';
import NoBluetooth from './views/NoBluetooth.vue';

async function main() {
  const { isSupported } = useBluetooth();
  const app = createApp(isSupported ? App : NoBluetooth);
  app.use(createPinia());
  app.use(router);

  const athleteStore = useAthleteStore();
  await athleteStore.hydrate();
  athleteStore.$subscribe(() => athleteStore.persist());

  app.mount('#app');
}

main();
