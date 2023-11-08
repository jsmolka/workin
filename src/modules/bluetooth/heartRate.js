import { log } from '../../utils/log';
import { Characteristic } from './characteristic';
import { Device } from './device';
import { Notification } from './notification';

export class HeartRate extends Device {
  constructor() {
    super('heart_rate');

    this.measurement = new Measurement();
  }

  async connect() {
    await super.connect();
    await this.measurement.init(await this.service());
  }

  get heartRate() {
    return this.measurement.heartRate ?? 0;
  }
}

class Measurement extends Characteristic {
  constructor() {
    super('heart_rate_measurement');
  }

  async init(service) {
    await super.init(service);

    await this.notified((dataView) => {
      this.notification = new MeasurementNotification(dataView);
      log.debug('HR measurement', this.notification);
    });
  }

  get heartRate() {
    return this.notification?.heartRate;
  }
}

class MeasurementNotification extends Notification {
  static Flag = Object.freeze({
    format: 1 << 0,
    contactSensorStatus: 1 << 1,
    contactSensorSupported: 1 << 2,
    expendedEnergy: 1 << 3,
    rrInterval: 1 << 4,
  });

  parse(stream) {
    const flags = stream.u8();
    if ((flags & MeasurementNotification.Flag.format) !== 0) {
      this.heartRate = stream.u16();
    } else {
      this.heartRate = stream.u8();
    }

    if ((flags & MeasurementNotification.Flag.contactSensorSupported) !== 0) {
      this.contact = (flags & MeasurementNotification.Flag.contactSensorStatus) !== 0;
    }

    if ((flags & MeasurementNotification.Flag.expendedEnergy) !== 0) {
      this.expendedEnergy = stream.u16();
    }

    if ((flags & MeasurementNotification.Flag.rrInterval) !== 0) {
      this.rrIntervals = [];
      while (stream.length - stream.index >= 2) {
        this.rrIntervals.push(stream.u16());
      }
    }
  }
}
