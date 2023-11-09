<template>
  <FlexTable
    ref="table"
    class="font-feature-tnum"
    :data="laps"
    v-model:selection="selection"
    clickable
    v-slot="{ item }"
  >
    <div class="flex-1 flex items-center justify-start">
      <Reserve class="text-right" reserve="100 W">
        {{ Math.round(getAveragePower(item)) }} W
      </Reserve>
    </div>
    <div class="flex-1 flex items-center justify-center">
      <Reserve class="text-right" reserve="100 bpm">
        {{ Math.round(getAverageHeartRate(item)) }} bpm
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
import { useFormat } from '../../../composables/useFormat';
import { getAverageHeartRate, getAveragePower } from '../../../modules/dataPoint';

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

const table = ref();

defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
