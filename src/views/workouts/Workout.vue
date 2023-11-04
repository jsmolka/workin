<template>
  <div class="flex gap-4 p-4 bg-gray-6 hover:bg-gray-5 rounded-sm cursor-pointer">
    <Intervals
      class="shrink-0 h-24 bg-gray-7 aspect-[3/2] sm:aspect-[5/2]"
      :intervals="workout.intervals"
    />
    <div class="flex flex-col justify-between overflow-hidden select-none">
      <div class="flex flex-col">
        <span class="truncate text-gray-1 text-lg font-bold">{{ workout.name }}</span>
        <span class="truncate">{{ workout.zone.name }}</span>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col">
          <span>{{ duration }}</span>
          <span class="unit">Duration</span>
        </div>
        <div class="flex flex-col">
          <span>{{ calories }}</span>
          <span class="unit">cal</span>
        </div>
        <div class="hidden sm:flex flex-col">
          <span>{{ avgPower }}</span>
          <span class="unit">Avg W</span>
        </div>
        <div class="flex flex-col">
          <span>{{ maxPower }}</span>
          <span class="unit">Max W</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Intervals from '../../components/Intervals.vue';
import { Time } from '../../modules/time';
import { Workout } from '../../modules/workout';
import { useAthleteStore } from '../../stores/athlete';

const props = defineProps({
  workout: {
    type: Workout,
    required: true,
  },
});

const { athlete } = storeToRefs(useAthleteStore());

const duration = computed(() => new Time(0, 0, props.workout.duration).formatHours());
const calories = computed(() => Math.round(props.workout.calories(athlete.value.ftp)));
const avgPower = computed(() => Math.round(props.workout.averageIntensity * athlete.value.ftp));
const maxPower = computed(() => Math.round(props.workout.maxIntensity * athlete.value.ftp));
</script>

<style lang="scss" scoped>
.unit {
  @apply text-gray-3;
  @apply text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply whitespace-nowrap;
}
</style>
