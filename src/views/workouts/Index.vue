<template>
  <div class="flex flex-col gap-4">
    <RouterLink v-for="(workout, index) in workouts" :to="{ name: 'workout', params: { index } }">
      <Workout :workout="workout" />
    </RouterLink>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useWorkoutsStore } from '../../stores/workouts';
import Workout from './Workout.vue';

const { workouts } = storeToRefs(useWorkoutsStore());
</script>
