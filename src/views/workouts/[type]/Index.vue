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
        ref="scroller"
        class="!absolute inset-0 pb-4"
        :items="workouts"
        :size="130"
        :size-gap="16"
        v-slot="{ item }"
      >
        <RouterLink :to="`/workouts/${type}/${item.index}`" :tabindex="-1" :key="item.id">
          <Workout :workout="item.workout" />
        </RouterLink>
      </Scroller>
      <div v-else class="flex h-full items-center justify-center">
        <p>No workouts</p>
      </div>
    </div>
    <Button
      v-if="props.type === 'custom'"
      class="absolute right-4 bottom-4 z-10 size-12 rounded-full shadow"
      size="icon"
      as-child
    >
      <RouterLink to="/workouts/new">
        <PhPlus class="size-6" />
      </RouterLink>
    </Button>
  </Form>
</template>

<script setup>
import Scroller from '@/components/Scroller.vue';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkoutsStore } from '@/stores/workouts';
import { makeNaturalComparer } from '@/utils/sorting';
import Workout from '@/views/workouts/[type]/Workout.vue';
import { PhPlus } from '@phosphor-icons/vue';
import { useSwipe } from '@vueuse/core';
import { nanoid } from 'nanoid';
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const props = defineProps({
  type: { type: String, required: true },
});

const route = useRoute();
const router = useRouter();

const workouts = computed(() => {
  const store = useWorkoutsStore();
  const workouts = store[props.type].map((workout, index) => ({ workout, index, id: nanoid() }));
  if (props.type !== 'standard') {
    workouts.sort(makeNaturalComparer((item) => item.workout.name));
  }
  return workouts;
});

const scroller = ref();
watch(route, () => {
  scroller.value?.scrollToPosition(0);
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
