<template>
  <div class="flex flex-col items-center justify-center gap-2 p-4">
    <p>Select a workout to start training.</p>
    <Button as-child>
      <RouterLink to="/workouts">Workouts</RouterLink>
    </Button>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
</script>
