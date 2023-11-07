<template>
  <g>
    <Line :x1="x1" y1="25%" :x2="x2" y2="25%" class="text-gray-7" stroke-width="1" />
    <Line :x1="x1" y1="50%" :x2="x2" y2="50%" class="text-gray-7" stroke-width="1" />
    <Line :x1="x1" y1="75%" :x2="x2" y2="75%" class="text-gray-7" stroke-width="1" />
  </g>
</template>

<script setup>
import Line from './Line.vue';

defineProps({
  x1: {
    type: String,
    default: '0%',
  },
  x2: {
    type: String,
    default: '100%',
  },
});
</script>
