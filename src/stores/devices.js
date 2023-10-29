import { defineStore } from 'pinia';
import { ref } from 'vue';
import { FitnessMachine } from '../modules/bluetooth/fitnessMachine';
import { HeartRate } from '../modules/bluetooth/heartRate';

const id = 'devices';

export const useDevicesStore = defineStore(id, () => {
  const hrm = ref(new HeartRate());
  const trainer = ref(new FitnessMachine());

  return { hrm, trainer };
});
