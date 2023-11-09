import { createSchema, date, list, schema } from '../utils/persist';
import { DataPoint, getAverageCadence, getAveragePower } from './dataPoint';
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

  get averagePower() {
    return getAveragePower(this.data);
  }

  get averageHeartRate() {
    return getAverageCadence(this.data);
  }

  get averageCadence() {
    return getAverageCadence(this.data);
  }

  get calories() {
    return 3.6 * this.averagePower * this.hours;
  }

  get laps() {
    const result = [];

    let totalSeconds = 0;
    for (const { seconds } of this.workout.intervals) {
      const data = this.data.slice(totalSeconds, totalSeconds + seconds);
      if (data.length === 0) {
        break;
      }
      result.push(data);
      totalSeconds += seconds;
    }
    return result;
  }
}

createSchema(Activity, {
  date: date(),
  workout: schema(Workout),
  data: list(schema(DataPoint)),
});
