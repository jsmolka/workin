import { makeGet } from '@/utils/get';

function sign(value, ascending) {
  return ascending ? value : -value;
}

export function makeComparer(compare, expr = null, ascending = true) {
  const get = makeGet(expr);
  return (a, b) => compare(get(a), get(b), ascending);
}

export function compareNumeric(a, b, ascending = true) {
  return sign(a - b, ascending);
}

export function compareDate(a, b, ascending = true) {
  return compareNumeric(a.getTime(), b.getTime(), ascending);
}

export function makeDateComparer(expr = null, ascending = true) {
  return makeComparer(compareDate, expr, ascending);
}

export function makeNumericComparer(expr = null, ascending = true) {
  return makeComparer(compareNumeric, expr, ascending);
}

// https://stackoverflow.com/a/38641281
const naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

export function compareNatural(a, b, ascending = true) {
  return sign(naturalCollator.compare(a, b), ascending);
}

export function makeNaturalComparer(expr = null, ascending = true) {
  return makeComparer(compareNatural, expr, ascending);
}
