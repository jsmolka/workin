<template>
  <Svg
    class="relative rounded-sm overflow-hidden"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="0"
  >
    <line x1="0%" y1="25%" x2="100%" y2="25%" class="text-white/5" stroke-width="1" />
    <line x1="0%" y1="50%" x2="100%" y2="50%" class="text-white/5" stroke-width="1" />
    <line x1="0%" y1="75%" x2="100%" y2="75%" class="text-white/5" stroke-width="1" />
    <rect
      v-for="({ x, width, height }, index) in rectangles"
      :x="percentage(x)"
      :width="percentage(width)"
      :height="percentage(height)"
      class="hover:text-blue-2 cursor-pointer"
      :class="index === selection ? '!text-blue-1' : 'text-blue-3'"
      @click="selection = index"
    />
    <slot :totalSeconds="totalSeconds" :percentage="percentage" />
  </Svg>
</template>

<script setup>
import { computed } from 'vue';
import { math } from '../../utils/math';
import Svg from './Svg.vue';

const props = defineProps({
  intervals: {
    type: Array,
    required: true,
  },
});

const selection = defineModel('selection', {
  type: Number,
  required: false,
});

const totalSeconds = computed(() => {
  let result = 0;
  for (const { seconds } of props.intervals) {
    result += seconds;
  }
  return result;
});

const rectangles = computed(() => {
  const result = [];
  for (const { seconds, intensity } of props.intervals) {
    const previous = result.at(-1);
    const x = previous ? previous.x + previous.width : 0;
    result.push({ x, width: seconds / totalSeconds.value, height: intensity / 2 });
  }
  return result;
});

const percentage = (value) => {
  return math.clamp(100 * value, 0, 100) + '%';
};
</script>
