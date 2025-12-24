import { Interval, cooldown, ramp, warmup } from '@/modules/interval';
import { Workout } from '@/modules/workout';
import { clone } from '@/utils/persist';
import { parseSeconds } from '@/utils/time';

function workout(name, data) {
  const intervals = [];
  for (const interval of data.flat()) {
    const previous = intervals.at(-1);
    if (previous != null && previous.intensity === interval.intensity) {
      previous.seconds += interval.seconds;
    } else {
      intervals.push(interval);
    }
  }
  return new Workout(name, intervals);
}

function interval(duration, intensity) {
  return new Interval(parseSeconds(duration), intensity);
}

function repeat(count, data, { pop = true, index = false } = {}) {
  const intervals = [];
  for (let i = 0; i < count; i++) {
    for (let interval of data.flat()) {
      interval = clone(interval);
      if (index) {
        interval.description = `${i + 1}/${count}`;
      }
      intervals.push(interval);
    }
  }
  if (pop) {
    intervals.pop();
  }
  return intervals;
}

function maxAerobicPower(intensity) {
  return 1.25 * intensity;
}

// https://robertovukovic.com/cycling-interval-training/

// prettier-ignore
export const workouts = [
  // FTP = 0.75 * best one minute power
  workout('Ramp test', [
    interval('5:00', 0.46),
    interval('1:00', 0.52),
    interval('1:00', 0.58),
    interval('1:00', 0.64),
    interval('1:00', 0.70),
    interval('1:00', 0.76),
    interval('1:00', 0.82),
    interval('1:00', 0.88),
    interval('1:00', 0.94),
    interval('1:00', 1.00),
    interval('1:00', 1.06),
    interval('1:00', 1.12),
    interval('1:00', 1.18),
    interval('1:00', 1.24),
    interval('1:00', 1.30),
    interval('1:00', 1.36),
    interval('1:00', 1.42),
    interval('1:00', 1.48),
    interval('1:00', 1.54),
    interval('1:00', 1.60),
    interval('1:00', 1.64),
    cooldown
  ]),

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

  // https://www.highnorth.co.uk/articles/lactate-threshold-cycling
  // https://www.evoq.bike/blog/over-under-cycling-workouts-for-increasing-your-ftp
  ...[3, 4, 5].map((repeats) =>
    workout(`${repeats} x 12 Lactate`, [
      warmup,
      repeat(repeats, [
        repeat(4, [
          interval('1:00', 1.15),
          interval('2:00', 0.8),
        ], { pop: false }),
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
        interval('1:30', maxAerobicPower(1.0)),
        interval('3:30', maxAerobicPower(0.85)),
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
        interval('0:30', maxAerobicPower(1.0)),
        interval('1:00', maxAerobicPower(0.77)),
        interval('0:30', maxAerobicPower(1.0)),
        interval('1:00', maxAerobicPower(0.77)),
        interval('0:30', maxAerobicPower(1.0)),
        interval('1:30', maxAerobicPower(0.77)),
        interval('5:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[3, 4, 5].map((repeats) =>
    workout(`${repeats} x 10 x 30/30`, [
      warmup,
      repeat(repeats, [
        repeat(10, [
          interval('0:30', maxAerobicPower(1.0)),
          interval('0:30', maxAerobicPower(0.5)),
        ], { index: true }),
        interval('5:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  // Rønnestad
  // https://pubmed.ncbi.nlm.nih.gov/24382021/
  // https://www.researchgate.net/publication/338808139/
  ...[3, 4, 5].map((repeats) =>
    workout(`${repeats} x 13 x 30/15`, [
      warmup,
      repeat(repeats, [
        repeat(13, [
          interval('0:30', maxAerobicPower(1.0)),
          interval('0:15', maxAerobicPower(0.5)),
        ], { index: true }),
        interval('5:00', 0.5),
      ]),
      cooldown,
    ]),
  ),

  ...[3, 4, 5].map((repeats) =>
    workout(`${repeats} x 10 x 40/20`, [
      warmup,
      repeat(repeats, [
        repeat(10, [
          interval('0:40', maxAerobicPower(1.0)),
          interval('0:20', maxAerobicPower(0.5)),
        ], { index: true }),
        interval('5:00', 0.5),
      ]),
      cooldown,
    ]),
  ),
];
