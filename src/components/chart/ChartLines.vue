<template>
  <g>
    <Line
      v-for="value in y"
      v-percent:x1="x1"
      v-percent:y1="value"
      v-percent:x2="x2"
      v-percent:y2="value"
      class="stroke-1 stroke-gray-7"
    />
  </g>
</template>

<script setup>
import Line from './Line.vue';

defineProps({
  x1: {
    type: Number,
    default: 0,
  },
  x2: {
    type: Number,
    default: 1,
  },
  y: {
    type: Array,
    default: [0.25, 0.5, 0.75],
  },
});
</script>
