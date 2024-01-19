<template>
  <g class="stroke-2 stroke-red">
    <Polyline v-for="points in polylines" :points="points" />
  </g>
</template>

<script setup>
import Polyline from './Polyline.vue';

defineProps({
  polylines: {
    type: Array,
    required: true,
  },
});
</script>
