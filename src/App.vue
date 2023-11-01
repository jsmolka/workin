<template>
  <Component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </Component>
</template>

<script setup>
import { useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useEmitter } from './composables/useEmitter';
import { useSettingsStore } from './stores/settings';
import { isMobile } from './utils/device';
import { log } from './utils/log';
import { notify } from './utils/notify';

const { settings } = storeToRefs(useSettingsStore());

for (const level of log.levels) {
  useEmitter(log, level, (...args) => {
    if (settings.value.logAsNotification) {
      (notify[level] ?? notify.info)(...args);
    }
  });
}

if (isMobile()) {
  useEventListener('error', ({ message }) => {
    notify.error(message);
  });
}
</script>
./composables/useEmitter
