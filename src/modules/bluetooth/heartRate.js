import { DataStream } from './dataStream';
import { Device } from './device';

export class HeartRate extends Device {
  constructor() {
    super();

    this.heartRate = null;
    this.heartRateMeasurementChar = null;
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
    this.heartRateMeasurementChar = await service.getCharacteristic('heart_rate_measurement');
    this.heartRateMeasurementChanged = this.heartRateMeasurementChanged.bind(this);
    this.heartRateMeasurementChar.addEventListener(
      'characteristicvaluechanged',
      this.heartRateMeasurementChanged,
    );
    await this.heartRateMeasurementChar.startNotifications();
  }

  async disconnected() {
    await this.deinitHeartRateMeasurement();

    this.heartRate = null;
  }

  async deinitHeartRateMeasurement() {
    if (this.heartRateMeasurementChar == null) {
      return;
    }

    try {
      this.heartRateMeasurementChar.removeEventListener(
        'characteristicvaluechanged',
        this.heartRateMeasurementChanged,
      );
      await this.heartRateMeasurementChar.stopNotifications();
    } catch (error) {
      console.error(error);
    }
    this.heartRateMeasurementChar = null;
  }

  heartRateMeasurementChanged(event) {
    const data = new HeartRateMeasurement(event.target.value);
    this.heartRate = data.heartRate;
  }

  get service() {
    return 'heart_rate';
  }
}

class HeartRateMeasurement {
  static Flag = {
    heartRateFormat: 1 << 0,
    contactSensorStatus: 1 << 1,
    contactSensorSupported: 1 << 2,
    energyExpended: 1 << 3,
    rrInterval: 1 << 4,
  };

  constructor(dataView) {
    this.heartRate = null;
    this.contact = null;
    this.energyExpended = null;
    this.rrIntervals = null;

    const stream = new DataStream(dataView);
    const flags = stream.u8();

    if ((flags & HeartRateMeasurement.Flag.heartRateFormat) !== 0) {
      this.heartRate = stream.u16();
    } else {
      this.heartRate = stream.u8();
    }
    if ((flags & HeartRateMeasurement.Flag.contactSensorSupported) !== 0) {
      this.contact = (flags & HeartRateMeasurement.Flag.contactSensorStatus) !== 0;
    }
    if ((flags & HeartRateMeasurement.Flag.energyExpended) !== 0) {
      this.energyExpended = stream.u16();
    }
    if ((flags & HeartRateMeasurement.Flag.rrInterval) !== 0) {
      this.rrIntervals = [];
      while (stream.index + 1 < stream.dataView.byteLength) {
        this.rrIntervals.push(stream.u16());
      }
    }
  }
}
