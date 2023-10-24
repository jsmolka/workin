import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './main.scss';
import { router } from './router';
import { useAthleteStore } from './stores/athlete';
import NoBluetooth from './views/NoBluetooth.vue';

const bluetooth = 'bluetooth' in navigator;

async function main() {
  const app = createApp(bluetooth ? App : NoBluetooth);
  app.use(createPinia());
  app.use(router);

  const athleteStore = useAthleteStore();
  await athleteStore.hydrate();
  athleteStore.$subscribe(() => athleteStore.persist());

  app.mount('#app');
}

main();
