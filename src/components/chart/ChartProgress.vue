<template>
  <rect x="0%" :width="x" height="100%" class="text-white/10" />
  <line :x1="x" y1="0%" :x2="x" y2="100%" class="text-gray-2" stroke-width="4" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  seconds: {
    type: Number,
    required: true,
  },
  totalSeconds: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Function,
    required: true,
  },
});

const x = computed(() => {
  return props.percentage(props.seconds / props.totalSeconds);
});
</script>
