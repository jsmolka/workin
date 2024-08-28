<template>
  <Button variant="ghost" size="icon" @click="router.back()">
    <PhArrowLeft class="size-5" />
  </Button>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { PhArrowLeft } from '@phosphor-icons/vue';
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
