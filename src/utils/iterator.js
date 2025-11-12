export function* enumerate(iterable, start = 0) {
  let i = start;
  for (const value of iterable) {
    yield [i, value];
    i++;
  }
}

export function reversed(array) {
  return {
    *entries() {
      for (let i = array.length - 1; i >= 0; i--) {
        yield [i, array[i]];
      }
    },

    *[Symbol.iterator]() {
      for (const [_, value] of this.entries()) {
        yield value;
      }
    },
  };
}
