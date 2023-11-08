import { createSchema, nullable, primitive } from '../utils/persist';

export class DataPoint {
  constructor(power = 0, cadence = null, heartRate = null) {
    this.power = power;
    this.cadence = cadence;
    this.heartRate = heartRate;
  }
}

createSchema(DataPoint, {
  power: primitive(),
  cadence: nullable(primitive()),
  heartRate: nullable(primitive()),
});
