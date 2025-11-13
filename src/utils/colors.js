class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static parse(variable) {
    const hex = getComputedStyle(document.documentElement).getPropertyValue(variable);
    const int = parseInt(hex.slice(1), 16);
    return new Color(
      (int >>> 16) & 0xff,
      (int >>>  8) & 0xff,
      (int >>>  0) & 0xff,
    ); // prettier-ignore
  }

  get int() {
    return (this.r << 16) | (this.g << 8) | this.b;
  }

  get hex() {
    return `#${this.int.toString(16).padStart(6, '0')}`;
  }

  get rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

export const colors = Object.freeze({
  shade1: Color.parse('--color-shade-1'),
  shade2: Color.parse('--color-shade-2'),
  shade3: Color.parse('--color-shade-3'),
  shade4: Color.parse('--color-shade-4'),
  shade5: Color.parse('--color-shade-5'),
  shade6: Color.parse('--color-shade-6'),
  shade7: Color.parse('--color-shade-7'),
  shade8: Color.parse('--color-shade-8'),
  brand1: Color.parse('--color-brand-1'),
  brand2: Color.parse('--color-brand-2'),
  brand3: Color.parse('--color-brand-3'),
  red: Color.parse('--color-red'),
  orange: Color.parse('--color-orange'),
  yellow: Color.parse('--color-yellow'),
  green: Color.parse('--color-green'),
});
