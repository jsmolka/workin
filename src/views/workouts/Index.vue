<template>
  <div class="flex flex-col gap-4">
    <WorkoutComponent v-for="workout in workouts" :workout="workout" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useWorkoutsStore } from '../../stores/workouts';
import WorkoutComponent from './Workout.vue';

const { workouts } = storeToRefs(useWorkoutsStore());
</script>
