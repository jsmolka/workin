<template>
  <div class="flex flex-col h-full">
    <div class="container relative flex-1">
      <div class="absolute inset-0 p-4 bg-gray-7 overflow-y-auto">
        <RouterView />
      </div>
    </div>
    <div class="bg-gray-6 border-t border-gray-4">
      <nav class="container flex justify-between">
        <RouterLink class="tab flex-1" to="/train">Train</RouterLink>
        <RouterLink class="tab flex-1" to="/workouts">Workouts</RouterLink>
        <RouterLink class="tab flex-1" to="/activities">Activities</RouterLink>
        <RouterLink class="tab flex-1" to="/settings">Settings</RouterLink>
      </nav>
    </div>
  </div>
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

<style lang="scss" scoped>
.container {
  @apply max-w-screen-sm;
  @apply mx-auto;
}

.router-link-active {
  @apply bg-gray-4;
  @apply border-t-blue-3;
}
</style>
