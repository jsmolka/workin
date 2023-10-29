import { tryOnScopeDispose } from '@vueuse/core';
import { log } from '../utils/log';

export function useLog(callback) {
  log.on(callback);
  const stop = () => log.off(callback);
  tryOnScopeDispose(stop);
  return stop;
}
