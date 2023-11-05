import { createSchema, primitive } from '../utils/persist';

export class Interval {
  constructor(seconds = 0, intensity = 0) {
    this.seconds = seconds;
    this.intensity = intensity;
  }
}

createSchema(Interval, {
  seconds: primitive(),
  intensity: primitive(),
});
