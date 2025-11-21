import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useDevicesStore = defineStore('devices', () => {
  const hrm = ref(null);
  const trainer = ref(null);

  for (const device of [hrm, trainer]) {
    watch(device, (value) => {
      value?.on('disconnected', () => {
        device.value = null;
      });
    });
  }
  return { hrm, trainer };
});
