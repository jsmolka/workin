import { bit } from '../../utils/bit';
import { log } from '../../utils/log';
import { Characteristic } from './characteristic';
import { DataStream } from './dataStream';
import { Device } from './device';
import { Notification } from './notification';

export class FitnessMachine extends Device {
  constructor() {
    super('fitness_machine');

    this.feature = new Feature();
    this.bikeData = new BikeData();
    this.powerRange = new PowerRange();
    this.control = new Control();
    this.status = new Status();
  }

  async connect() {
    await super.connect();

    const service = await this.service();
    await Promise.all(
      [this.feature, this.bikeData, this.powerRange, this.control, this.status].map(
        (characteristic) => characteristic.init(service),
      ),
    );
  }

  get supportsPower() {
    return this.feature.feature.power;
  }

  get supportsCadence() {
    return this.feature.feature.cadence;
  }

  get supportsTargetPower() {
    return this.feature.targetFeature.cadence;
  }

  get power() {
    return this.bikeData.power;
  }

  get cadence() {
    return this.bikeData.cadence;
  }

  async setTargetPower(value) {
    return this.control.write(this.powerRange.clamp(value));
  }
}

class Feature extends Characteristic {
  constructor() {
    super('fitness_machine_feature');
  }

  async init(service) {
    await super.init(service);

    const stream = new DataStream(await this.read());
    this.initFeature(stream.u32());
    this.initTargetFeature(stream.u32());
  }

  static FeatureFlag = Object.freeze({
    averageSpeed: 1 << 0,
    cadence: 1 << 1,
    distance: 1 << 2,
    incline: 1 << 3,
    elevationGain: 1 << 4,
    pace: 1 << 5,
    stepCount: 1 << 6,
    resistance: 1 << 7,
    strideCount: 1 << 8,
    expendedEnergy: 1 << 9,
    heartRate: 1 << 10,
    metabolicEquivalent: 1 << 11,
    elapsedTime: 1 << 12,
    remainingTime: 1 << 13,
    power: 1 << 14,
    powerOutput: 1 << 15,
    userDataRetention: 1 << 16,
  });

  initFeature(flags) {
    this.feature = {};
    for (const [name, flag] of Object.entries(Feature.FeatureFlag)) {
      this.feature[name] = (flags & flag) !== 0;
    }
    log.info('FTMS feature', this.feature);
  }

  static TargetFeatureFlag = Object.freeze({
    speed: 1 << 0,
    incline: 1 << 1,
    resistance: 1 << 2,
    power: 1 << 3,
    heartRate: 1 << 4,
    expendedEnergy: 1 << 5,
    stepCount: 1 << 6,
    strideCount: 1 << 7,
    distance: 1 << 8,
    trainingTime: 1 << 9,
    timeIn2HeartRateZones: 1 << 10,
    timeIn3HeartRateZones: 1 << 11,
    timeIn5HeartRateZones: 1 << 12,
    BikeSimulation: 1 << 13,
    wheelCircumference: 1 << 14,
    spinDown: 1 << 15,
    cadence: 1 << 16,
  });

  initTargetFeature(flags) {
    this.targetFeature = {};
    for (const [name, flag] of Object.entries(Feature.TargetFeatureFlag)) {
      this.targetFeature[name] = (flags & flag) !== 0;
    }
    log.info('FTMS target feature', this.targetFeature);
  }
}

class PowerRange extends Characteristic {
  constructor() {
    super('supported_power_range');

    this.min = null;
    this.max = null;
    this.inc = null;
  }

  async init(service) {
    await super.init(service);

    const stream = new DataStream(await this.read());
    this.min = stream.s16();
    this.max = stream.s16();
    this.inc = stream.u16();
  }

  clamp(value) {
    return clamp(Math.ceil(value / this.inc) * this.inc, this.min, this.max);
  }
}

class BikeData extends Characteristic {
  constructor() {
    super('indoor_bike_data');

    this.notification = null;
  }

  async init(service) {
    await super.init(service);

    await this.notified((dataView) => {
      this.notification = new BikeDataNotification(dataView);
      log.debug('FTMS bike data', this.notification);
    });
  }

  get power() {
    return this.notification?.power ?? 0;
  }

  get cadence() {
    return this.notification?.cadence ?? 0;
  }
}

class BikeDataNotification extends Notification {
  static Fields = Object.freeze({
    averageSpeed: { flag: 1 << 1, data: 'u16' },
    cadence: { flag: 1 << 2, data: 'u16' },
    averageCadence: { flag: 1 << 3, data: 'u16' },
    distance: { flag: 1 << 4, data: 'u24' },
    resistance: { flag: 1 << 5, data: 's16' },
    power: { flag: 1 << 6, data: 's16' },
    averagePower: { flag: 1 << 7, data: 's16' },
    expendedEnergy: { flag: 1 << 8, data: ['u16', 'u16', 'u8'] },
    heartRate: { flag: 1 << 9, data: 'u8' },
    metabolicEquivalent: { flag: 1 << 10, data: 'u8' },
    elapsedTime: { flag: 1 << 11, data: 'u16' },
    remainingTime: { flag: 1 << 12, data: 'u16' },
  });

  parse(stream) {
    const flags = stream.u16();
    if ((flags & 0x1) === 0) {
      this.speed = stream.u16();
    } else {
      this.speed = null;
    }

    for (const [name, { flag, data }] of Object.entries(BikeDataNotification.Fields)) {
      if ((flags & flag) === 0) {
        continue;
      }

      if (data instanceof Array) {
        this[name] = data.map((type) => stream[type]());
      } else {
        this[name] = stream[data]();
      }
    }
  }
}

const Parameters = Object.freeze({
  speed: ['u16'], // 0.01 km/h
  incline: ['s16'], // 0.1 %
  resistance: ['u8'], // 0.1
  power: ['s16'], // 1 W
  heartRate: ['u8'], // 1 bpm
  stop: ['u8'], // Opcode
  expendedEnergy: ['u16'], // 1 calorie
  stepCount: ['u16'], // 1 step
  strideCount: ['u16'], // 1 stride
  distance: ['s24'], // 1 m
  trainingTime: ['u16'], // 1 s
  timeIn2HeartRateZones: ['u16', 'u16'], // 1 s
  timeIn3HeartRateZones: ['u16', 'u16', 'u16'], // 1 s
  timeIn5HeartRateZones: ['u16', 'u16', 'u16', 'u16', 'u16'], // 1 s
  indoorBikeSimulation: ['s16', 's16', 'u8', 'u8'], // wind speed 0.001 m/s, grade 0.01 %, rolling resistance 0.0001, wind resistance 0.01 kg/m
  wheelCircumference: ['u16'], // 0.1 mm
  spinDown: ['u8'], // Opcode
  cadence: ['u16'], // 0.5 rpm
});

function getParameters(name) {
  return Parameters[name] ?? [];
}

function getOpcode(Opcode, opcode) {
  for (const [name, code] of Object.entries(Opcode)) {
    if (code === opcode) {
      return { code, name };
    }
  }
  return { code: opcode, name: 'reserved' };
}

class Control extends Characteristic {
  static Opcode = Object.freeze({
    requestControl: 0x00,
    reset: 0x01,
    speed: 0x02,
    incline: 0x03,
    resistance: 0x04,
    power: 0x05,
    heartRate: 0x06,
    start: 0x07,
    stop: 0x08,
    expendedEnergy: 0x09,
    stepCount: 0x0a,
    strideCount: 0x0b,
    distance: 0x0c,
    trainingTime: 0x0d,
    timeIn2HeartRateZones: 0x0e,
    timeIn3HeartRateZones: 0x0f,
    timeIn5HeartRateZones: 0x10,
    indoorBikeSimulation: 0x11,
    wheelCircumference: 0x12,
    spinDown: 0x13,
    cadence: 0x14,
  });

  constructor() {
    super('fitness_machine_control_point');
  }

  async init(service) {
    await super.init(service);

    await this.notified((dataView) => {
      const notification = new ControlNotification(dataView);
      if (!notification.isOk) {
        log.error('FTMS control notification malformed', notification);
      } else if (!notification.isSuccess) {
        log.error('FTMS control notification unsuccessful', notification);
      } else {
        log.info('FTMS control notification', notification);
      }
    });
  }
}

for (const [name, code] of Object.entries(Control.Opcode)) {
  Control.prototype[name] = async function (...parameters) {
    const bytes = [];
    for (const [i, type] of getParameters(name).entries()) {
      let size;
      switch (type) {
        case 'u8':
        case 's8':
          size = 1;
          break;
        case 'u16':
        case 's16':
          size = 2;
          break;
        case 'u24':
        case 's24':
          size = 3;
          break;
        case 'u32':
        case 's32':
          size = 4;
          break;
      }
      bytes.push(...bit.bytes(parameters[i], size));
    }
    await this.write(code, ...bytes);
  };
}

class ControlNotification extends Notification {
  static Result = Object.freeze({
    success: 0x01,
    unsupported: 0x02,
    parameter: 0x03,
    error: 0x04,
    permission: 0x05,
  });

  parse(stream) {
    this.response = stream.u8();
    if (this.isOk) {
      this.opcode = getOpcode(Control.Opcode, stream.u8());
      this.result = getOpcode(ControlNotification.Result, stream.u8());
    } else {
      this.opcode = getOpcode(Control.Opcode, -1);
      this.result = getOpcode(ControlNotification.Result, -1);
    }
  }

  get isOk() {
    return this.response === 0x80;
  }

  get isSuccess() {
    return this.result.code === ControlNotification.Result.success;
  }
}

class Status extends Characteristic {
  constructor() {
    super('fitness_machine_status');
  }

  async init(service) {
    await super.init(service);

    await this.notified((dataView) => {
      const notification = new StatusNotification(dataView);
      log.info('FTMS status', notification);
    });
  }
}

class StatusNotification extends Notification {
  static Opcode = Object.freeze({
    reset: 0x01,
    stop: 0x02,
    stopKey: 0x03,
    start: 0x04,
    speed: 0x05,
    incline: 0x06,
    resistance: 0x07,
    power: 0x08,
    heartRate: 0x09,
    expendedEnergy: 0x0a,
    stepCount: 0x0b,
    strideCount: 0x0c,
    distance: 0x0d,
    trainingTime: 0x0e,
    timeIn2HeartRateZones: 0x0f,
    timeIn3HeartRateZones: 0x10,
    timeIn5HeartRateZones: 0x11,
    indoorBikeSimulation: 0x12,
    wheelCircumference: 0x13,
    spinDown: 0x14,
    cadence: 0x15,
    controlPermissionLost: 0xff,
  });

  parse(stream) {
    this.opcode = getOpcode(StatusNotification.Opcode, stream.u8());
    this.parameters = getParameters(this.opcode.name).map((type) => stream[type]());
  }
}
