import _ from 'lodash';

function makeGetter(get) {
  if (get == null) {
    return (value) => value;
  }

  switch (typeof get) {
    case 'function':
      return get;
    case 'number':
      return (value) => value[get];
    case 'string':
      return (value) => _.get(value, get);
  }
  throw "Bad 'makeComparer' get";
}

function sign(value, ascending) {
  return ascending ? value : -value;
}

export function makeComparer(compare, get = null, ascending = true) {
  const getter = makeGetter(get);
  return (a, b) => compare(getter(a), getter(b), ascending);
}

export function compareNumeric(a, b, ascending = true) {
  return sign(a - b, ascending);
}

export function makeNumericComparer(get = null, ascending = true) {
  return makeComparer(compareNumeric, get, ascending);
}

// https://stackoverflow.com/a/38641281
export function compareNatural(a, b, ascending = true) {
  a = (a ?? '').toString();
  b = (b ?? '').toString();
  return sign(a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }), ascending);
}

export function makeNaturalComparer(get = null, ascending = true) {
  return makeComparer(compareNatural, get, ascending);
}
