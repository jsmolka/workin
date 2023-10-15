<template>
  <div class="flex flex-col gap-4 p-4">
    <button class="px-1.5 py-1 rounded-sm border border-night-4" @click="sensor.connect()">Connect</button>
    <template v-if="sensor.server">
      <div>Heart rate is {{ sensor.heartRate }} bpm</div>
    </template>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import HeartRateMonitor from '../bluetooth/heartRateMonitor';

const sensor = reactive(new HeartRateMonitor());
</script>
