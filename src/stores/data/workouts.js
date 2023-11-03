import { Interval } from '../../modules/interval';
import { Workout } from '../../modules/workout';

class Intervals {
  constructor() {
    this.intervals = [];
  }
}

class Steps extends Intervals {
  constructor(mins, from, to, count) {
    super();
    const offset = (to - from) / (count - 1);
    for (let j = 0; j < count; j++) {
      this.intervals.push(i(mins / count, from + j * offset));
    }
  }
}

class Repeat extends Intervals {
  constructor(count, intervals, popLast = true) {
    super();
    while (count--) {
      this.intervals.push(...unwrap(intervals));
    }
    if (popLast) {
      this.intervals.pop();
    }
  }
}

function unwrap(data) {
  const intervals = [];
  for (const item of data) {
    if (item instanceof Interval) {
      intervals.push(item);
    } else if (item instanceof Steps) {
      intervals.push(...item.intervals);
    } else if (item instanceof Repeat) {
      intervals.push(...item.intervals);
    }
  }
  return intervals;
}

function w(name, data) {
  return new Workout(name, unwrap(data));
}

function v(start, stop, step, callback) {
  const workout = [];
  for (let i = start; i <= stop; i += step) {
    workout.push(callback(i));
  }
  return workout;
}

function i(mins, intensity) {
  return new Interval(mins * 60, intensity);
}

function s(mins, from, to, between) {
  return new Steps(mins, from, to, between);
}

function r(count, ...intervals) {
  return new Repeat(count, ...intervals);
}

// prettier-ignore
export const workouts = [
  // Active recovery
  // w('Recovery', [i(30, 0.5)]),
  // w('Recovery', [i(60, 0.5)]),

  // Endurance
  // w('LIT', [...s(10, ac, lit, 4), i(45, lit), ...s(5, lit, ac, 2)]),
  // w('LIT', [...s(10, ac, lit, 4), i(75, lit), ...s(5, lit, ac, 2)]),
  // w('LIT', [...s(10, ac, lit, 4), i(105, lit), ...s(5, lit, ac, 2)]),
  // w('LIT', [...s(10, ac, lit, 4), i(135, lit), ...s(5, lit, ac, 2)]),

  // Zone 2
  // w('Z2', [...s(10, ac, z2, 4), i(45, z2), ...s(5, z2, ac, 2)]),
  // w('Z2', [...s(10, ac, z2, 4), i(75, z2), ...s(5, z2, ac, 2)]),
  // w('Z2', [...s(10, ac, z2, 4), i(105, z2), ...s(5, z2, ac, 2)]),
  // w('Z2', [...s(10, ac, z2, 4), i(135, z2), ...s(5, z2, ac, 2)]),

  // Threshold
  // https://www.youtube.com/watch?v=MWaMVhHo-zE

  ...v(3, 4, 1, (n) =>
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

  ...v(3, 4, 1, (n) =>
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

  ...v(2, 3, 1, (n) =>
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

  // VO2 max
  // https://www.youtube.com/watch?v=YBgAr7kLsZY

  ...v(2, 6, 2, (n) =>
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

  ...v(2, 6, 2, (n) =>
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

  ...v(2, 6, 2, (n) =>
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

  ...v(1, 3, 1, (n) =>
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

  ...v(1, 3, 1, (n) =>
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
