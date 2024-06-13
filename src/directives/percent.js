import { math } from '@/utils/math';

function setPercent(el, { arg, value }) {
  el.setAttribute(arg, 100 * math.clamp(value, 0, 1) + '%');
}

export const percent = {
  created: setPercent,
  updated: setPercent,
};
