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

export class SmartTrainer extends Device {
  constructor() {
    super();

    this.supportsCadence = false;
    this.supportsPower = false;
    this.supportsTargetPower = false;
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

    // this.heartRateCharacteristic = await service.getCharacteristic('heart_rate_measurement');
    // await this.heartRateCharacteristic.startNotifications();
    // this.heartRateChanged = this.heartRateChanged.bind(this);
    // this.heartRateCharacteristic.addEventListener(
    //   'characteristicvaluechanged',
    //   this.heartRateChanged,
    // );
    // } catch {
    //   await this.disconnect();
    // }
  }

  async disconnected() {}

  get service() {
    return 'fitness_machine';
  }
}
