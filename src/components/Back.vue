<template>
  <RouterLink :to="to">
    <ArrowLeftIcon class="w-5 h-5" />
  </RouterLink>
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';

defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
