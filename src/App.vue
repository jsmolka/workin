<template>
  <div class="flex flex-col h-full">
    <div class="container relative flex-1">
      <div class="absolute inset-0 overflow-y-auto">
        <RouterView class="p-4" />
      </div>
    </div>
    <div class="bg-shade-6 shadow-t z-10">
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
import { useEmitter } from './composables/useEmitter';
import { useSettingsStore } from './stores/settings';
import { log } from './utils/log';
import { notify } from './utils/notify';
import { platform } from './utils/platform';

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

<style lang="scss" scoped>
.container {
  @apply max-w-screen-sm;
  @apply mx-auto;
}

.tab {
  @apply p-2;
  @apply bg-shade-6;
  @apply border-y-4;
  @apply border-transparent;
  @apply text-center;
  @apply cursor-pointer;
  @apply select-none;

  &:hover {
    @apply bg-shade-5;
  }

  &:active {
    @apply bg-shade-4;
  }
}

.router-link-active {
  @apply bg-shade-4;
  @apply border-t-brand-3;
}
</style>
