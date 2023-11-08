<template>
  <ChartData
    :data="data"
    property="power"
    :max-x="maxX ?? data.length"
    :max-y="2 * athlete.ftp"
    class="stroke-blue-3"
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
    required: false,
  },
});

const { athlete } = storeToRefs(useAthleteStore());
</script>
