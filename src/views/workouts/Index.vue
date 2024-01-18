<template>
  <div class="relative flex flex-col h-full gap-4 pb-0">
    <div class="flex gap-4">
      <RouterLink class="chip" to="/workouts/standard">Standard</RouterLink>
      <RouterLink class="chip" to="/workouts/custom">Custom</RouterLink>
    </div>
    <div class="relative flex-1">
      <Scroller
        v-if="workouts.length > 0"
        class="absolute inset-0 pb-4"
        :items="workouts"
        :size="128"
        :size-gap="16"
        v-slot="{ item, index }"
      >
        <RouterLink :to="`/workouts/${type}/${index}`">
          <Workout :workout="item" />
        </RouterLink>
      </Scroller>
      <div v-else class="flex justify-center items-center h-full">No workouts</div>
    </div>
    <IconButton
      v-if="!standard"
      class="absolute bottom-4 right-4 shadow z-10"
      @click="router.push('/workouts/new')"
      brand
    >
      <PlusIcon class="w-8 h-8" />
    </IconButton>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { useSwipe } from '@vueuse/core';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import IconButton from '../../components/IconButton.vue';
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

useSwipe(window, {
  onSwipeEnd(_, direction) {
    switch (direction) {
      case 'left': {
        if (props.type === 'standard') {
          router.push('/workouts/custom');
        }
        break;
      }
      case 'right': {
        if (props.type === 'custom') {
          router.push('/workouts/standard');
        }
        break;
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.chip {
  @apply px-2;
  @apply py-1.5;
  @apply bg-shade-6;
  @apply rounded-sm;
  @apply select-none;
}

.router-link-active {
  @apply text-shade-8;
  @apply bg-brand-3;
}
</style>
