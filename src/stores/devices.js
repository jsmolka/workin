import { defineStore } from 'pinia';
import { HeartRateMonitor } from '../modules/bluetooth/heartRateMonitor';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    hrm: new HeartRateMonitor(),
  }),
});
