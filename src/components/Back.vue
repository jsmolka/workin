<template>
  <ArrowLeftIcon class="w-5 h-5 cursor-pointer" @click="router.back()" />
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { useSwipe } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();

useSwipe(window, {
  onSwipeEnd(_, direction) {
    if (direction === 'right') {
      router.back();
    }
  },
});
</script>
