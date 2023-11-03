import { createSchema, primitive } from '../utils/persist';

export class Interval {
  constructor(duration = 0, intensity = 0) {
    this.duration = duration;
    this.intensity = intensity;
  }
}

createSchema(Interval, {
  duration: primitive(),
  intensity: primitive(),
});
