<template>
  <g>
    <Rect v-percent:x="0" v-percent:width="x" v-percent:height="1" class="fill-gray-8" />
    <slot />
    <Line
      v-percent:x1="x"
      v-percent:y1="0"
      v-percent:x2="x"
      v-percent:y2="1"
      class="stroke-2 stroke-gray-2"
    />
  </g>
</template>

<script setup>
import { computed } from 'vue';
import Line from './Line.vue';
import Rect from './Rect.vue';

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  maxX: {
    type: Number,
    required: true,
  },
});

const x = computed(() => props.x / props.maxX);
</script>
