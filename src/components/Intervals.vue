<template>
  <div class="relative rounded-sm overflow-hidden">
    <div class="absolute inset-x-0 top-1/4 bg-white/5 h-[1px]" />
    <div class="absolute inset-x-0 top-2/4 bg-white/5 h-[1px]" />
    <div class="absolute inset-x-0 top-3/4 bg-white/5 h-[1px]" />
    <div class="absolute inset-0 flex items-end">
      <div
        v-for="interval of intervals"
        class="bg-blue-3"
        :style="{
          flexGrow: interval.duration,
          height: percentage(interval.intensity / 2),
        }"
      />
    </div>
    <div
      v-if="progress"
      class="absolute inset-y-0 bg-white/10 border-r-2 border-gray-2"
      :style="{ width: percentage(progress / duration) }"
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
  progress: {
    type: Number,
  },
});

const duration = computed(() => {
  let duration = 0;
  for (const interval of props.intervals) {
    duration += interval.duration;
  }
  return duration;
});

const percentage = (value) => {
  return math.clamp(100 * value, 0, 100) + '%';
};
</script>
