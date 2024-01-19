<template>
  <g class="fill-transparent cursor-pointer">
    <Rect
      v-for="({ x, width }, index) in rectangles(laps)"
      v-percent:x="x"
      v-percent:width="width"
      v-percent:height="1"
      class="hover:fill-white/5 active:fill-white/10"
      :class="{ '!fill-white/10': index === selection }"
      @click="selection = index"
    />
  </g>
</template>

<script setup>
import { computed } from 'vue';
import Rect from './Rect.vue';

const props = defineProps({
  laps: {
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
  for (const lap of props.laps) {
    result += lap.length;
  }
  return result;
});

function* rectangles(laps) {
  let rectangle;
  for (const lap of laps) {
    const x = rectangle ? rectangle.x + rectangle.width : 0;
    yield (rectangle = { x, width: lap.length / totalSeconds.value });
  }
}
</script>
