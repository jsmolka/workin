import { defineStore } from 'pinia';
import { FitnessMachine } from '../modules/bluetooth/fitnessMachine';
import { HeartRateMonitor } from '../modules/bluetooth/heartRateMonitor';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    hrm: new HeartRateMonitor(),
    trainer: new FitnessMachine(),
  }),
});
