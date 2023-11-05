import { createSchema, nullable, primitive } from '../utils/persist';

export class DataPoint {
  constructor(power = 0, cadence = 0, heartRate = null) {
    this.power = power;
    this.cadence = cadence;
    this.heartRate = heartRate;
  }
}

createSchema(DataPoint, {
  power: primitive(),
  cadence: primitive(),
  heartRate: nullable(primitive()),
});
