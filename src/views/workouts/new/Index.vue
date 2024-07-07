<template>
  <EditWorkout :workout="parseQueryWorkout() ?? new Workout('New workout')" @save="save" />
</template>

<script setup>
import { Workout } from '@/modules/workout';
import { useWorkoutsStore } from '@/stores/workouts';
import { clone } from '@/utils/persist';
import EditWorkout from '@/views/workouts/EditWorkout.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const parseQueryWorkout = () => {
  if (!['standard', 'custom'].includes(route.query.type)) {
    return null;
  }

  const index = Number.parseInt(route.query.index);
  const workouts = useWorkoutsStore()[route.query.type];
  if (!Number.isInteger(index) || index >= workouts.length) {
    return null;
  }

  return clone(workouts[index]);
};

const save = (workout) => {
  const store = useWorkoutsStore();
  const index = store.add(workout);
  router.replace(`/workouts/custom/${index}`);
};
</script>
