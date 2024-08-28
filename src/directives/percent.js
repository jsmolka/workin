import { clamp } from '@/utils/numeric';

function setPercent(el, { arg, value }) {
  el.setAttribute(arg, 100 * clamp(value, 0, 1) + '%');
}

export const percent = {
  created: setPercent,
  updated: setPercent,
};
