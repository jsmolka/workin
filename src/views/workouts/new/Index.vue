<template>
  <EditWorkout :workout="workout" @save="save" />
</template>

<script setup>
import { Workout } from '@/modules/workout';
import { useWorkoutsStore } from '@/stores/workouts';
import { clone } from '@/utils/persist';
import EditWorkout from '@/views/workouts/EditWorkout.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const parseQueryWorkout = () => {
  if (!['standard', 'custom'].includes(route.query.type) || route.query.index == null) {
    return null;
  }
  const { workouts } = useWorkoutsStore();
  const workout = workouts(route.query.type)[parseInt(route.query.index) || 0];
  return workout ? clone(workout) : null;
};

const router = useRouter();
const workout = ref(parseQueryWorkout() ?? new Workout('New workout'));

const save = (workout) => {
  const store = useWorkoutsStore();
  const index = store.add(workout);
  router.replace(`/workouts/custom/${index}`);
};
</script>
