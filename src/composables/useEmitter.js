import { tryOnScopeDispose } from '@vueuse/core';

export function useEmitter(emitter, type, callback) {
  const stop = emitter.on(type, callback);
  tryOnScopeDispose(stop);
  return stop;
}
