import { Interval } from '../../modules/interval';
import { Workout } from '../../modules/workout';

function range(start, stop, step, callback) {
  const data = [];
  for (let i = start; i <= stop; i += step) {
    data.push(callback(i));
  }
  return data;
}

function w(name, data) {
  const intervals = [];
  for (const { duration, intensity } of data.flat()) {
    const previous = intervals.at(-1);
    if (previous && previous.intensity === intensity) {
      previous.duration += duration;
    } else {
      intervals.push(new Interval(duration, intensity));
    }
  }
  return new Workout(name, data.flat());
}

function i(minutes, intensity) {
  return new Interval(60 * minutes, intensity);
}

function s(minutes, from, to, count) {
  const result = [];
  const offset = (to - from) / (count - 1);
  for (let index = 0; index < count; index++) {
    result.push(i(minutes / count, from + index * offset));
  }
  return result;
}

function r(count, data, pop = true) {
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

  ...range(30, 60, 30, (n) =>
    w('Recovery', [
      i(n, 0.5),
    ]),
  ),

  // Endurance

  ...range(45, 135, 30, (n) =>
    w('LIT', [
      s(10, 0.5, 0.6, 4),
      i(n, 0.6),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(45, 135, 30, (n) =>
    w('Zone 2', [
      s(10, 0.5, 0.7, 4),
      i(n, 0.70),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  // Threshold
  // https://www.youtube.com/watch?v=MWaMVhHo-zE

  ...range(3, 4, 1, (n) =>
    w(`${n} x 10`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        i(10, 1.0),
        i(5, 0.5)
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(3, 4, 1, (n) =>
    w(`${n} x 15`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        i(15, 1.0),
        i(7.5, 0.5)
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(2, 3, 1, (n) =>
    w(`${n} x 20`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        i(20, 1.0),
        i(10, 0.5)
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  // Lactate clearance

  ...range(2, 6, 2, (n) =>
    w(`${n} x 10 LC`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        r(5, [
          i(1, 0.9),
          i(1, 1.1),
        ], false),
        i(5, 0.5),
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  // VO2 max
  // https://www.youtube.com/watch?v=YBgAr7kLsZY

  ...range(2, 6, 2, (n) =>
    w(`${n} x 4`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        i(4, 1.15),
        i(4, 0.5),
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(2, 6, 2, (n) =>
    w(`${n} x 8`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        i(8, 1.05),
        i(4, 0.5),
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  // Anaerobic
  // https://www.youtube.com/watch?v=YBgAr7kLsZY

  ...range(1, 3, 1, (n) =>
    w(`${n} x 10 x 30`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        r(10, [
          i(0.5, 1.25),
          i(0.5, 0.5),
        ]),
        i(5, 0.5),
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  ),

  ...range(1, 3, 1, (n) =>
    w(`${n} x 20 x 30`, [
      s(10, 0.5, 1.0, 4),
      i(5, 0.5),
      r(n, [
        r(20, [
          i(0.5, 1.25),
          i(0.5, 0.5),
        ]),
        i(10, 0.5),
      ]),
      s(5, 0.5, 0.4, 4),
    ]),
  )
];
