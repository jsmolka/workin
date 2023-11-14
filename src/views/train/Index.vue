<template>
  <Train v-if="activity" />
  <NoWorkout v-else />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useActivityStore } from '../../stores/activity';
import NoWorkout from './NoWorkout.vue';
import Train from './Train.vue';

const { activity } = storeToRefs(useActivityStore());
</script>
