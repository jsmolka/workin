import { log } from '../../utils/log';
import { clamp } from '../../utils/math';
import { notify } from '../../utils/notify';
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
    await characteristic.requestControl();
    await characteristic.reset();
    this.control = characteristic;
  }

  async initFitnessMachineStatus(service) {
    const characteristic = new Characteristic();
    await characteristic.init(service, 'fitness_machine_status');
    await characteristic.listen(async (dataView) => {
      const status = new FitnessMachineStatus(dataView);
      log.info(status);
      // if (status.controlPermissionLost) {
      //   notify.info(`${this.name} control permission lost`);
      //   await this.disconnect();
      // }
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
    await this.control.setPower(value);
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
      { name: 'totalDistance', mask: 1 << 2 },
      { name: 'inclination', mask: 1 << 3 },
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
      { name: 'inclination', mask: 1 << 1 },
      { name: 'resistance', mask: 1 << 2 },
      { name: 'power', mask: 1 << 3 },
      { name: 'heartRate', mask: 1 << 4 },
      { name: 'expendedEnergy', mask: 1 << 5 },
      { name: 'stepCount', mask: 1 << 6 },
      { name: 'strideCount', mask: 1 << 7 },
      { name: 'totalDistance', mask: 1 << 8 },
      { name: 'trainingTime', mask: 1 << 9 },
      { name: 'timeIn2HrZones', mask: 1 << 10 },
      { name: 'timeIn3HrZones', mask: 1 << 11 },
      { name: 'timeIn5HrZones', mask: 1 << 12 },
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
      { name: 'averageSpeed', mask: 1 << 1, size: 2 },
      { name: 'cadence', mask: 1 << 2, size: 2 },
      { name: 'averageCadence', mask: 1 << 3, size: 2 },
      { name: 'totalDistance', mask: 1 << 4, size: 3 },
      { name: 'resistance', mask: 1 << 5, size: 2 },
      { name: 'power', mask: 1 << 6, size: 2 },
      { name: 'averagePower', mask: 1 << 7, size: 2 },
      { name: 'expendedEnergy', mask: 1 << 8, size: 2 },
      { name: 'heartRate', mask: 1 << 9, size: 1 },
      { name: 'metabolicEquivalent', mask: 1 << 10, size: 1 },
      { name: 'elapsedTime', mask: 1 << 11, size: 2 },
      { name: 'remainingTime', mask: 1 << 12, size: 2 },
    ];

    const stream = new DataStream(dataView);
    const flags = stream.u16();

    if ((flags & 0x1) === 0) {
      this.speed = stream.u16();
    } else {
      this.speed = null;
    }

    for (const { name, mask, size } of fields) {
      if ((flags & mask) !== 0) {
        this[name] = stream.uint(size);
      } else {
        this[name] = null;
      }
    }
  }
}

class SupportedPowerRange {
  constructor(dataView) {
    const stream = new DataStream(dataView);

    this.min = stream.u16();
    this.max = stream.u16();
    this.inc = stream.u16();
  }
}

class FitnessMachineControlPoint extends Characteristic {
  async requestControl() {
    await this.write(Uint8Array.of(this.opcode.requestControl));
  }

  async reset() {
    await this.write(Uint8Array.of(this.opcode.reset));
  }

  async setPower(value) {
    await this.write(Uint8Array.of(this.opcode.setPower, value & 0xff, (value >> 8) & 0xff));
  }

  get opcode() {
    return {
      requestControl: 0x00,
      reset: 0x01,
      setSpeed: 0x02,
      setInclination: 0x03,
      setResistance: 0x04,
      setPower: 0x05,
      setHeartRate: 0x06,
      start: 0x07,
      stop: 0x08,
      setExpendedEnergy: 0x09,
      setStepCount: 0x0a,
      setStrideCount: 0x0b,
      setTotalDistance: 0x0c,
      setTrainingTime: 0x0d,
      setTimeIn2HrZones: 0x0e,
      setTimeIn3HrZones: 0x0f,
      setTimeIn5HrZones: 0x10,
      setIndoorBikeSimulation: 0x11,
      setWheelCircumference: 0x12,
      setSpinDown: 0x13,
      setCadence: 0x14,
      response: 0x80,
    };
  }
}

class FitnessMachineStatus {
  constructor(dataView) {
    const opcodes = [
      { code: 0x01, name: 'reset', data: [] },
      { code: 0x02, name: 'stoppedByUser', data: ['u8'] },
      { code: 0x03, name: 'stoppedByKey', data: [] },
      { code: 0x04, name: 'startedByUser', data: [] },
      { code: 0x05, name: 'targetSpeed', data: ['u16'] },
      { code: 0x06, name: 'targetInclination', data: ['s16'] },
      { code: 0x07, name: 'targetResistance', data: ['u8'] },
      { code: 0x08, name: 'targetPower', data: ['s16'] },
      { code: 0x09, name: 'targetHeartRate', data: ['u8'] },
      { code: 0x0a, name: 'targetExpectedEnergy', data: ['u16'] },
      { code: 0x0b, name: 'targetStepCount', data: ['u16'] },
      { code: 0x0c, name: 'targetStrideCount', data: ['u16'] },
      { code: 0x0d, name: 'targetDistance', data: ['u24'] },
      { code: 0x0e, name: 'targetTrainingTime', data: ['u16'] },
      { code: 0x0f, name: 'targetTimeIn2HrZones', data: ['u16', 'u16'] },
      { code: 0x10, name: 'targetTimeIn3HrZones', data: ['u16', 'u16', 'u16'] },
      { code: 0x11, name: 'targetTimeIn5HrZones', data: ['u16', 'u16', 'u16', 'u16', 'u16'] },
      { code: 0x12, name: 'targetIndoorBikeSimulation', data: ['s16', 's16', 'u8', 'u8'] },
      { code: 0x13, name: 'targetWheelCircumference', data: ['u16'] },
      { code: 0x14, name: 'targetSpinDown', data: ['u8'] },
      { code: 0x15, name: 'targetCadence', data: ['u16'] },
      { code: 0xff, name: 'controlPermissionLost', data: [] },
    ];

    const stream = new DataStream(dataView);

    this.opcode = {
      code: stream.u8(),
      name: 'reserved',
    };

    this.values = [];
    for (const { code, name, data } of opcodes) {
      if (this.opcode.code === code) {
        this.opcode.name = name;
        this.values = data.map((type) => stream[type]());
        break;
      }
    }
  }
}
