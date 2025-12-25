<template>
  <Scroller
    v-if="items.length > 0"
    class="absolute! inset-0 p-4"
    :items="items"
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
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { activities } = storeToRefs(useActivitiesStore());

const items = computed(() => {
  return activities.value.map((activity, index) => ({ activity, index, id: nanoid() }));
});
</script>
