import { isFunction, isString } from 'lodash-es';

export class Enum {
  constructor(elements) {
    this.$values = [];

    const reverse = new Map();
    for (const element of elements) {
      const key = isString(element) ? element : element.key;
      const { value = key, translation = key } = element;

      this[key] = value;
      this.$values.push(value);
      reverse.set(value, { key, translation });
    }

    this.$key = (value) => {
      return reverse.get(value)?.key;
    };

    this.$translate = (value) => {
      const translation = reverse.get(value)?.translation;
      if (isString(translation)) {
        return translation;
      } else if (isFunction(translation)) {
        return translation();
      }
      return '?';
    };

    Object.freeze(this);
  }
}
