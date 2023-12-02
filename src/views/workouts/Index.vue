<template>
  <Form class="h-full">
    <div class="flex rounded-sm">
      <RouterLink class="tab flex-1" to="/workouts/standard">Standard</RouterLink>
      <RouterLink class="tab flex-1" to="/workouts/custom">Custom</RouterLink>
    </div>
    <div class="relative flex-1" :class="{ '-mb-4': standard }">
      <Scroller
        class="absolute inset-0"
        v-if="workouts.length > 0"
        :class="{ 'pb-4': standard }"
        :items="workouts"
        :size="128"
        :size-gap="14"
        v-slot="{ item, index }"
      >
        <RouterLink :to="`/workouts/${type}/${index}`">
          <Workout :workout="item" />
        </RouterLink>
      </Scroller>
      <div v-else class="flex justify-center items-center h-full">No workouts, yet.</div>
    </div>
    <Button v-if="!standard" @click="router.push('/workouts/new')" blue>New workout</Button>
  </Form>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';
import Scroller from '../../components/Scroller.vue';
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
const standard = computed(() => props.type === 'standard');
</script>

<style lang="scss" scoped>
.router-link-active {
  @apply bg-gray-4;
  @apply border-b-blue-3;
}
</style>
