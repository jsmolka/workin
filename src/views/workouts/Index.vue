<template>
  <Form>
    <RouterLink v-for="(workout, index) in workouts" :to="{ name: 'workout', params: { index } }">
      <Workout :workout="workout" />
    </RouterLink>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Form from '../../components/Form.vue';
import { useWorkoutsStore } from '../../stores/workouts';
import Workout from './Workout.vue';

const { workouts } = storeToRefs(useWorkoutsStore());
</script>
