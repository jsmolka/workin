import { isArray, isFunction, isObject } from 'lodash-es';

export function stringify(value) {
  if (isArray(value)) {
    value = value.map(stringify).join(', ');
    return `[${value}]`;
  }

  if (isFunction(value)) {
    return `<function ${value.name}>`;
  }

  if (isObject(value)) {
    if (value.toString !== Object.prototype.toString) {
      return String(value);
    }
    value = Object.entries(value);
    value = value.map(([key, value]) => `${key}: ${stringify(value)}`);
    value = value.join(', ');
    return `{${value}}`;
  }

  return String(value);
}
