import { Emitter } from './emitter';

const emitter = new Emitter();

const ranks = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };

function define(level) {
  return (...args) => {
    if (ranks[level] >= ranks[log.level]) {
      console[level](...args);
      emitter.emit(level, ...args);
    }
  };
}

export const debug = define('debug');
export const info = define('info');
export const warn = define('warn');
export const error = define('error');

export const log = {
  level: 'debug',
  emitter,
  debug,
  info,
  warn,
  error,
};
