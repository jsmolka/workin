import { get, isFunction, isInteger, isString } from 'lodash-es';

export function makeGetter(expr) {
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
    return (value) => get(value, expr);
  }
  throw 'Bad expr';
}
