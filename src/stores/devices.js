import { defineStore } from 'pinia';
import { FitnessMachine } from '../modules/bluetooth/fitnessMachine';
import { HeartRate } from '../modules/bluetooth/heartRate';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    hrm: new HeartRate(),
    trainer: new FitnessMachine(),
  }),
});
