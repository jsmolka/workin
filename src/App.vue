<template>
  <Component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </Component>
</template>

<script setup>
import { useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useLog } from './composables/useLog';
import { useSettingsStore } from './stores/settings';
import { isMobile } from './utils/device';
import { notify } from './utils/notify';

const { settings } = storeToRefs(useSettingsStore());

useLog((level, ...args) => {
  if (settings.value.logAsNotification) {
    (notify[level] ?? notify.info)(...args);
  }
});

if (isMobile()) {
  useEventListener('error', ({ message }) => {
    notify.error(message);
  });
}
</script>
