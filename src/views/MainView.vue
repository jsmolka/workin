<template>
  <div class="flex gap-4">
    <div class="flex flex-col flex-1 justify-center gap-4">
      <div class="font-black text-4xl">Workin(side)</div>
      <div>A simple web app to create and run custom workouts on your smart trainer.</div>
    </div>
    <div class="flex-1 flex flex-col bg-night-2 rounded p-4 gap-4">
      <div class="pair">
        <div class="label">Smart trainer</div>
        <Button disabled>Connect</Button>
      </div>
      <div class="pair">
        <div class="label">Heart rate monitor</div>
        <Button @click="sensor.connect()">
          <template v-if="sensor.server">
            <div class="flex justify-center items-center gap-2">
              <span>{{ sensor.name }}</span>
              <Circle class="h-2 text-aurora-4" />
            </div>
          </template>
          <template v-else>Connect</template>
        </Button>
      </div>
      <div class="pair">
        <div class="label">FTP</div>
        <Input type="number" value="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import HeartRateMonitor from '../bluetooth/heartRateMonitor';
import Button from '../components/Button.vue';
import Circle from '../components/Circle.vue';
import Input from '../components/Input.vue';

const sensor = reactive(new HeartRateMonitor());
</script>

<style scoped>
.pair {
  @apply flex;
  @apply flex-col;
  @apply gap-2;
}

.label {
  @apply uppercase;
  @apply text-xs;
  @apply text-snow-1;
  @apply font-medium;
}
</style>
