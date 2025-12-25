<template>
  <EditWorkout :workout="workouts[type][index]" @save="save" />
</template>

<script setup>
import { useWorkoutsStore } from '@/stores/workouts';
import EditWorkout from '@/views/workouts/EditWorkout.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  type: { type: String, required: true },
  index: { type: Number, required: true },
});

const router = useRouter();
const workouts = useWorkoutsStore();

const save = (workout) => {
  workouts.edit(props.index, workout);
  router.back();
};
</script>
