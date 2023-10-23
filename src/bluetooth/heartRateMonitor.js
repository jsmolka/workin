import Device from './device';

export default class HeartRateMonitor extends Device {
  constructor() {
    super();

    this.heartRate = null;
  }

  async connect() {
    await super.connect({
      filters: [{ services: ['heart_rate'] }],
    });

    const service = await this.server.getPrimaryService('heart_rate');
    const characteristic = await service.getCharacteristic('heart_rate_measurement');

    await characteristic.startNotifications();
    await characteristic.addEventListener('characteristicvaluechanged', (event) => {
      const value = event.target.value;
      const flags = value.getUint8(0);
      if (flags & 0x1) {
        this.heartRate = value.getUint16(1, true);
      } else {
        this.heartRate = value.getUint8(1);
      }
    });
  }

  disconnected() {
    this.heartRate = null;
  }
}
