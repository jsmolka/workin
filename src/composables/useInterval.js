import { tryOnScopeDispose } from '@vueuse/core';
import { interval } from '../utils/interval';

export function useInterval(duration, callback) {
  const stop = interval(duration, callback);

  tryOnScopeDispose(stop);

  return { stop };
}
