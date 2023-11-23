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

export const warmup = [
  new Interval(120, 0.5),
  new Interval(120, 0.625),
  new Interval(120, 0.75),
  new Interval(120, 0.875),
  new Interval(120, 1.0),
  new Interval(300, 0.5),
];

export const cooldown = [
  new Interval(60, 0.5),
  new Interval(60, 0.475),
  new Interval(60, 0.45),
  new Interval(60, 0.425),
  new Interval(60, 0.4),
];
