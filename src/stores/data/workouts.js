import { Interval, cooldown, ramp, warmup } from '../../modules/interval';
import { Workout } from '../../modules/workout';
import { parseSeconds } from '../../utils/time';

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

// https://robertovukovic.com/cycling-interval-training/

// prettier-ignore
export const workouts = [
  // Active recovery
  ...['24:00', '54:00'].map((duration) =>
    workout('Recovery', [
      ramp(parseSeconds('06:00'), 0.4, 0.5, 6),
      interval(duration, 0.5),
    ]),
  ),

  // Endurance
  ...['54:00', '1:24:00', '1:54:00', '2:24:00'].map((duration) =>
    workout('Endurance', [
      ramp(parseSeconds('06:00'), 0.4, 0.6, 6),
      interval(duration, 0.6),
    ]),
  ),

  // Zone 2
  ...['54:00', '1:24:00', '1:54:00', '2:24:00'].map((duration) =>
    workout('Zone 2', [
      ramp(parseSeconds('06:00'), 0.4, 0.7, 6),
      interval(duration, 0.7),
    ]),
  ),

  // Threshold
  ...[3, 4].map((repeats) =>
    workout(`${repeats} x 10`, [
      warmup,
      repeat(repeats, [
        interval('10:00', 1.0),
        interval('05:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[3, 4].map((repeats) =>
    workout(`${repeats} x 15`, [
      warmup,
      repeat(repeats, [
        interval('15:00', 1.0),
        interval('07:30', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[2, 3].map((repeats) =>
    workout(`${repeats} x 20`, [
      warmup,
      repeat(repeats, [
        interval('20:00', 1.0),
        interval('10:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  // Lactate clearance
  ...[2, 3, 4].map((repeats) =>
    workout(`${repeats} x 4 x 2/2`, [
      warmup,
      repeat(repeats, [
        repeat(4, [
          interval('02:00', 1.05),
          interval('02:00', 0.9),
        ], false),
        interval('08:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[2, 3, 4].map((repeats) =>
    workout(`${repeats} x 3 x 1/4`, [
      warmup,
      repeat(repeats, [
        repeat(3, [
          interval('01:00', 1.15),
          interval('04:00', 0.85),
        ], false),
        interval('07:30', 0.5),
      ]),
      cooldown,
    ]),
  ),

  // VO2 max
  ...[4, 5, 6].map((repeats) =>
    workout(`${repeats} x 4`, [
      warmup,
      repeat(repeats, [
        interval('04:00', 1.15),
        interval('04:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[4, 5, 6].map((repeats) =>
    workout(`${repeats} x 8`, [
      warmup,
      repeat(repeats, [
        interval('08:00', 1.05),
        interval('08:00', 0.5),
      ]),
      cooldown
    ]),
  ),

  ...[4, 5, 6].map((repeats) =>
    workout(`${repeats} x 1/4`, [
      warmup,
      repeat(repeats, [
        interval('01:00', 1.25),
        interval('04:00', 1.05),
        interval('05:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  // Anaerobic
  ...[2, 3].map((repeats) =>
    workout(`${repeats} x 10 x 30/30`, [
      warmup,
      repeat(repeats, [
        repeat(10, [
          interval('00:30', 1.25),
          interval('00:30', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[2, 3].map((repeats) =>
    workout(`${repeats} x 20 x 30/30`, [
      warmup,
      repeat(repeats, [
        repeat(20, [
          interval('00:30', 1.25),
          interval('00:30', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[2, 3].map((repeats) =>
    workout(`${repeats} x 10 x 40/20`, [
      warmup,
      repeat(repeats, [
        repeat(10, [
          interval('00:40', 1.25),
          interval('00:20', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[2, 3].map((repeats) =>
    workout(`${repeats} x 20 x 40/20`, [
      warmup,
      repeat(repeats, [
        repeat(20, [
          interval('00:40', 1.25),
          interval('00:20', 0.5),
        ]),
        interval('05:00', 0.5),
      ]),
      cooldown,
    ]),
  ),
];
