import _ from 'lodash';

export function makeGetter(expr) {
  if (_.isNil(expr)) {
    return (value) => value;
  }
  if (_.isFunction(expr)) {
    return (value) => expr(value);
  }
  if (_.isInteger(expr)) {
    return (value) => value[expr];
  }
  if (_.isString(expr)) {
    return (value) => _.get(value, expr);
  }
  throw 'Bad expr';
}
