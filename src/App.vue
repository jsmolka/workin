<template>
  <Component :is="route.meta.layout ?? 'div'">
    <RouterView />
  </Component>
</template>

<script setup>
import { useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useEmitter } from './composables/useEmitter';
import { useSettingsStore } from './stores/settings';
import { device } from './utils/device';
import { log } from './utils/log';
import { notify } from './utils/notify';

const route = useRoute();
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

if (device.isMobile()) {
  useEventListener('error', ({ message }) => {
    notify.error(message);
  });
}
</script>
