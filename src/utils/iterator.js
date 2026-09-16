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

export function pairs(array) {
  return {
    *entries() {
      for (let i = 0, j = 1; j < array.length; i++, j++) {
        yield [
          [i, j],
          [array[i], array[j]],
        ];
      }
    },

    *[Symbol.iterator]() {
      for (const [_, value] of this.entries()) {
        yield value;
      }
    },
  };
}
