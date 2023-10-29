<template>
  <Component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </Component>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useAthleteStore } from './stores/athlete';
import { useSettingsStore } from './stores/settings';

const unsubscribes = [];

onMounted(() => {
  const athleteStore = useAthleteStore();
  const settingsStore = useSettingsStore();

  unsubscribes.push(athleteStore.$subscribe(() => athleteStore.persist()));
  unsubscribes.push(settingsStore.$subscribe(() => settingsStore.persist()));
});

onUnmounted(() => {
  for (const unsubscribe of unsubscribes) {
    unsubscribe();
  }
});
</script>
