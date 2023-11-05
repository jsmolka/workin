import { tryOnScopeDispose } from '@vueuse/core';
import { interval } from '../utils/interval';

export function useInterval(ms, callback) {
  const stop = interval(ms, callback);
  tryOnScopeDispose(stop);
  return stop;
}
