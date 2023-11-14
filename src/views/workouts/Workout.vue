<template>
  <div class="flex gap-4 p-4 bg-gray-6 hover:bg-gray-5 rounded-sm overflow-hidden select-none">
    <Chart class="shrink-0 h-24 aspect-[3/2] sm:aspect-[3/1]">
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
