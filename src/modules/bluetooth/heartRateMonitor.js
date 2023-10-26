import { Device } from './device';

export class HeartRateMonitor extends Device {
  constructor() {
    super();

    this.heartRate = null;
    this.heartRateCharacteristic = null;
    this.heartRateChanged = this.heartRateChanged.bind(this);
  }

  async connected() {
    try {
      const service = await this.server.getPrimaryService('heart_rate');

      this.heartRateCharacteristic = await service.getCharacteristic('heart_rate_measurement');
      await this.heartRateCharacteristic.startNotifications();
      this.heartRateCharacteristic.addEventListener(
        'characteristicvaluechanged',
        this.heartRateChanged,
      );
    } catch {
      await this.disconnect();
    }
  }

  async disconnected() {
    try {
      if (this.heartRateCharacteristic != null) {
        await this.heartRateCharacteristic.stopNotifications();
        this.heartRateCharacteristic.removeEventListener(
          'characteristicvaluechanged',
          this.heartRateChanged,
        );
      }
    } catch {}

    this.heartRate = null;
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
