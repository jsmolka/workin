import _ from 'lodash';

export class Enum {
  constructor(elements) {
    this.$values = [];

    const reverse = new Map();
    for (const element of elements) {
      const key = _.isString(element) ? element : element.key;
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
      if (_.isString(translation)) {
        return translation;
      } else if (_.isFunction(translation)) {
        return translation();
      }
      return '?';
    };

    Object.freeze(this);
  }
}
