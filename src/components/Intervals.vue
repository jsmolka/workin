<template>
  <Table
    ref="table"
    class="font-feature-tnum"
    :data="intervals"
    v-model:selection="selection"
    v-slot="{ item }"
  >
    <td>
      <div class="flex justify-start">
        <Reserve class="text-right" reserve="100 W">
          {{ Math.round(item.intensity * athlete.ftp) }} W
        </Reserve>
      </div>
    </td>
    <td>
      <div class="flex justify-center">
        <Reserve class="text-right" reserve="100 %">
          {{ Math.round(item.intensity * 100) }} %
        </Reserve>
      </div>
    </td>
    <td>
      <div class="flex justify-end">
        <Reserve class="text-right" reserve="1:00:00">
          {{ formatSeconds(item.seconds) }}
        </Reserve>
      </div>
    </td>
  </Table>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAthleteStore } from '../stores/athlete';
import { formatSeconds } from '../utils/time';
import Reserve from './Reserve.vue';
import Table from './Table.vue';

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
