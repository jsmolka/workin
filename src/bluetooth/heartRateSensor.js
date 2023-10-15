export default class HeartRateSensor {
  constructor() {
    this.heartRate = null;
  }

  async connect() {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }],
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('heart_rate');
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
}
