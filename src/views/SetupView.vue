<template>
  <div class="flex-1 flex flex-col gap-4">
    <div class="pair">
      <div class="label">Heart rate monitor</div>
      <ButtonDevice :device="hrm" />
    </div>
    <div class="pair">
      <div class="label">FTP</div>
      <Input type="number" value="" />
    </div>
    <Button brand>Start</Button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import HeartRateMonitor from '../bluetooth/heartRateMonitor';
import Button from '../components/Button.vue';
import ButtonDevice from '../components/ButtonDevice.vue';
import Input from '../components/Input.vue';

const hrm = reactive(new HeartRateMonitor());
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
  @apply text-white-3;
  @apply font-medium;
}
</style>
