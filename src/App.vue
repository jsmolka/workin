<template>
  <Component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </Component>
</template>

<script setup>
import { useLog } from './composables/useLog';
import { useAthleteStore } from './stores/athlete';
import { useSettingsStore } from './stores/settings';
import { log } from './utils/log';
import { notify } from './utils/notify';

const athleteStore = useAthleteStore();
athleteStore.$subscribe(() => athleteStore.persist());

const settingsStore = useSettingsStore();
settingsStore.$subscribe((_, { settings }) => {
  settingsStore.persist();

  log.level = settings.logLevel;
});

useLog((level, ...args) => {
  if (settingsStore.settings.logAsNotification) {
    (notify[level] ?? notify.info)(...args);
  }
});
</script>
