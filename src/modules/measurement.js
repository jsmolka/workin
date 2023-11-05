import { createSchema, nullable, primitive } from '../utils/persist';

export class Measurement {
  constructor(power = 0, cadence = 0, heartRate = null) {
    this.power = power;
    this.cadence = cadence;
    this.heartRate = heartRate;
  }
}

createSchema(Measurement, {
  power: primitive(),
  cadence: primitive(),
  heartRate: nullable(primitive()),
});
