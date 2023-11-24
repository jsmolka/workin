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

export function ramp(seconds, from, to, steps) {
  const step = (to - from) / (steps - 1);
  const intervals = [];
  for (let i = 0; i < steps; i++) {
    intervals.push(new Interval(seconds / steps, from + i * step));
  }
  return intervals;
}

export const warmup = [...ramp(600, 0.4, 1.0, 10), new Interval(300, 0.5)];
export const cooldown = ramp(300, 0.5, 0.4, 5);
