<template>
  <div class="flex flex-col gap-4 p-4">
    <button class="px-1.5 py-1 rounded-sm border border-night-4" @click="sensor.connect()">Connect</button>
    <template v-if="sensor.heartRate != null">
      <div>Heart rate is {{ sensor.heartRate }} bpm</div>
    </template>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import HeartRateSensor from '../bluetooth/heartRateSensor';

const sensor = reactive(new HeartRateSensor());
</script>
