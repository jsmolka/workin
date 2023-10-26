<template>
  <div>Train</div>
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
