<template>
  <div class="flex gap-4 p-4 bg-gray-6 hover:bg-gray-5 rounded-sm cursor-pointer">
    <Intervals
      class="shrink-0 h-24 bg-gray-7 aspect-[3/2] sm:aspect-[5/2]"
      :intervals="workout.intervals"
    />
    <div class="flex flex-col justify-between overflow-hidden select-none">
      <span class="truncate text-gray-1 text-lg font-bold">{{ workout.name }}</span>
      <span class="truncate">VO2 max</span>
      <span class="truncate">{{ duration }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Intervals from '../../components/Intervals.vue';
import { Time } from '../../modules/time';
import { Workout } from '../../modules/workout';

const props = defineProps({
  workout: {
    type: Workout,
    required: true,
  },
});

const duration = computed(() => new Time(0, 0, props.workout.duration).format('HH:mm:ss'));
</script>
