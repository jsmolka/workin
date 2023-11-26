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

function map(intensity) {
  return 1.3 * intensity;
}

// https://robertovukovic.com/cycling-interval-training/

// prettier-ignore
export const workouts = [
  ...['24:00', '54:00'].map((duration) =>
    workout('Recovery', [
      ramp(parseSeconds('6:00'), 0.4, 0.5, 6),
      interval(duration, 0.5),
    ]),
  ),

  ...['54:00', '1:24:00', '1:54:00', '2:24:00', '2:54:00'].map((duration) =>
    workout('Endurance', [
      ramp(parseSeconds('6:00'), 0.4, 0.6, 6),
      interval(duration, 0.6),
    ]),
  ),

  ...['54:00', '1:24:00', '1:54:00', '2:24:00', '2:54:00'].map((duration) =>
    workout('Zone 2', [
      ramp(parseSeconds('6:00'), 0.4, 0.7, 6),
      interval(duration, 0.7),
    ]),
  ),

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

  ...[3, 4, 5].map((repeats) =>
    workout(`${repeats} x 12 Lactate`, [
      warmup,
      repeat(repeats, [
        repeat(3, [
          interval('2:00', 1.05),
          interval('2:00', 0.85),
        ], false),
        interval('6:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[4, 5, 6].map((repeats) =>
    workout(`${repeats} x 4`, [
      warmup,
      repeat(repeats, [
        interval('4:00', 1.15),
        interval('4:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  // Seiler
  // https://pubmed.ncbi.nlm.nih.gov/21812820/
  // https://www.researchgate.net/publication/51543724/
  ...[4, 5, 6].map((repeats) =>
    workout(`${repeats} x 8`, [
      warmup,
      repeat(repeats, [
        interval('8:00', 1.05),
        interval('4:00', 0.5),
      ]),
      cooldown
    ]),
  ),

  // Rønnestad
  // https://pubmed.ncbi.nlm.nih.gov/31621643/
  // https://www.researchgate.net/publication/356469064/
  ...[4, 5, 6].map((repeats) =>
    workout(`${repeats} x 5 Decrease`, [
      warmup,
      repeat(repeats, [
        interval('1:30', map(1.0)),
        interval('3:30', map(0.85)),
        interval('5:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  // Bossi
  // https://pubmed.ncbi.nlm.nih.gov/32244222/
  // https://www.researchgate.net/publication/336641479/
  // https://hiitscience.com/hiit-power-variation/
  ...[4, 5, 6].map((repeats) =>
    workout(`${repeats} x 5 Variation`, [
      warmup,
      repeat(repeats, [
        interval('0:30', map(1.0)),
        interval('1:00', map(0.77)),
        interval('0:30', map(1.0)),
        interval('1:00', map(0.77)),
        interval('0:30', map(1.0)),
        interval('1:30', map(0.77)),
        interval('5:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  // Rønnestad
  // https://pubmed.ncbi.nlm.nih.gov/24382021/
  // https://www.researchgate.net/publication/338808139/
  ...[3, 4].map((repeats) =>
    workout(`${repeats} x 13 x 30/15`, [
      warmup,
      repeat(repeats, [
        repeat(13, [
          interval('0:30', map(1.0)),
          interval('0:15', map(0.5)),
        ]),
        interval('5:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[3, 4].map((repeats) =>
    workout(`${repeats} x 15 x 40/20`, [
      warmup,
      repeat(repeats, [
        repeat(15, [
          interval('0:40', map(1.0)),
          interval('0:20', map(0.5)),
        ]),
        interval('7:30', 0.5),
      ]),
      cooldown,
    ]),
  ),
];
