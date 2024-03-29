<template>
  <Button :disabled="!isSupported || connecting" @click="connect">
    <template v-if="connecting">Connecting...</template>
    <template v-else-if="device">
      <slot :device="device">
        {{ device.name }}
      </slot>
    </template>
    <template v-else>Connect</template>
  </Button>
</template>

<script setup>
import { useBluetooth } from '@vueuse/core';
import { reactive } from 'vue';
import Button from '../../components/Button.vue';
import { useAsyncFn } from '../../composables/useAsyncFn';
import { Device } from '../../modules/bluetooth/device';
import { log } from '../../utils/log';

const props = defineProps({
  constructor: {
    type: Function,
    required: true,
  },
});

const device = defineModel('device', {
  type: Device,
  default: null,
});

const { isSupported } = useBluetooth();

const [connect, connecting] = useAsyncFn(async () => {
  device.value?.disconnect();
  device.value = null;

  const newDevice = reactive(new props.constructor());
  try {
    await newDevice.request();
    await newDevice.connect();
    device.value = newDevice;
  } catch (error) {
    newDevice.disconnect();
    log.error(error);
  }
});
</script>
