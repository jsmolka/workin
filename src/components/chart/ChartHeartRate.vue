<template>
  <ChartData
    :data="data"
    :index="1"
    :max-x="maxX ?? data.length"
    :max-y="2 * athlete.ftp"
    class="stroke-2 stroke-[#bf616a]"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAthleteStore } from '../../stores/athlete';
import ChartData from './ChartData.vue';

defineProps({
  data: {
    type: Array,
    required: true,
  },
  maxX: {
    type: Number,
    default: null,
  },
});

const { athlete } = storeToRefs(useAthleteStore());
</script>
