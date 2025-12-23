<template>
  <DataTableWrapper class="min-h-20">
    <DataTable ref="table" class="font-feature-tnum absolute inset-0">
      <DataTableBody ref="tableBody">
        <DataTableRow
          v-for="(interval, index) in items"
          class="grid auto-cols-fr grid-flow-col"
          :class="{ 'border-shade-3 border-b-2': interval.separator }"
          :index="index"
          :key="`${tableKey}/${index}`"
          v-model:selected-index="selectedIndex"
        >
          <DataTableCell>
            <div class="flex justify-start">
              <Reserve class="text-right" reserve="100 W">
                {{ Math.round(interval.intensity * athlete.ftp) }} W
              </Reserve>
            </div>
          </DataTableCell>
          <DataTableCell>
            <div class="flex justify-center">
              <Reserve class="text-right" reserve="100%">
                {{ Math.round(interval.intensity * 100) }}%
              </Reserve>
            </div>
          </DataTableCell>
          <DataTableCell class="text-right">
            {{ formatSeconds(interval.seconds) }}
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
import { useAthleteStore } from '@/stores/athlete';
import { formatSeconds } from '@/utils/time';
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable';
import { storeToRefs } from 'pinia';
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';

const selectedIndex = defineModel('selectedIndex', { type: Number, required: false });

const props = defineProps({
  items: { type: Array, required: true },
  sortable: { type: Boolean, default: false },
});

const { athlete } = storeToRefs(useAthleteStore());

const table = useTemplateRef('table');
const tableBody = useTemplateRef('tableBody');
const tableKey = ref(0);

const { option } = useSortable(tableBody, props.items, {
  animation: 150,
  filter: '[data-selected="false"]',
  onUpdate: (event) => {
    moveArrayElement(props.items, event.oldIndex, event.newIndex);
    selectedIndex.value = event.newIndex;
    tableKey.value++;
  },
});

onMounted(() => {
  watchEffect(() => {
    option('disabled', !props.sortable);
  });
});

defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
