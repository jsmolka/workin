<template>
  <Button @click="connect">
    <template v-if="connecting">Connecting...</template>
    <template v-else-if="device.server">
      <div class="flex justify-center items-center gap-2">
        {{ device.name }}
        <svg class="h-2 text-blue-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="currentColor" />
        </svg>
      </div>
    </template>
    <template v-else>Connect</template>
  </Button>
</template>

<script setup>
import { ref } from "vue";
import Device from "../../bluetooth/device";
import Button from "../../components/Button.vue";

const props = defineProps({
  device: {
    type: Device,
    required: true,
  },
});

const connecting = ref(false);

const connect = async () => {
  connecting.value = true;
  try {
    await props.device.connect();
  } finally {
    connecting.value = false;
  }
};
</script>
