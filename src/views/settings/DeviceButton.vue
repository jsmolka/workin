<template>
  <Button :disabled="device.isConnecting" @click="device.connect()">
    <template v-if="device.isConnected">{{ device.device.name }}</template>
    <template v-if="device.isConnecting">Connecting...</template>
    <template v-if="device.isDisconnected">Connect</template>
  </Button>
</template>

<script setup>
import Button from '../../components/Button.vue';
import { Device } from '../../modules/bluetooth/device';

const props = defineProps({
  device: {
    type: Device,
    required: true,
  },
});
</script>
