<template>
  <g>
    <Rect x="0%" v-percent:width="x" height="100%" class="text-gray-8" />
    <slot />
    <Line
      v-percent:x1="x"
      y1="0%"
      v-percent:x2="x"
      y2="100%"
      stroke="var(--gray-2)"
      stroke-width="2"
    />
  </g>
</template>

<script setup>
import { computed } from 'vue';
import Line from './Line.vue';
import Rect from './Rect.vue';

const props = defineProps({
  seconds: {
    type: Number,
    required: true,
  },
  totalSeconds: {
    type: Number,
    required: true,
  },
});

const x = computed(() => props.seconds / props.totalSeconds);
</script>
