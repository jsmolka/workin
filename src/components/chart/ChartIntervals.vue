<template>
  <g class="fill-brand-3 cursor-pointer">
    <Rect
      v-for="({ x, width, height }, index) in rectangles(intervals)"
      v-percent:x="x"
      v-percent:width="width"
      v-percent:height="height"
      class="hover:fill-brand-2"
      :class="{ '!fill-brand-1': index === selection }"
      @click="selection = index"
    />
  </g>
</template>

<script setup>
import { computed } from 'vue';
import Rect from './Rect.vue';

const props = defineProps({
  intervals: {
    type: Array,
    required: true,
  },
});

const selection = defineModel('selection', {
  type: Number,
  default: null,
});

const totalSeconds = computed(() => {
  let result = 0;
  for (const { seconds } of props.intervals) {
    result += seconds;
  }
  return result;
});

function* rectangles(intervals) {
  let rectangle;
  for (const { seconds, intensity } of intervals) {
    const x = rectangle ? rectangle.x + rectangle.width : 0;
    yield (rectangle = { x, width: seconds / totalSeconds.value, height: intensity / 2 });
  }
}
</script>
