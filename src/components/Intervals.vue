<template>
  <FlexTable
    ref="table"
    class="font-feature-tnum"
    :data="intervals"
    v-model:selection="selection"
    v-slot="{ item }"
  >
    <div class="flex-1 flex items-center justify-start">
      <Reserve class="text-right" reserve="100 W">
        {{ Math.round(item.intensity * athlete.ftp) }} W
      </Reserve>
    </div>
    <div class="flex-1 flex items-center justify-center">
      <Reserve class="text-right" reserve="100 %">
        {{ Math.round(item.intensity * 100) }} %
      </Reserve>
    </div>
    <div class="flex-1 flex items-center justify-end">
      <Reserve class="text-right" reserve="1:00:00">
        {{ formatSeconds(item.seconds) }}
      </Reserve>
    </div>
  </FlexTable>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAthleteStore } from '../stores/athlete';
import { formatSeconds } from '../utils/time';
import FlexTable from './FlexTable.vue';
import Reserve from './Reserve.vue';

defineProps({
  intervals: {
    type: Array,
    required: true,
  },
});

const selection = defineModel('selection', {
  type: Number,
  default: null,
});

const { athlete } = storeToRefs(useAthleteStore());

const table = ref();

defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
