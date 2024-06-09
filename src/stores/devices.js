import { toast } from '@/utils/toast';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const id = 'devices';

export const useDevicesStore = defineStore(id, () => {
  const hrm = ref(null);
  const trainer = ref(null);

  for (const device of [hrm, trainer]) {
    watch(device, (value) => {
      value?.on('disconnected', () => {
        toast(`${value.name} disconnected`);
        device.value = null;
      });
    });
  }
  return { hrm, trainer };
});
