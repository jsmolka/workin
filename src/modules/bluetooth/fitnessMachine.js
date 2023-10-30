import { bit } from '../../utils/bit';
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
      { name: 'heartRateZoneTime2', mask: 1 << 10 },
      { name: 'heartRateZoneTime3', mask: 1 << 11 },
      { name: 'heartRateZoneTime5', mask: 1 << 12 },
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
      { name: 'distance', mask: 1 << 4, size: 3 },
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
        this[name] = stream.unsigned(size);
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
  constructor() {
    super();

    const opcodes = [
      { code: 0x00, name: 'requestControl', data: [] },
      { code: 0x01, name: 'reset', data: [] },
      { code: 0x02, name: 'setSpeed', data: [2] }, // 0.01 km/h
      { code: 0x03, name: 'setIncline', data: [2] }, // 0.1 %
      { code: 0x04, name: 'setResistance', data: [1] }, // 0.1
      { code: 0x05, name: 'setPower', data: [2] }, // 1 W
      { code: 0x06, name: 'setHeartRate', data: [1] }, // 1 bpm
      { code: 0x07, name: 'start', data: [] },
      { code: 0x08, name: 'stop', data: [1] },
      { code: 0x09, name: 'setExpendedEnergy', data: [2] }, // 1 calorie
      { code: 0x0a, name: 'setStepCount', data: [2] }, // 1 step
      { code: 0x0b, name: 'setStrideCount', data: [2] }, // 1 stride
      { code: 0x0c, name: 'setDistance', data: [3] }, // 1 m
      { code: 0x0d, name: 'setTrainingTime', data: [2] }, // 1 s
      { code: 0x0e, name: 'setHeartRateZoneTime2', data: [2, 2] }, // 1 s
      { code: 0x0f, name: 'setHeartRateZoneTime3', data: [2, 2, 2] }, // 1 s
      { code: 0x10, name: 'setHeartRateZoneTime5', data: [2, 2, 2, 2, 2] }, // 1 s
      { code: 0x11, name: 'setIndoorBikeSimulation', data: [2, 2, 1, 1] }, // wind speed 0.001 m/s, grade 0.01 %, rolling resistance 0.0001, wind resistance 0.01 kg/m
      { code: 0x12, name: 'setWheelCircumference', data: [2] }, // 0.1 mm
      { code: 0x13, name: 'setSpinDown', data: [1] },
      { code: 0x14, name: 'setCadence', data: [2] }, // 0.5 rpm
    ];

    for (const { code, name, data } of opcodes) {
      this[name] = async (...values) => {
        const bytes = [];
        for (const [i, size] of data.entries()) {
          bytes.push(...bit.bytes(values[i], size));
        }
        await this.write(code, ...bytes);
      };
    }
  }
}

class FitnessMachineStatus {
  constructor(dataView) {
    const opcodes = [
      { code: 0x01, name: 'reset', data: [] },
      { code: 0x02, name: 'stoppedByUser', data: ['u8'] },
      { code: 0x03, name: 'stoppedByKey', data: [] },
      { code: 0x04, name: 'startedByUser', data: [] },
      { code: 0x05, name: 'targetSpeed', data: ['u16'] }, // 0.01 km/h
      { code: 0x06, name: 'targetIncline', data: ['s16'] }, // 0.1 %
      { code: 0x07, name: 'targetResistance', data: ['u8'] }, // 0.1
      { code: 0x08, name: 'targetPower', data: ['s16'] }, // 1 W
      { code: 0x09, name: 'targetHeartRate', data: ['u8'] }, // 1 bpm
      { code: 0x0a, name: 'targetExpendedEnergy', data: ['u16'] }, // 1 calorie
      { code: 0x0b, name: 'targetStepCount', data: ['u16'] }, // 1 step
      { code: 0x0c, name: 'targetStrideCount', data: ['u16'] }, // 1 stride
      { code: 0x0d, name: 'targetDistance', data: ['u24'] }, // 1 m
      { code: 0x0e, name: 'targetTrainingTime', data: ['u16'] }, // 1 s
      { code: 0x0f, name: 'targetHeartRateZoneTime2', data: ['u16', 'u16'] }, // 1 s
      { code: 0x10, name: 'targetHeartRateZoneTime3', data: ['u16', 'u16', 'u16'] }, // 1 s
      { code: 0x11, name: 'targetHeartRateZoneTime5', data: ['u16', 'u16', 'u16', 'u16', 'u16'] }, // 1 s
      { code: 0x12, name: 'targetIndoorBikeSimulation', data: ['s16', 's16', 'u8', 'u8'] }, // wind speed 0.001 m/s, grade 0.01 %, rolling resistance 0.0001, wind resistance 0.01 kg/m
      { code: 0x13, name: 'targetWheelCircumference', data: ['u16'] }, // 0.1 mm
      { code: 0x14, name: 'targetSpinDown', data: ['u8'] },
      { code: 0x15, name: 'targetCadence', data: ['u16'] }, // 0.5 rpm
      { code: 0xff, name: 'controlPermissionLost', data: [] },
    ];

    const stream = new DataStream(dataView);

    const code = stream.u8();
    const opcode = opcodes.find((opcode) => opcode.code === code);
    if (opcode != null) {
      this.opcode = opcode.name;
      this.values = opcode.data.map((type) => stream[type]());
    } else {
      this.opcode = 'reserved';
      this.values = [];
    }
  }
}
