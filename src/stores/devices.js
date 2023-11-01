import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { notify } from '../utils/notify';

const id = 'devices';

export const useDevicesStore = defineStore(id, () => {
  const hrm = ref(null);
  const trainer = ref(null);

  for (const device of [hrm, trainer]) {
    watch(device, (value) => {
      value?.on('disconnected', () => {
        notify.info(`${value.name} disconnected`);
        device.value = null;
      });
    });
  }
  return { hrm, trainer };
});
