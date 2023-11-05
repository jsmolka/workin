import { Interval } from '../../modules/interval';
import { Workout } from '../../modules/workout';

function range(start, stop, step, fn) {
  const data = [];
  for (let i = start; i <= stop; i += step) {
    data.push(fn(i));
  }
  return data;
}

function workout(name, data) {
  const intervals = [];
  for (const { seconds, intensity } of data.flat()) {
    const previous = intervals.at(-1);
    if (previous && previous.intensity === intensity) {
      previous.seconds += seconds;
    } else {
      intervals.push(new Interval(seconds, intensity));
    }
  }
  return new Workout(name, intervals);
}

function interval(minutes, intensity) {
  return new Interval(minutes * 60, intensity);
}

function ramp(minutes, from, to, count) {
  const result = [];
  const offset = (to - from) / (count - 1);
  for (let i = 0; i < count; i++) {
    result.push(interval(minutes / count, from + i * offset));
  }
  return result;
}

function repeat(count, data, pop = true) {
  const result = [];
  while (count--) {
    result.push(...data.flat());
  }
  if (pop) {
    result.pop();
  }
  return result;
}

// prettier-ignore
export const workouts = [
  // Active recovery
  ...range(30, 60, 30, (i) =>
    workout('Recovery', [
      interval(i, 0.5),
    ]),
  ),

  // Endurance
  ...range(45, 135, 30, (i) =>
    workout('LIT', [
      ramp(10, 0.5, 0.6, 4),
      interval(i, 0.6),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(45, 135, 30, (i) =>
    workout('Zone 2', [
      ramp(10, 0.5, 0.7, 4),
      interval(i, 0.7),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  // Threshold
  ...range(3, 4, 1, (i) =>
    workout(`${i} x 10`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        interval(10, 1.0),
        interval(5, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(3, 4, 1, (i) =>
    workout(`${i} x 15`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        interval(15, 1.0),
        interval(7.5, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(2, 3, 1, (i) =>
    workout(`${i} x 20`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        interval(20, 1.0),
        interval(10, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  // Lactate clearance
  ...range(2, 4, 1, (i) =>
    workout(`${i} x 4 x 2/2`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        repeat(4, [
          interval(2, 1.05),
          interval(2, 0.9),
        ], false),
        interval(4, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  // VO2 max
  ...range(4, 6, 1, (i) =>
    workout(`${i} x 8`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        interval(8, 1.05),
        interval(4, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(4, 6, 1, (i) =>
    workout(`${i} x 4`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        interval(4, 1.15),
        interval(4, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),


  // Anaerobic
  ...range(2, 3, 1, (i) =>
    workout(`${i} x 10 x 30/30`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        repeat(10, [
          interval(0.5, 1.25),
          interval(0.5, 0.5),
        ]),
        interval(5, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(2, 3, 1, (i) =>
    workout(`${i} x 20 x 30/30`, [
      ramp(10, 0.5, 1.0, 4),
      interval(5, 0.5),
      repeat(i, [
        repeat(20, [
          interval(0.5, 1.25),
          interval(0.5, 0.5),
        ]),
        interval(10, 0.5),
      ]),
      ramp(5, 0.5, 0.4, 4),
    ]),
  ),
];
