import { Device } from './device';

export class HeartRateMonitor extends Device {
  constructor() {
    super();

    this.heartRate = null;
    this.heartRateCharacteristic = null;
  }

  async connected() {
    try {
      const service = await this.server.getPrimaryService('heart_rate');

      await this.initHeartRate(service);
    } catch (error) {
      console.error(error);

      await this.disconnect();
    }
  }

  async initHeartRate(service) {
    this.heartRateChanged = this.heartRateChanged.bind(this);
    this.heartRateCharacteristic = await service.getCharacteristic('heart_rate_measurement');
    this.heartRateCharacteristic.addEventListener(
      'characteristicvaluechanged',
      this.heartRateChanged,
    );
    await this.heartRateCharacteristic.startNotifications();
  }

  async disconnected() {
    await this.deinitHeartRate();

    this.heartRate = null;
  }

  async deinitHeartRate() {
    if (this.heartRateCharacteristic == null) {
      return;
    }

    try {
      this.heartRateCharacteristic.removeEventListener(
        'characteristicvaluechanged',
        this.heartRateChanged,
      );
      await this.heartRateCharacteristic.stopNotifications();
    } catch (error) {
      console.error(error);
    }

    this.heartRateCharacteristic = null;
  }

  heartRateChanged(event) {
    const value = event.target.value;
    const flags = value.getUint8(0);
    if (flags & 0x1) {
      this.heartRate = value.getUint16(1, true);
    } else {
      this.heartRate = value.getUint8(1);
    }
  }

  get service() {
    return 'heart_rate';
  }
}
