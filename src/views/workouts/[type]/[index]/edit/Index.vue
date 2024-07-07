<template>
  <EditWorkout :workout="workouts[index]" @save="save" />
</template>

<script setup>
import { useWorkoutsStore } from '@/stores/workouts';
import EditWorkout from '@/views/workouts/EditWorkout.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  type: { type: String, required: true },
  index: { type: Number, required: true },
});

const router = useRouter();

const workouts = computed(() => {
  return useWorkoutsStore()[props.type];
});

const save = (workout) => {
  const store = useWorkoutsStore();
  store.edit(props.index, workout);
  router.back();
};
</script>
