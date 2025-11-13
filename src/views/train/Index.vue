<template>
  <Train v-if="activity" />
  <div v-else class="flex flex-col items-center justify-center gap-2 p-4">
    <p>Select a workout to start training.</p>
    <Button as-child>
      <RouterLink to="/workouts">Workouts </RouterLink>
    </Button>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { useActivityStore } from '@/stores/activity';
import Train from '@/views/train/Train.vue';
import { storeToRefs } from 'pinia';

const { activity } = storeToRefs(useActivityStore());
</script>
