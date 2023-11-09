<template>
  <FlexTable
    ref="table"
    class="font-feature-tnum"
    :data="intervals"
    :clickable="clickable"
    v-model:selection="selection"
    v-slot="{ item }"
  >
    <div class="flex-1 flex items-center justify-start">
      <Reserve class="text-right" reserve="100 W">
        {{ Math.round(item.intensity * athlete.ftp) }} W
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
import { useFormat } from '../composables/useFormat';
import { useAthleteStore } from '../stores/athlete';
import FlexTable from './FlexTable.vue';
import Reserve from './Reserve.vue';

const props = defineProps({
  intervals: {
    type: Array,
    required: true,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
});

const selection = defineModel('selection', {
  type: Number,
  required: false,
});

const { athlete } = storeToRefs(useAthleteStore());
const { formatSeconds } = useFormat();

const table = ref();

defineExpose({ scrollTo: (index) => table.value.scrollTo(index) });
</script>
