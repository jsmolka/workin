import { math } from '../utils/math';

function setPercent(el, { arg, value }) {
  el.setAttribute(arg, math.clamp(100 * value, 0, 100) + '%');
}

export const percent = {
  created: setPercent,
  updated: setPercent,
};
