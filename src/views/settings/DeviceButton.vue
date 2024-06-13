<template>
  <Button variant="secondary" :disabled="connecting" @click="connect">
    <template v-if="connecting">Connecting...</template>
    <template v-else-if="device">
      <slot :device="device">
        {{ device.name }}
      </slot>
    </template>
    <template v-else>Connect</template>
  </Button>
  <BluetoothDialog v-model:open="open" />
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { useAsyncFn } from '@/composables/useAsyncFn';
import { Device } from '@/modules/bluetooth/device';
import { log } from '@/utils/log';
import BluetoothDialog from '@/views/settings/BluetoothDialog.vue';
import { useBluetooth } from '@vueuse/core';
import { reactive, ref } from 'vue';

const device = defineModel('device', { type: Device, required: false });

const props = defineProps({
  constructor: { type: Function, required: true },
});

const open = ref(false);
const { isSupported } = useBluetooth();

const [connect, connecting] = useAsyncFn(async () => {
  if (!isSupported.value) {
    open.value = true;
    return;
  }

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
