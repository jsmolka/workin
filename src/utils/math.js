import _ from 'lodash';
import { nthRoot } from 'mathjs/number';

function nearestMultipleOf(value, step) {
  return Math.round(value / step) * step;
}

export const math = {
  clamp: _.clamp,
  nearestMultipleOf,
  nthRoot,
};
