<template>
  <Form class="h-full">
    <div class="flex rounded-sm overflow-hidden">
      <div
        v-for="name of ['standard', 'custom']"
        class="tab flex-1 capitalize"
        :class="{ 'bg-gray-4 border-b-blue-3': name === type }"
        @click="type = name"
      >
        {{ name }}
      </div>
    </div>
    <div class="relative flex-1">
      <div class="absolute inset-0 flex flex-col gap-4 overflow-y-auto">
        <RouterLink
          v-for="(workout, index) in workouts"
          :to="{ name: 'workout', params: { type, index } }"
        >
          <Workout :workout="workout" />
        </RouterLink>
      </div>
    </div>
    <Button v-show="type === 'custom'" @click="router.push({ name: 'workout/new' })" blue>
      Create workout
    </Button>
  </Form>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';
import { useWorkoutsStore } from '../../stores/workouts';
import Workout from './Workout.vue';

const router = useRouter();
const store = useWorkoutsStore();

const type = ref('standard');
const workouts = computed(() => store.workouts(type.value));
</script>
