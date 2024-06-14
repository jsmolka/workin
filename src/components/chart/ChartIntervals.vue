<template>
  <g class="fill-brand-3">
    <Rect
      v-for="({ x, width, height }, index) in rectangles(intervals)"
      v-percent:x="x"
      v-percent:width="width"
      v-percent:height="height"
      class="cursor-pointer"
      :class="index === selectedIndex ? 'fill-brand-1' : 'hover:fill-brand-2'"
      @click="selectedIndex = index"
    />
  </g>
</template>

<script setup>
import Rect from '@/components/chart/Rect.vue';
import { computed } from 'vue';

const selectedIndex = defineModel('selectedIndex', { type: Number, required: false });

const props = defineProps({
  intervals: { type: Array, required: true },
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
    rectangle = { x, width: seconds / totalSeconds.value, height: intensity / 2 };
    yield rectangle;
  }
}
</script>
