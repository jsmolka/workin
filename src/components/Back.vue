<template>
  <ArrowLeftIcon class="w-5 h-5 cursor-pointer" @click="router.back()" />
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { useSwipe } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();

useSwipe(window, {
  threshold: 128,
  onSwipeEnd(_, direction) {
    if (direction === 'right') {
      router.back();
    }
  },
});
</script>
