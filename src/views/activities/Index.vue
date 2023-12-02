<template>
  <div class="relative h-full">
    <Scroller
      v-if="activities.length > 0"
      class="absolute inset-0 -my-4 py-4"
      :items="activities"
      :size="128"
      :size-gap="14"
      v-slot="{ item, index }"
    >
      <RouterLink :to="`/activities/${index}`">
        <Activity :activity="item" />
      </RouterLink>
    </Scroller>
    <div v-else class="flex justify-center items-center h-full">No activities, yet.</div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Scroller from '../../components/Scroller.vue';
import { useActivitiesStore } from '../../stores/activities';
import Activity from './Activity.vue';

const { activities } = storeToRefs(useActivitiesStore());
</script>
