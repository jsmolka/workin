<template>
  <Navigation :pages="pages" class="max-w-screen-sm h-full mx-auto">
    <div class="relative flex-1">
      <Card class="absolute inset-0 m-4 overflow-y-auto">
        <RouterView />
      </Card>
    </div>
  </Navigation>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { Card, Navigation } from './components';

const pages = [
  {
    text: 'Train',
    path: '/train',
  },
  {
    text: 'Workouts',
    path: '/workouts',
  },
  {
    text: 'Activities',
    path: '/activities',
  },
  {
    text: 'Settings',
    path: '/settings',
  },
];
</script>
