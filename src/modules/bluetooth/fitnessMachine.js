import { clamp } from '../../utils/math';
import { notify } from '../../utils/notify';
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
        notify(`${this.name} does not support power`);
        return await this.disconnect();
      }
      if (!feature.cadence) {
        notify(`${this.name} does not support cadence`);
        return await this.disconnect();
      }
      if (!feature.target.power) {
        notify(`${this.name} does not support target power`);
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
    const characteristic = await service.getCharacteristic('fitness_machine_feature');
    return new FitnessMachineFeature(await characteristic.readValue());
  }

  async initFitnessMachineControlPoint(service) {
    const characteristic = await service.getCharacteristic('fitness_machine_control_point');
    this.control = new FitnessMachineControlPoint(characteristic);
    await this.control.requestControl();
    await this.control.reset();
  }

  async initFitnessMachineStatus(service) {
    const characteristic = await service.getCharacteristic('fitness_machine_status');
    characteristic.addEventListener('characteristicvaluechanged', async (event) => {
      const status = new FitnessMachineStatus(event.target.value);
      if (status.controlPermissionLost) {
        notify(`${this.name} control permission lost`);
        await this.disconnect();
      }
    });
    await characteristic.startNotifications();
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
      { name: 'timeInHeartRateZone2', mask: 1 << 10 },
      { name: 'timeInHeartRateZone3', mask: 1 << 11 },
      { name: 'timeInHeartRateZone5', mask: 1 << 12 },
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

class FitnessMachineControlPoint {
  constructor(characteristic) {
    this.characteristic = characteristic;
  }

  async write(opcode, ...bytes) {
    await this.characteristic.writeValueWithoutResponse(new Uint8Array([opcode, ...bytes]));
  }

  async requestControl() {
    await this.write(this.opcode.requestControl);
  }

  async reset() {
    await this.write(this.opcode.reset);
  }

  async setPower(value) {
    await this.write(this.opcode.setPower, value & 0xff, (value >> 8) & 0xff);
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
      setTimeInHeartRateZone2: 0x0e,
      setTimeInHeartRateZone4: 0x0f,
      setTimeInHeartRateZone5: 0x10,
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
    const stream = new DataStream(dataView);
    const opcode = stream.u8();

    console.log('status', dataView);
    this.controlPermissionLost = opcode === this.opcode.controlPermissionLost;
  }

  get opcode() {
    return {
      reset: 0x01,
      stoppedByUser: 0x02,
      stoppedByKey: 0x03,
      startedByUser: 0x04,
      targetSpeed: 0x05,
      targetInclination: 0x06,
      targetResistance: 0x07,
      targetPower: 0x08,
      targetHeartRate: 0x09,
      targetExpectedEnergy: 0x0a,
      targetStepCount: 0x0b,
      targetStrideCount: 0x0c,
      targetDistance: 0x0d,
      targetTrainingTime: 0x0e,
      targetTimeInHeartRateZone2: 0x0f,
      targetTimeInHeartRateZone3: 0x10,
      targetTimeInHeartRateZone5: 0x11,
      targetIndoorBikeSimulation: 0x12,
      targetWheelCircumference: 0x13,
      targetSpinDown: 0x14,
      targetCadence: 0x15,
      controlPermissionLost: 0xff,
    };
  }
}
