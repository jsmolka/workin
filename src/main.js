import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './main.scss';
import router from './router';
import { useAthleteStore } from './store/athlete';

async function main() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);

  await useAthleteStore().init();

  app.mount('#app');
}

main();
