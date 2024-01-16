<template>
  <div class="flex gap-4 p-4 bg-gray-7 hover:bg-gray-6 rounded-sm select-none">
    <Chart class="shrink-0 h-24 aspect-[3/2] sm:aspect-[5/2]">
      <ChartLines />
      <ChartIntervals class="pointer-events-none" :intervals="workout.intervals" />
    </Chart>
    <div class="flex flex-col justify-between overflow-hidden">
      <Header :workout="workout" />
    </div>
  </div>
</template>

<script setup>
import Chart from '../../components/chart/Chart.vue';
import ChartIntervals from '../../components/chart/ChartIntervals.vue';
import ChartLines from '../../components/chart/ChartLines.vue';
import { Workout } from '../../modules/workout';
import Header from './Header.vue';

defineProps({
  workout: {
    type: Workout,
    required: true,
  },
});
</script>
