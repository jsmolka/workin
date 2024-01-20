<template>
  <Component v-if="route.meta.layout" :is="route.meta.layout">
    <RouterView />
  </Component>
  <RouterView v-else />
</template>

<script setup>
import { useBluetooth, useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useEmitter } from './composables/useEmitter';
import { useSettingsStore } from './stores/settings';
import { log } from './utils/log';
import { notify } from './utils/notify';
import { platform } from './utils/platform';

const route = useRoute();
const router = useRouter();
const { isSupported } = useBluetooth();

if (!isSupported.value) {
  router.push('/bluetooth');
}

const { settings } = storeToRefs(useSettingsStore());

useEmitter(log, '*', (level, ...args) => {
  if (settings.value.logAsNotification) {
    switch (level) {
      case 'warn':
        notify.warn(...args);
        break;
      case 'error':
        notify.error(...args);
        break;
      default:
        notify.info(...args);
        break;
    }
  }
});

if (platform.isMobile()) {
  useEventListener('error', ({ message }) => {
    notify.error(message);
  });
}
</script>
