import { defineStore } from 'pinia';
import { HeartRateMonitor } from '../modules/bluetooth/heartRateMonitor';
import { SmartTrainer } from '../modules/bluetooth/smartTrainer';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    hrm: new HeartRateMonitor(),
    trainer: new SmartTrainer(),
  }),
});
