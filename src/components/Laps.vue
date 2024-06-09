<template>
  <DataTableWrapper>
    <DataTable ref="table" class="absolute inset-0 font-feature-tnum">
      <DataTableBody>
        <DataTableRow
          v-for="(item, index) in items"
          class="grid grid-flow-col auto-cols-fr"
          :index="index"
          v-model:selected-index="selectedIndex"
        >
          <DataTableCell>
            <div class="flex justify-start">
              <Reserve class="text-right" reserve="100 W">
                {{ Math.round(averagePower(item)) }} W
              </Reserve>
            </div>
          </DataTableCell>
          <DataTableCell v-if="hasHeartRate(item)">
            <div class="flex justify-center">
              <Reserve class="text-right" reserve="100 bpm">
                {{ Math.round(averageHeartRate(item)) }} bpm
              </Reserve>
            </div>
          </DataTableCell>
          <DataTableCell>
            <div class="flex justify-end">
              <Reserve class="text-right" reserve="1:00:00">
                {{ formatSeconds(item.length) }}
              </Reserve>
            </div>
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
import { ref } from 'vue';
import { averageHeartRate, averagePower } from '../modules/data';
import { formatSeconds } from '../utils/time';

const selectedIndex = defineModel('selectedIndex', { type: Number, required: false });

defineProps({
  items: { type: Array, required: true },
});

const hasHeartRate = (item) => {
  return item.some((data) => data[1] != null);
};

const table = ref();
defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
