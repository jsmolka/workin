<template>
  <g class="fill-transparent">
    <Rect
      v-for="({ x, width }, index) in rectangles(laps)"
      v-percent:x="x"
      v-percent:width="width"
      v-percent:height="1"
      class="cursor-pointer"
      :class="index === selectedIndex ? 'fill-white/10' : 'hover:fill-white/5'"
      @click="selectedIndex = index"
    />
  </g>
</template>

<script setup>
import Rect from '@/components/chart/Rect.vue';
import { computed } from 'vue';

const selectedIndex = defineModel('selectedIndex', { type: Number, required: false });

const props = defineProps({
  laps: { type: Array, required: true },
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
    rectangle = { x, width: lap.length / totalSeconds.value };
    yield rectangle;
  }
}
</script>
