function color(variable) {
  const [r, g, b] = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .split(' ', 3)
    .map((value) => parseInt(value));

  return Object.freeze({
    r,
    g,
    b,

    get int() {
      return (this.r << 16) | (this.g << 8) | this.b;
    },

    get hex() {
      return '#' + this.int.toString(16).padStart(6, '0');
    },

    get rgb() {
      return `rgb(${r}, ${g}, ${b})`;
    },

    rgba(alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
  });
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
  orange: color('--orange'),
  yellow: color('--yellow'),
  green: color('--green'),
});
