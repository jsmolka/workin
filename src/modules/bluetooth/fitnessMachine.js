import { notify } from '../../utils/notify';
import { DataStream } from './dataStream';
import { Device } from './device';

export class FitnessMachine extends Device {
  constructor() {
    super();

    this.power = 0;
    this.cadence = 0;
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
    this.cadence = 0;
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
      { name: 'resistanceLevel', mask: 1 << 5, size: 2 },
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
