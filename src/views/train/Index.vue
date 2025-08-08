<template>
  <Train v-if="activity" />
  <div v-else class="flex flex-col items-center justify-center gap-2 p-4">
    <p>Select a workout to start training.</p>
    <Button @click="router.push('/workouts')">Workouts</Button>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { useActivityStore } from '@/stores/activity';
import Train from '@/views/train/Train.vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const { activity } = storeToRefs(useActivityStore());
</script>
