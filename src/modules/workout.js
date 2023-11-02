import { createSchema, list, primitive, schema } from '../utils/persist';
import { Interval } from './interval';

export class Workout {
  constructor(name = '') {
    this.name = name;
    this.intervals = [];
  }
}

createSchema(Workout, {
  name: primitive(),
  intervals: list(schema(Interval)),
});
