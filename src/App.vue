<template>
  <component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </component>
</template>

<script setup>
import { useWakeLock } from '@vueuse/core';
import { onMounted, onUnmounted } from 'vue';

const { request, release } = useWakeLock();

onMounted(async () => {
  await request();
});

onUnmounted(async () => {
  await release();
});
</script>
