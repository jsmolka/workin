import { makeGetter } from '@/utils/get';

function sign(value, ascending) {
  return ascending ? value : -value;
}

export function makeComparer(compare, expr = null, ascending = true) {
  const getter = makeGetter(expr);
  return (a, b) => compare(getter(a), getter(b), ascending);
}

export function compareNumeric(a, b, ascending = true) {
  return sign(a - b, ascending);
}

export function makeNumericComparer(expr = null, ascending = true) {
  return makeComparer(compareNumeric, expr, ascending);
}

// https://stackoverflow.com/a/38641281
export function compareNatural(a, b, ascending = true) {
  a = (a ?? '').toString();
  b = (b ?? '').toString();
  return sign(a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }), ascending);
}

export function makeNaturalComparer(expr = null, ascending = true) {
  return makeComparer(compareNatural, expr, ascending);
}
