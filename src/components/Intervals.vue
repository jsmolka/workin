<template>
  <div class="relative border border-gray-6 rounded-sm overflow-hidden">
    <div ref="list" class="absolute inset-0 overflow-y-scroll font-feature-tnum">
      <div
        v-for="({ intensity, seconds }, index) in intervals"
        class="flex justify-between gap-4 px-2 py-1.5"
        :class="index === currentIndex ? 'bg-blue-3' : index % 2 === 0 ? 'bg-gray-6' : ''"
        :data-index="index"
      >
        <span>{{ watt(intensity) }} W</span>
        <span>{{ time(seconds) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { Time } from '../modules/time';
import { useAthleteStore } from '../stores/athlete';

const props = defineProps({
  intervals: {
    type: Array,
    required: true,
  },
  seconds: {
    type: Number,
    required: false,
  },
});

const { athlete } = storeToRefs(useAthleteStore());

const watt = (intensity) => {
  return Math.round(intensity * athlete.value.ftp);
};

const time = (seconds) => {
  return new Time(0, 0, seconds).format();
};

const currentIndex = computed(() => {
  if (props.seconds == null) {
    return null;
  }

  let totalSeconds = 0;
  for (const [i, { seconds }] of props.intervals.entries()) {
    totalSeconds += seconds;
    if (props.seconds < totalSeconds) {
      return i;
    }
  }
  return null;
});

const list = ref();

onMounted(() => {
  watch(currentIndex, (index) => {
    if (index == null) {
      return;
    }

    const element = list.value.querySelector(`[data-index="${index}"`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
</script>
