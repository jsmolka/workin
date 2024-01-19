<template>
  <Table
    ref="table"
    class="font-feature-tnum"
    :data="laps"
    v-model:selection="selection"
    v-slot="{ item }"
  >
    <td>
      <div class="flex justify-start">
        <Reserve class="text-right" reserve="100 W">
          {{ Math.round(averagePower(item)) }} W
        </Reserve>
      </div>
    </td>
    <td v-if="hasHeartRate(item)">
      <div class="flex justify-center">
        <Reserve class="text-right" reserve="100 bpm">
          {{ Math.round(averageHeartRate(item)) }} bpm
        </Reserve>
      </div>
    </td>
    <td>
      <div class="flex justify-end">
        <Reserve class="text-right" reserve="1:00:00">
          {{ formatSeconds(item.length) }}
        </Reserve>
      </div>
    </td>
  </Table>
</template>

<script setup>
import { ref } from 'vue';
import Reserve from '../../../components/Reserve.vue';
import Table from '../../../components/Table.vue';
import { averageHeartRate, averagePower } from '../../../modules/data';
import { formatSeconds } from '../../../utils/time';

defineProps({
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
