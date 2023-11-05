<template>
  <div ref="root" class="relative border border-gray-6 rounded-sm overflow-hidden">
    <div class="absolute inset-0 overflow-y-scroll font-feature-tnum">
      <div
        v-for="({ intensity, seconds }, index) in intervals"
        class="flex justify-between gap-4 px-2 py-1.5 odd:bg-gray-6 hover:bg-gray-5 select-none"
        :class="[
          { '!bg-blue-3': index === selection },
          clickable ? 'cursor-pointer' : 'pointer-events-none',
        ]"
        :data-index="index"
        @click="selection = index"
      >
        <span>{{ watt(intensity) }} W</span>
        <span>{{ time(seconds) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Time } from '../modules/time';
import { useAthleteStore } from '../stores/athlete';

const props = defineProps({
  intervals: {
    type: Array,
    required: true,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
});

const selection = defineModel('selection', {
  type: Number,
  required: false,
});

const { athlete } = storeToRefs(useAthleteStore());

const watt = (intensity) => {
  return Math.round(intensity * athlete.value.ftp);
};

const time = (seconds) => {
  return new Time(0, 0, seconds).format();
};

const root = ref();

const scrollTo = (index) => {
  const element = root.value.querySelector(`[data-index="${index}"`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

defineExpose({ scrollTo });
</script>
