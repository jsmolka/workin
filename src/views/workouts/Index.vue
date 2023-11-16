<template>
  <Form class="h-full">
    <div class="flex rounded-sm">
      <RouterLink class="tab flex-1" to="/workouts/standard">Standard</RouterLink>
      <RouterLink class="tab flex-1" to="/workouts/custom">Custom</RouterLink>
    </div>
    <div class="relative flex-1">
      <div class="absolute inset-0 flex flex-col gap-4 overflow-y-auto">
        <RouterLink
          v-if="workouts.length > 0"
          v-for="(workout, index) in workouts"
          :to="`/workouts/${type}/${index}`"
        >
          <Workout :workout="workout" />
        </RouterLink>
        <div v-else class="grid place-items-center h-full">No workouts, yet.</div>
      </div>
    </div>
    <Button v-if="type === 'custom'" @click="router.push('/workouts/new')" blue>
      New workout
    </Button>
  </Form>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';
import { useWorkoutsStore } from '../../stores/workouts';
import Workout from './Workout.vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const store = useWorkoutsStore();

const workouts = computed(() => store.workouts(props.type));
</script>

<style lang="scss" scoped>
.router-link-active {
  @apply bg-gray-4;
  @apply border-b-blue-3;
}
</style>
