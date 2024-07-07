<template>
  <DataTableWrapper>
    <DataTable ref="table" class="absolute inset-0 font-feature-tnum">
      <DataTableBody ref="body">
        <DataTableRow
          v-for="(interval, index) in items"
          class="grid grid-flow-col auto-cols-fr"
          :index="index"
          v-model:selected-index="selectedIndex"
          :key="interval.id"
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
              <Reserve class="text-right" reserve="100 %">
                {{ Math.round(interval.intensity * 100) }} %
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
import { onMounted, ref, watchEffect } from 'vue';

const selectedIndex = defineModel('selectedIndex', { type: Number, required: false });

const props = defineProps({
  items: { type: Array, required: true },
  sortable: { type: Boolean, default: false },
});

const { athlete } = storeToRefs(useAthleteStore());

const body = ref();
const { option } = useSortable(body, props.items, {
  animation: 150,
  filter: '[data-selected="false"]',
  onUpdate: (event) => {
    moveArrayElement(props.items, event.oldIndex, event.newIndex);
    selectedIndex.value = event.newIndex;
  },
});

onMounted(() => {
  watchEffect(() => {
    option('disabled', !props.sortable);
  });
});

const table = ref();
defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
