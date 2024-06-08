export function* enumerate(iterable, start = 0) {
  let i = start;
  for (const value of iterable) {
    yield [i, value];
    i++;
  }
}

export function* reversed(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    yield [i, array[i]];
  }
}
