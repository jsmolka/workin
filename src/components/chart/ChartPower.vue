<template>
  <g class="stroke-brand-3 stroke-2">
    <Polyline v-for="points in polylines" :points="points" />
  </g>
</template>

<script setup>
import { Polyline } from '@/components/chart';

defineProps({
  polylines: { type: Array, required: true },
});
</script>
