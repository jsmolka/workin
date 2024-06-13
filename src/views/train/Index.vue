<template>
  <Train v-if="activity" />
  <NoWorkout v-else />
</template>

<script setup>
import { useActivityStore } from '@/stores/activity';
import NoWorkout from '@/views/train/NoWorkout.vue';
import Train from '@/views/train/Train.vue';
import { storeToRefs } from 'pinia';

const { activity } = storeToRefs(useActivityStore());
</script>
