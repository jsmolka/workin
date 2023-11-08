<template>
  <div class="grid grid-rows-3 sm:grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-4 font-feature-tnum">
    <Metric class="order-1 sm:order-1" text="Power" :value="power" />
    <Metric class="order-5 sm:order-2" text="Interval time" :value="intervalTime.format()" />
    <Metric class="order-2 sm:order-3" text="Heart rate" :value="heartRate" />
    <Metric class="order-3 sm:order-4" text="Target power" :value="targetPower" />
    <Metric class="order-6 sm:order-5" text="Total time" :value="totalTime.format()" />
    <Metric class="order-4 sm:order-6" text="Cadence" :value="cadence" />
  </div>
</template>

<script setup>
import { Time } from '../../modules/time';
import Metric from './Metric.vue';

defineProps({
  power: {
    type: Number,
    required: false,
  },
  targetPower: {
    type: Number,
    required: false,
  },
  heartRate: {
    type: Number,
    required: false,
  },
  cadence: {
    type: Number,
    required: false,
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
</script>
