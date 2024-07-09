function color(variable) {
  const [r, g, b] = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .split(' ', 3)
    .map((value) => parseInt(value));

  return {
    r,
    g,
    b,

    get int() {
      return (r << 16) | (g << 8) | b;
    },

    get hex() {
      return `#${this.int.toString(16).padStart(6, '0')}`;
    },
  };
}

export const colors = Object.freeze({
  shade1: color('--shade-1'),
  shade2: color('--shade-2'),
  shade3: color('--shade-3'),
  shade4: color('--shade-4'),
  shade5: color('--shade-5'),
  shade6: color('--shade-6'),
  shade7: color('--shade-7'),
  shade8: color('--shade-8'),
  brand1: color('--brand-1'),
  brand2: color('--brand-2'),
  brand3: color('--brand-3'),
  red: color('--red'),
});
