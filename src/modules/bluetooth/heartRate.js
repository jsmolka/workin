import { DataStream } from './dataStream';
import { Device } from './device';

export class HeartRate extends Device {
  constructor() {
    super();

    this.heartRate = 0;
  }

  async connected() {
    try {
      const service = await this.server.getPrimaryService('heart_rate');
      await this.initHeartRateMeasurement(service);
    } catch (error) {
      console.error(error);
      await this.disconnect();
    }
  }

  async initHeartRateMeasurement(service) {
    const characteristic = await service.getCharacteristic('heart_rate_measurement');
    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      const measurement = new HeartRateMeasurement(event.target.value);
      this.heartRate = measurement.heartRate;
    });
    await characteristic.startNotifications();
  }

  async disconnected() {
    this.heartRate = 0;
  }

  get service() {
    return 'heart_rate';
  }
}

class HeartRateMeasurement {
  constructor(dataView) {
    const mask = {
      heartRateFormat: 1 << 0,
      contactSensorStatus: 1 << 1,
      contactSensorSupported: 1 << 2,
      expendedEnergy: 1 << 3,
      rrInterval: 1 << 4,
    };

    const stream = new DataStream(dataView);
    const flags = stream.u8();

    if ((flags & mask.heartRateFormat) !== 0) {
      this.heartRate = stream.u16();
    } else {
      this.heartRate = stream.u8();
    }

    if ((flags & mask.contactSensorSupported) !== 0) {
      this.contact = (flags & mask.contactSensorStatus) !== 0;
    } else {
      this.contact = null;
    }

    if ((flags & mask.expendedEnergy) !== 0) {
      this.expendedEnergy = stream.u16();
    } else {
      this.expendedEnergy = null;
    }

    if ((flags & mask.rrInterval) !== 0) {
      this.rrIntervals = [];
      while (stream.length - stream.index >= 2) {
        this.rrIntervals.push(stream.u16());
      }
    } else {
      this.rrIntervals = null;
    }
  }
}
