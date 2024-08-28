// [0, n)
export function randomInt(n) {
  return (Math.random() * n) >>> 0;
}

export function shuffle(array) {
  let last = array.length;
  while (last > 0) {
    const i = randomInt(last--);
    [array[last], array[i]] = [array[i], array[last]];
  }
  return array;
}
