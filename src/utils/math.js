export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export const math = {
  clamp,
};
