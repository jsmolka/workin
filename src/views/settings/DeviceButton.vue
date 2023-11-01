<template>
  <Button :disabled="connecting" @click="connect">
    <template v-if="device != null">
      <slot :device="device">
        {{ device.name }}
      </slot>
    </template>
    <template v-else-if="connecting">Connecting...</template>
    <template v-else>Connect</template>
  </Button>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Button from '../../components/Button.vue';
import { Device } from '../../modules/bluetooth/device';
import { log } from '../../utils/log';

const props = defineProps({
  constructor: {
    type: Function,
    required: true,
  },
});

const device = defineModel('device', { type: Device });

const connecting = ref(false);

const connect = async () => {
  device.value?.disconnect();
  device.value = null;

  connecting.value = true;
  const value = reactive(new props.constructor());
  try {
    await value.connect();
    device.value = value;
  } catch (error) {
    value.disconnect();
    log.warn(error);
  } finally {
    connecting.value = false;
  }
};
</script>
