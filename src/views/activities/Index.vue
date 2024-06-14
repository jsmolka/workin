<template>
  <div class="h-full py-0">
    <div class="relative h-full">
      <Scroller
        v-if="activities.length > 0"
        class="!absolute inset-0 py-4"
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
  </div>
</template>

<script setup>
import Scroller from '@/components/Scroller.vue';
import { useActivitiesStore } from '@/stores/activities';
import Activity from '@/views/activities/Activity.vue';
import { storeToRefs } from 'pinia';

const { activities } = storeToRefs(useActivitiesStore());
</script>
