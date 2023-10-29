<template>
  <Component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </Component>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useLog } from './composables/useLog';
import { useSettingsStore } from './stores/settings';
import { notify } from './utils/notify';

const { settings } = storeToRefs(useSettingsStore());

useLog((level, ...args) => {
  if (settings.value.logAsNotification) {
    (notify[level] ?? notify.info)(...args);
  }
});
</script>
