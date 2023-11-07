<template>
  <Polyline :points="points" stroke="#bf616a" stroke-width="2" />
</template>

<script setup>
import { computed } from 'vue';
import { math } from '../../utils/math';
import Polyline from './Polyline.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  totalSeconds: {
    type: Number,
    required: true,
  },
});

const percent = (value) => {
  return 100 * math.clamp(value, 0, 1);
};

const points = computed(() => {
  let result = [];
  for (const [i, { heartRate }] of props.data.entries()) {
    result.push(`${percent(i / props.totalSeconds)},${percent(heartRate / 400)}`);
  }
  return result.join(' ');
});
</script>
