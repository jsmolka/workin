import { createSchema, date, list, schema } from '../utils/persist';
import { DataPoint } from './dataPoint';
import { Workout } from './workout';

export class Activity {
  constructor(workout = new Workout()) {
    this.date = new Date();
    this.workout = workout;
    this.data = [];
  }

  get seconds() {
    return this.data.length;
  }
}

createSchema(Activity, {
  date: date(),
  workout: schema(Workout),
  data: list(schema(DataPoint)),
});
