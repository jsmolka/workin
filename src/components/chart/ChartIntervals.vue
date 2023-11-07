<template>
  <g>
    <Rect
      v-for="({ x, width, height }, index) in rectangles(intervals)"
      v-percent:x="x"
      v-percent:width="width"
      v-percent:height="height"
      class="hover:fill-blue-2 cursor-pointer"
      :class="index === selection ? '!fill-blue-1' : 'fill-blue-3'"
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
  totalSeconds: {
    type: Number,
    required: false,
  },
});

const selection = defineModel('selection', {
  type: Number,
  required: false,
});

const totalSeconds = computed(() => {
  if (props.totalSeconds != null) {
    return props.totalSeconds;
  }

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
