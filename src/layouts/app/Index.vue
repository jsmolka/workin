<template>
  <div class="flex flex-col h-full">
    <div class="container relative flex-1">
      <Card class="absolute inset-0 m-4 overflow-y-auto">
        <RouterView />
      </Card>
    </div>
    <div class="bg-gray-6">
      <nav class="container flex justify-between">
        <Link class="flex-1" name="train" />
        <Link class="flex-1" name="workouts" />
        <Link class="flex-1" name="activities" />
        <Link class="flex-1" name="settings" />
      </nav>
    </div>
  </div>
</template>

<script setup>
import Card from '../../components/Card.vue';
import Link from './Link.vue';
</script>

<style lang="scss" scoped>
.container {
  @apply max-w-screen-sm;
  @apply mx-auto;
}
</style>
