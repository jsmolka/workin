<template>
  <div class="flex flex-col justify-center items-center gap-2 p-4">
    <p>Select a workout to start training</p>
    <Button @click="router.push('/workouts')">Workouts</Button>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
