import { tryOnScopeDispose } from '@vueuse/core';

export function useEmitter(emitter, type, callback) {
  const off = emitter.on(type, callback);
  tryOnScopeDispose(off);
  return off;
}
