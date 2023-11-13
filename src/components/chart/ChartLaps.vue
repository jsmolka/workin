<template>
  <g>
    <Rect
      v-for="({ x, width }, index) in rectangles(laps)"
      v-percent:x="x"
      v-percent:width="width"
      v-percent:height="1"
      class="fill-transparent hover:fill-white/5 cursor-pointer"
      :class="{ '!fill-white/10': index === selection }"
      @click="selection = index"
    />
  </g>
</template>

<script setup>
import Rect from './Rect.vue';

const props = defineProps({
  laps: {
    type: Array,
    required: true,
  },
  totalSeconds: {
    type: Number,
    required: true,
  },
});

const selection = defineModel('selection', {
  type: Number,
  default: null,
});

function* rectangles(laps) {
  let rectangle;
  for (const lap of laps) {
    const x = rectangle ? rectangle.x + rectangle.width : 0;
    yield (rectangle = { x, width: lap.length / props.totalSeconds });
  }
}
</script>
