import { Emitter } from './emitter';

class Log extends Emitter {
  constructor() {
    super();

    this.level = this.levels[0];

    const define = (level) => {
      return (...args) => {
        if (this.levels.indexOf(level) >= this.levels.indexOf(this.level)) {
          console[level](...args);
          this.emit(level, ...args);
        }
      };
    };

    this.debug = define('debug');
    this.info = define('info');
    this.warn = define('warn');
    this.error = define('error');
  }

  get levels() {
    return ['debug', 'info', 'warn', 'error', 'silent'];
  }
}

export const log = new Log();
