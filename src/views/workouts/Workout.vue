<template>
  <div class="flex gap-4 p-4 bg-gray-6 hover:bg-gray-5 rounded-sm overflow-hidden">
    <Chart
      class="shrink-0 h-24 bg-gray-7 aspect-[3/2] sm:aspect-[3/1] pointer-events-none"
      :intervals="workout.intervals"
    />
    <div class="flex flex-col justify-between overflow-hidden select-none">
      <div class="flex flex-col">
        <span class="truncate text-gray-1 text-lg font-bold">{{ workout.name }}</span>
        <span class="truncate">{{ workout.zone.name }}</span>
      </div>
      <Details :workout="workout" />
    </div>
  </div>
</template>

<script setup>
import Chart from '../../components/Chart.vue';
import { Workout } from '../../modules/workout';
import Details from './Details.vue';

defineProps({
  workout: {
    type: Workout,
    required: true,
  },
});
</script>
