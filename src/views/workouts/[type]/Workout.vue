<template>
  <div
    :class="
      cn('flex gap-4 p-4 bg-shade-7 border rounded-xs select-none hover:bg-shade-6', props.class)
    "
  >
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
import { Chart, ChartIntervals, ChartLines } from '@/components/chart';
import { Workout } from '@/modules/workout';
import { cn } from '@/utils/ui';
import Header from '@/views/workouts/[type]/Header.vue';

const props = defineProps({
  class: { required: false },
  workout: { type: Workout, required: true },
});
</script>
