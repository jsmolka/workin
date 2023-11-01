export class Emitter {
  constructor() {
    this.callbacks = {};
  }

  on(type, callback) {
    this.callbacks[type] ??= [];
    this.callbacks[type].push(callback);
    return () => this.off(type, callback);
  }

  off(type, callback) {
    this.callbacks[type] ??= [];
    this.callbacks[type] = this.callbacks[type].filter((value) => value !== callback);
  }

  emit(type, ...args) {
    const types = [type, '*'];
    for (const type of types) {
      for (const callback of this.callbacks[type] ?? []) {
        callback(...args);
      }
    }
  }
}
