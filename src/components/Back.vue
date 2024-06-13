<template>
  <Button variant="ghost" size="icon" @click="router.back()">
    <ArrowLeftIcon class="size-5" />
  </Button>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-icons/vue';
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
