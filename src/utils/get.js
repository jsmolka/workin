import { get as _get, isFunction, isInteger, isString } from 'lodash-es';

export function makeGet(expr) {
  if (expr == null) {
    return (value) => value;
  }
  if (isFunction(expr)) {
    return (value) => expr(value);
  }
  if (isInteger(expr)) {
    return (value) => value[expr];
  }
  if (isString(expr)) {
    return (value) => _get(value, expr);
  }
  throw 'Bad expr';
}

export function get(value, expr) {
  return makeGet(expr)(value);
}
