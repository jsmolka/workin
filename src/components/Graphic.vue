<template>
  <div class="relative rounded-sm overflow-hidden">
    <div class="absolute inset-x-0 top-1/4 bg-white/5 h-[1px]" />
    <div class="absolute inset-x-0 top-2/4 bg-white/5 h-[1px]" />
    <div class="absolute inset-x-0 top-3/4 bg-white/5 h-[1px]" />
    <div class="absolute inset-0 flex items-end">
      <div
        v-for="({ seconds, intensity }, index) of intervals"
        class="hover:bg-blue-2 cursor-pointer"
        :class="index === selection ? '!bg-blue-1' : 'bg-blue-3'"
        :style="{ flexGrow: seconds, height: percentage(intensity / 2) }"
        @click="selection = index"
      />
    </div>
    <div
      v-if="elapsedSeconds"
      class="absolute inset-y-0 bg-white/10 border-r-2 border-gray-2"
      :style="{ width: percentage(elapsedSeconds / totalSeconds) }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { math } from '../utils/math';

const props = defineProps({
  intervals: {
    type: Array,
    required: true,
  },
  elapsedSeconds: {
    type: Number,
    required: false,
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

const percentage = (value) => {
  return math.clamp(100 * value, 0, 100) + '%';
};
</script>
