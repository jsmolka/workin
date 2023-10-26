import { Device } from './device';

export class HeartRateMonitor extends Device {
  constructor() {
    super();

    this.heartRate = null;
  }

  async connected(server) {
    await super.connected();

    const service = await this.server.getPrimaryService('heart_rate');
    const characteristic = await service.getCharacteristic('heart_rate_measurement');

    await characteristic.startNotifications();
    await characteristic.addEventListener('characteristicvaluechanged', (event) =>
      this.heartRateChanged(event),
    );
  }

  async disconnected() {
    this.heartRate = null;
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
