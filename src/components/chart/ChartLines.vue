<template>
  <g class="stroke-1 stroke-shade-7">
    <Line
      v-for="value in y"
      v-percent:x1="x[0]"
      v-percent:y1="value"
      v-percent:x2="x[1]"
      v-percent:y2="value"
    />
  </g>
</template>

<script setup>
import Line from '@/components/chart/Line.vue';

defineProps({
  x: { type: Array, default: [0, 1] },
  y: { type: Array, default: [0.25, 0.5, 0.75] },
});
</script>
