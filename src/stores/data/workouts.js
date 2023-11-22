import { Interval } from '../../modules/interval';
import { Workout } from '../../modules/workout';
import { parseSeconds } from '../../utils/datetime';

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

function interval(duration, intensity) {
  return new Interval(parseSeconds(duration), intensity);
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

const warmup = [
  interval('02:00', 0.5),
  interval('02:00', 0.625),
  interval('02:00', 0.75),
  interval('02:00', 0.875),
  interval('02:00', 1.0),
  interval('05:00', 0.5),
];

const cooldown = [
  interval('01:00', 0.5),
  interval('01:00', 0.475),
  interval('01:00', 0.45),
  interval('01:00', 0.425),
  interval('01:00', 0.4),
];

// https://robertovukovic.com/cycling-interval-training/

// prettier-ignore
export const workouts = [
  // Active recovery
  ...['30:00', '1:00:00'].map((d) =>
    workout('Recovery', [
      interval(d, 0.5),
    ]),
  ),

  // Endurance
  ...['1:00:00', '1:30:00', '2:00:00', '2:30:00'].map((d) =>
    workout('Endurance', [
      interval(d, 0.6),
    ]),
  ),

  // Zone 2
  ...['1:00:00', '1:30:00', '2:00:00', '2:30:00'].map((d) =>
    workout('Zone 2', [
      interval(d, 0.7),
    ]),
  ),

  // Threshold
  ...[3, 4].map((r) =>
    workout(`${r} x 10`, [
      ...warmup,
      repeat(r, [
        interval('10:00', 1.0),
        interval('05:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  ...[3, 4].map((r) =>
    workout(`${r} x 15`, [
      ...warmup,
      repeat(r, [
        interval('15:00', 1.0),
        interval('07:30', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  ...[2, 3].map((r) =>
    workout(`${r} x 20`, [
      ...warmup,
      repeat(r, [
        interval('20:00', 1.0),
        interval('10:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  // Lactate clearance
  ...[2, 3, 4].map((r) =>
    workout(`${r} x 4 x 2/2`, [
      ...warmup,
      repeat(r, [
        repeat(4, [
          interval('02:00', 1.05),
          interval('02:00', 0.9),
        ], false),
        interval('08:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  ...[2, 3, 4].map((r) =>
    workout(`${r} x 3 x 1/4`, [
      ...warmup,
      repeat(r, [
        repeat(3, [
          interval('01:00', 1.15),
          interval('04:00', 0.85),
        ], false),
        interval('07:30', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  // VO2 max
  ...[4, 5, 6].map((r) =>
    workout(`${r} x 4`, [
      ...warmup,
      repeat(r, [
        interval('04:00', 1.15),
        interval('04:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  ...[4, 5, 6].map((r) =>
    workout(`${r} x 8`, [
      ...warmup,
      repeat(r, [
        interval('08:00', 1.05),
        interval('08:00', 0.5),
      ]),
      ...cooldown
    ]),
  ),

  ...[4, 5, 6].map((r) =>
    workout(`${r} x 1/4`, [
      ...warmup,
      repeat(r, [
        interval('01:00', 1.25),
        interval('04:00', 1.05),
        interval('05:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  // Anaerobic
  ...[2, 3].map((r) =>
    workout(`${r} x 10 x 30/30`, [
      ...warmup,
      repeat(r, [
        repeat(10, [
          interval('00:30', 1.25),
          interval('00:30', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  ...[2, 3].map((r) =>
    workout(`${r} x 20 x 30/30`, [
      ...warmup,
      repeat(r, [
        repeat(20, [
          interval('00:30', 1.25),
          interval('00:30', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  ...[2, 3].map((r) =>
    workout(`${r} x 10 x 40/20`, [
      ...warmup,
      repeat(r, [
        repeat(10, [
          interval('00:40', 1.25),
          interval('00:20', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),

  ...[2, 3].map((r) =>
    workout(`${r} x 20 x 40/20`, [
      ...warmup,
      repeat(r, [
        repeat(20, [
          interval('00:40', 1.25),
          interval('00:20', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      ...cooldown,
    ]),
  ),
];
