<template>
  <Form class="px-4 pt-4">
    <Tabs :model-value="route.fullPath">
      <TabsList class="grid grid-cols-2">
        <TabsTrigger
          v-for="{ text, route } in [
            { text: 'Standard', route: '/workouts/standard' },
            { text: 'Custom', route: '/workouts/custom' },
          ]"
          :value="route"
          as-child
        >
          <RouterLink :to="route">{{ text }}</RouterLink>
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <div class="relative flex-1">
      <Scroller
        v-if="workouts.length > 0"
        class="!absolute inset-0 pb-4"
        :items="workouts"
        :size="130"
        :size-gap="16"
        v-slot="{ item, index }"
      >
        <RouterLink :to="`/workouts/${type}/${index}`" :tabindex="-1">
          <Workout :workout="item" />
        </RouterLink>
      </Scroller>
      <div v-else class="flex justify-center items-center h-full">
        <p>No workouts</p>
      </div>
    </div>
    <Button
      v-if="!standard"
      class="absolute bottom-4 right-4 size-12 z-10 rounded-full shadow"
      size="icon"
      @click="router.push('/workouts/new')"
    >
      <PlusIcon class="size-6" />
    </Button>
  </Form>
</template>

<script setup>
import Scroller from '@/components/Scroller.vue';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkoutsStore } from '@/stores/workouts';
import Workout from '@/views/workouts/Workout.vue';
import { PlusIcon } from '@radix-icons/vue';
import { useSwipe } from '@vueuse/core';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  type: { type: String, required: true },
});

const route = useRoute();
const router = useRouter();

const workouts = computed(() => {
  const { workouts } = useWorkoutsStore();
  return workouts(props.type);
});

const standard = computed(() => {
  return props.type === 'standard';
});

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
