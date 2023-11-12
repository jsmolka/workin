import { nthRoot } from 'mathjs/number';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function nearestMultipleOf(value, step) {
  return Math.round(value / step) * step;
}

export const math = {
  clamp,
  nearestMultipleOf,
  nthRoot,
};
