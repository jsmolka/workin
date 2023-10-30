import { tryOnScopeDispose } from '@vueuse/core';
import { log } from '../utils/log';

export function useLog(callback) {
  const stop = log.on(callback);
  tryOnScopeDispose(stop);
  return stop;
}
