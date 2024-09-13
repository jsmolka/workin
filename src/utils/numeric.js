export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a, b, ratio) {
  return a + ratio * (b - a);
}

export function remap(value, min1, max1, min2, max2, withinBounds = false) {
  if (withinBounds) {
    value = clamp(value, min1, max1);
  }
  return lerp(min2, max2, (value - min1) / (max1 - min1));
}

export function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

export function radToDeg(radians) {
  return radians * (180 / Math.PI);
}

export function nearestMultipleOf(value, step) {
  return Math.round(value / step) * step;
}

export function nthRoot(value, n) {
  return value ** (1 / n);
}
