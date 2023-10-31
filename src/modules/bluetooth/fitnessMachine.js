import { bit } from '../../utils/bit';
import { log } from '../../utils/log';
import { clamp } from '../../utils/math';
import { notify } from '../../utils/notify';
import { deleteNullValues } from '../../utils/objects';
import { Characteristic } from './characteristic';
import { DataStream } from './dataStream';
import { Device } from './device';

export class FitnessMachine extends Device {
  constructor() {
    super();

    this.power = 0;
    this.powerMin = 0;
    this.powerMax = 0;
    this.powerInc = 0;
    this.cadence = 0;
    this.control = null;
  }

  async connected() {
    try {
      const service = await this.server.getPrimaryService('fitness_machine');

      const feature = await this.initFitnessMachineFeature(service);
      if (!feature.power) {
        notify.info(`${this.name} does not support power`);
        return await this.disconnect();
      }
      if (!feature.cadence) {
        notify.info(`${this.name} does not support cadence`);
        return await this.disconnect();
      }
      if (!feature.target.power) {
        notify.info(`${this.name} does not support target power`);
        return await this.disconnect();
      }

      await this.initFitnessMachineControlPoint(service);
      await this.initFitnessMachineStatus(service);
      await this.initSupportedPowerRange(service);
      await this.initIndoorBikeData(service);
    } catch (error) {
      console.error(error);
      await this.disconnect();
    }
  }

  async initFitnessMachineFeature(service) {
    const characteristic = new Characteristic();
    await characteristic.init(service, 'fitness_machine_feature');
    return new FitnessMachineFeature(await characteristic.read());
  }

  async initFitnessMachineControlPoint(service) {
    const characteristic = new FitnessMachineControlPoint();
    await characteristic.init(service, 'fitness_machine_control_point');
    await characteristic.listen((dataView) => {
      const response = new FitnessMachineControlPointResponse(dataView);
      if (!response.isOk) {
        log.error('FTMS control response malformed', response);
      } else if (!response.isSuccess) {
        log.error('FTMS control response unsuccessful', response);
      } else {
        log.info('FTMS control response', response);
      }
    });
    await characteristic.requestControl();
    await characteristic.reset();
    this.control = characteristic;
  }

  async initFitnessMachineStatus(service) {
    const characteristic = new Characteristic();
    await characteristic.init(service, 'fitness_machine_status');
    await characteristic.listen(async (dataView) => {
      const status = new FitnessMachineStatus(dataView);
      log.info('FTMS status', status);
      if (status.hasLostControlPermission) {
        notify.info(`${this.name} control permission lost`);
        console.log(status);
        // await this.disconnect();
      }
    });
  }

  async initSupportedPowerRange(service) {
    const characteristic = await service.getCharacteristic('supported_power_range');
    const range = new SupportedPowerRange(await characteristic.readValue());
    this.powerMin = range.min;
    this.powerMax = range.max;
    this.powerInc = range.inc;
  }

  async initIndoorBikeData(service) {
    const characteristic = await service.getCharacteristic('indoor_bike_data');
    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      const data = new IndoorBikeData(event.target.value);
      this.power = data.power;
      this.cadence = data.cadence;
      log.debug(deleteNullValues(data));
    });
    await characteristic.startNotifications();
  }

  async disconnected() {
    this.power = 0;
    this.powerMin = 0;
    this.powerMax = 0;
    this.powerInc = 0;
    this.cadence = 0;
    this.control = null;
  }

  async setPower(value) {
    value = Math.floor(value / this.powerInc) * this.powerInc;
    value = clamp(value, this.powerMin, this.powerMax);
    await this.control.power(value);
    return value;
  }

  get service() {
    return 'fitness_machine';
  }
}

class FitnessMachineFeature {
  constructor(dataView) {
    const stream = new DataStream(dataView);
    this.readFeatures(stream.u32());
    this.readTargetFeatures(stream.u32());
  }

  readFeatures(flags) {
    const features = [
      { name: 'averageSpeed', mask: 1 << 0 },
      { name: 'cadence', mask: 1 << 1 },
      { name: 'distance', mask: 1 << 2 },
      { name: 'incline', mask: 1 << 3 },
      { name: 'elevationGain', mask: 1 << 4 },
      { name: 'pace', mask: 1 << 5 },
      { name: 'stepCount', mask: 1 << 6 },
      { name: 'resistance', mask: 1 << 7 },
      { name: 'strideCount', mask: 1 << 8 },
      { name: 'expendedEnergy', mask: 1 << 9 },
      { name: 'heartRate', mask: 1 << 10 },
      { name: 'metabolicEquivalent', mask: 1 << 11 },
      { name: 'elapsedTime', mask: 1 << 12 },
      { name: 'remainingTime', mask: 1 << 13 },
      { name: 'power', mask: 1 << 14 },
      { name: 'powerOutput', mask: 1 << 15 },
      { name: 'userDataRetention', mask: 1 << 16 },
    ];

    for (const { name, mask } of features) {
      this[name] = (flags & mask) !== 0;
    }
  }

  readTargetFeatures(flags) {
    const features = [
      { name: 'speed', mask: 1 << 0 },
      { name: 'incline', mask: 1 << 1 },
      { name: 'resistance', mask: 1 << 2 },
      { name: 'power', mask: 1 << 3 },
      { name: 'heartRate', mask: 1 << 4 },
      { name: 'expendedEnergy', mask: 1 << 5 },
      { name: 'stepCount', mask: 1 << 6 },
      { name: 'strideCount', mask: 1 << 7 },
      { name: 'distance', mask: 1 << 8 },
      { name: 'trainingTime', mask: 1 << 9 },
      { name: 'timeIn2HeartRateZones', mask: 1 << 10 },
      { name: 'timeIn3HeartRateZones', mask: 1 << 11 },
      { name: 'timeIn5HeartRateZones', mask: 1 << 12 },
      { name: 'indoorBikeSimulation', mask: 1 << 13 },
      { name: 'wheelCircumference', mask: 1 << 14 },
      { name: 'spinDown', mask: 1 << 15 },
      { name: 'cadence', mask: 1 << 16 },
    ];

    this.target = {};
    for (const { name, mask } of features) {
      this.target[name] = (flags & mask) !== 0;
    }
  }
}

class IndoorBikeData {
  constructor(dataView) {
    const fields = [
      { name: 'averageSpeed', mask: 1 << 1, type: 'u16' },
      { name: 'cadence', mask: 1 << 2, type: 'u16' },
      { name: 'averageCadence', mask: 1 << 3, type: 'u16' },
      { name: 'distance', mask: 1 << 4, type: 'u24' },
      { name: 'resistance', mask: 1 << 5, type: 's16' },
      { name: 'power', mask: 1 << 6, type: 's16' },
      { name: 'averagePower', mask: 1 << 7, type: 's16' },
      { name: 'expendedEnergy', mask: 1 << 8, type: ['u16', 'u16', 'u8'] },
      { name: 'heartRate', mask: 1 << 9, type: 'u8' },
      { name: 'metabolicEquivalent', mask: 1 << 10, type: 'u8' },
      { name: 'elapsedTime', mask: 1 << 11, type: 'u16' },
      { name: 'remainingTime', mask: 1 << 12, type: 'u16' },
    ];

    const stream = new DataStream(dataView);

    const flags = stream.u16();
    if ((flags & 0x1) === 0) {
      this.speed = stream.u16();
    } else {
      this.speed = null;
    }

    for (const { name, mask, type } of fields) {
      if ((flags & mask) !== 0) {
        if (type instanceof Array) {
          this[name] = type.map((type) => stream[type]());
        } else {
          this[name] = stream[type]();
        }
      } else {
        this[name] = null;
      }
    }
  }
}

class SupportedPowerRange {
  constructor(dataView) {
    const stream = new DataStream(dataView);

    this.min = stream.s16();
    this.max = stream.s16();
    this.inc = stream.u16();
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

function getOpcode(opcodes, opcode) {
  for (const [name, code] of Object.entries(opcodes)) {
    if (code === opcode) {
      return { code, name };
    }
  }
  return { code: opcode, name: 'reserved' };
}

class FitnessMachineControlPoint extends Characteristic {
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
}

for (const [name, code] of Object.entries(FitnessMachineControlPoint.Opcode)) {
  FitnessMachineControlPoint.prototype[name] = async function (...parameters) {
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

class FitnessMachineControlPointResponse {
  static Result = Object.freeze({
    success: 0x01,
    unsupported: 0x02,
    parameter: 0x03,
    error: 0x04,
    permission: 0x05,
  });

  constructor(dataView) {
    const stream = new DataStream(dataView);

    this.response = stream.u8();
    if (this.isOk) {
      this.opcode = getOpcode(FitnessMachineControlPoint.Opcode, stream.u8());
      this.result = getOpcode(FitnessMachineControlPointResponse.Result, stream.u8());
    } else {
      this.opcode = getOpcode(FitnessMachineControlPoint.Opcode, -1);
      this.result = getOpcode(FitnessMachineControlPointResponse.Result, -1);
    }
  }

  get isOk() {
    return this.response === 0x80;
  }

  get isSuccess() {
    return this.result.code === FitnessMachineControlPointResponse.Result.success;
  }
}

class FitnessMachineStatus {
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

  constructor(dataView) {
    const stream = new DataStream(dataView);

    this.opcode = getOpcode(FitnessMachineStatus.Opcode, stream.u8());
    this.parameters = getParameters(this.opcode.name).map((type) => stream[type]());
  }
}
