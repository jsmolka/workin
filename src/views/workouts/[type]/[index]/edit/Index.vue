<template>
  <EditWorkout :workout="workout" @save="save" />
</template>

<script setup>
import { useWorkoutsStore } from '@/stores/workouts';
import { assign } from '@/utils/persist';
import EditWorkout from '@/views/workouts/EditWorkout.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  type: { type: String, required: true },
  index: { type: Number, required: true },
});

const router = useRouter();
const workout = useWorkoutsStore()[props.type][props.index];

const save = (newWorkout) => {
  assign(workout, newWorkout);
  router.back();
};
</script>
