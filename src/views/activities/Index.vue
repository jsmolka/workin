<template>
  <div class="relative h-full py-0">
    <Scroller
      v-if="activities.length > 0"
      class="absolute inset-0 py-4"
      :items="activities"
      :size="128"
      :size-gap="16"
      v-slot="{ item, index }"
    >
      <RouterLink :to="`/activities/${index}`">
        <Activity :activity="item" />
      </RouterLink>
    </Scroller>
    <div v-else class="flex justify-center items-center h-full">No activities</div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Scroller from '../../components/Scroller.vue';
import { useActivitiesStore } from '../../stores/activities';
import Activity from './Activity.vue';

const { activities } = storeToRefs(useActivitiesStore());
</script>
