<template>
  <DataTableWrapper>
    <DataTable ref="table" class="absolute inset-0 font-feature-tnum">
      <DataTableBody>
        <DataTableRow
          v-for="(dataPoints, index) in items"
          class="grid grid-flow-col auto-cols-fr"
          :index="index"
          v-model:selected-index="selectedIndex"
        >
          <DataTableCell>
            <div class="flex justify-start">
              <Reserve class="text-right" reserve="100 W">
                {{ Math.round(dataPoints.averagePower()) }} W
              </Reserve>
            </div>
          </DataTableCell>
          <DataTableCell v-if="hasHeartRate(dataPoints)">
            <div class="flex justify-center">
              <Reserve class="text-right" reserve="100 bpm">
                {{ Math.round(dataPoints.averageHeartRate()) }} bpm
              </Reserve>
            </div>
          </DataTableCell>
          <DataTableCell class="text-right">
            {{ formatSeconds(dataPoints.length) }}
          </DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTable>
  </DataTableWrapper>
</template>

<script setup>
import Reserve from '@/components/Reserve.vue';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableRow,
  DataTableWrapper,
} from '@/components/ui/data-table';
import { formatSeconds } from '@/utils/time';
import { ref } from 'vue';

const selectedIndex = defineModel('selectedIndex', { type: Number, required: false });

defineProps({
  items: { type: Array, required: true },
});

const hasHeartRate = (dataPoints) => {
  return dataPoints.some((dataPoint) => dataPoint.heartRate != null);
};

const table = ref();
defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
