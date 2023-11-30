<template>
  <FlexTable
    ref="table"
    class="font-feature-tnum"
    :data="laps"
    v-model:selection="selection"
    v-slot="{ item }"
  >
    <div class="flex-1 flex items-center justify-start">
      <Reserve class="text-right" reserve="100 W">{{ Math.round(averagePower(item)) }} W</Reserve>
    </div>
    <div v-if="hasHeartRate(item)" class="flex-1 flex items-center justify-center">
      <Reserve class="text-right" reserve="100 bpm">
        {{ Math.round(averageHeartRate(item)) }} bpm
      </Reserve>
    </div>
    <div class="flex-1 flex items-center justify-end">
      <Reserve class="text-right" reserve="1:00:00">
        {{ formatSeconds(item.length) }}
      </Reserve>
    </div>
  </FlexTable>
</template>

<script setup>
import { ref } from 'vue';
import FlexTable from '../../../components/FlexTable.vue';
import Reserve from '../../../components/Reserve.vue';
import { averageHeartRate, averagePower } from '../../../modules/data';
import { formatSeconds } from '../../../utils/time';

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

const hasHeartRate = (lap) => {
  return lap.some((data) => data[1] != null);
};

const table = ref();

defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
