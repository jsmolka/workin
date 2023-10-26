<template>
  <Button @click="connect">
    <template v-if="device.device && !device.server">Connecting...</template>
    <template v-else-if="device.server">
      <div class="flex justify-center items-center gap-2">
        {{ device.device.name }}
        <svg class="h-2 text-blue-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="currentColor" />
        </svg>
      </div>
    </template>
    <template v-else>Connect</template>
  </Button>
</template>

<script setup>
import { ref } from 'vue';
import Button from '../../components/Button.vue';
import { Device } from '../../modules/bluetooth/device';

const props = defineProps({
  device: {
    type: Device,
    required: true,
  },
});

const disabled = ref(false);

const connect = async () => {
  disabled.value = true;
  try {
    await props.device.connect();
  } catch (error) {
    if (!(error instanceof DOMException)) {
      throw error;
    }
  } finally {
    disabled.value = false;
  }
};
</script>
