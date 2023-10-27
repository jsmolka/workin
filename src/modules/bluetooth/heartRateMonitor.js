import { DataStream } from './dataStream';
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
    const stream = new DataStream(event.target.value);
    if (stream.u8() & 0x1) {
      this.heartRate = stream.u16();
    } else {
      this.heartRate = stream.u8();
    }
  }

  get service() {
    return 'heart_rate';
  }
}
