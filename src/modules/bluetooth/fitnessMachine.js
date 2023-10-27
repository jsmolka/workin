import { DataStream } from './dataStream';
import { Device } from './device';

// {"fitness_machine_feature", 0x2ACC},
// {"treadmill_data", 0x2ACD},
// {"cross_trainer_data", 0x2ACE},
// {"step_climber_data", 0x2ACF},
// {"stair_climber_data", 0x2AD0},
// {"rower_data", 0x2AD1},
// {"indoor_bike_data", 0x2AD2},
// {"training_status", 0x2AD3},
// {"supported_speed_range", 0x2AD4},
// {"supported_inclination_range", 0x2AD5},
// {"supported_resistance_level_range", 0x2AD6},
// {"supported_heart_rate_range", 0x2AD7},
// {"supported_power_range", 0x2AD8},
// {"fitness_machine_control_point", 0x2AD9},
// {"fitness_machine_status", 0x2ADA},

const fitnessMachineFeature = {
  averageSpeed: 1 << 0,
  cadence: 1 << 1,
  totalDistance: 1 << 2,
  inclination: 1 << 3,
  elevationGain: 1 << 4,
  pace: 1 << 5,
  stepCount: 1 << 6,
  resistanceLevel: 1 << 7,
  strideCount: 1 << 8,
  expendedEnergy: 1 << 9,
  heartRateMeasurement: 1 << 10,
  metabolicEquivalent: 1 << 11,
  elapsedTime: 1 << 12,
  remainingTime: 1 << 13,
  powerMeasurement: 1 << 14,
  powerOuput: 1 << 15,
  userDataRetention: 1 << 16,
};

const targetSettingFeature = {
  speed: 1 << 0,
  inclination: 1 << 1,
  resistance: 1 << 2,
  power: 1 << 3,
  heartRate: 1 << 4,
  expendedEnergy: 1 << 5,
  stepCount: 1 << 6,
  strideCount: 1 << 7,
  distance: 1 << 8,
  trainingTime: 1 << 9,
  timeInHeartRateZone2: 1 << 10,
  timeInHeartRateZone3: 1 << 11,
  timeInHeartRateZone4: 1 << 12,
  timeInHeartRateZone5: 1 << 13,
  wheelCirumference: 1 << 14,
  spinDownControl: 1 << 15,
  cadence: 1 << 16,
};

// https://github.com/GoldenCheetah/GoldenCheetah/pull/4045/files#diff-a35caa3b9206e596aa23a993a64cf6e04ccabb97aa5ed986b2f5a4c575deb121R1

export class FitnessMachine extends Device {
  constructor() {
    super();

    this.cadence = null;
    this.power = null;

    this.supportsCadence = false;
    this.supportsPower = false;
    this.supportsTargetPower = false;

    this.indoorBikeDataCharacteristic = null;
  }

  async connected() {
    // try {
    const service = await this.server.getPrimaryService('fitness_machine');

    const featureCharacteristic = await service.getCharacteristic('fitness_machine_feature');
    const featureCharacteristicData = await featureCharacteristic.readValue();

    const fitnessMachineFeatures = featureCharacteristicData.getUint32(0, true);
    this.supportsCadence = (fitnessMachineFeatures & fitnessMachineFeature.cadence) !== 0;
    this.supportsPower = (fitnessMachineFeatures & fitnessMachineFeature.powerMeasurement) !== 0;

    const targetSettingFeatures = featureCharacteristicData.getUint32(4, true);
    this.supportsTargetPower = (targetSettingFeatures & targetSettingFeature.power) !== 0;

    await this.initIndoorBikeData(service);
    // } catch {
    //   await this.disconnect();
    // }
  }

  async initIndoorBikeData(service) {
    this.indoorBikeDataChanged = this.indoorBikeDataChanged.bind(this);
    this.indoorBikeDataCharacteristic = await service.getCharacteristic('indoor_bike_data');
    this.indoorBikeDataCharacteristic.addEventListener(
      'characteristicvaluechanged',
      this.indoorBikeDataChanged,
    );
    await this.indoorBikeDataCharacteristic.startNotifications();
  }

  async disconnected() {
    await this.deinitIndoorBikeData();

    this.supportsCadence = false;
    this.supportsPower = false;
    this.supportsTargetPower = false;
  }

  async deinitIndoorBikeData() {
    if (this.indoorBikeDataCharacteristic == null) {
      return;
    }

    try {
      this.indoorBikeDataCharacteristic.removeEventListener(
        'characteristicvaluechanged',
        this.indoorBikeDataChanged,
      );
      await this.indoorBikeDataCharacteristic.stopNotifications();
    } catch {}

    this.indoorBikeDataCharacteristic = null;
  }

  indoorBikeDataChanged(event) {
    const data = new IndoorBikeData(event.target.value);
    this.cadence = data.cadence;
    this.power = data.instPower;
  }

  get service() {
    return 'fitness_machine';
  }
}

class IndoorBikeData {
  static Flag = {
    moreData: 1 << 0,
    averageSpeed: 1 << 1,
    instCadence: 1 << 2,
    averageCadence: 1 << 3,
    totalDistance: 1 << 4,
    resistanceLevel: 1 << 5,
    instPower: 1 << 6,
    averagePower: 1 << 7,
    expendedEnergy: 1 << 8,
    heartRate: 1 << 9,
    metabolicEquivalent: 1 << 10,
    elapsedTime: 1 << 11,
    remainingTime: 1 << 12,
  };

  constructor(dataView) {
    this.instSpeed = null;
    this.averageSpeed = null;
    this.instCadence = null;
    this.averageCadence = null;
    this.totalDistance = null;
    this.resistanceLevel = null;
    this.instPower = null;
    this.averagePower = null;
    this.expendedEnergy = null;
    this.heartRate = null;
    this.metabolicEquivalent = null;
    this.elapsedTime = null;
    this.remainingTime = null;

    const stream = new DataStream(dataView);
    const flags = stream.u16();

    if ((flags & IndoorBikeData.Flag.moreData) === 0) {
      this.instSpeed = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.averageSpeed) !== 0) {
      this.averageSpeed = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.instCadence) !== 0) {
      this.instCadence = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.averageCadence) !== 0) {
      this.averageCadence = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.totalDistance) !== 0) {
      this.totalDistance = stream.u24();
    }
    if ((flags & IndoorBikeData.Flag.resistanceLevel) !== 0) {
      this.resistanceLevel = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.instPower) !== 0) {
      this.instPower = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.averagePower) !== 0) {
      this.averagePower = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.expendedEnergy) !== 0) {
      this.expendedEnergy = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.heartRate) !== 0) {
      this.heartRate = stream.u8();
    }
    if ((flags & IndoorBikeData.Flag.metabolicEquivalent) !== 0) {
      this.metabolicEquivalent = stream.u8();
    }
    if ((flags & IndoorBikeData.Flag.elapsedTime) !== 0) {
      this.elapsedTime = stream.u16();
    }
    if ((flags & IndoorBikeData.Flag.remainingTime) !== 0) {
      this.remainingTime = stream.u16();
    }
  }
}
