import { createSchema, primitive } from '../utils/persist';

export class Interval {
  constructor(duration = 0, intensity = 1) {
    this.duration = duration;
    this.intensity = intensity;
  }
}

createSchema(Interval, {
  duration: primitive(),
  intensity: primitive(),
});
