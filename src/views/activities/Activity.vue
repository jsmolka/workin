<template>
  <div class="flex gap-4 p-4 bg-gray-6 hover:bg-gray-5 rounded-sm overflow-hidden">
    <Chart class="shrink-0 h-24 aspect-[3/2] sm:aspect-[3/1]">
      <ChartLines />
      <ChartHeartRate :data="activity.data" />
      <ChartPower :data="activity.data" />
    </Chart>
    <div class="flex flex-col justify-between overflow-hidden select-none">
      <div class="flex flex-col">
        <span class="truncate text-gray-1 text-lg font-bold">{{
          formatDate(activity.date, 'HH:mm')
        }}</span>
        <span class="truncate">{{ formatDate(activity.date, 'MMMM D, YYYY') }}</span>
      </div>
      <ActivityDetails :activity="activity" />
    </div>
  </div>
</template>

<script setup>
import Chart from '../../components/chart/Chart.vue';
import ChartHeartRate from '../../components/chart/ChartHeartRate.vue';
import ChartLines from '../../components/chart/ChartLines.vue';
import ChartPower from '../../components/chart/ChartPower.vue';
import { useFormat } from '../../composables/useFormat';
import { Activity } from '../../modules/activity';
import ActivityDetails from './ActivityDetails.vue';

defineProps({
  activity: {
    type: Activity,
    required: true,
  },
});

const { formatDate } = useFormat();
</script>
