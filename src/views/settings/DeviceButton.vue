<template>
  <Button :disabled="device.isConnecting" @click="device.connect()">
    <template v-if="device.isConnected">
      <slot :device="device">
        {{ device.name }}
      </slot>
    </template>
    <template v-else-if="device.isConnecting">Connecting...</template>
    <template v-else>Connect</template>
  </Button>
</template>

<script setup>
import Button from '../../components/Button.vue';
import { Device } from '../../modules/bluetooth/device';

defineProps({
  device: {
    type: Device,
    required: true,
  },
});
</script>
