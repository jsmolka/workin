import { array, createSchema, primitive, schema } from '../utils/persist';
import { Interval } from './interval';
import { zones } from './zones';

export class Workout {
  constructor(name = '', intervals = []) {
    this.name = name;
    this.intervals = intervals;
  }

  get seconds() {
    let result = 0;
    for (const { seconds } of this.intervals) {
      result += seconds;
    }
    return result;
  }

  get averageIntensity() {
    const totalSeconds = this.seconds;

    let result = 0;
    for (const { seconds, intensity } of this.intervals) {
      result += intensity * (seconds / totalSeconds);
    }
    return result;
  }

  get maxIntensity() {
    let result = 0;
    for (const { intensity } of this.intervals) {
      if (intensity > result) {
        result = intensity;
      }
    }
    return result;
  }

  get zone() {
    const maxIntensity = this.maxIntensity;
    return zones.find((zone) => maxIntensity >= zone.min && maxIntensity < zone.max);
  }

  calories(power) {
    return 3.6 * power * this.averageIntensity * (this.seconds / 3600);
  }
}

createSchema(Workout, {
  name: primitive(),
  intervals: array(schema(Interval)),
});
