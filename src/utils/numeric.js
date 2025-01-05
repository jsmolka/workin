export function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

// Based on https://stackoverflow.com/a/4467559
export function mod(x, y) {
  return ((x % y) + y) % y;
}

export function nthRoot(x, root) {
  return Math.sign(x) * Math.abs(x) ** (1 / root);
}

export function lerp(x, y, ratio) {
  return x + ratio * (y - x);
}

export function remap(x, min1, max1, min2, max2, withinBounds = false) {
  if (withinBounds) {
    x = clamp(x, min1, max1);
  }
  return lerp(min2, max2, (x - min1) / (max1 - min1));
}

// Based on https://github.com/josdejong/mathjs/blob/v12.4.3/src/utils/number.js#L626
export function equals(x, y, epsilon = null) {
  if (x === y) {
    return true;
  }

  if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
    return false;
  }

  const diff = Math.abs(x - y);
  return diff <= Number.EPSILON || diff <= (epsilon ?? 1e-6);
}

export function isZero(x, epsilon = null) {
  return equals(x, 0, epsilon);
}

export function greaterEq(x, y, epsilon = null) {
  return x > y || equals(x, y, epsilon);
}

export function lessEq(x, y, epsilon = null) {
  return x < y || equals(x, y, epsilon);
}

export function nearestMultipleOf(x, step) {
  return Math.round(x / step) * step;
}
