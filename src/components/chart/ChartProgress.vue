<template>
  <rect x="0%" v-percent:width="x" height="100%" class="text-white/10" />
  <line v-percent:x1="x" y1="0%" v-percent:x2="x" y2="100%" class="text-gray-2" stroke-width="4" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  seconds: {
    type: Number,
    required: true,
  },
  totalSeconds: {
    type: Number,
    required: true,
  },
});

const x = computed(() => props.seconds / props.totalSeconds);
</script>
