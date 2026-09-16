import { get as _get, isFunction, isInteger, isString } from 'lodash-es';

export function makeGet(expr, defaultValue = undefined) {
  if (isInteger(expr)) {
    return (value) => value[expr] ?? defaultValue;
  }
  if (isString(expr)) {
    return (value) => _get(value, expr, defaultValue);
  }
  if (isFunction(expr)) {
    return (value) => expr(value) ?? defaultValue;
  }
  throw 'Bad expr';
}

export function get(value, expr, defaultValue = undefined) {
  return makeGet(expr, defaultValue)(value);
}
