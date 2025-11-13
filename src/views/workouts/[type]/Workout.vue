<template>
  <div
    :class="
      cn('bg-shade-7 hover:bg-shade-6 flex gap-4 rounded-xs border p-4 select-none', props.class)
    "
  >
    <Chart class="aspect-3/2 h-24 shrink-0 sm:aspect-5/2">
      <ChartLines />
      <ChartIntervals class="pointer-events-none" :intervals="workout.intervals" />
    </Chart>
    <div class="flex flex-col justify-between overflow-hidden">
      <Header :workout="workout" />
    </div>
  </div>
</template>

<script setup>
import { Chart, ChartIntervals, ChartLines } from '@/components/chart';
import { Workout } from '@/modules/workout';
import { cn } from '@/utils/ui';
import Header from '@/views/workouts/[type]/Header.vue';

const props = defineProps({
  class: { required: false },
  workout: { type: Workout, required: true },
});
</script>
