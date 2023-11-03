import { Interval } from '../../modules/interval';
import { Workout } from '../../modules/workout';

function w(name, data) {
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
  return new Workout(name, intervals);
}

function i(mins, intensity) {
  return new Interval(mins * 60, intensity);
}

class Steps {
  constructor(mins, from, to, count) {
    const offset = (to - from) / (count - 1);
    const intervals = [];
    for (let j = 0; j < count; j++) {
      intervals.push(i(mins / count, from + j * offset));
    }
    this.intervals = intervals;
  }
}

function s(mins, from, to, between) {
  return new Steps(mins, from, to, between);
}

class Repeat {
  constructor(count, ...intervals) {
    this.intervals = [];
    while (count--) {
      this.intervals.push(...intervals);
    }
  }
}

function r(count, ...intervals) {
  return new Repeat(count, ...intervals);
}

const rec = 0.5;
const lit = 0.63;
const z2 = 0.73;
const thr = 1;
const vo2 = 1.2;

// HIIT: https://www.youtube.com/watch?v=YBgAr7kLsZY
// Threshold: https://www.youtube.com/watch?v=MWaMVhHo-zE
// Warmup: https://www.youtube.com/watch?v=GtzMYFaZeIc
// Cooldown: https://www.youtube.com/watch?v=mckoAAinGDU

export const workouts = [
  // Active recovery
  w('Recovery', [i(30, rec)]),
  w('Recovery', [i(60, rec)]),

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

  // VO2 max: 4 min, 120 %, 4 min rest (4, 6 or 8 reps)
  // VO2 max: 8 min, 110 %, 4 min rest (2, 4 or 6 reps)

  // Anaerobic
  // Tabata: 30 sec @ 130-180%, 10min between

  w('1 x 10 x 30 sec', [
    s(10, rec, thr, 4),
    i(5, rec),
    r(10, i(0.5, 1.2), i(0.5, 0.5)),
    s(5, rec, 0.4, 4),
  ]),

  w('2 x 10 x 30 sec', [
    s(10, rec, thr, 4),
    i(5, rec),
    r(10, i(0.5, 1.2), i(0.5, 0.5)),
    i(5, rec),
    r(10, i(0.5, 1.2), i(0.5, 0.5)),
    s(5, rec, 0.4, 4),
  ]),

  w('3 x 10 x 30 sec', [
    s(10, rec, thr, 4),
    i(5, rec),
    r(10, i(0.5, 1.2), i(0.5, 0.5)),
    i(5, rec),
    r(10, i(0.5, 1.2), i(0.5, 0.5)),
    i(5, rec),
    r(10, i(0.5, 1.2), i(0.5, 0.5)),
    s(5, rec, 0.4, 4),
  ]),

  w('1 x 20 x 30 sec', [
    s(10, rec, thr, 4),
    i(5, rec),
    r(20, i(0.5, 1.2), i(0.5, 0.5)),
    s(5, rec, 0.4, 4),
  ]),

  w('2 x 20 x 30 sec', [
    s(10, rec, thr, 4),
    i(5, rec),
    r(20, i(0.5, 1.2), i(0.5, 0.5)),
    i(10, rec),
    r(20, i(0.5, 1.2), i(0.5, 0.5)),
    s(5, rec, 0.4, 4),
  ]),

  w('3 x 20 x 30 sec', [
    s(10, rec, thr, 4),
    i(5, rec),
    r(20, i(0.5, 1.2), i(0.5, 0.5)),
    i(10, rec),
    r(20, i(0.5, 1.2), i(0.5, 0.5)),
    i(10, rec),
    r(20, i(0.5, 1.2), i(0.5, 0.5)),
    s(5, rec, 0.4, 4),
  ]),
];
