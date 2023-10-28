const callbacks = [];

export function on(callback) {
  callbacks.push(callback);
}

export function off(callback) {
  callbacks.splice(callbacks.indexOf(callback) >>> 0, 1);
}

function emit(level, ...args) {
  for (const callback of callbacks) {
    callback(level, ...args);
  }
}

const ranks = ['debug', 'info', 'warn', 'error', 'silent'];

function define(level) {
  return (...args) => {
    if (ranks.indexOf(level) >= ranks.indexOf(log.level)) {
      console[level](...args);
      emit(level, ...args);
    }
  };
}

export const debug = define('debug');
export const info = define('info');
export const warn = define('warn');
export const error = define('error');

export const log = {
  level: 'debug',
  on,
  off,
  debug,
  info,
  warn,
  error,
};
