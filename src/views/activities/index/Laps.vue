<template>
  <div ref="root" class="relative border border-gray-6 rounded-sm overflow-hidden">
    <div class="absolute inset-0 overflow-y-scroll font-feature-tnum">
      <div
        v-for="(data, index) in laps"
        class="flex justify-between gap-4 px-2 py-1.5 odd:bg-gray-6 hover:bg-gray-5 cursor-pointer select-none"
        :class="{ '!bg-blue-3': index === selection }"
        :data-index="index"
        @click="selection = index"
      >
        <div class="flex-1">{{ Math.round(getAveragePower(data)) }} W</div>
        <div class="flex-1 text-center">{{ Math.round(50 + 100 * Math.random()) }} bpm</div>
        <div class="flex-1 text-right">{{ formatSeconds(data.length) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFormat } from '../../../composables/useFormat';
import { getAveragePower } from '../../../modules/dataPoint';

const props = defineProps({
  laps: {
    type: Array,
    required: true,
  },
});

const selection = defineModel('selection', {
  type: Number,
  required: false,
});

const { formatSeconds } = useFormat();

const root = ref();

const scrollTo = (index) => {
  const element = root.value.querySelector(`[data-index="${index}"`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

defineExpose({ scrollTo });
</script>
