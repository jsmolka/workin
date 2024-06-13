<template>
  <g class="stroke-2 stroke-brand-3">
    <Polyline v-for="points in polylines" :points="points" />
  </g>
</template>

<script setup>
import Polyline from '@/components/chart/Polyline.vue';

defineProps({
  polylines: { type: Array, required: true },
});
</script>
