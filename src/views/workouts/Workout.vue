<template>
  <div class="flex gap-4 p-4 bg-gray-6 hover:bg-gray-5 rounded-sm overflow-hidden">
    <Graphic
      class="shrink-0 h-24 bg-gray-7 aspect-[3/2] sm:aspect-[3/1]"
      :intervals="workout.intervals"
    />
    <div class="flex flex-col justify-between select-none">
      <div class="flex flex-col">
        <span class="truncate text-gray-1 text-lg font-bold">{{ workout.name }}</span>
        <span class="truncate">{{ workout.zone.name }}</span>
      </div>
      <Stats :workout="workout" />
    </div>
  </div>
</template>

<script setup>
import Graphic from '../../components/Graphic.vue';
import { Workout } from '../../modules/workout';
import Stats from './Stats.vue';

defineProps({
  workout: {
    type: Workout,
    required: true,
  },
});
</script>
