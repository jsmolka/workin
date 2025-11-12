import { isFunction, isString } from 'lodash-es';

export class Enum {
  constructor(elements) {
    this.$values = [];

    const lookup = new Map();
    for (const element of elements) {
      const key = isString(element) ? element : element.key;
      const { value = key, translation = key } = element;

      this[key] = value;
      this.$values.push(value);
      lookup.set(value, { key, translation });
    }

    this.$key = (value) => {
      return lookup.get(value)?.key;
    };

    this.$translate = (value) => {
      const translation = lookup.get(value)?.translation;
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
