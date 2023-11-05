import { createSchema, list, primitive, schema } from '../utils/persist';
import { Interval } from './interval';
import { zones } from './zones';

export class Workout {
  constructor(name = '', intervals = []) {
    this.name = name;
    this.intervals = intervals;
  }

  calories(power) {
    return 3.6 * power * this.averageIntensity * this.hours;
  }

  get seconds() {
    let result = 0;
    for (const { seconds } of this.intervals) {
      result += seconds;
    }
    return result;
  }

  get minutes() {
    return this.seconds / 60;
  }

  get hours() {
    return this.minutes / 60;
  }

  get averageIntensity() {
    const seconds = this.seconds;

    let result = 0;
    for (const interval of this.intervals) {
      result += interval.intensity * (interval.seconds / seconds);
    }
    return result;
  }

  get maxIntensity() {
    let result = Number.MIN_SAFE_INTEGER;
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
}

createSchema(Workout, {
  name: primitive(),
  intervals: list(schema(Interval)),
});
