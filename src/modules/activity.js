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

  get minutes() {
    return this.seconds / 60;
  }

  get hours() {
    return this.minutes / 60;
  }

  average(property) {
    let result = null;
    let length = 0;
    for (const item of this.data) {
      const value = item[property];
      if (value != null) {
        result ??= 0;
        result += value;
        length++;
      }
    }
    return result != null ? result / length : null;
  }

  get averagePower() {
    return this.average('power');
  }

  get averageHeartRate() {
    return this.average('heartRate');
  }

  get averageCadence() {
    return this.average('cadence');
  }

  get calories() {
    return 3.6 * this.averagePower * this.hours;
  }
}

createSchema(Activity, {
  date: date(),
  workout: schema(Workout),
  data: list(schema(DataPoint)),
});
