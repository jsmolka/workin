<template>
  <Scroller
    v-if="activities.length > 0"
    class="!absolute inset-0 p-4"
    :items="activities"
    :size="130"
    :size-gap="16"
    v-slot="{ item, index }"
  >
    <RouterLink :to="`/activities/${index}`" :tabindex="-1">
      <Activity :activity="item" />
    </RouterLink>
  </Scroller>
  <div v-else class="flex justify-center items-center">
    <p>No activities</p>
  </div>
</template>

<script setup>
import Scroller from '@/components/Scroller.vue';
import { useActivitiesStore } from '@/stores/activities';
import Activity from '@/views/activities/Activity.vue';
import { storeToRefs } from 'pinia';

const { activities } = storeToRefs(useActivitiesStore());
</script>
