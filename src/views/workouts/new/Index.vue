<template>
  <EditWorkout
    :workout="workout != null ? clone(workout) : new Workout('New workout')"
    @save="save"
  />
</template>

<script setup>
import { Workout } from '@/modules/workout';
import { useWorkoutsStore } from '@/stores/workouts';
import { clone } from '@/utils/persist';
import EditWorkout from '@/views/workouts/EditWorkout.vue';
import { useRouter } from 'vue-router';

defineProps({
  workout: { type: Workout, default: null },
});

const router = useRouter();

const save = (workout) => {
  const store = useWorkoutsStore();
  const index = store.add(workout);
  router.replace(`/workouts/custom/${index}`);
};
</script>
