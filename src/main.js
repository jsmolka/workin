import App from '@/App.vue';
import { percent } from '@/directives/percent';
import '@/main.css';
import { router } from '@/router';
import { createRouterScroller } from '@/router/scroller';
import { useStores } from '@/stores';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

async function main() {
  const app = createApp(App);
  app.directive('percent', percent);
  app.use(createPinia());

  const stores = useStores();
  await stores.hydrate();

  app.use(router);
  app.use(createRouterScroller(['.scroller']));
  app.mount('#app');
}

main();
