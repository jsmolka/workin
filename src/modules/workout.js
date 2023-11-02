import { createSchema, list, primitive, schema } from '../utils/persist';
import { Interval } from './interval';

export class Workout {
  constructor(name = '') {
    this.name = name;
    this.intervals = [];
  }

  get duration() {
    let duration = 0;
    for (const interval of this.intervals) {
      duration += interval.duration;
    }
    return duration;
  }
}

createSchema(Workout, {
  name: primitive(),
  intervals: list(schema(Interval)),
});
