import { Time } from '../modules/time';

export function useFormat() {
  return {
    formatNumber: (number) => Math.round(number),
    formatSeconds: (seconds) => new Time(0, 0, seconds).format(),
  };
}
