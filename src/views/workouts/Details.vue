<template>
  <ResponsiveFlex class="gap-4">
    <div class="flex flex-col">
      <span>{{ duration }}</span>
      <span class="label">Duration</span>
    </div>
    <div class="flex flex-col">
      <span>{{ calories }}</span>
      <span class="label">kJ (cal)</span>
    </div>
    <div class="flex flex-col">
      <span>{{ avgPower }}</span>
      <span class="label">Avg W</span>
    </div>
    <div class="flex flex-col">
      <span>{{ maxPower }}</span>
      <span class="label">Max W</span>
    </div>
  </ResponsiveFlex>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import ResponsiveFlex from '../../components/ResponsiveFlex.vue';
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

const duration = computed(() => new Time(0, 0, props.workout.seconds).format());
const calories = computed(() => Math.round(props.workout.calories(athlete.value.ftp)));
const avgPower = computed(() => Math.round(props.workout.averageIntensity * athlete.value.ftp));
const maxPower = computed(() => Math.round(props.workout.maxIntensity * athlete.value.ftp));
</script>

<style lang="scss" scoped>
.label {
  @apply text-gray-3;
  @apply text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply whitespace-nowrap;
}
</style>
