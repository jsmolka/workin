<template>
  <Scroller
    v-if="activities.length > 0"
    class="absolute! inset-0 p-4"
    :items="activities"
    :size="130"
    :size-gap="16"
    v-slot="{ item }"
  >
    <RouterLink :to="`/activities/${item.index}`" :tabindex="-1" :key="item.id">
      <Activity :activity="item.activity" />
    </RouterLink>
  </Scroller>
  <div v-else class="flex items-center justify-center">
    <p>No activities</p>
  </div>
</template>

<script setup>
import Scroller from '@/components/Scroller.vue';
import { useActivitiesStore } from '@/stores/activities';
import Activity from '@/views/activities/Activity.vue';
import { nanoid } from 'nanoid';
import { computed } from 'vue';

const activities = computed(() => {
  const store = useActivitiesStore();
  return store.activities.map((activity, index) => ({ activity, index, id: nanoid() }));
});
</script>
