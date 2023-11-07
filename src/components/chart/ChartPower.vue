<template>
  <Polyline :points="points" stroke="#B48EAD" stroke-width="2" />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useAthleteStore } from '../../stores/athlete';
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

const { athlete } = storeToRefs(useAthleteStore());

const percent = (value) => {
  return 100 * math.clamp(value, 0, 1);
};

const points = computed(() => {
  let result = [];
  for (const [i, { power }] of props.data.entries()) {
    result.push(`${percent(i / props.totalSeconds)},${percent(power / athlete.value.ftp / 2)}`);
  }
  return result.join(' ');
});
</script>
