<template>
  <div class="grid grid-rows-3 sm:grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-4 font-feature-tnum">
    <Cell class="order-1 sm:order-1" label="Power" :value="power" />
    <Cell class="order-5 sm:order-2" label="Interval time" :value="formattedIntervalTime" />
    <Cell class="order-2 sm:order-3" label="Heart rate" :value="heartRate" />
    <Cell class="order-3 sm:order-4" label="Target power" :value="targetPower" />
    <Cell class="order-6 sm:order-5" label="Total time" :value="formattedTotalTime" />
    <Cell class="order-4 sm:order-6" label="Cadence" :value="cadence" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Time } from '../../modules/time';
import Cell from './Cell.vue';

const props = defineProps({
  power: {
    type: Number,
  },
  targetPower: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
  },
  cadence: {
    type: Number,
  },
  intervalTime: {
    type: Time,
    required: true,
  },
  totalTime: {
    type: Time,
    required: true,
  },
});

const formattedIntervalTime = computed(() =>
  props.intervalTime.format(props.intervalTime.getHours() > 0 ? 'H:mm:ss' : 'mm:ss'),
);

const formattedTotalTime = computed(() => props.totalTime.formatHours());
</script>
