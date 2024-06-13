import { Emitter } from '@/utils/emitter';

const rank = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };

class Log extends Emitter {
  constructor() {
    super();

    this.level = this.levels[0];
  }

  get levels() {
    return Object.keys(rank);
  }
}

for (const level of ['debug', 'info', 'warn', 'error']) {
  Log.prototype[level] = function (...args) {
    if (rank[level] >= rank[this.level]) {
      console[level](...args);
      this.emit(level, ...args);
    }
  };
}

export const log = new Log();
