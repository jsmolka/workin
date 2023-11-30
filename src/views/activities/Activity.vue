<template>
  <div class="flex gap-4 p-4 bg-gray-6 hover:bg-gray-5 rounded-sm select-none">
    <Chart class="shrink-0 h-24 aspect-[3/2] sm:aspect-[3/1]">
      <ChartLines />
      <ChartHeartRate :polylines="activity.polylinesHeartRate" />
      <ChartPower :polylines="activity.polylinesPower" />
    </Chart>
    <div class="flex flex-col justify-between overflow-hidden">
      <Header :activity="activity" />
    </div>
  </div>
</template>

<script setup>
import Chart from '../../components/chart/Chart.vue';
import ChartHeartRate from '../../components/chart/ChartHeartRate.vue';
import ChartLines from '../../components/chart/ChartLines.vue';
import ChartPower from '../../components/chart/ChartPower.vue';
import { Activity } from '../../modules/activity';
import Header from './Header.vue';

defineProps({
  activity: {
    type: Activity,
    required: true,
  },
});
</script>
